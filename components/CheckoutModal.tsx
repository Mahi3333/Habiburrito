'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

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

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const modalVariants = {
        hidden: {
            opacity: 0,
            y: isMobile ? '100%' : 20,
            scale: isMobile ? 1 : 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: 'spring' as const, damping: 25, stiffness: 300 }
        },
        exit: {
            opacity: 0,
            y: isMobile ? '100%' : 20,
            scale: isMobile ? 1 : 0.95
        }
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
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
                    />

                    {/* Modal / Bottom Sheet */}
                    <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center pointer-events-none p-0 md:p-4">
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="w-full md:max-w-md bg-brand-dark border-t md:border border-white/10 rounded-t-3xl md:rounded-2xl pointer-events-auto shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            {/* Decorative Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                            {/* Mobile Drag Handle */}
                            <div className="md:hidden w-full flex justify-center pt-3 pb-1">
                                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
                            </div>

                            {/* Close Button (Mobile & Desktop) */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-10"
                            >
                                <X size={24} />
                            </button>

                            <div className="p-6 md:p-8 overflow-y-auto">
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">Finalize Your Order</h2>
                                <p className="text-gray-400 mb-8 text-sm leading-relaxed">Enter your details to receive order updates via SMS and Email.</p>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold text-brand-gold uppercase tracking-widest mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-gold focus:bg-white/10 transition-all text-base"
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
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-gold focus:bg-white/10 transition-all text-base"
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
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-gold focus:bg-white/10 transition-all text-base"
                                            placeholder="e.g. jane@example.com"
                                        />
                                    </div>

                                    <div className="pt-6">
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-brand-gold text-black font-bold py-4 rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-lg shadow-lg shadow-brand-gold/20"
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
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
