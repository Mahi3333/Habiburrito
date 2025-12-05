'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [peekOpen, setPeekOpen] = useState(false);
    const { items, cartTotal } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled || mobileMenuOpen ? 'bg-black/90 backdrop-blur-lg py-3 border-b border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]' : 'bg-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="flex items-center group z-50">
                        <div className="relative h-12 w-40 md:h-16 md:w-48 transition-transform duration-500 group-hover:scale-105">
                            <Image
                                src="/logo.jpg"
                                alt="Habiburrito Logo"
                                fill
                                className="object-contain object-left drop-shadow-xl"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 lg:gap-10">
                        {[{ label: 'MENU', href: '/menu' }, { label: 'LOCATIONS', href: '/locations' }, { label: 'RESERVATIONS', href: '/our-story#reserve' }, { label: 'LOYALTY', href: '/our-story#loyalty' }, { label: 'OUR STORY', href: '/our-story' }].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-white/90 hover:text-brand-gold font-heading tracking-[0.18em] text-xs lg:text-sm font-bold transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[1px] after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <Link
                            href="/order"
                            className="bg-gradient-to-r from-brand-gold via-brand-ember to-brand-gold text-brand-black px-6 py-3 rounded-full font-heading font-bold tracking-widest hover:shadow-[0_10px_40px_rgba(212,175,55,0.45)] transition-all duration-300 transform hover:-translate-y-1"
                        >
                            ORDER ONLINE
                        </Link>
                        <button
                            onClick={() => setPeekOpen(!peekOpen)}
                            className="relative px-4 py-3 rounded-full border border-white/10 text-white/90 hover:text-brand-gold hover:border-brand-gold/40 transition-all duration-300"
                        >
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-brand-jade animate-pulse" aria-hidden />
                                <span className="font-heading tracking-[0.2em] text-xs">CART</span>
                                <span className="text-brand-gold font-mono text-sm">${cartTotal.toFixed(2)}</span>
                            </div>
                            {peekOpen && (
                                <div className="absolute right-0 mt-3 w-64 bg-brand-dark-gray/95 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl text-left">
                                    <p className="text-sm text-gray-300 mb-2">{items.length ? 'Ready for checkout' : 'Your cart is pristine.'}</p>
                                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                        {items.length ? items.map((item) => (
                                            <div key={item.uniqueId} className="text-xs text-gray-300 border-b border-white/5 pb-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-semibold text-brand-cream">{item.base.name}</span>
                                                    <span className="text-brand-gold font-mono">${item.totalPrice.toFixed(2)}</span>
                                                </div>
                                                {item.protein && <p className="text-[11px] text-gray-400">{item.protein.name}</p>}
                                            </div>
                                        )) : (
                                            <div className="text-xs text-gray-400">Add a bowl or burrito to preview here.</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white z-50 p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <div className="w-8 h-6 flex flex-col justify-between">
                            <span className={`w-full h-0.5 bg-brand-gold transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                            <span className={`w-full h-0.5 bg-brand-gold transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`w-full h-0.5 bg-brand-gold transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                        </div>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-brand-black/95 backdrop-blur-xl z-40 transition-transform duration-500 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col items-center justify-center h-full gap-10 px-8 text-center">
                    {[{ label: 'MENU', href: '/menu' }, { label: 'LOCATIONS', href: '/locations' }, { label: 'RESERVATIONS', href: '/our-story#reserve' }, { label: 'LOYALTY', href: '/our-story#loyalty' }, { label: 'OUR STORY', href: '/our-story' }].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-3xl text-white font-heading font-bold tracking-[0.3em] hover:text-brand-gold transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="text-gray-400 text-sm">Cart total: ${cartTotal.toFixed(2)}</div>
                    <Link
                        href="/order"
                        className="mt-4 bg-gradient-to-r from-brand-gold via-brand-ember to-brand-gold text-brand-black px-10 py-4 text-xl font-heading font-bold tracking-widest rounded-full"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        ORDER ONLINE
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Header;
