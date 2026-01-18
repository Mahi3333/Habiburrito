import { PrismaClient, ModifierGroupType } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

// --- Types matching JSON structure ---
interface MenuJson {
    version: string;
    restaurant: string;
    category: {
        key: string;
        name: string;
        aliases: string[];
        items: JsonMenuItem[];
    };
    catalog: {
        modifierGroups: Record<string, JsonModifierGroup>; // key is groupKey like 'base', 'protein'
    };
}

interface JsonMenuItem {
    key: string;
    name: string;
    price: number;
    description: string | null;
    isActive: boolean;
    includedItems: { ref: string; qty: number }[];
    modifierGroups: JsonItemModifierGroup[];
}

interface JsonItemModifierGroup {
    groupRef: string; // e.g. "base", "protein"
    titleOverride?: string;
    rules: {
        required?: boolean;
        min?: number;
        max?: number;
        allowQuantity?: boolean;
        type?: 'freeText' | 'select'; // select is default
        maxLength?: number;
    };
    defaults?: { ref: string; qty: number }[];
    allowNoneOption?: boolean;
    notes?: string;
}

interface JsonModifierGroup {
    key: string;
    name: string;
    options: JsonModifierOption[];
}

interface JsonModifierOption {
    key: string; // e.g. "base.spring_mix"
    name: string;
}

// Full catalogs for merging
const mergedCatalog: Record<string, JsonModifierGroup> = {}
// To track all seen options to create them
const allOptionsVals: Set<string> = new Set() // stores key like 'base.spring_mix'

