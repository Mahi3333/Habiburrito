'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-brand-black text-brand-cream selection:bg-brand-gold selection:text-black overflow-x-hidden">
      <Header />

      <main>
        {/* HERO SECTION */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Video/Image Parallax */}
          <motion.div
            style={{ y, opacity }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <Image
              src="/fresh_bowl_assembly_dark.png"
              alt="Fresh ingredients assembly"
              fill
              className="object-cover scale-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-black/40 z-10" />
          </motion.div>

          {/* Hero Content */}
          <div className="relative z-20 container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-[12vw] leading-none font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mix-blend-overlay">
                HABIBURRITO
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-8 flex flex-col items-center gap-6"
            >
              <p className="text-xl md:text-2xl font-light tracking-widest uppercase text-brand-gold/80">
                Fresh • Halal • Custom
              </p>

              <Link href="/menu">
                <button className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full border border-white/20 hover:border-brand-gold transition-colors duration-300">
                  <div className="absolute inset-0 w-full h-full bg-brand-gold/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <span className="relative font-display font-bold tracking-[0.2em] text-sm uppercase group-hover:text-brand-gold transition-colors">
                    Craft Your Bowl
                  </span>
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>
        </section>

        {/* MANIFESTO SECTION */}
        <section className="py-32 bg-brand-black relative z-10 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/background_bowls_blur.png"
              alt="Background"
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-brand-black/60" />
          </div>
          <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
            <p className="text-3xl md:text-5xl font-display leading-tight text-brand-cream/90">
              We don't just serve food. We curate <span className="text-brand-gold italic">freshness</span>.
              Premium Halal ingredients, prepared daily, and assembled exactly how you crave it.
            </p>
          </div>
        </section>

        {/* FAN FAVORITES (Infinite Marquee) */}
        <section className="py-24 bg-brand-dark border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/background_burritos_blur.png"
              alt="Background"
              fill
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-brand-black/50" />
          </div>

          <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-end relative z-10">
            <div>
              <span className="text-brand-gold font-mono text-sm tracking-[0.3em] uppercase mb-2 block">Trending Now</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white">
                FAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">FAVORITES</span>
              </h2>
            </div>
            <Link href="/menu" className="hidden md:block group">
              <span className="text-sm tracking-widest uppercase border-b border-white/20 pb-1 group-hover:text-brand-gold group-hover:border-brand-gold transition-colors">
                View Full Menu
              </span>
            </Link>
          </div>

          {/* Marquee Container */}
          <div className="relative w-full overflow-hidden z-10">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-black to-transparent z-20" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-black to-transparent z-20" />

            <motion.div
              className="flex gap-8 px-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 30
              }}
              style={{ width: "fit-content" }}
            >
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-8">
                  {[
                    { title: "The Ember Steak", price: "$18", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.31 PM (2).jpeg", tag: "Best Seller" },
                    { title: "Jade Citrus Bowl", price: "$17", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (1).jpeg", tag: "Trending" },
                    { title: "Midnight Al Pastor", price: "$15", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (6).jpeg", tag: "New" },
                    { title: "Golden Hour Chicken", price: "$16", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.28 PM (1).jpeg", tag: "Popular" },
                    { title: "Spice Route Lamb", price: "$19", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.29 PM (2).jpeg", tag: "Chef's Pick" },
                    { title: "The Oasis Bowl", price: "$16", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.29 PM (5).jpeg", tag: "Vegetarian" },
                  ].map((item, i) => (
                    <div key={`${setIndex}-${i}`} className="w-[300px] md:w-[400px] flex-shrink-0 group cursor-pointer">
                      <div className="relative aspect-[4/5] overflow-hidden bg-brand-charcoal mb-6 rounded-lg">
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                        {/* Tag */}
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                          <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">{item.tag}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-start border-t border-white/10 pt-4">
                        <div>
                          <h3 className="text-2xl font-display text-white group-hover:text-brand-gold transition-colors">{item.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">Customizable Base</p>
                        </div>
                        <span className="font-mono text-brand-gold text-lg">{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* LOCATION / VISIT */}
        <section className="relative py-32 bg-brand-black overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/background_tacos_blur.png"
              alt="Background"
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-brand-black/60" />
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-charcoal/20 to-transparent z-0" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] z-0" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-20">

              {/* Text Content */}
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="h-[1px] w-12 bg-brand-gold/50" />
                    <span className="text-brand-gold tracking-[0.3em] uppercase text-xs font-bold">The Coordinates</span>
                  </div>

                  <h2 className="text-6xl md:text-8xl font-display font-bold text-white leading-[0.9] mb-8">
                    HIDDEN <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">IN PLAIN</span> <br />
                    SIGHT
                  </h2>

                  <div className="space-y-6 mb-10">
                    <div className="flex items-start gap-4 p-6 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg hover:border-brand-gold/30 transition-colors group">
                      <div className="p-3 bg-brand-gold/10 rounded-full text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg mb-1">124 S Main St, Bradford, MA 01835</p>
                        <p className="text-brand-gold font-mono text-sm mb-1">QWCF+3W Bradford, Haverhill, MA</p>
                        <p className="text-gray-400 font-light text-sm">Located inside "Mediterranean Pizza & Roast Beef"</p>
                      </div>
                    </div>
                  </div>

                  <Link href="https://www.google.com/maps/search/?api=1&query=QWCF%2B3W+Bradford%2C+Haverhill%2C+MA+124+S+Main+St%2C+Bradford%2C+MA+01835" target="_blank" rel="noopener noreferrer">
                    <button className="group flex items-center gap-4 text-white hover:text-brand-gold transition-colors">
                      <span className="text-lg font-display font-bold tracking-widest uppercase border-b border-brand-gold pb-1">Get Directions</span>
                      <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </button>
                  </Link>
                </motion.div>
              </div>

              {/* Map Visual */}
              <div className="lg:w-1/2 w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  {/* Map Container */}
                  <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 group">
                    <iframe
                      width="100%"
                      height="100%"
                      title="map"
                      className="absolute inset-0 grayscale invert contrast-125 opacity-80 hover:opacity-100 transition-opacity duration-500"
                      frameBorder="0"
                      scrolling="no"
                      src="https://maps.google.com/maps?width=100%&height=100%&hl=en&q=124%20S%20Main%20St%2C%20Bradford%2C%20MA%2001835&ie=UTF8&t=&z=15&iwloc=B&output=embed"
                    />

                    {/* Overlay Gradient to darken and blend */}
                    <div className="absolute inset-0 bg-brand-charcoal/20 pointer-events-none" />

                    {/* Pin Pulse */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="relative">
                        <div className="absolute -inset-4 bg-brand-gold/30 rounded-full animate-ping" />
                        <div className="relative w-4 h-4 bg-brand-gold rounded-full border-2 border-black shadow-[0_0_20px_rgba(255,215,0,0.5)]" />
                      </div>
                    </div>

                    {/* Floating Card */}
                    <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Opening Hours</p>
                        <p className="text-white font-bold text-sm">Daily: 11am - 11pm</p>
                        <p className="text-brand-gold text-xs">Fri & Sat: 11am - 12am</p>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    </div>
                  </div>

                  {/* Decorative Elements behind map */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 border border-white/5 rounded-full" />
                  <div className="absolute -bottom-10 -left-10 w-48 h-48 border border-white/5 rounded-full" />
                </motion.div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
