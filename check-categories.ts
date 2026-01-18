
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const items = await prisma.menuItem.findMany({
        select: {
            category: true,
        },
    });

    const uniqueCategories = Array.from(new Set(items.map((i) => i.category)));
    console.log('Unique Categories in DB:', uniqueCategories);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
