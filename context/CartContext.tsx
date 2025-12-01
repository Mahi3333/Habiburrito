'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

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
    protein: ModifierOption | null;
    toppings: ModifierOption[];
    sauces: ModifierOption[];
    addons: ModifierOption[];
    extras: ModifierOption[];
    totalPrice: number;
}

interface CartContextType {
    items: CartItem[];
    addItemToCart: (item: CartItem) => void;
    removeItemFromCart: (uniqueId: string) => void;
    clearCart: () => void;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItemToCart = (item: CartItem) => {
        setItems((prev) => [...prev, item]);
    };

    const removeItemFromCart = (uniqueId: string) => {
        setItems((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

    return (
        <CartContext.Provider value={{ items, addItemToCart, removeItemFromCart, clearCart, cartTotal }}>
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
