'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background-light flex flex-col font-sans selection:bg-brand-orange selection:text-white">
      <Header />

      {/* Hero Section */}
      <main className="flex-grow flex flex-col">
        <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
          {/* Background Gradient (Placeholder for Image) */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black z-0"></div>

          {/* Abstract Shapes/Glows */}
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-brand-green/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand-orange/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>

          {/* Content Container */}
          <div className="relative z-10 container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left space-y-8 animate-fade-in-up">
              <div className="inline-block px-4 py-1 rounded-full border border-brand-orange/30 bg-brand-orange/10 backdrop-blur-sm mb-4">
                <span className="text-brand-orange font-semibold tracking-wider text-sm">PREMIUM HALAL MEXICAN GRILL</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white leading-tight drop-shadow-lg">
                Taste the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">Authentic</span> <br />
                Difference
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto md:mx-0 leading-relaxed">
                Build Your Own Halal Meal. Fresh ingredients, bold flavors, made just for you.
              </p>

              <div className="pt-8 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                <Link href="/build" className="group">
                  <button className="bg-brand-orange text-white text-xl font-bold py-4 px-12 rounded-full shadow-[0_0_20px_rgba(255,140,0,0.4)] hover:shadow-[0_0_30px_rgba(255,140,0,0.6)] hover:bg-orange-500 hover:scale-105 transition-all duration-300 flex items-center gap-3">
                    START ORDER
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </Link>
                <Link href="/menu">
                  <button className="glass text-white text-xl font-semibold py-4 px-12 rounded-full hover:bg-white/10 hover:scale-105 transition-all duration-300">
                    VIEW MENU
                  </button>
                </Link>
              </div>
            </div>

            {/* Hero Image/Visual */}
            <div className="flex-1 relative w-full max-w-lg md:max-w-xl aspect-square animate-fade-in-up delay-200">
              {/* Using the logo as a central visual element since the hero image generation failed, 
                   but styled to look like a premium brand showcase */}
              <div className="relative w-full h-full p-8 glass-dark rounded-full border border-white/10 flex items-center justify-center shadow-2xl">
                <div className="relative w-3/4 h-3/4">
                  <Image
                    src="/logo.jpg"
                    alt="Habiburrito Premium Bowl"
                    fill
                    className="object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-700"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "Fresh Ingredients", desc: "Sourced daily for maximum crunch and flavor.", icon: "🥬" },
                { title: "100% Halal", desc: "Certified premium meats you can trust.", icon: "🥩" },
                { title: "Your Way", desc: "Unlimited combinations to satisfy your cravings.", icon: "🎨" }
              ].map((feature, idx) => (
                <div key={idx} className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl border border-gray-100 hover:border-brand-orange/20 transition-all duration-300">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
