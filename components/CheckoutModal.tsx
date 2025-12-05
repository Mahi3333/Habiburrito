'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (details: { name: string; phone: string; email: string }) => void;
    isLoading: boolean;
}

export default function CheckoutModal({ isOpen, onClose, onSubmit, isLoading }: CheckoutModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                    >
                        <div className="bg-brand-dark border border-white/10 p-8 rounded-2xl w-full max-w-md pointer-events-auto shadow-2xl relative overflow-hidden">
                            {/* Decorative Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                            <h2 className="text-3xl font-display font-bold text-white mb-2">Finalize Your Order</h2>
                            <p className="text-gray-400 mb-6 text-sm">Enter your details to receive order updates via SMS and Email.</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-brand-gold uppercase tracking-widest mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                        placeholder="e.g. Jane Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-brand-gold uppercase tracking-widest mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                        placeholder="e.g. (555) 123-4567"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-brand-gold uppercase tracking-widest mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                        placeholder="e.g. jane@example.com"
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-brand-gold text-black font-bold py-4 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            'Proceed to Payment'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
