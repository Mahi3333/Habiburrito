'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                className={`fixed w-full top-0 z-50 transition-all duration-500 ${isScrolled || mobileMenuOpen
                    ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl'
                    : 'bg-transparent py-8'
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
                    <nav className="hidden md:flex items-center gap-10">
                        {['MENU', 'OUR STORY'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase().replace(' ', '-')}`}
                                className="text-white/90 hover:text-brand-gold font-heading tracking-[0.2em] text-sm font-bold transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full"
                            >
                                {item}
                            </Link>
                        ))}

                        <Link
                            href="/order"
                            className="bg-brand-gold text-brand-black px-8 py-3 rounded-none font-heading font-bold tracking-widest hover:bg-white transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                        >
                            ORDER ONLINE
                        </Link>
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
            <div className={`fixed inset-0 bg-brand-black z-40 transition-transform duration-500 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    {['MENU', 'OUR STORY'].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase().replace(' ', '-')}`}
                            className="text-3xl text-white font-heading font-bold tracking-widest hover:text-brand-gold transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                    <Link
                        href="/order"
                        className="mt-8 bg-brand-gold text-brand-black px-10 py-4 text-xl font-heading font-bold tracking-widest"
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
