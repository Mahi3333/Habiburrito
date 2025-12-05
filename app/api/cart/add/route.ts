import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { protein, extras, totalPrice } = body as {
            protein?: { name: string };
            extras?: { name: string }[];
            totalPrice: number;
        };

        // 1. Extract Names for Validation
        const proteinName = protein?.name;
        const extraNames = Array.isArray(extras) ? extras.map((e: { name: string }) => e.name) : [];

        // 2. Validate Input Presence
        if (!proteinName) {
            return NextResponse.json(
                { error: 'Protein selection is required.' },
                { status: 400 }
            );
        }

        // 3. Server-Side Price Calculation (Mirroring /api/calculate-price)

        // Fetch Protein Price
        const proteinOption = await prisma.modifierOption.findFirst({
            where: {
                name: proteinName,
                modifier: { name: 'Protein' },
            },
        });

        if (!proteinOption) {
            return NextResponse.json(
                { error: `Protein not found: ${proteinName}` },
                { status: 404 }
            );
        }

        let calculatedTotal = proteinOption.price_adjustment;

        // Fetch and Add Extras Prices
        if (extraNames.length > 0) {
            const extraOptions = await prisma.modifierOption.findMany({
                where: {
                    name: { in: extraNames },
                    // We strictly check these are valid options. 
                    // In a real app, we might also enforce they belong to 'Extras' modifier if needed,
                    // but relying on name + price_adjustment from DB is the key.
                },
            });

            // Verify all extras were found
            for (const name of extraNames) {
                const found = extraOptions.find((e: { name: string; price_adjustment: number }) => e.name === name);
                if (!found) {
                    return NextResponse.json(
                        { error: `Extra item not found: ${name}` },
                        { status: 404 }
                    );
                }
                calculatedTotal += found.price_adjustment;
            }
        }

        // 4. Compare Prices
        // Use a small epsilon for floating point comparison if needed, but usually exact match for currency is expected if handled consistently.
        // We'll allow a very small difference (e.g. 0.01) just in case of JS float weirdness, or strict equality.
        // Given the prompt asks for "Mismatch", strict equality is safest to start, maybe toFixed(2).

        const serverPrice = Number(calculatedTotal.toFixed(2));
        const clientPrice = Number(totalPrice.toFixed(2));

        if (serverPrice !== clientPrice) {
            console.warn(`Price mismatch! Server: ${serverPrice}, Client: ${clientPrice}`);
            return NextResponse.json(
                { error: 'Price validation failed. The item was not added to the cart.' },
                { status: 400 }
            );
        }

        // 5. Success (Simulate Persistence)
        console.log('Item successfully validated and added to cart (simulated).');

        return NextResponse.json(
            { message: 'Item added to cart successfully.' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error adding to cart:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
