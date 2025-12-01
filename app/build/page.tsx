'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ModifierCard from '../../components/ModifierCard';
import Button from '../../components/Button';

interface ModifierOption {
    id: number;
    name: string;
    price: number;
    modifierId: number;
}

interface ModifierGroup {
    max_selection: number;
    options: ModifierOption[];
}

interface BaseItem {
    id: number;
    name: string;
    base_price: number | null;
}

interface MenuData {
    baseItems: BaseItem[];
    modifiers: Record<string, ModifierGroup>;
}

interface Selections {
    base: BaseItem | null;
    protein: ModifierOption | null;
    toppings: ModifierOption[];
    sauces: ModifierOption[];
    addons: ModifierOption[];
    extras: ModifierOption[];
}

export default function BuildPage() {
    const [menuData, setMenuData] = useState<MenuData | null>(null);
    const [loading, setLoading] = useState(true);
    const [selections, setSelections] = useState<Selections>({
        base: null,
        protein: null,
        toppings: [],
        sauces: [],
        addons: [],
        extras: [],
    });
    const [warning, setWarning] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMenu() {
            try {
                const res = await fetch('/api/menu');
                if (!res.ok) throw new Error('Failed to fetch menu');
                const data = await res.json();
                setMenuData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchMenu();
    }, []);

    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => setWarning(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [warning]);

    const handleBaseSelect = (item: BaseItem) => {
        setSelections((prev) => ({ ...prev, base: item }));
    };

    const handleProteinSelect = (option: ModifierOption) => {
        setSelections((prev) => ({ ...prev, protein: option }));
    };

    const handleMultiSelect = (
        category: 'toppings' | 'sauces' | 'addons' | 'extras',
        option: ModifierOption,
        max: number
    ) => {
        setSelections((prev) => {
            const current = prev[category];
            const isSelected = current.some((item) => item.id === option.id);

            if (isSelected) {
                return {
                    ...prev,
                    [category]: current.filter((item) => item.id !== option.id),
                };
            } else {
                if (current.length >= max) {
                    setWarning(`You can only select up to ${max} ${category}.`);
                    return prev;
                }
                return {
                    ...prev,
                    [category]: [...current, option],
                };
            }
        });
    };

    const calculateTotal = () => {
        let total = 0;
        if (selections.base?.base_price) total += selections.base.base_price;
        if (selections.protein?.price) total += selections.protein.price;

        selections.addons.forEach(item => total += item.price);
        selections.extras.forEach(item => total += item.price);

        // Toppings and Sauces are usually free, but if they had prices:
        selections.toppings.forEach(item => total += item.price);
        selections.sauces.forEach(item => total += item.price);

        return total;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light">
                <p className="text-xl font-semibold text-brand-green">Loading Menu...</p>
            </div>
        );
    }

    if (!menuData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light">
                <p className="text-xl font-semibold text-red-600">Error loading menu.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-light flex flex-col">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto w-full p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Main Builder Area */}
                <div className="lg:col-span-3 space-y-12">

                    {/* Base Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-brand-green mb-6 border-b-2 border-brand-orange pb-2">Base</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {menuData.baseItems.map((item) => (
                                <ModifierCard
                                    key={item.id}
                                    name={item.name}
                                    price={item.base_price || 0}
                                    selected={selections.base?.id === item.id}
                                    onSelect={() => handleBaseSelect(item)}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Protein Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-brand-green mb-6 border-b-2 border-brand-orange pb-2">Protein</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {menuData.modifiers['Protein']?.options.map((option) => (
                                <ModifierCard
                                    key={option.id}
                                    name={option.name}
                                    price={option.price}
                                    selected={selections.protein?.id === option.id}
                                    onSelect={() => handleProteinSelect(option)}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Toppings Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-brand-green mb-6 border-b-2 border-brand-orange pb-2">
                            Toppings <span className="text-sm font-normal text-gray-600">(Max {menuData.modifiers['Toppings']?.max_selection})</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {menuData.modifiers['Toppings']?.options.map((option) => (
                                <ModifierCard
                                    key={option.id}
                                    name={option.name}
                                    price={option.price}
                                    selected={selections.toppings.some((t) => t.id === option.id)}
                                    onSelect={() => handleMultiSelect('toppings', option, menuData.modifiers['Toppings'].max_selection)}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Sauces Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-brand-green mb-6 border-b-2 border-brand-orange pb-2">
                            Sauces <span className="text-sm font-normal text-gray-600">(Max {menuData.modifiers['Sauces']?.max_selection})</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {menuData.modifiers['Sauces']?.options.map((option) => (
                                <ModifierCard
                                    key={option.id}
                                    name={option.name}
                                    price={option.price}
                                    selected={selections.sauces.some((s) => s.id === option.id)}
                                    onSelect={() => handleMultiSelect('sauces', option, menuData.modifiers['Sauces'].max_selection)}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Add-ons Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-brand-green mb-6 border-b-2 border-brand-orange pb-2">
                            Add-ons <span className="text-sm font-normal text-gray-600">(Max {menuData.modifiers['Add-ons']?.max_selection})</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {menuData.modifiers['Add-ons']?.options.map((option) => (
                                <ModifierCard
                                    key={option.id}
                                    name={option.name}
                                    price={option.price}
                                    selected={selections.addons.some((a) => a.id === option.id)}
                                    onSelect={() => handleMultiSelect('addons', option, menuData.modifiers['Add-ons'].max_selection)}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Extras Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-brand-green mb-6 border-b-2 border-brand-orange pb-2">
                            Extras <span className="text-sm font-normal text-gray-600">(Max {menuData.modifiers['Extras']?.max_selection})</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {menuData.modifiers['Extras']?.options.map((option) => (
                                <ModifierCard
                                    key={option.id}
                                    name={option.name}
                                    price={option.price}
                                    selected={selections.extras.some((e) => e.id === option.id)}
                                    onSelect={() => handleMultiSelect('extras', option, menuData.modifiers['Extras'].max_selection)}
                                />
                            ))}
                        </div>
                    </section>

                </div>

                {/* Sticky Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Your Creation</h3>

                        <div className="space-y-2 mb-6 text-gray-600 text-sm">
                            {selections.base && <p>Base: <span className="font-semibold">{selections.base.name}</span></p>}
                            {selections.protein && <p>Protein: <span className="font-semibold">{selections.protein.name}</span></p>}
                            {selections.toppings.length > 0 && <p>Toppings: {selections.toppings.map(t => t.name).join(', ')}</p>}
                            {selections.sauces.length > 0 && <p>Sauces: {selections.sauces.map(s => s.name).join(', ')}</p>}
                            {selections.addons.length > 0 && <p>Add-ons: {selections.addons.map(a => a.name).join(', ')}</p>}
                            {selections.extras.length > 0 && <p>Extras: {selections.extras.map(e => e.name).join(', ')}</p>}
                        </div>

                        <div className="flex justify-between items-center text-2xl font-bold text-brand-green mb-6">
                            <span>Total:</span>
                            <span>${calculateTotal().toFixed(2)}</span>
                        </div>

                        {warning && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg">
                                {warning}
                            </div>
                        )}

                        <Button
                            variant="primary"
                            className="w-full py-3 text-lg"
                            onClick={() => alert('Order functionality coming soon!')}
                        >
                            Add to Order
                        </Button>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
