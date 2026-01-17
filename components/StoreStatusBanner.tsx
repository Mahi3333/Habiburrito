'use client';

import React from 'react';
import { useStoreStatus } from '../app/hooks/useStoreStatus';
import { AnimatePresence, motion } from 'framer-motion';

export const StoreStatusBanner = () => {
    const { isOpen, message, reason } = useStoreStatus();

    // Don't show banner if open, or if it's just a normal closed schedule (usually too intrusive)
    // Only show for MANUAL_OVERRIDE or if explicitly desired.
    // Let's show it if it's a Manual Override to alert users immediately.

    if (isOpen || reason !== 'MANUAL_OVERRIDE') return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-red-600 text-white text-center px-6 py-5 md:py-6 text-lg md:text-xl font-bold z-[60] relative shadow-2xl"
            >
                <div className="container mx-auto flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    <span>{message || 'We are currently not accepting online orders.'}</span>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
