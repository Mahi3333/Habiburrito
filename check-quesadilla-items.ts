
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const items = await prisma.menuItem.findMany({
        where: {
            category: 'habiburrito quesadillas'
        },
        select: {
            name: true,
            category: true,
            is_available: true
        },
    });

    console.log('Items in habiburrito quesadillas with explicit availability:', items);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
