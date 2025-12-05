'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ModifierCard from '../../components/ModifierCard';
import CheckoutModal from '../../components/CheckoutModal';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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
    rice: ModifierOption | null;
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
        rice: null,
        protein: null,
        toppings: [],
        sauces: [],
        addons: [],
        extras: [],
    });
    const [warning, setWarning] = useState<string | null>(null);
    const [activeStep, setActiveStep] = useState(0);
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleAddToOrderClick = () => {
        setIsCheckoutModalOpen(true);
    };

    const handleCheckoutSubmit = async (userDetails: { name: string; phone: string; email: string }) => {
        setIsProcessing(true);
        try {
            const orderData = {
                items: [
                    {
                        name: `Custom ${selections.base?.name}`,
                        quantity: 1,
                        price: calculateTotal(),
                        details: selections
                    }
                ],
                total: calculateTotal(),
                user: userDetails
            };

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();

            if (response.ok && data.url) {
                // Redirect to Stripe Checkout
                window.location.href = data.url;
            } else {
                alert('Failed to create order. Please try again.');
                setIsProcessing(false);
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('An error occurred. Please try again.');
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        async function fetchMenu() {
            try {
                const res = await fetch('/api/build');
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

    const steps = [
        { id: 'base', title: 'The Vessel', subtitle: 'Choose your style' },
        { id: 'rice', title: 'The Base', subtitle: 'Rice & Greens' },
        { id: 'protein', title: 'The Core', subtitle: 'Select your protein' },
        { id: 'toppings', title: 'The Crunch', subtitle: 'Add fresh toppings' },
        { id: 'sauces', title: 'The Finish', subtitle: 'Drizzle with flavor' },
        { id: 'addons', title: 'Premium Adds', subtitle: 'Elevate your bowl' },
    ];

    useEffect(() => {
        if (warning) {
            const timer = setTimeout(() => setWarning(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [warning]);

    // Intersection Observer for scroll spy
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        const index = steps.findIndex(step => step.id === id);
                        if (index !== -1) {
                            setActiveStep(index);
                        }
                    }
                });
            },
            {
                rootMargin: '-20% 0px -50% 0px', // Trigger when element is in the middle of viewport
                threshold: 0.2
            }
        );

        steps.forEach((step) => {
            const element = document.getElementById(step.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [menuData]); // Re-run when menu data loads and DOM elements exist

    // Validation Helpers
    const isBaseSelected = !!selections.base;
    const isRiceSelected = !!selections.rice;
    const isProteinSelected = !!selections.protein;

    const handleBaseSelect = (item: BaseItem) => {
        setSelections((prev) => {
            if (prev.base?.id === item.id) {
                return { ...prev, base: null }; // Deselect
            }
            return { ...prev, base: item };
        });
        if (!selections.base) setActiveStep(1); // Auto-advance on first selection
    };

    const handleSingleSelect = (category: 'rice' | 'protein', option: ModifierOption) => {
        // Validation: Prevent selection if previous steps aren't met
        if (category === 'rice' && !isBaseSelected) {
            setWarning('Please select a Vessel first.');
            document.getElementById('base')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        if (category === 'protein' && !isRiceSelected) {
            setWarning('Please select a Base (Rice/Greens) first.');
            document.getElementById('rice')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setSelections((prev) => {
            if (prev[category]?.id === option.id) {
                return { ...prev, [category]: null }; // Deselect
            }
            return { ...prev, [category]: option };
        });

        // Auto-advance logic
        if (category === 'rice' && !selections.rice) setActiveStep(2);
        if (category === 'protein' && !selections.protein) setActiveStep(3);
    };

    const handleMultiSelect = (
        category: 'toppings' | 'sauces' | 'addons' | 'extras',
        option: ModifierOption,
        max: number
    ) => {
        // Validation: Prevent selection if protein isn't selected
        if (!isProteinSelected) {
            setWarning('Please select a Protein first.');
            document.getElementById('protein')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

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
        if (selections.rice?.price) total += selections.rice.price;

        selections.addons.forEach(item => total += item.price);
        selections.extras.forEach(item => total += item.price);
        selections.toppings.forEach(item => total += item.price);
        selections.sauces.forEach(item => total += item.price);

        return total;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-black text-brand-gold">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
            </div>
        );
    }

    if (!menuData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-black text-brand-ember">
                <p className="text-xl font-semibold">Unable to load menu.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-black text-brand-cream flex flex-col font-sans selection:bg-brand-gold selection:text-black">
            <Header />

            {/* Background Texture */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Image
                    src="/background_bowls_blur.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/90 to-brand-black" />
            </div>

            <main className="flex-grow pt-32 pb-20 relative z-10">
                <div className="container mx-auto px-6">

                    {/* Header Section */}
                    <div className="text-center mb-16 animate-fade-in-up">
                        <span className="text-brand-gold font-mono text-sm tracking-[0.3em] uppercase">The Architect</span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mt-4 mb-6">
                            BUILD YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">LEGEND</span>
                        </h1>
                        <p className="text-gray-400 max-w-xl mx-auto text-lg">
                            Craft a masterpiece layer by layer. Every ingredient is prepared fresh daily in our Halal kitchen.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">

                        {/* Left Column: Steps Navigation (Desktop) */}
                        <div className="hidden lg:block lg:col-span-2">
                            <div className="sticky top-32 space-y-8">
                                {steps.map((step, index) => (
                                    <div
                                        key={step.id}
                                        className={`pl-6 border-l-2 transition-all duration-300 cursor-pointer ${activeStep === index
                                            ? 'border-brand-gold text-white'
                                            : 'border-white/10 text-gray-500 hover:text-gray-300'
                                            }`}
                                        onClick={() => {
                                            setActiveStep(index);
                                            document.getElementById(step.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        }}
                                    >
                                        <h3 className={`font-display text-lg ${activeStep === index ? 'font-bold' : 'font-medium'}`}>{step.title}</h3>
                                        <p className="text-[10px] tracking-wider uppercase mt-1 opacity-70">{step.subtitle}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Middle Column: Builder Form */}
                        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-min">

                            {/* Base (Vessel) */}
                            <section id="base" className="scroll-mt-32 col-span-1">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-display text-white mb-1">01. The Vessel</h2>
                                    <p className="text-gray-400 text-sm">Start with a solid foundation.</p>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
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

                            {/* Rice & Base */}
                            <section id="rice" className={`scroll-mt-32 col-span-1 transition-opacity duration-300 ${!isBaseSelected ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                                <div className="mb-6">
                                    <h2 className="text-2xl font-display text-white mb-1">02. The Base</h2>
                                    <p className="text-gray-400 text-sm">Rice, greens, or chips.</p>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    {menuData.modifiers['Rice & Base']?.options.map((option) => (
                                        <ModifierCard
                                            key={option.id}
                                            name={option.name}
                                            price={option.price}
                                            selected={selections.rice?.id === option.id}
                                            disabled={!isBaseSelected}
                                            onSelect={() => handleSingleSelect('rice', option)}
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* Protein */}
                            <section id="protein" className={`scroll-mt-32 col-span-1 transition-opacity duration-300 ${!isRiceSelected ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                                <div className="mb-6">
                                    <h2 className="text-2xl font-display text-white mb-1">03. The Core</h2>
                                    <p className="text-gray-400 text-sm">Select your premium protein.</p>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    {menuData.modifiers['Protein']?.options.map((option) => (
                                        <ModifierCard
                                            key={option.id}
                                            name={option.name}
                                            price={option.price}
                                            selected={selections.protein?.id === option.id}
                                            disabled={!isRiceSelected}
                                            onSelect={() => handleSingleSelect('protein', option)}
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* Toppings */}
                            <section id="toppings" className={`scroll-mt-32 col-span-1 md:col-span-2 transition-opacity duration-300 ${!isProteinSelected ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                                <div className="mb-6 flex justify-between items-end">
                                    <div>
                                        <h2 className="text-2xl font-display text-white mb-1">04. The Crunch</h2>
                                        <p className="text-gray-400 text-sm">Fresh vegetables and salsas.</p>
                                    </div>
                                    <span className="text-[10px] text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded-full">
                                        Max {menuData.modifiers['Toppings']?.max_selection}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {menuData.modifiers['Toppings']?.options.map((option) => (
                                        <ModifierCard
                                            key={option.id}
                                            name={option.name}
                                            price={option.price}
                                            selected={selections.toppings.some((t) => t.id === option.id)}
                                            disabled={!isProteinSelected}
                                            onSelect={() => handleMultiSelect('toppings', option, menuData.modifiers['Toppings'].max_selection)}
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* Sauces */}
                            <section id="sauces" className={`scroll-mt-32 col-span-1 transition-opacity duration-300 ${!isProteinSelected ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                                <div className="mb-6 flex justify-between items-end">
                                    <div>
                                        <h2 className="text-2xl font-display text-white mb-1">05. The Finish</h2>
                                        <p className="text-gray-400 text-sm">House-made sauces.</p>
                                    </div>
                                    <span className="text-[10px] text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded-full">
                                        Max {menuData.modifiers['Sauces']?.max_selection}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    {menuData.modifiers['Sauces']?.options.map((option) => (
                                        <ModifierCard
                                            key={option.id}
                                            name={option.name}
                                            price={option.price}
                                            selected={selections.sauces.some((s) => s.id === option.id)}
                                            disabled={!isProteinSelected}
                                            onSelect={() => handleMultiSelect('sauces', option, menuData.modifiers['Sauces'].max_selection)}
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* Add-ons & Extras */}
                            <section id="addons" className={`scroll-mt-32 col-span-1 transition-opacity duration-300 ${!isProteinSelected ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                                <div className="mb-6">
                                    <h2 className="text-2xl font-display text-white mb-1">06. Premium Adds</h2>
                                    <p className="text-gray-400 text-sm">Take it to the next level.</p>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    {menuData.modifiers['Add-ons']?.options.map((option) => (
                                        <ModifierCard
                                            key={option.id}
                                            name={option.name}
                                            price={option.price}
                                            selected={selections.addons.some((a) => a.id === option.id)}
                                            disabled={!isProteinSelected}
                                            onSelect={() => handleMultiSelect('addons', option, menuData.modifiers['Add-ons'].max_selection)}
                                        />
                                    ))}
                                    {menuData.modifiers['Extras']?.options.map((option) => (
                                        <ModifierCard
                                            key={option.id}
                                            name={option.name}
                                            price={option.price}
                                            selected={selections.extras.some((e) => e.id === option.id)}
                                            disabled={!isProteinSelected}
                                            onSelect={() => handleMultiSelect('extras', option, menuData.modifiers['Extras'].max_selection)}
                                        />
                                    ))}
                                </div>
                            </section>

                        </div>

                        {/* Right Column: Sticky Summary */}
                        <div className="lg:col-span-3">
                            <div className="sticky top-32">
                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                                    <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                                        <h3 className="font-display text-2xl text-white">Your Bowl</h3>
                                        <span className="text-brand-gold font-mono text-2xl">${calculateTotal().toFixed(2)}</span>
                                    </div>

                                    <div className="space-y-4 mb-10 min-h-[200px]">
                                        {!selections.base && (
                                            <p className="text-gray-500 text-base italic text-center py-8">Start by choosing a Vessel...</p>
                                        )}

                                        {selections.base && (
                                            <div className="flex justify-between text-base animate-fade-in">
                                                <span className="text-white font-medium">{selections.base.name}</span>
                                                <span className="text-gray-400">{selections.base.base_price ? `$${selections.base.base_price}` : '-'}</span>
                                            </div>
                                        )}

                                        {selections.base && !selections.rice && (
                                            <div className="p-3 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-sm text-center animate-pulse">
                                                Next: Choose your Base (Rice/Greens)
                                            </div>
                                        )}

                                        {selections.rice && (
                                            <div className="flex justify-between text-base animate-fade-in">
                                                <span className="text-white font-medium">{selections.rice.name}</span>
                                                <span className="text-gray-400">-</span>
                                            </div>
                                        )}

                                        {selections.rice && !selections.protein && (
                                            <div className="p-3 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-sm text-center animate-pulse">
                                                Next: Select your Protein
                                            </div>
                                        )}
                                        {selections.protein && (
                                            <div className="flex justify-between text-base animate-fade-in">
                                                <span className="text-white font-medium">{selections.protein.name}</span>
                                                <span className="text-gray-400">+${selections.protein.price}</span>
                                            </div>
                                        )}

                                        {selections.protein && selections.toppings.length === 0 && (
                                            <div className="p-3 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-sm text-center animate-pulse">
                                                Next: Add some Crunch (Toppings)
                                            </div>
                                        )}

                                        {selections.toppings.map(t => (
                                            <div key={t.id} className="flex justify-between text-base animate-fade-in">
                                                <span className="text-gray-300">{t.name}</span>
                                                <span className="text-gray-500">-</span>
                                            </div>
                                        ))}

                                        {selections.toppings.length > 0 && selections.sauces.length === 0 && (
                                            <div className="p-3 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-sm text-center animate-pulse">
                                                Next: Drizzle with Flavor (Sauces)
                                            </div>
                                        )}
                                        {selections.sauces.map(s => (
                                            <div key={s.id} className="flex justify-between text-base animate-fade-in">
                                                <span className="text-gray-300">{s.name}</span>
                                                <span className="text-gray-500">-</span>
                                            </div>
                                        ))}
                                        {[...selections.addons, ...selections.extras].map(item => (
                                            <div key={item.id} className="flex justify-between text-base animate-fade-in">
                                                <span className="text-brand-gold">{item.name}</span>
                                                <span className="text-gray-400">+${item.price}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {warning && (
                                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm text-center">
                                            {warning}
                                        </div>
                                    )}

                                    <button
                                        className="w-full py-5 bg-brand-gold text-black font-bold text-lg uppercase tracking-widest rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-gold/20"
                                        disabled={!selections.base || !selections.rice || !selections.protein}
                                        onClick={handleAddToOrderClick}
                                    >
                                        Add to Order
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <CheckoutModal
                isOpen={isCheckoutModalOpen}
                onClose={() => setIsCheckoutModalOpen(false)}
                onSubmit={handleCheckoutSubmit}
                isLoading={isProcessing}
            />

            <Footer />
        </div>
    );
}
