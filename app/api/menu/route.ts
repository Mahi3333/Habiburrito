import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const [modifiers, baseItems] = await Promise.all([
            prisma.modifier.findMany({
                include: {
                    options: true,
                },
            }),
            prisma.menuItem.findMany({
                where: {
                    item_type: 'BYO',
                },
            }),
        ]);

        const modifiersData = modifiers.reduce((acc, modifier) => {
            acc[modifier.name] = {
                max_selection: modifier.max_selection,
                options: modifier.options.map((option) => ({
                    id: option.id,
                    name: option.name,
                    price: option.price_adjustment,
                    modifierId: option.modifier_id,
                })),
            };
            return acc;
        }, {} as Record<string, { max_selection: number; options: any[] }>);

        return NextResponse.json({ baseItems, modifiers: modifiersData }, { status: 200 });
    } catch (error) {
        console.error('Error fetching menu data:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
