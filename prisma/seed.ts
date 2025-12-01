import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // 1. Create Menu Items
    const menuItems = [
        { name: 'Burrito', item_type: 'BYO', base_price: 0.00 },
        { name: 'Bowl', item_type: 'BYO', base_price: 0.00 },
        { name: 'Quesadilla', item_type: 'BYO', base_price: 0.00 },
        { name: 'Taco (2ct)', item_type: 'BYO', base_price: 0.00 },
    ]

    console.log('Seeding Menu Items...')
    for (const item of menuItems) {
        await prisma.menuItem.create({
            data: item,
        })
    }

    // 2. Create Modifiers
    const modifiers = [
        { name: 'Protein', max_selection: 1 },
        { name: 'Toppings', max_selection: 5 },
        { name: 'Sauces', max_selection: 2 },
        { name: 'Add-ons', max_selection: 4 },
        { name: 'Extras', max_selection: 10 },
    ]

    console.log('Seeding Modifiers...')
    const createdModifiers: Record<string, number> = {}
    for (const mod of modifiers) {
        const created = await prisma.modifier.create({
            data: mod,
        })
        createdModifiers[mod.name] = created.id
    }

    // 3. Create Modifier Options

    // Proteins
    const proteins = [
        { name: 'Grilled Chicken', price_adjustment: 10.99 },
        { name: 'Steak', price_adjustment: 11.99 },
        { name: 'Shrimp', price_adjustment: 12.99 },
        { name: 'Falafel', price_adjustment: 10.50 },
        { name: 'Spicy Beef', price_adjustment: 11.50 },
    ]

    console.log('Seeding Protein Options...')
    for (const p of proteins) {
        await prisma.modifierOption.create({
            data: {
                modifier_id: createdModifiers['Protein'],
                name: p.name,
                price_adjustment: p.price_adjustment,
            },
        })
    }

    // Free Toppings
    const toppings = [
        'Lettuce', 'Cilantro Lime Rice', 'Brown Rice', 'Black Beans', 'Pinto Beans',
        'Cheese', 'Pico de Gallo', 'Corn Salsa', 'Sour Cream', 'Fajita Veggies'
    ]

    console.log('Seeding Topping Options...')
    for (const t of toppings) {
        await prisma.modifierOption.create({
            data: {
                modifier_id: createdModifiers['Toppings'],
                name: t,
                price_adjustment: 0.00,
            },
        })
    }

    // Sauces
    const sauces = ['Mild Salsa', 'Medium Salsa', 'Hot Salsa', 'Sriracha', 'Chipotle Mayo']

    console.log('Seeding Sauce Options...')
    for (const s of sauces) {
        await prisma.modifierOption.create({
            data: {
                modifier_id: createdModifiers['Sauces'],
                name: s,
                price_adjustment: 0.00,
            },
        })
    }

    // Extras (Paid)
    const extras = [
        { name: 'Guacamole', price_adjustment: 2.85 },
        { name: 'Queso', price_adjustment: 2.50 },
        { name: 'Extra Meat', price_adjustment: 3.50 },
        { name: 'Jalapeño', price_adjustment: 0.50 },
    ]

    console.log('Seeding Extras Options...')
    for (const e of extras) {
        await prisma.modifierOption.create({
            data: {
                modifier_id: createdModifiers['Extras'],
                name: e.name,
                price_adjustment: e.price_adjustment,
            },
        })
    }

    // 4. Link Modifiers to Menu Items
    // Linking Protein, Toppings, Sauces, and Extras to all BYO items
    const allMenuItems = await prisma.menuItem.findMany({ where: { item_type: 'BYO' } })

    console.log('Linking Modifiers to Menu Items...')
    for (const item of allMenuItems) {
        const modsToLink = ['Protein', 'Toppings', 'Sauces', 'Extras']
        for (const modName of modsToLink) {
            await prisma.itemModifierLink.create({
                data: {
                    item_id: item.id,
                    modifier_id: createdModifiers[modName],
                },
            })
        }
    }

    console.log('Seeding completed.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
