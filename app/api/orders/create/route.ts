import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, user, paymentIntentId, totalAmount, taxAmount } = body;

        if (!items || !user || !paymentIntentId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Find or Create User
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

        // 2. Create Order
        const order = await prisma.order.create({
            data: {
                user_id: dbUser.id,
                total_amount: totalAmount,
                tax_amount: taxAmount,
                status: 'PENDING_PAYMENT',
                stripe_payment_intent_id: paymentIntentId,
                items: {
                    create: items.map((item: any) => ({
                        item_name: item.base.name,
                        quantity: item.quantity || 1,
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
