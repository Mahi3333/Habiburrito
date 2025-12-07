'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types
export interface ModifierOption {
    id: number;
    name: string;
    price: number;
    modifierId: number;
}

export interface BaseItem {
    id: number;
    name: string;
    base_price: number | null;
}

export interface CartItem {
    uniqueId: string; // To distinguish identical builds
    base: BaseItem;
    rice: ModifierOption | null;
    protein: ModifierOption | null;
    toppings: ModifierOption[];
    sauces: ModifierOption[];
    addons: ModifierOption[];
    extras: ModifierOption[];
    totalPrice: number;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItemToCart: (item: CartItem) => void;
    removeItemFromCart: (uniqueId: string) => void;
    updateItemQuantity: (uniqueId: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

import { useToast } from './ToastContext';

// ... (imports remain the same, just adding useToast)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const { showToast } = useToast();

    // Load from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('habiburrito-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart from localStorage', e);
            }
        }
    }, []);

    // Save to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem('habiburrito-cart', JSON.stringify(items));
    }, [items]);

    const addItemToCart = (item: CartItem) => {
        setItems((prev) => [...prev, { ...item, quantity: item.quantity || 1 }]);
        showToast(`Added ${item.base.name} to order`, 'success');
    };

    const removeItemFromCart = (uniqueId: string) => {
        setItems((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
    };

    const updateItemQuantity = (uniqueId: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((prev) => prev.map((item) =>
            item.uniqueId === uniqueId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartTotal = items.reduce((sum, item) => sum + (item.totalPrice * (item.quantity || 1)), 0);

    return (
        <CartContext.Provider value={{ items, addItemToCart, removeItemFromCart, updateItemQuantity, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
