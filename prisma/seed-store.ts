import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.appSetting.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            online_ordering_enabled: true,
            override_message: '',
        },
    });

    const hours = [
        { day: 'Sunday', open: '11:00', close: '23:00' },
        { day: 'Monday', open: '11:00', close: '23:00' },
        { day: 'Tuesday', open: '11:00', close: '23:00' },
        { day: 'Wednesday', open: '11:00', close: '23:00' },
        { day: 'Thursday', open: '11:00', close: '23:00' },
        { day: 'Friday', open: '11:00', close: '24:00' },
        { day: 'Saturday', open: '11:00', close: '24:00' },
    ];

    for (const h of hours) {
        await prisma.storeHour.upsert({
            where: { day: h.day },
            update: { open_time: h.open, close_time: h.close },
            create: {
                day: h.day,
                open_time: h.open,
                close_time: h.close,
                closed: false,
            },
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
