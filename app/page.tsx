'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-black flex flex-col font-sans selection:bg-brand-gold selection:text-black overflow-x-hidden">
      <Header />

      {/* Cinematic Hero Section */}
      <main className="flex-grow flex flex-col">
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image Placeholder - In production this would be a high-res video or image */}
          <div className="absolute inset-0 z-0">
            {/* Fallback gradient if image fails, but we use a dark overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-dark-gray via-black to-black opacity-90"></div>
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          </div>

          {/* Dramatic Spotlight Effect */}
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none"></div>

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center justify-center h-full pt-20">

            <div className="space-y-8 animate-fade-in-up max-w-5xl mx-auto">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-2 border border-brand-gold/30 bg-black/40 backdrop-blur-md rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                <span className="text-brand-gold font-heading tracking-[0.3em] text-xs font-bold uppercase">Experience Halal Excellence</span>
              </div>

              {/* Main Title - Massive & Elegant */}
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-white leading-[0.9] tracking-tighter drop-shadow-2xl">
                TASTE THE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold text-glow italic">EXTRAORDINARY</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed tracking-wide mt-6">
                A culinary journey where authentic Mexican flavors meet premium Halal ingredients.
              </p>

              {/* CTAs */}
              <div className="pt-12 flex flex-col md:flex-row gap-6 justify-center items-center">
                <Link href="/build" className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold to-brand-orange rounded-none blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <button className="relative bg-brand-black text-white text-lg font-heading font-bold tracking-[0.2em] py-5 px-12 border border-brand-gold/50 hover:bg-brand-gold hover:text-black transition-all duration-500 uppercase">
                    Start Your Order
                  </button>
                </Link>
                <Link href="/menu">
                  <button className="text-white text-lg font-heading font-bold tracking-[0.2em] py-5 px-12 border-b border-transparent hover:border-brand-gold hover:text-brand-gold transition-all duration-300 uppercase">
                    View Full Menu
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-brand-gold to-transparent opacity-50"></div>
          </div>
        </section>

        {/* "The Experience" Section - Dark & Moody */}
        <section className="py-32 bg-brand-black relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              {/* Text Side */}
              <div className="space-y-10">
                <h2 className="text-5xl md:text-7xl font-heading font-bold text-white leading-none">
                  CRAFTED <br />
                  <span className="text-brand-gold italic">FOR THE SOUL.</span>
                </h2>
                <div className="w-24 h-1 bg-brand-gold"></div>
                <p className="text-gray-400 text-lg leading-loose font-light">
                  We believe fast food shouldn't mean compromising on quality. Every bowl, burrito, and salad is constructed with locally sourced produce and 100% Zabiha Halal meats, grilled to perfection over open flames.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div>
                    <h4 className="text-brand-gold font-heading text-4xl font-bold mb-2">100%</h4>
                    <p className="text-gray-500 text-sm tracking-widest uppercase">Halal Certified</p>
                  </div>
                  <div>
                    <h4 className="text-brand-gold font-heading text-4xl font-bold mb-2">Fresh</h4>
                    <p className="text-gray-500 text-sm tracking-widest uppercase">Daily Prep</p>
                  </div>
                </div>
              </div>

              {/* Visual Side - Glass Card Effect */}
              <div className="relative h-[600px] w-full glass-panel rounded-none border-l-4 border-brand-gold p-8 flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                {/* Placeholder for a high-end food shot */}
                <div className="text-center space-y-4">
                  <div className="w-64 h-64 mx-auto rounded-full border-4 border-brand-gold/30 flex items-center justify-center overflow-hidden relative shadow-2xl">
                    <Image
                      src="/menu-items/bowl-signature.jpg"
                      alt="Signature Bowl"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-2xl font-heading text-white tracking-widest mt-6">THE SIGNATURE GRILL</h3>
                  <p className="text-gray-500 text-sm">Char-grilled perfection in every bite.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
