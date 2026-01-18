'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoreStatus } from '../app/hooks/useStoreStatus';
import Link from 'next/link';

export default function StoreClosedModal() {
    const { isOpen, openTime: nextOpenTime, message } = useStoreStatus();
    const pathname = usePathname();
    const [showModal, setShowModal] = useState(false);
    const [hasSeenModal, setHasSeenModal] = useState(false);

    // List of pages where the modal should aggressively appear
    const restrictedPages = ['/menu', '/cart', '/checkout', '/order'];

    useEffect(() => {
        // If store is open, never show modal
        if (isOpen) {
            setShowModal(false);
            return;
        }

        // If store is closed
        // Check if we are on a restricted page
        const isRestrictedPage = restrictedPages.some(page => pathname.startsWith(page));

        if (isRestrictedPage) {
            // If user hasn't dismissed it for this session/navigation, show it
            // Or show it every time they land on a restricted page from a non-restricted one?
            // "whenever user tried to navigate to different pages" -> Let's show it on mount of these pages if not dismissed recently?
            // Simpler: Show it. If they dismiss, maybe keep it dismissed for a bit? 
            // For now, let's show it whenever they enter these pages, but allow dismiss.
            // To prevent component re-mounting loop, we use local state or session storage.
            // Let's just use local state `showModal` which naturally resets on page reload, 
            // but `layout` persists. So we need to detect path change.

            setShowModal(true);
        }
    }, [pathname, isOpen]); // Re-run when path changes or status changes

    const handleDismiss = () => {
        setShowModal(false);
    };

    return (
        <AnimatePresence>
            {showModal && !isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
                        onClick={handleDismiss}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-md"
                    >
                        <div className="bg-brand-black border border-brand-gold/30 p-8 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden text-center">

                            {/* Decorative Top Line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

                            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mx-auto mb-6 border border-red-500/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                            </div>

                            <h3 className="text-2xl font-display font-bold text-white mb-2 uppercase tracking-wide">
                                Store Currently Closed
                            </h3>

                            <div className="mb-6 space-y-2">
                                <p className="text-gray-300">
                                    {message || 'We are not accepting orders at this time.'}
                                </p>
                                {nextOpenTime && (
                                    <p className="text-brand-gold font-mono text-sm uppercase tracking-wider">
                                        Opens at: {nextOpenTime}
                                    </p>
                                )}
                            </div>

                            <div className="p-4 bg-white/5 rounded-lg border border-white/10 mb-6 text-sm text-gray-300">
                                <p>You can still <span className="text-white font-bold">browse the menu</span> and build your perfect bowl, but checkout is disabled until we reopen.</p>
                            </div>

                            <div className="flex gap-3">
                                <Link href="/" className="flex-1">
                                    <button
                                        onClick={handleDismiss}
                                        className="w-full py-3 rounded-lg border border-white/20 text-white font-bold uppercase tracking-wider text-xs hover:border-brand-gold hover:text-brand-gold transition-colors"
                                    >
                                        Return Home
                                    </button>
                                </Link>
                                <button
                                    onClick={handleDismiss}
                                    className="flex-1 py-3 rounded-lg bg-brand-gold text-brand-black font-bold uppercase tracking-wider text-xs hover:bg-white transition-colors"
                                >
                                    I'm Just Browsing
                                </button>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
