'use client';

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { useCart } from '../../context/CartContext';
import { useStoreStatus } from '../../app/hooks/useStoreStatus';
import Header from '../../components/Header';
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
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const { items, cartTotal } = useCart();

    const TAX_RATE = 0.08;
    const finalTotal = cartTotal * (1 + TAX_RATE);

    // Step 1: Validate and Open Review
    const handleReview = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateContactInfo()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        if (!stripe || !elements) return;

        setIsLoading(true);
        // Trigger generic form validation (Card details etc)
        const { error: submitError } = await elements.submit();
        if (submitError) {
            setMessage(submitError.message || "Please check your details.");
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
        setIsReviewOpen(true);
    };

    // Step 2: Final Submission
    const handleFinalPayment = async () => {
        if (!stripe || !elements) return;
        setIsLoading(true);

        try {
            // Extract PaymentIntent ID
            const paymentIntentId = clientSecret.split('_secret_')[0];

            // Save Order to Database
            const saveOrderResponse = await fetch('/api/orders/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items,
                    user: { name, email, phone },
                    paymentIntentId,
                    totalAmount: finalTotal,
                    taxAmount: cartTotal * TAX_RATE
                }),
            });

            if (!saveOrderResponse.ok) {
                throw new Error('Failed to save order details. Please try again.');
            }

            // Confirm Payment
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
        setIsReviewOpen(false); // Close modal on error/completion
    };

    return (
        <>
            <form id="payment-form" onSubmit={handleReview} className="space-y-4">
                <div className="border-t border-black/10 pt-5">
                    <h3 className="text-xl font-display font-bold text-brand-black mb-3">Payment Details</h3>
                    <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
                </div>

                {message && (
                    <div id="payment-message" className="text-red-600 text-sm font-medium">
                        {message}
                    </div>
                )}

                <Button
                    variant="primary"
                    className="w-full py-3 text-base mt-4 bg-brand-gold text-brand-black font-display font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
                    disabled={isLoading || !stripe || !elements}
                >
                    {isLoading ? "Validating..." : "Review Order"}
                </Button>
            </form>

            {/* Review Modal */}
            {isReviewOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-black/10 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-display font-bold text-brand-black mb-4 border-b border-black/10 pb-2">
                            Confirm Order
                        </h3>

                        <div className="space-y-4 mb-6 text-sm">
                            <div className="bg-brand-cream/50 p-4 rounded-xl space-y-2">
                                <p><span className="font-bold">Name:</span> {name}</p>
                                <p><span className="font-bold">Email:</span> {email}</p>
                                <p><span className="font-bold">Phone:</span> {phone}</p>
                            </div>

                            <div className="space-y-2">
                                <p className="font-bold text-base border-b border-black/5 pb-1">Order Summary</p>
                                {items.map(i => (
                                    <div key={i.uniqueId} className="flex justify-between text-black/70">
                                        <span>{i.quantity || 1}x {i.base.name}</span>
                                        <span>${(i.totalPrice * (i.quantity || 1)).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center text-xl font-bold border-t border-black/10 pt-3 mt-2">
                                <span>Total to Pay:</span>
                                <span>${finalTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsReviewOpen(false)}
                                className="flex-1 py-3 rounded-full border border-black/10 font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleFinalPayment}
                                disabled={isLoading}
                                className="flex-1 py-3 rounded-full bg-brand-gold text-brand-black font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors disabled:opacity-50"
                            >
                                {isLoading ? "Processing..." : "Confirm & Pay"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default function CheckoutPage() {
    const { cartTotal, items, removeItemFromCart, updateItemQuantity } = useCart();
    const { isOpen, reason, message } = useStoreStatus();
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
        theme: 'stripe' as const,
        variables: {
            colorPrimary: '#000000',
            colorBackground: '#FFFFFF',
            colorText: '#000000',
            colorDanger: '#B91C1C',
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
            <div className="min-h-screen bg-white flex flex-col text-brand-black overflow-y-auto md:overflow-hidden">
                <Header />
                <main className="flex-grow flex items-center justify-center p-8 pt-28 md:pt-32">
                    <p className="text-xl text-brand-black/70">Your cart is empty.</p>
                </main>
            </div>
        );
    }

    if (!isOpen && reason !== 'LOADING') {
        return (
            <div className="min-h-screen bg-white flex flex-col text-brand-black overflow-y-auto md:overflow-hidden">
                <Header />
                <main className="flex-grow flex flex-col items-center justify-center p-8 text-center pt-28 md:pt-32">
                    <div className="mb-6 p-6 bg-red-100 border border-red-300 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                    </div>
                    <h1 className="text-3xl font-bold font-display text-brand-black mb-4">Checkout is Closed</h1>
                    <p className="text-brand-black/70 max-w-md mb-8">{message || 'We are currently not accepting orders. Please check back later.'}</p>
                    <a href="/menu" className="bg-brand-gold text-brand-black px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
                        Back to Menu
                    </a>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col text-brand-black overflow-y-auto md:overflow-hidden">
            <Header />
            <main className="flex-1 w-full px-6 pt-28 pb-6 md:pt-32 md:overflow-hidden md:h-screen">
                <div className="mx-auto h-full max-w-6xl">
                    <div className="grid h-full grid-cols-1 md:grid-cols-2 gap-6">
                        <section className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm flex flex-col md:h-full">
                            <h1 className="text-3xl font-display font-bold text-brand-black mb-6 tracking-wide">Secure Checkout</h1>
                            <div className="mb-6 p-5 bg-brand-cream/40 rounded-xl border border-black/10">
                                <div className="flex justify-between mb-3">
                                    <span className="text-brand-black/70">Subtotal</span>
                                    <span className="font-mono text-brand-black">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-3">
                                    <span className="text-brand-black/70">Tax</span>
                                    <span className="font-mono text-brand-black">${taxAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-display font-bold text-brand-black mt-5 pt-5 border-t border-black/10">
                                    <span>Total to Pay</span>
                                    <span>${finalTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="border-t border-black/10 pt-4 md:flex-1 md:min-h-0">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-display font-bold text-brand-black">Your Items</h3>
                                    <span className="text-xs uppercase tracking-widest text-brand-black/50">{items.length} items</span>
                                </div>
                                <div className="mt-3 space-y-3 md:h-full md:overflow-y-auto pr-2">
                                    {items.map((item) => (
                                        <div
                                            key={item.uniqueId}
                                            className="border border-black/10 rounded-xl p-3 bg-brand-cream/40"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <p className="font-semibold text-brand-black">{item.base.name}</p>
                                                    {item.customization ? (
                                                        <div className="text-xs text-brand-black/70 space-y-1 mt-1">
                                                            {Object.entries(item.customization).map(([label, options]) => {
                                                                if (!options || options.length === 0) return null;
                                                                return (
                                                                    <p key={label}>
                                                                        <span className="font-semibold text-brand-black/60">{label}:</span>{' '}
                                                                        {options.map(o => o.name).join(', ')}
                                                                    </p>
                                                                );
                                                            })}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <span className="font-mono text-brand-black">
                                                    ${(item.totalPrice * (item.quantity || 1)).toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="mt-3 flex items-center justify-between">
                                                <div className="flex items-center gap-2 border border-black/10 rounded-full px-2 py-1">
                                                    <button
                                                        onClick={() => updateItemQuantity(item.uniqueId, (item.quantity || 1) - 1)}
                                                        className="text-brand-black/70 hover:text-brand-black font-bold disabled:opacity-50"
                                                        disabled={(item.quantity || 1) <= 1}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-sm font-semibold text-brand-black w-4 text-center">
                                                        {item.quantity || 1}
                                                    </span>
                                                    <button
                                                        onClick={() => updateItemQuantity(item.uniqueId, (item.quantity || 1) + 1)}
                                                        className="text-brand-black/70 hover:text-brand-black font-bold"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeItemFromCart(item.uniqueId)}
                                                    className="text-xs uppercase tracking-widest text-red-600 hover:text-red-700 font-semibold"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm flex flex-col md:h-full">
                            <div className="space-y-4">
                                <h3 className="text-xl font-display font-bold text-brand-black">Contact Information</h3>

                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-brand-black/70 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        required
                                        className={`w-full bg-white border rounded-lg px-4 py-3 text-brand-black placeholder-black/40 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors ${errors.name ? 'border-red-500' : 'border-black/10'}`}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-brand-black/70 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        required
                                        className={`w-full bg-white border rounded-lg px-4 py-3 text-brand-black placeholder-black/40 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors ${errors.email ? 'border-red-500' : 'border-black/10'}`}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-brand-black/70 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        required
                                        className={`w-full bg-white border rounded-lg px-4 py-3 text-brand-black placeholder-black/40 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors ${errors.phone ? 'border-red-500' : 'border-black/10'}`}
                                        placeholder="(555) 123-4567"
                                    />
                                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                                </div>
                            </div>

                            <div className="mt-5">
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
                                    <div className="flex flex-col items-center justify-center py-8 gap-3">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
                                        {!stripePromise && <p className="text-red-600 text-sm">Payment system unavailable (Missing Key)</p>}
                                    </div>
                                )}
                            </div>

                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}

