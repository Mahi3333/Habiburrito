'use client';

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../../context/CartContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

// Initialize Stripe
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

if (!stripePublishableKey) {
    console.error("Stripe Publishable Key is missing. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in your .env file.");
}

interface CheckoutFormProps {
    name: string;
    email: string;
    phone: string;
    clientSecret: string;
    validateContactInfo: () => boolean;
}

function CheckoutForm({ name, email, phone, clientSecret, validateContactInfo }: CheckoutFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { items, cartTotal } = useCart();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate Contact Details using parent function
        if (!validateContactInfo()) {
            // Scroll to top to show the empty fields
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        try {
            // 1. Validate Form
            const { error: submitError } = await elements.submit();
            if (submitError) {
                setMessage(submitError.message || "Please check your details.");
                setIsLoading(false);
                return;
            }

            // 2. Extract PaymentIntent ID
            // clientSecret format: pi_3Q..._secret_...
            const paymentIntentId = clientSecret.split('_secret_')[0];

            // 3. Save Order to Database
            const saveOrderResponse = await fetch('/api/orders/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items,
                    user: { name, email, phone },
                    paymentIntentId,
                    totalAmount: cartTotal * 1.08, // Approx total with tax
                    taxAmount: cartTotal * 0.08
                }),
            });

            if (!saveOrderResponse.ok) {
                throw new Error('Failed to save order details. Please try again.');
            }

            // 4. Confirm Payment
            const { error } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: `${window.location.origin}/order-confirmation`,
                    receipt_email: email,
                    payment_method_data: {
                        billing_details: {
                            name: name,
                            email: email,
                            phone: phone,
                        },
                    },
                },
            });

            if (error) {
                if (error.type === "card_error" || error.type === "validation_error") {
                    setMessage(error.message || "An unexpected error occurred.");
                } else {
                    setMessage("An unexpected error occurred.");
                }
            }
        } catch (err) {
            console.error(err);
            setMessage(err instanceof Error ? err.message : "An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="border-t border-white/10 pt-6">
                <h3 className="text-xl font-display font-bold text-white mb-4">Payment Details</h3>
                <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            </div>

            {message && (
                <div id="payment-message" className="text-red-500 text-sm font-medium">
                    {message}
                </div>
            )}

            <Button
                variant="primary"
                className="w-full py-4 text-lg mt-6 bg-brand-gold text-brand-black font-display font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                disabled={isLoading || !stripe || !elements}
            >
                {isLoading ? "Processing..." : "Pay Now"}
            </Button>
        </form>
    );
}

export default function CheckoutPage() {
    const { cartTotal, items } = useCart();
    const [clientSecret, setClientSecret] = useState("");

    // Contact Details State (Lifted up)
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    // Validation State
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const validateContactInfo = () => {
        let isValid = true;
        const newErrors = { name: '', email: '', phone: '' };

        if (!name.trim()) {
            newErrors.name = 'Full Name is required.';
            isValid = false;
        }

        if (!email.trim()) {
            newErrors.email = 'Email Address is required.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
            isValid = false;
        }

        if (!phone.trim()) {
            newErrors.phone = 'Phone Number is required.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (field: 'name' | 'email' | 'phone', value: string) => {
        if (field === 'name') setName(value);
        if (field === 'email') setEmail(value);
        if (field === 'phone') setPhone(value);

        // Clear error when user types
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const TAX_RATE = 0.08;
    const taxAmount = cartTotal * TAX_RATE;
    const finalTotal = cartTotal + taxAmount;

    useEffect(() => {
        if (finalTotal > 0) {
            console.log("Fetching payment intent for amount:", finalTotal);
            // Create PaymentIntent as soon as the page loads
            fetch("/api/checkout/create-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: finalTotal }),
            })
                .then((res) => {
                    console.log("Response status:", res.status);
                    if (!res.ok) {
                        return res.json().then(err => { throw new Error(err.error || 'Network response was not ok') });
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log("Client secret received:", data.clientSecret ? "Yes" : "No");
                    setClientSecret(data.clientSecret);
                })
                .catch((err) => {
                    console.error("Error fetching payment intent:", err);
                });
        } else {
            console.log("Final total is 0 or invalid:", finalTotal);
        }
    }, [finalTotal]);

    const appearance = {
        theme: 'night' as const,
        variables: {
            colorPrimary: '#FFD700',
            colorBackground: '#1a1a1a',
            colorText: '#ffffff',
            colorDanger: '#df1b41',
            fontFamily: 'var(--font-outfit)',
            spacingUnit: '4px',
            borderRadius: '8px',
        },
    };

    const options = {
        clientSecret,
        appearance,
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-brand-night flex flex-col text-brand-cream">
                <Header />
                <main className="flex-grow flex items-center justify-center p-8">
                    <p className="text-xl text-gray-400">Your cart is empty.</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-night flex flex-col text-brand-cream">
            <Header />
            <main className="flex-grow max-w-3xl mx-auto w-full p-8 pt-32">
                <div className="bg-white/5 p-8 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md">
                    <h1 className="text-3xl font-display font-bold text-white mb-8 tracking-wide">Secure Checkout</h1>

                    <div className="mb-8 p-6 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex justify-between mb-3">
                            <span className="text-gray-400">Subtotal</span>
                            <span className="font-mono text-white">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                            <span className="text-gray-400">Tax</span>
                            <span className="font-mono text-white">${taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-display font-bold text-brand-gold mt-6 pt-6 border-t border-white/10">
                            <span>Total to Pay</span>
                            <span>${finalTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Contact Information - Visible even if Stripe is loading/missing */}
                    <div className="space-y-4 mb-8">
                        <h3 className="text-xl font-display font-bold text-white mb-4">Contact Information</h3>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                required
                                className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors ${errors.name ? 'border-red-500' : 'border-white/10'}`}
                                placeholder="John Doe"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                required
                                className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors ${errors.email ? 'border-red-500' : 'border-white/10'}`}
                                placeholder="john@example.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                required
                                className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors ${errors.phone ? 'border-red-500' : 'border-white/10'}`}
                                placeholder="(555) 123-4567"
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>
                    </div>

                    {clientSecret && stripePromise ? (
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm
                                name={name}
                                email={email}
                                phone={phone}
                                clientSecret={clientSecret}
                                validateContactInfo={validateContactInfo}
                            />
                        </Elements>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 gap-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
                            {!stripePromise && <p className="text-red-500">Payment system unavailable (Missing Key)</p>}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
