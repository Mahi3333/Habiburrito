'use client';

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../../context/CartContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/order-confirmation`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message || "An unexpected error occurred.");
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

            {message && (
                <div id="payment-message" className="text-red-500 text-sm font-medium">
                    {message}
                </div>
            )}

            <Button
                variant="primary"
                className="w-full py-3 text-lg mt-4"
            // disabled={isLoading || !stripe || !elements}
            >
                {isLoading ? "Processing..." : "Pay Now"}
            </Button>
        </form>
    );
}

export default function CheckoutPage() {
    const { cartTotal, items } = useCart();
    const [clientSecret, setClientSecret] = useState("");

    const TAX_RATE = 0.08;
    const taxAmount = cartTotal * TAX_RATE;
    const finalTotal = cartTotal + taxAmount;

    useEffect(() => {
        if (finalTotal > 0) {
            // Create PaymentIntent as soon as the page loads
            fetch("/api/checkout/create-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: finalTotal }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }
    }, [finalTotal]);

    const appearance = {
        theme: 'stripe' as const,
        variables: {
            colorPrimary: '#FF8C00',
        },
    };

    const options = {
        clientSecret,
        appearance,
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background-light flex flex-col">
                <Header />
                <main className="flex-grow flex items-center justify-center p-8">
                    <p className="text-xl text-gray-600">Your cart is empty.</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-light flex flex-col">
            <Header />
            <main className="flex-grow max-w-3xl mx-auto w-full p-8">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                    <h1 className="text-2xl font-bold text-brand-green mb-6">Secure Checkout</h1>

                    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Tax</span>
                            <span className="font-semibold">${taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-brand-green mt-4 pt-4 border-t border-gray-200">
                            <span>Total to Pay</span>
                            <span>${finalTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {clientSecret ? (
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    ) : (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
