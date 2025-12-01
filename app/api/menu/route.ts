import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

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

        interface ClientModifierOption {
            id: number;
            name: string;
            price: number;
            modifierId: number;
        }

        interface ModifierMap {
            [key: string]: {
                max_selection: number;
                options: ClientModifierOption[];
            };
        }

        type PrismaModifierWithOptions = {
            id: number;
            name: string;
            max_selection: number;
            options: {
                id: number;
                name: string;
                price_adjustment: number;
                modifier_id: number;
            }[];
        };

        const modifiersData = modifiers.reduce((acc: ModifierMap, modifier: PrismaModifierWithOptions) => {
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
        }, {} as ModifierMap);

        return NextResponse.json({ baseItems, modifiers: modifiersData }, { status: 200 });
    } catch (error) {
        console.error('Error fetching menu data:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
