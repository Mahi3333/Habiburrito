'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
    const { items, removeItemFromCart, cartTotal } = useCart();

    const TAX_RATE = 0.08;
    const taxAmount = cartTotal * TAX_RATE;
    const finalTotal = cartTotal + taxAmount;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-brand-night flex flex-col text-brand-cream">
                <Header />
                <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
                    <h2 className="text-3xl font-display font-semibold text-white mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-400 mb-8 text-lg">Looks like you haven’t added any delicious burritos yet.</p>
                    <Link href="/build">
                        <Button variant="primary" className="text-lg px-8 py-3 bg-brand-gold text-brand-black">
                            Start Your Order
                        </Button>
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-night flex flex-col text-brand-cream">
            <Header />

            <main className="flex-grow max-w-5xl mx-auto w-full p-8">
                <h1 className="text-3xl font-display font-semibold text-white mb-8 border-b border-white/10 pb-4">
                    Your Order
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((item) => (
                            <div
                                key={item.uniqueId}
                                className="bg-white/5 p-6 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.25)] border border-white/10 flex flex-col md:flex-row justify-between gap-6"
                            >
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-800">
                                            BYO {item.base.name}
                                        </h3>
                                        <span className="font-bold text-brand-gold text-lg">
                                            ${item.totalPrice.toFixed(2)}
                                        </span>
                                    </div>

                                    <div className="text-sm text-gray-600 space-y-1">
                                        {item.protein && (
                                            <p><span className="font-semibold">Protein:</span> {item.protein.name}</p>
                                        )}

                                        {item.toppings.length > 0 && (
                                            <p><span className="font-semibold">Toppings:</span> {item.toppings.map(t => t.name).join(', ')}</p>
                                        )}

                                        {item.sauces.length > 0 && (
                                            <p><span className="font-semibold">Sauces:</span> {item.sauces.map(s => s.name).join(', ')}</p>
                                        )}

                                        {item.addons.length > 0 && (
                                            <p><span className="font-semibold">Add-ons:</span> {item.addons.map(a => a.name).join(', ')}</p>
                                        )}

                                        {item.extras.length > 0 && (
                                            <p><span className="font-semibold">Extras:</span> {item.extras.map(e => e.name).join(', ')}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between items-end gap-4 min-w-[120px]">
                                    {/* Quantity Placeholder - Logic can be added later */}
                                    <div className="flex items-center gap-2 border rounded-full px-3 py-1">
                                        <button className="text-gray-500 hover:text-brand-orange font-bold">-</button>
                                        <span className="text-sm font-semibold">1</span>
                                        <button className="text-gray-500 hover:text-brand-orange font-bold">+</button>
                                    </div>

                                    <button
                                        onClick={() => removeItemFromCart(item.uniqueId)}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>

                            <div className="space-y-3 text-gray-600 border-b border-gray-200 pb-4 mb-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (8%)</span>
                                    <span>${taxAmount.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-2xl font-bold text-brand-green mb-8">
                                <span>Total</span>
                                <span>${finalTotal.toFixed(2)}</span>
                            </div>

                            <Link href="/checkout">
                                <Button
                                    variant="primary"
                                    className="w-full py-4 text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                                >
                                    PROCEED TO CHECKOUT
                                </Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
