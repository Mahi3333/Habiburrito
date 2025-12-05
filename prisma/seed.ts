import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // 1. Create Menu Items (Signature Items & BYO Bases)
    const menuItems = [
        // --- Signature Burritos ---
        {
            name: 'The Verde',
            description: 'Grilled chicken, cilantro rice, green sauce, guacamole, lettuce, cucumber, beans',
            price: 13.99,
            category: 'burritos',
            image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.31 PM (2).jpeg',
            is_signature: true,
            is_available: true
        },
        {
            name: 'The Fiesta',
            description: 'Birria, habibi rice, white sauce, green sauce, pico de gallo, sumac',
            price: 14.99,
            category: 'burritos',
            image_url: '/menu-items/burrito-special.png',
            is_signature: true,
            is_available: true
        },
        {
            name: 'Silk Road',
            description: 'Falafel, habibi rice, hummus, pico de gallo, tahini sauce, red onion, sumac',
            price: 12.99,
            category: 'burritos',
            image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (6).jpeg',
            is_signature: true,
            is_available: true
        },
        {
            name: 'The Boss Burrito',
            description: 'Birria, cilantro rice, grilled peppers & onions, queso, pico de gallo, guac',
            price: 15.99,
            category: 'burritos',
            image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.31 PM.jpeg',
            is_signature: true,
            is_available: true
        },
        {
            name: 'Falafel Supreme',
            description: 'Falafel, hummus, pico de gallo, sumac, lettuce, tahini sauce, pickles',
            price: 12.99,
            category: 'burritos',
            image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (4).jpeg',
            is_signature: true,
            is_available: true
        },
        {
            name: 'The Flame',
            description: 'Sriracha chicken, cilantro rice, grilled peppers & onions, lettuce, boom-boom sauce',
            price: 13.99,
            category: 'burritos',
            image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.28 PM (1).jpeg',
            is_signature: true,
            is_available: true
        },
        {
            name: 'Fuego',
            description: 'Grilled chicken, Nashville sauce, corn salsa, jalapeno pepper, lettuce',
            price: 13.99,
            category: 'burritos',
            image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.28 PM (2).jpeg',
            is_signature: true,
            is_available: true
        },
        {
            name: 'Burrito Deluxe',
            description: 'Ground beef, black beans, pico de gallo, queso sour cream, lettuce, nachos',
            price: 14.50,
            category: 'burritos',
            image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.29 PM.jpeg',
            is_signature: true,
            is_available: true
        },
        {
            name: 'El Dorado',
            description: 'Grilled shrimp, cilantro rice, pico de gallo, lettuce, corn, guac, sour cream, green sauce, lime juice',
            price: 15.50,
            category: 'burritos',
            image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.29 PM (1).jpeg',
            is_signature: true,
            is_available: true
        },
        {
            name: 'Protienator',
            description: 'Birria, grilled chicken, guac, queso, lettuce, red onion, beans, pico de gallo',
            price: 16.99,
            category: 'burritos',
            image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.29 PM (2).jpeg',
            is_signature: true,
            is_available: true
        },
        {
            name: 'Mango Shrimp',
            description: 'Shrimp, cilantro rice, mango salsa, orange ginger sauce, pico de gallo',
            price: 15.50,
            category: 'burritos',
            image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.29 PM (3).jpeg',
            is_signature: true,
            is_available: true
        },

        // --- Signature Bowls ---
        {
            name: 'Hot Chick Bowl',
            description: 'Spicy chicken, cilantro rice, chipotle aioli, pico de gallo, corn salsa, lettuce',
            price: 13.99,
            category: 'bowls',
            image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (1).jpeg',
            is_signature: true,
            is_available: true
        },
        {
            name: 'Ocean Flame Bowl',
            description: 'Habibi rice, grilled shrimps, white sauce, green sauce, grilled onions and peppers',
            price: 15.50,
            category: 'bowls',
            image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (2).jpeg',
            is_signature: true,
            is_available: true
        },
        {
            name: 'El Gringo Bowl',
            description: 'Cilantro rice, grilled shrimp, mango habanero sauce, pico de gallo, shredded cheese, lettuce',
            price: 15.50,
            category: 'bowls',
            image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (3).jpeg',
            is_signature: true,
            is_available: true
        },
        {
            name: 'Loaded Nacho Bowl',
            description: 'Potato chips base, ground beef, queso, and jalapeños',
            price: 13.50,
            category: 'bowls',
            image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (5).jpeg',
            is_signature: true,
            is_available: true
        },
        {
            name: 'Classic Cali Bowl',
            description: 'Lettuce base, grilled chicken, avocado, pico, sour cream, ranch sauce',
            price: 13.99,
            category: 'bowls',
            image_url: '/menu-items/bowl-signature.png',
            is_signature: true,
            is_available: true
        },
        {
            name: 'ProtiBowl',
            description: 'Birria, grilled chicken, guacamole, queso, lettuce, red onions, beans, pico de gallo',
            price: 16.99,
            category: 'bowls',
            image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (7).jpeg',
            is_signature: true,
            is_available: true
        },

        // --- BYO Bases ---
        { name: 'Burrito', description: 'Warm flour tortilla', price: 0.00, category: 'base', is_signature: false, is_available: true, image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.28 PM (1).jpeg' },
        { name: 'Bowl', description: 'Bowl with choice of rice or lettuce', price: 0.00, category: 'base', is_signature: false, is_available: true, image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (1).jpeg' },
        { name: 'Quesadilla', description: 'Toasted tortilla with cheese', price: 0.00, category: 'base', is_signature: false, is_available: true, image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.28 PM (2).jpeg' },
        { name: 'Taco (2ct)', description: 'Two soft or hard shell tacos', price: 0.00, category: 'base', is_signature: false, is_available: true, image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (6).jpeg' },
        { name: 'Spicy Rice', description: 'Seasoned spicy rice base', price: 0.00, category: 'base', is_signature: false, is_available: true, image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (2).jpeg' },
        { name: 'Cilantro Rice', description: 'Fresh cilantro lime rice base', price: 0.00, category: 'base', is_signature: false, is_available: true, image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (3).jpeg' },
        { name: 'Greens', description: 'Fresh mixed greens base', price: 0.00, category: 'base', is_signature: false, is_available: true, image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (4).jpeg' },
        { name: 'Nachos', description: 'Crispy tortilla chips base', price: 0.00, category: 'base', is_signature: false, is_available: true, image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (5).jpeg' },
        { name: 'Potato Chips', description: 'Crispy potato chips base', price: 0.00, category: 'base', is_signature: false, is_available: true, image_url: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (5).jpeg' },
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
        { name: 'Add-ons', max_selection: 4 }, // "Add-ons (Dressings)"
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
        { name: 'Spicy Chicken', price_adjustment: 10.99 },
        { name: 'Barbacoa', price_adjustment: 12.99 },
        { name: 'Shrimp', price_adjustment: 12.99 },
        { name: 'Ground Beef', price_adjustment: 10.99 },
        { name: 'Falafel', price_adjustment: 9.99 },
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

    // Toppings (up to 5)
    const toppings = [
        'Lettuce', 'Corn Salsa', 'Mango Salsa', 'Pineapple', 'Pico de Gallo',
        'Black Beans', 'Lime Quarters', 'Grilled Onions & Peppers', 'Monterey Cheese',
        'Red Onion', 'Hummus'
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

    // Sauces (up to 2)
    const sauces = [
        'White Sauce', 'Green Sauce', 'Red Sauce', 'Tahini', 'Sour Cream',
        'Nashville Hot', 'Mango Habanero', 'Sriracha', 'Boom-Boom',
        'Honey Garlic Sauce', 'Orange Ginger'
    ]

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

    // Add-ons (Dressings)
    const addons = [
        'Ranch', 'Caesar', 'Greek', 'Thousand Island', 'Blue Cheese',
        'Honey Mustard', 'Sweet and Sour'
    ]

    console.log('Seeding Add-on Options...')
    for (const a of addons) {
        await prisma.modifierOption.create({
            data: {
                modifier_id: createdModifiers['Add-ons'],
                name: a,
                price_adjustment: 0.00,
            },
        })
    }

    // Extras (Paid)
    const extras = [
        { name: 'Guacamole', price_adjustment: 2.85 },
        { name: 'Queso', price_adjustment: 2.85 },
        { name: 'Jalapeño', price_adjustment: 1.50 },
        { name: 'Banana Pepper', price_adjustment: 1.50 },
        { name: 'Nachos', price_adjustment: 1.90 },
        { name: 'Nachos w Guac', price_adjustment: 4.75 },
        { name: 'Nachos w Queso', price_adjustment: 4.75 },
        { name: 'Tortilla Extra', price_adjustment: 0.50 },
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
    // Linking Protein, Toppings, Sauces, Add-ons, and Extras to BYO items (non-signature)
    const byoItems = await prisma.menuItem.findMany({ where: { is_signature: false } })

    console.log('Linking Modifiers to Menu Items...')
    for (const item of byoItems) {
        const modsToLink = ['Protein', 'Toppings', 'Sauces', 'Add-ons', 'Extras']
        for (const modName of modsToLink) {
            if (createdModifiers[modName]) {
                await prisma.itemModifierLink.create({
                    data: {
                        item_id: item.id,
                        modifier_id: createdModifiers[modName],
                    },
                })
            }
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
