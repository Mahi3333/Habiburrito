import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-11-20.acacia', // Use latest or a fixed version
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { amount } = body; // Expecting amount in dollars or directly in cents? Let's assume dollars as per previous context, so we convert.

        if (!amount) {
            return NextResponse.json(
                { error: 'Amount is required' },
                { status: 400 }
            );
        }

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Internal Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
