import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const modifiers = await prisma.modifier.findMany({
            include: {
                options: true,
            },
        });

        const menuData = modifiers.reduce((acc, modifier) => {
            acc[modifier.name] = modifier.options.map((option) => ({
                id: option.id,
                name: option.name,
                price: option.price_adjustment,
                modifierId: option.modifier_id,
            }));
            return acc;
        }, {} as Record<string, any[]>);

        return NextResponse.json(menuData, { status: 200 });
    } catch (error) {
        console.error('Error fetching menu data:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
