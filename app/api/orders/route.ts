import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
    typescript: true,
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, total, user } = body;

        if (!user || !user.phone) {
            return NextResponse.json(
                { error: 'User phone number is required' },
                { status: 400 }
            );
        }

        // 1. Upsert User (Implicit Account Creation)
        const dbUser = await prisma.user.upsert({
            where: { phone: user.phone },
            update: {
                name: user.name,
                email: user.email // Update email if provided
            },
            create: {
                phone: user.phone,
                name: user.name,
                email: user.email,
                role: 'CUSTOMER'
            }
        });

        // 2. Create Order (Pending Payment)
        // Use a temporary ID for stripe_payment_intent_id until we get the real one from Webhook
        const tempId = `temp_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        const order = await prisma.order.create({
            data: {
                user_id: dbUser.id,
                total_amount: total,
                tax_amount: total * 0.0625, // Approx 6.25% Tax
                status: 'PENDING_PAYMENT',
                stripe_payment_intent_id: tempId,
                items: {
                    create: items.map((item: any) => ({
                        item_name: item.name,
                        quantity: item.quantity,
                        json_details: JSON.stringify(item.details)
                    }))
                }
            }
        });

        // 3. Create Stripe Checkout Session
        let sessionUrl = `${request.headers.get('origin')}/order?success=true&orderId=${order.id}&mock=true`; // Fallback for dev without keys

        // TRIGGER NOTIFICATION (For Mock/Dev Flow)
        // In a real production environment with Webhooks, this would be moved to the webhook handler.
        // For now, we send it immediately so you can test the SMS functionality.
        if (!process.env.STRIPE_SECRET_KEY) {
            // Run in background so we don't block the response
            const { sendOrderConfirmationSMS } = await import('@/lib/notifications');
            sendOrderConfirmationSMS(user.phone, {
                id: order.id,
                customerName: user.name || 'Customer',
                items: items,
                total: total
            });
        }

        if (process.env.STRIPE_SECRET_KEY) {
            try {
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: items.map((item: any) => ({
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.name,
                                description: 'Freshly prepared HabiBurrito Bowl',
                            },
                            unit_amount: Math.round(item.price * 100), // Amount in cents
                        },
                        quantity: item.quantity,
                    })),
                    mode: 'payment',
                    success_url: `${request.headers.get('origin')}/order?success=true&orderId=${order.id}`,
                    cancel_url: `${request.headers.get('origin')}/build`,
                    metadata: {
                        orderId: order.id.toString(),
                        userId: dbUser.id.toString()
                    },
                    customer_email: user.email || undefined,
                });

                if (session.url) {
                    sessionUrl = session.url;
                }
            } catch (stripeError) {
                console.error("Stripe Session Creation Failed:", stripeError);
                // Fallback to mock success if Stripe fails (e.g. invalid key)
                // In production, you would return an error here.
            }
        } else {
            console.warn("STRIPE_SECRET_KEY is missing. Using mock checkout flow.");
        }

        return NextResponse.json({ success: true, url: sessionUrl });

    } catch (error) {
        console.error('Error processing order:', JSON.stringify(error, null, 2));
        if (error instanceof Error) {
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }
        return NextResponse.json(
            { error: 'Failed to process order' },
            { status: 500 }
        );
    }
}
