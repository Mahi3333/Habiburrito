import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { z } from 'zod';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
    // apiVersion: '2025-11-17.clover', // Use default
});

const intentSchema = z.object({
    amount: z.number().positive("Amount must be positive")
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const result = intentSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: 'Invalid Amount', details: result.error.issues },
                { status: 400 }
            );
        }

        const { amount } = result.data;

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
        console.error('Internal Error in create-intent:', error);
        return NextResponse.json(
            { error: `Internal Server Error: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        );
    }
}
