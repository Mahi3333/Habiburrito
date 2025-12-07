'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
    const { items, removeItemFromCart, updateItemQuantity, cartTotal } = useCart();

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
                                        <h3 className="text-xl font-bold text-white">
                                            {item.base.name}
                                        </h3>
                                        <span className="font-bold text-brand-gold text-lg">
                                            ${(item.totalPrice * (item.quantity || 1)).toFixed(2)}
                                        </span>
                                    </div>

                                    <div className="text-sm text-gray-300 space-y-1">
                                        {item.rice && (
                                            <p><span className="font-semibold text-brand-gold/80">Base:</span> {item.rice.name}</p>
                                        )}

                                        {item.protein && (
                                            <p><span className="font-semibold text-brand-gold/80">Protein:</span> {item.protein.name}</p>
                                        )}

                                        {item.toppings.length > 0 && (
                                            <p><span className="font-semibold text-brand-gold/80">Toppings:</span> {item.toppings.map(t => t.name).join(', ')}</p>
                                        )}

                                        {item.sauces.length > 0 && (
                                            <p><span className="font-semibold text-brand-gold/80">Sauces:</span> {item.sauces.map(s => s.name).join(', ')}</p>
                                        )}

                                        {item.addons.length > 0 && (
                                            <p><span className="font-semibold text-brand-gold/80">Add-ons:</span> {item.addons.map(a => a.name).join(', ')}</p>
                                        )}

                                        {item.extras.length > 0 && (
                                            <p><span className="font-semibold text-brand-gold/80">Extras:</span> {item.extras.map(e => e.name).join(', ')}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between items-end gap-4 min-w-[120px]">
                                    {/* Quantity Placeholder - Logic can be added later */}
                                    <div className="flex items-center gap-2 border border-white/20 rounded-full px-3 py-1">
                                        <button
                                            onClick={() => updateItemQuantity(item.uniqueId, (item.quantity || 1) - 1)}
                                            className="text-gray-400 hover:text-brand-gold font-bold disabled:opacity-50"
                                            disabled={(item.quantity || 1) <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="text-sm font-semibold text-white w-4 text-center">{item.quantity || 1}</span>
                                        <button
                                            onClick={() => updateItemQuantity(item.uniqueId, (item.quantity || 1) + 1)}
                                            className="text-gray-400 hover:text-brand-gold font-bold"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeItemFromCart(item.uniqueId)}
                                        className="text-red-400 hover:text-red-300 text-sm font-medium underline transition-colors"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 p-8 rounded-2xl shadow-2xl border border-white/10 sticky top-32 backdrop-blur-md">
                            <h3 className="text-2xl font-display font-bold text-white mb-8 tracking-wide">Order Summary</h3>

                            <div className="space-y-4 text-gray-300 border-b border-white/10 pb-6 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="font-light">Subtotal</span>
                                    <span className="font-mono">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-light">Tax (8%)</span>
                                    <span className="font-mono">${taxAmount.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-2xl font-display font-bold text-brand-gold mb-8">
                                <span>Total</span>
                                <span>${finalTotal.toFixed(2)}</span>
                            </div>

                            <Link href="/checkout">
                                <button
                                    className="w-full py-4 rounded-full bg-brand-gold text-brand-black font-display font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:scale-105 hover:bg-white transition-all duration-300"
                                >
                                    Proceed to Checkout
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
