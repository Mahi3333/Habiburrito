'use client';

import { useState, useEffect } from 'react';

type StoreStatus = {
    isOpen: boolean;
    statusText: string;
    color: string;
    closeTime: string;
    openTime: string;
    reason: string;
    message: string;
};

export const useStoreStatus = () => {
    const [status, setStatus] = useState<StoreStatus>({
        isOpen: false,
        statusText: 'Loading...',
        color: 'text-gray-400',
        closeTime: '',
        openTime: '',
        reason: 'LOADING',
        message: ''
    });

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch('/api/store-status');
                if (res.ok) {
                    const data = await res.json();

                    let statusText = 'Closed';
                    let color = 'text-red-400';

                    if (data.isOpen) {
                        statusText = 'Open Now';
                        color = 'text-green-500';
                    } else if (data.reason === 'MANUAL_OVERRIDE') {
                        statusText = 'Paused';
                        color = 'text-red-500';
                    }

                    setStatus({
                        isOpen: data.isOpen,
                        statusText,
                        color,
                        closeTime: '', // TODO: Pass these from API if needed for advanced usage
                        openTime: data.nextOpenTime,
                        reason: data.reason,
                        message: data.message
                    });
                }
            } catch (error) {
                console.error('Failed to fetch store status', error);
            }
        };

        fetchStatus();
        const interval = setInterval(fetchStatus, 30000); // Check every 30s for faster updates
        return () => clearInterval(interval);
    }, []);

    return status;
};
