import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { proteinName, extraNames } = body;

        // Validate Input
        if (!proteinName) {
            return NextResponse.json(
                { error: 'proteinName is required' },
                { status: 400 }
            );
        }

        // Retrieve Protein Price
        // We assume the proteinName corresponds to a ModifierOption under the 'Protein' modifier
        const protein = await prisma.modifierOption.findFirst({
            where: {
                name: proteinName,
                modifier: {
                    name: 'Protein',
                },
            },
        });

        if (!protein) {
            return NextResponse.json(
                { error: `Protein not found: ${proteinName}` },
                { status: 404 }
            );
        }

        let totalExtraAdjustment = 0;

        // Retrieve Extras Prices
        if (extraNames && Array.isArray(extraNames) && extraNames.length > 0) {
            const extras = await prisma.modifierOption.findMany({
                where: {
                    name: { in: extraNames },
                },
            });

            // Check if all specified extras exist
            for (const name of extraNames) {
                const extra = extras.find((e: { name: string; price_adjustment: number }) => e.name === name);
                if (!extra) {
                    return NextResponse.json(
                        { error: `Extra item not found: ${name}` },
                        { status: 404 }
                    );
                }
                totalExtraAdjustment += extra.price_adjustment;
            }
        }

        // Calculate Final Price
        const finalPrice = protein.price_adjustment + totalExtraAdjustment;

        return NextResponse.json({ finalPrice }, { status: 200 });
    } catch (error) {
        console.error('Error calculating price:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
