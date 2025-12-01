import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const username = process.argv[2] || 'admin';
    const password = process.argv[3] || 'admin123';

    console.log(`Creating admin user: ${username}`);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { username },
        update: {
            password_hash: hashedPassword,
        },
        create: {
            username,
            password_hash: hashedPassword,
        },
    });

    console.log(`Admin user '${user.username}' created/updated successfully.`);
    console.log(`Password: ${password}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