async function main() {
    const jsonDir = path.join(process.cwd(), 'app', 'menu-items-json')
    const files = fs.readdirSync(jsonDir).filter(f => f.endsWith('.json'))

    console.log('Found JSON files:', files)

    // 1. Clean Database
    console.log('Cleaning database...')
    await prisma.menuItemModifierDefault.deleteMany()
    await prisma.menuItemIncludedOption.deleteMany()

    await prisma.menuItemModifierGroup.deleteMany()
    await prisma.modifierOption.deleteMany()
    await prisma.modifier.deleteMany()
    await prisma.menuItem.deleteMany()
    await prisma.storeHour.deleteMany()
    await prisma.appSetting.deleteMany()
    await prisma.menuCategory.deleteMany()

    // 1.1 Seed Store Hours & Settings
    console.log('Seeding Store Hours & Settings...')
    await prisma.appSetting.create({
        data: {
            online_ordering_enabled: true,
            override_message: null
        }
    })

    const hours = [
        { day: 'Sunday', open: '11:00', close: '23:00' },
        { day: 'Monday', open: '11:00', close: '23:00' },
        { day: 'Tuesday', open: '11:00', close: '23:00' },
        { day: 'Wednesday', open: '11:00', close: '23:00' },
        { day: 'Thursday', open: '11:00', close: '23:00' },
        { day: 'Friday', open: '11:00', close: '24:00' },
        { day: 'Saturday', open: '11:00', close: '24:00' },
    ]

    for (const h of hours) {
        await prisma.storeHour.create({
            data: {
                day: h.day,
                open_time: h.open,
                close_time: h.close,
                closed: false
            }
        })
    }

    // 2. Pre-scan to build Unified Catalog
    console.log('Building Unified Catalog...')
    const jsonContents: MenuJson[] = []

    for (const file of files) {
        const filePath = path.join(jsonDir, file)
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as MenuJson
        jsonContents.push(content)

        // Merge catalog
        if (content.catalog && content.catalog.modifierGroups) {
            for (const [key, group] of Object.entries(content.catalog.modifierGroups)) {
                if (!mergedCatalog[key]) {
                    // Initialize with empty options to ensure we dedup the first batch too
                    mergedCatalog[key] = {
                        key: group.key,
                        name: group.name,
                        options: []
                    }
                }

                // Merge options with dedup check
                const existingKeys = new Set(mergedCatalog[key].options.map(o => o.key))
                for (const opt of group.options) {
                    if (!existingKeys.has(opt.key)) {
                        mergedCatalog[key].options.push(opt)
                        existingKeys.add(opt.key)
                    }
                }
            }
        }
    }

    // 2.1 Fill Gaps (Missing Modifiers) - from Architecture Doc
    const gapGroups: Record<string, string[]> = {
        'base': ['base.cilantro_rice', 'base.habiburrito_rice', 'base.nacho_chips', 'base.tortilla'],
        'veg_toppings': ['veg.avocado', 'veg.cucumber', 'veg.salsa', 'veg.guacamole'],
        'quesadilla_veg': ['veg.lettuce', 'veg.pineapple', 'veg.sumac'],
        'sauces': ['sauces.sour_cream', 'sauces.pico_de_gallo_salsa'] // ensure these exist if referenced
    }

    for (const [groupKey, missingOptionKeys] of Object.entries(gapGroups)) {
        if (!mergedCatalog[groupKey]) {
            // If group entirely missing, define it
            mergedCatalog[groupKey] = {
                key: groupKey,
                name: groupKey.charAt(0).toUpperCase() + groupKey.slice(1).replace('_', ' '),
                options: []
            }
        }

        const group = mergedCatalog[groupKey]
        const existingKeys = new Set(group.options.map(o => o.key))

        for (const missingKey of missingOptionKeys) {
            if (!existingKeys.has(missingKey)) {
                console.log(`Auto-filling missing option: ${missingKey} in group ${groupKey}`)
                // Generate a name from the key (e.g. base.cilantro_rice -> Cilantro Rice)
                const name = missingKey.split('.')[1]
                    .split('_')
                    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' ')

                group.options.push({ key: missingKey, name })
                existingKeys.add(missingKey)
            }
        }
    }


    // 3. Upsert Modifiers (Groups) & Options
    console.log('Seeding Modifiers & Options...')
    const modifierMap: Record<string, number> = {} // groupKey -> id
    const optionMap: Record<string, number> = {} // optionKey -> id

    for (const groupKey of Object.keys(mergedCatalog)) {
        const groupData = mergedCatalog[groupKey]
        const type = (groupKey === 'comments') ? ModifierGroupType.FREE_TEXT : ModifierGroupType.SELECT

        // Create or find Modifier Group
        const modifier = await prisma.modifier.create({
            data: {
                key: groupData.key,
                name: groupData.name,
                type: type,
                max_selection: 10, // Default high, will be constrained per item
            }
        })
        modifierMap[groupData.key] = modifier.id

        // Create Options
        for (const opt of groupData.options) {
            // Price adjustment logic would go here if we had it in JSON. Defaulting to 0.
            // Some specific prices based on old seed data (hardcoded for now as quick fix)
            let price = 0.0
            if (opt.name.includes('Shrimp')) price = 2.0
            if (opt.name.includes('Guacamole')) price = 2.85
            if (opt.name.includes('Queso')) price = 1.99

            const createdOpt = await prisma.modifierOption.upsert({
                where: { key: opt.key },
                update: {
                    name: opt.name,
                    modifier_id: modifier.id,
                    price_adjustment: price
                },
                create: {
                    key: opt.key,
                    name: opt.name,
                    modifier_id: modifier.id,
                    price_adjustment: price
                }
            })
            optionMap[opt.key] = createdOpt.id
        }
    }


    // 4. Process Categories & Items
    console.log('Seeding Categories & Items...')

    // Sort files to ensure order? Not strictly needed but helpful.
    // Order: Burritos (Wraps), Bowls, Quesadillas, Sides

    for (const doc of jsonContents) {
        const catData = doc.category

        // Upsert Category
        const category = await prisma.menuCategory.create({
            data: {
                key: catData.key,
                name: catData.name,
                aliases: catData.aliases,
            }
        })
        console.log(`Created Category: ${category.name}`)

        // Create Items
        for (const itemData of catData.items) {
            const menuItem = await prisma.menuItem.create({
                data: {
                    key: itemData.key,
                    name: itemData.name,
                    description: itemData.description,
                    price: itemData.price,
                    image_url: null, // Set via CMS or update later
                    category: category.name.toLowerCase(), // Legacy
                    category_id: category.id,
                    is_available: itemData.isActive
                }
            })

            // 4.1 Included Items (Fixed Recipe items)
            if (itemData.includedItems && itemData.includedItems.length > 0) {
                for (const inc of itemData.includedItems) {
                    const optId = optionMap[inc.ref]
                    if (optId) {
                        await prisma.menuItemIncludedOption.create({
                            data: {
                                menu_item_id: menuItem.id,
                                option_id: optId,
                                quantity: inc.qty
                            }
                        })
                    } else {
                        console.warn(`[WARN] Included item ref '${inc.ref}' not found in catalog for ${menuItem.name}`)
                    }
                }
            }

            // 4.2 Modifier Groups (Rules)
            if (itemData.modifierGroups && itemData.modifierGroups.length > 0) {
                for (const groupRule of itemData.modifierGroups) {
                    const modId = modifierMap[groupRule.groupRef]

                    if (!modId) {
                        // "comments" might be missing if not explicit in catalog, handle gracefully
                        if (groupRule.groupRef === 'comments') {
                            // ensure comments modifier exists if not created earlier
                            // (Usually it should be in catalog if JSON is good, but let's skip if missing to avoid crash)
                            console.warn(`[WARN] Modifier group '${groupRule.groupRef}' not found for ${menuItem.name}`)
                            continue
                        }
                        console.warn(`[WARN] Modifier group '${groupRule.groupRef}' not found for ${menuItem.name}`)
                        continue
                    }

                    const itemGroup = await prisma.menuItemModifierGroup.create({
                        data: {
                            menu_item_id: menuItem.id,
                            modifier_id: modId,
                            title_override: groupRule.titleOverride,
                            required: groupRule.rules.required || false,
                            min_select: groupRule.rules.min || 0,
                            max_select: groupRule.rules.max || 0, // 0 usually means unlimited or handled by logic
                            allow_quantity: groupRule.rules.allowQuantity || false,
                            allow_none_option: groupRule.allowNoneOption || false,
                            notes: groupRule.notes,
                            free_text_max_length: groupRule.rules.maxLength
                        }
                    })

                    // 4.3 Defaults for this group
                    if (groupRule.defaults && groupRule.defaults.length > 0) {
                        for (const def of groupRule.defaults) {
                            const defOptId = optionMap[def.ref]
                            if (defOptId) {
                                await prisma.menuItemModifierDefault.create({
                                    data: {
                                        item_group_id: itemGroup.id,
                                        option_id: defOptId,
                                        quantity: def.qty
                                    }
                                })
                            } else {
                                console.warn(`[WARN] Default ref '${def.ref}' not found for ${menuItem.name} in group ${groupRule.groupRef}`)
                            }
                        }
                    }
                }
            }
        }
    }

    console.log('Seeding completed successfully.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
