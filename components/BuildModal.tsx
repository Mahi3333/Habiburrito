"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Check, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { MenuItem } from '../app/menu/MenuClient';

interface BuildModalProps {
    item: MenuItem;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (finalItem: any) => void;
}

export default function BuildModal({ item, isOpen, onClose, onAddToCart }: BuildModalProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [selections, setSelections] = useState<Record<string, number[]>>({}); // groupName -> array of optionIds
    const [quantity, setQuantity] = useState(1);

    // Filter out "Comments" or handle separately if needed. For now treating all as steps.
    const steps = useMemo(() => {
        if (!item.modifierGroups) return [];
        // Sort/prioritize steps? For now use order from DB
        return item.modifierGroups.filter(g => g.name !== 'Comments');
    }, [item]);

    // Reset when item opens
    useEffect(() => {
        if (isOpen) {
            setCurrentStepIndex(0);
            setSelections({});
            setQuantity(1);
        }
    }, [isOpen, item]);

    const currentStep = steps[currentStepIndex];
    const isDenseStep = currentStep ? currentStep.options.length > 8 : false;

    const handleOptionToggle = (optionId: number) => {
        if (!currentStep) return;

        setSelections(prev => {
            const currentSelected = prev[currentStep.name] || [];
            const isSelected = currentSelected.includes(optionId);

            let newSelected;
            if (isSelected) {
                newSelected = currentSelected.filter(id => id !== optionId);
            } else {
                // Check max constraint
                if (currentStep.max > 0 && currentSelected.length >= currentStep.max) {
                    // Start removing first selected if simple single select, or just block? 
                    // Best UX for "Pick 1" is replace. 
                    if (currentStep.max === 1) {
                        newSelected = [optionId];
                    } else {
                        return prev; // Block adding more
                    }
                } else {
                    newSelected = [...currentSelected, optionId];
                }
            }
            return { ...prev, [currentStep.name]: newSelected };
        });
    };

    const isStepValid = () => {
        if (!currentStep) return true;
        const currentSelected = selections[currentStep.name] || [];
        // If min > 0, need at least that many
        if (currentStep.required && currentSelected.length < (currentStep.min || 1)) {
            return false;
        }
        return true;
    };

    const calculateTotal = () => {
        let total = parseFloat(item.price.replace('$', ''));

        // Add modifier prices
        steps.forEach(step => {
            const selectedIds = selections[step.name] || [];
            selectedIds.forEach(id => {
                const opt = step.options.find(o => o.id === id);
                if (opt && opt.price) {
                    total += opt.price;
                }
            });
        });

        return total * quantity;
    };

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            // FINISH
            // Build the cart item payload
            // Map selections to simpler structure for cart context if needed or keeping rich
            const customization: Record<string, any[]> = {};
            steps.forEach(step => {
                const selectedIds = selections[step.name] || [];
                customization[step.name] = selectedIds.map(id => step.options.find(o => o.id === id)).filter(Boolean);
            });

            onAddToCart({
                ...item,
                customization,
                totalPrice: calculateTotal(),
                quantity
            });
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            >
                <div
                    onClick={onClose}
                    className="absolute inset-0 z-0"
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    className="bg-brand-black w-full max-w-4xl max-h-[95vh] md:max-h-[90vh] rounded-2xl md:rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/10 relative z-10"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-white text-white hover:text-black rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* Left: Image & Info */}
                    <div className="md:w-1/3 bg-brand-charcoal relative flex flex-col shrink-0">
                        <div className="relative h-32 md:h-48 lg:h-64 w-full">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal to-transparent" />
                        </div>
                        <div className="p-6 md:p-8 flex-grow">
                            <h2 className="text-3xl font-display font-bold text-white mb-2">{item.name}</h2>
                            <p className="text-brand-gold font-mono text-xl mb-4">${calculateTotal().toFixed(2)}</p>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>

                            {/* Summary of selections */}
                            <div className="mt-8 space-y-2">
                                <h4 className="text-xs uppercase tracking-widest text-white/50 border-b border-white/10 pb-2">Your Build</h4>
                                <div className="max-h-32 overflow-y-auto space-y-1 pr-2 scrollbar-thin">
                                    {steps.map(step => {
                                        const selected = selections[step.name] || [];
                                        if (selected.length === 0) return null;
                                        return (
                                            <div key={step.id}>
                                                <span className="text-brand-gold text-xs font-bold mr-2">{step.name}:</span>
                                                <span className="text-gray-300 text-xs">
                                                    {selected.map(id => step.options.find(o => o.id === id)?.name).join(', ')}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Steps */}
                    <div className="md:w-2/3 bg-brand-black flex flex-col flex-1 md:max-h-full">

                        {/* Progress Bar */}
                        <div className="h-1 bg-white/5 w-full">
                            <motion.div
                                className="h-full bg-brand-gold"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                            />
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 p-3 md:p-6 lg:p-10 overflow-y-auto md:overscroll-contain">
                            {currentStep ? (
                                <div className="space-y-3 md:space-y-6">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3 md:mb-4">
                                        <div>
                                            <h3 className="text-lg sm:text-2xl font-display font-bold text-white">
                                                {currentStep.name}
                                            </h3>
                                            <p className="text-gray-400 text-xs sm:text-sm mt-1">
                                                {currentStep.required ? `Select at least ${currentStep.min}` : 'Optional'}
                                                {currentStep.max > 0 ? ` (Max ${currentStep.max})` : ''}
                                            </p>
                                        </div>
                                        <div className="text-brand-gold font-mono text-xs sm:text-sm px-2 py-1 rounded-full border border-white/10 bg-white/5 self-start sm:self-auto shrink-0">
                                            {currentStepIndex + 1} / {steps.length}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                                        {currentStep.options.map(option => {
                                            const isSelected = (selections[currentStep.name] || []).includes(option.id);
                                            return (
                                                <button
                                                    key={option.id}
                                                    onClick={() => handleOptionToggle(option.id)}
                                                    className={`
                                                        p-2 sm:p-3 md:p-4 rounded-xl border text-left flex justify-between items-center transition-all group min-h-[48px] sm:min-h-[56px]
                                                        ${isSelected
                                                            ? 'bg-brand-gold text-black border-brand-gold shadow-[0_0_15px_rgba(198,168,124,0.3)]'
                                                            : 'bg-white/5 border-white/10 text-gray-300 hover:border-brand-gold/50 hover:bg-white/10'}
                                                    `}
                                                >
                                                    <div>
                                                        <span className="font-bold block text-xs sm:text-sm md:text-base">{option.name}</span>
                                                        {option.price > 0 && (
                                                            <span className={`text-[10px] sm:text-xs ${isSelected ? 'text-black/70' : 'text-brand-gold'}`}>+${option.price.toFixed(2)}</span>
                                                        )}
                                                    </div>
                                                    {isSelected && <Check size={18} />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full text-center p-8">
                                    <div>
                                        <h3 className="text-3xl font-display font-bold text-white mb-4">All Set!</h3>
                                        <p className="text-gray-400">Your custom creation is ready.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Actions */}
                        <div className="shrink-0 p-4 md:p-6 lg:p-8 border-t border-white/10 bg-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 md:gap-4">

                            {/* Quantity */}
                            <div className="flex items-center gap-3 bg-black rounded-full px-4 py-2 border border-white/10 self-center sm:self-auto">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-white hover:text-brand-gold w-8 h-8 flex items-center justify-center text-lg">-</button>
                                <span className="font-mono text-white w-6 text-center">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="text-white hover:text-brand-gold w-8 h-8 flex items-center justify-center text-lg">+</button>
                            </div>

                            <div className="flex gap-2 md:gap-3">
                                {currentStepIndex > 0 && (
                                    <button
                                        onClick={() => setCurrentStepIndex(prev => prev - 1)}
                                        className="px-4 md:px-6 py-3 rounded-full border border-white/20 text-white font-bold uppercase tracking-wider text-xs md:text-sm hover:bg-white hover:text-black transition-colors"
                                    >
                                        Back
                                    </button>
                                )}
                                <button
                                    onClick={handleNext}
                                    disabled={!isStepValid()}
                                    className={`
                                        flex-1 sm:flex-none px-6 md:px-8 py-3 rounded-full font-bold uppercase tracking-wider text-xs md:text-sm flex items-center justify-center gap-2 transition-all
                                        ${isStepValid()
                                            ? 'bg-brand-gold text-black hover:bg-white hover:scale-105 shadow-lg'
                                            : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
                                    `}
                                >
                                    {currentStepIndex === steps.length - 1 ? 'Add to Order' : 'Next'}
                                    {currentStepIndex < steps.length - 1 && <ChevronRight size={18} />}
                                </button>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
