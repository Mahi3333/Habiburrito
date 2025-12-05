'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrolled = window.scrollY;
        scrollRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-brand-black flex flex-col font-sans selection:bg-brand-gold selection:text-black overflow-x-hidden">
      <Header />

      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          {/* Parallax Background */}
          <div ref={scrollRef} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1a1a1a_0%,_#000000_100%)]"></div>
            {/* Abstract Shapes */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px]"></div>
          </div>

          {/* Texture Overlay */}
          <div className="absolute inset-0 z-[1] opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center justify-center h-full pt-20">
            <div className="space-y-10 animate-fade-in-up max-w-6xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-2 border border-brand-gold/20 bg-white/5 backdrop-blur-md rounded-full mb-8 hover:bg-white/10 transition-colors cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse"></span>
                <span className="text-brand-gold font-heading tracking-[0.3em] text-xs font-bold uppercase">The Gold Standard of Halal</span>
              </div>

              {/* Main Title */}
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-heading font-bold text-white leading-[0.85] tracking-tighter mix-blend-difference">
                ELEVATE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold italic pr-4">YOUR TASTE</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed tracking-wide mt-8">
                Where authentic Mexican heritage meets premium Halal craftsmanship. <br className="hidden md:block" />
                Experience the fusion of bold flavors and ethical sourcing.
              </p>

              {/* CTAs */}
              <div className="pt-14 flex flex-col md:flex-row gap-8 justify-center items-center">
                <Link href="/order" className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-gold to-brand-orange rounded-sm blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
                  <button className="relative bg-brand-black text-white text-lg font-heading font-bold tracking-[0.2em] py-5 px-14 border border-brand-gold/30 hover:bg-brand-gold hover:text-black transition-all duration-500 uppercase">
                    Order Now
                  </button>
                </Link>
                <Link href="/menu">
                  <button className="text-white text-lg font-heading font-bold tracking-[0.2em] py-5 px-14 border-b border-white/20 hover:border-brand-gold hover:text-brand-gold transition-all duration-300 uppercase">
                    View Menu
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 animate-bounce">
            <span className="text-[10px] tracking-[0.3em] text-brand-gold uppercase">Scroll</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-brand-gold to-transparent"></div>
          </div>
        </section>

        {/* Feature Section - Bento Grid Style */}
        <section className="py-32 bg-brand-black relative z-10">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div>
                <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
                  CULINARY <span className="text-brand-gold italic">MASTERY</span>
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-brand-gold to-transparent"></div>
              </div>
              <p className="text-gray-400 max-w-md text-lg leading-relaxed text-right md:text-left">
                Every dish is a masterpiece, crafted with passion and precision using only the finest ingredients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[800px]">
              {/* Large Feature */}
              <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-sm border border-white/5">
                <div className="absolute inset-0 bg-gray-900 transition-transform duration-700 group-hover:scale-105">
                  {/* Placeholder for large food image */}
                  <div className="w-full h-full bg-[url('/menu-items/bowl-signature.jpg')] bg-cover bg-center opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-10 md:p-14">
                  <h3 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">SIGNATURE BOWLS</h3>
                  <p className="text-gray-300 text-lg max-w-lg mb-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    A symphony of flavors in every bowl. Char-grilled meats, fresh salsa, and our secret sauces.
                  </p>
                  <Link href="/menu" className="text-brand-gold tracking-widest uppercase text-sm font-bold border-b border-brand-gold pb-1 hover:text-white hover:border-white transition-colors">
                    Explore Bowls
                  </Link>
                </div>
              </div>

              {/* Small Feature 1 */}
              <div className="relative group overflow-hidden rounded-sm border border-white/5 bg-brand-dark-gray">
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  <div className="text-right">
                    <span className="text-6xl font-heading font-bold text-white/5 group-hover:text-brand-gold/20 transition-colors">01</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">100% ZABIHA HALAL</h3>
                    <p className="text-gray-400 text-sm">Ethically sourced, hand-slaughtered meats.</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Small Feature 2 */}
              <div className="relative group overflow-hidden rounded-sm border border-white/5 bg-brand-dark-gray">
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  <div className="text-right">
                    <span className="text-6xl font-heading font-bold text-white/5 group-hover:text-brand-gold/20 transition-colors">02</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">FARM FRESH</h3>
                    <p className="text-gray-400 text-sm">Produce delivered daily for maximum crunch.</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </section>

        {/* NEW SECTION: Our Story / Location */}
        <section className="py-24 bg-brand-dark-gray relative overflow-hidden">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] w-full rounded-sm overflow-hidden border border-white/5 group">
              {/* Placeholder for location image */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/20 font-heading text-4xl font-bold uppercase tracking-widest rotate-[-15deg]">Location Shot</span>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
                HIDDEN <span className="text-brand-gold">GEM</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Discover us inside <span className="text-white font-semibold">"Mediterranean Pizza & Roast Beef"</span>.
                A secret spot for those who know real flavor. We've transformed a corner of Bradford into a culinary destination.
              </p>
              <div className="flex flex-col gap-4 border-l-2 border-brand-gold pl-6">
                <p className="text-white font-bold text-xl">124 S Main St, Bradford, MA 01835</p>
                <p className="text-gray-500">Open late on weekends for your cravings.</p>
              </div>
              <Link href="/locations">
                <button className="mt-4 text-brand-gold font-bold tracking-widest uppercase border-b border-brand-gold pb-1 hover:text-white hover:border-white transition-colors">
                  Get Directions
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* NEW SECTION: Customer Favorites (Carousel Placeholder) */}
        <section className="py-32 bg-brand-black">
          <div className="container mx-auto px-6 text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">FAN <span className="text-brand-orange">FAVORITES</span></h2>
            <p className="text-gray-500">The dishes that keep our community coming back.</p>
          </div>

          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-panel p-8 rounded-sm border border-white/5 hover:border-brand-gold/30 transition-all duration-300 group">
                <div className="h-48 w-full bg-gray-800 mb-6 rounded-sm overflow-hidden relative">
                  <div className="absolute inset-0 bg-[url('/menu-items/bowl-signature.jpg')] bg-cover bg-center opacity-80 group-hover:scale-110 transition-transform duration-700"></div>
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-2">Spicy Steak Bowl</h3>
                <p className="text-gray-400 text-sm mb-4">Our best-seller. Fire-grilled steak with our signature chipotle sauce.</p>
                <span className="text-brand-gold font-bold">$14.95</span>
              </div>
            ))}
          </div>
        </section>

        {/* Marquee Section */}
        <div className="py-10 bg-brand-gold overflow-hidden whitespace-nowrap relative">
          <div className="animate-marquee inline-block">
            <span className="text-4xl md:text-6xl font-heading font-bold text-black mx-8">TACOS • BURRITOS • BOWLS • NACHOS • SALADS •</span>
            <span className="text-4xl md:text-6xl font-heading font-bold text-black mx-8">TACOS • BURRITOS • BOWLS • NACHOS • SALADS •</span>
            <span className="text-4xl md:text-6xl font-heading font-bold text-black mx-8">TACOS • BURRITOS • BOWLS • NACHOS • SALADS •</span>
          </div>
        </div>

        {/* Newsletter / CTA Section */}
        <section className="py-32 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-brand-dark-gray"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8">
              JOIN THE <span className="text-brand-gold">INNER CIRCLE</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
              Unlock exclusive rewards, birthday treats, and secret menu items.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-6">
              <button className="bg-brand-gold text-black font-bold font-heading tracking-widest px-10 py-4 hover:bg-white transition-colors rounded-sm uppercase">
                Sign Up for Rewards
              </button>
              <button className="border border-white/20 text-white font-bold font-heading tracking-widest px-10 py-4 hover:bg-white/10 transition-colors rounded-sm uppercase">
                Member Login
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
