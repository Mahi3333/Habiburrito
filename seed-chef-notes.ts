import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const updates = [
        {
            name: "Silk Road Bowl",
            note: "Saffron rice, tender lamb, hummus, tabouli, and tzatziki."
        },
        {
            name: "Fuego Burrito Wrap",
            note: "Charcoal-grilled chicken, spicy salsa, jalapeños, and black beans."
        },
        {
            name: "Spicy Chick Quesadilla",
            note: "Spicy chicken, melted three-cheese blend, and house hot sauce."
        },
        {
            name: "Ocean Flame Bowl",
            note: "Flame-grilled shrimp, citrus slaw, avocado, and lime rice."
        }
    ];

    for (const update of updates) {
        await prisma.menuItem.updateMany({
            where: { name: update.name },
            data: { chef_note: update.note }
        });
        console.log(`Updated chef note for: ${update.name}`);
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
