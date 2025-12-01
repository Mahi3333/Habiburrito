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
            <div className="min-h-screen flex items-center justify-center bg-brand-night text-brand-gold">
                <p className="text-xl font-semibold">Loading menu...</p>
            </div>
        );
    }

    if (!menuData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-night text-brand-ember">
                <p className="text-xl font-semibold">Error loading menu.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-night text-brand-cream flex flex-col">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-10 space-y-10">
                <div className="bg-gradient-to-r from-brand-dark-gray via-black to-brand-dark-gray border border-white/10 rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(11,175,135,0.35),transparent_30%),radial-gradient(circle_at_80%_0,rgba(212,175,55,0.3),transparent_28%)]"></div>
                    <div className="relative z-10 flex flex-wrap gap-6 items-center justify-between">
                        <div className="space-y-3">
                            <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">Builder · Bespoke Rituals</p>
                            <h1 className="text-4xl md:text-5xl font-display text-white leading-tight">Compose your bowl with tactile controls</h1>
                            <p className="text-gray-300 max-w-2xl">Parallax hover on proteins, motion-scaled transitions, and chef badges that respond as you layer flavor.</p>
                        </div>
                        <div className="flex gap-3">
                            {["Halal Certified", "Charcoal-fired", "Chef’s Notes"].map((label) => (
                                <span key={label} className="px-4 py-2 rounded-full border border-white/10 text-xs uppercase tracking-[0.2em] text-gray-200 bg-white/5">
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Builder Area */}
                    <div className="lg:col-span-3 space-y-10">
                        {/* Base Section */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-display text-white">Base</h2>
                                <span className="text-xs text-brand-gold tracking-[0.2em]">Choose your vessel</span>
                            </div>
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
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-display text-white">Protein</h2>
                                <span className="text-xs text-brand-jade tracking-[0.2em]">Ember-kissed picks</span>
                            </div>
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
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-display text-white">Toppings</h2>
                                <span className="text-xs text-gray-400">Max {menuData.modifiers['Toppings']?.max_selection}</span>
                            </div>
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
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-display text-white">Sauces</h2>
                            <span className="text-xs text-gray-400">Max {menuData.modifiers['Sauces']?.max_selection}</span>
                            </div>
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
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-display text-white">Add-ons</h2>
                                <span className="text-xs text-gray-400">Max {menuData.modifiers['Add-ons']?.max_selection}</span>
                            </div>
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
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-display text-white">Extras</h2>
                                <span className="text-xs text-gray-400">Max {menuData.modifiers['Extras']?.max_selection}</span>
                            </div>
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
                        <div className="sticky top-8 bg-white/5 border border-white/10 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                            <h3 className="text-xl font-display text-white mb-4">Your Creation</h3>

                            <div className="space-y-2 mb-6 text-gray-300 text-sm">
                                {selections.base && <p>Base: <span className="font-semibold text-brand-gold">{selections.base.name}</span></p>}
                                {selections.protein && <p>Protein: <span className="font-semibold text-brand-gold">{selections.protein.name}</span></p>}
                                {selections.toppings.length > 0 && <p>Toppings: {selections.toppings.map(t => t.name).join(', ')}</p>}
                                {selections.sauces.length > 0 && <p>Sauces: {selections.sauces.map(s => s.name).join(', ')}</p>}
                                {selections.addons.length > 0 && <p>Add-ons: {selections.addons.map(a => a.name).join(', ')}</p>}
                                {selections.extras.length > 0 && <p>Extras: {selections.extras.map(e => e.name).join(', ')}</p>}
                            </div>

                            <div className="flex justify-between items-center text-2xl font-bold text-brand-gold mb-6">
                                <span>Total:</span>
                                <span>${calculateTotal().toFixed(2)}</span>
                            </div>

                            {warning && (
                                <div className="mb-4 p-3 bg-brand-ember/20 text-brand-ember text-sm rounded-lg border border-brand-ember/50">
                                    {warning}
                                </div>
                            )}

                            <Button
                                variant="primary"
                                className="w-full py-3 text-lg bg-brand-gold text-brand-black hover:shadow-[0_20px_60px_rgba(212,175,55,0.4)]"
                                onClick={() => alert('Order functionality coming soon!')}
                            >
                                Add to Order
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
