import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createOrderSchema } from '@/lib/schemas';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. Zod Validation
        const result = createOrderSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: 'Validation Failed', details: result.error.issues },
                { status: 400 }
            );
        }

        const { items, user, paymentIntentId, totalAmount, taxAmount } = result.data;

        // 2. Find or Create User
        // We use phone as the unique identifier based on schema
        let dbUser = await prisma.user.findUnique({
            where: { phone: user.phone },
        });

        if (!dbUser) {
            dbUser = await prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: 'CUSTOMER',
                },
            });
        } else {
            // Update email/name if changed (optional, but good for keeping data fresh)
            await prisma.user.update({
                where: { id: dbUser.id },
                data: {
                    name: user.name,
                    email: user.email,
                },
            });
        }

        // 3. Create Order
        const order = await prisma.order.create({
            data: {
                user_id: dbUser.id,
                total_amount: totalAmount,
                tax_amount: taxAmount,
                status: 'PENDING_PAYMENT',
                stripe_payment_intent_id: paymentIntentId,
                items: {
                    create: items.map((item) => ({
                        item_name: item.base.name,
                        quantity: item.quantity,
                        json_details: JSON.stringify(item), // Store full customization details
                    })),
                },
            },
        });

        return NextResponse.json({ success: true, orderId: order.id });

    } catch (error) {
        console.error('Failed to create order:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
