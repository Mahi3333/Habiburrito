'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function OrderConfirmationPage() {
    const { clearCart } = useCart();

    useEffect(() => {
        // Clear the cart on successful order
        console.log("Order Confirmation mounted. Clearing cart...");
        clearCart();
        // Force clear localStorage just in case
        localStorage.removeItem('habiburrito-cart');
    }, [clearCart]);

    return (
        <div className="min-h-screen bg-brand-night flex flex-col text-brand-cream">
            <Header />
            <main className="flex-grow flex items-center justify-center p-8 pt-32">
                <div className="max-w-2xl w-full bg-white/5 p-12 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md text-center">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>

                    <h1 className="text-4xl font-display font-bold text-white mb-4">Order Confirmed!</h1>
                    <p className="text-xl text-gray-300 mb-8">
                        Thank you for your order. We've received it and will start preparing your meal shortly.
                    </p>

                    <div className="p-6 bg-white/5 rounded-xl border border-white/10 mb-8">
                        <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">What happens next?</p>
                        <p className="text-white">You will receive an email confirmation with your receipt.</p>
                    </div>

                    <Link href="/menu">
                        <button className="px-8 py-4 bg-brand-gold text-brand-black font-display font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-lg">
                            Order More
                        </button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
