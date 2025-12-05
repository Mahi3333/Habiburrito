'use client';

<<<<<<< HEAD
import React, { useEffect, useRef } from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> origin/main
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

<<<<<<< HEAD
export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrolled = window.scrollY;
        scrollRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };
=======
const experienceMoments = [
  {
    title: 'Origin Story',
    copy: 'From Karachi night markets to California charcoal grills — a halal taqueria with mezcal-night pacing and gold-label hospitality.',
  },
  {
    title: 'Sourcing',
    copy: '100% Zabiha halal meats flame-kissed over mesquite, produce gathered each dawn, and tortillas warmed to order.',
  },
  {
    title: 'Chef Highlights',
    copy: 'Chef Yusef’s ember rubs, 16-hour marinades, and table-side finishes that turn a burrito into ceremony.',
  },
];

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const percent = scrollable > 0 ? Math.min((scrolled / scrollable) * 100, 100) : 0;
      setScrollProgress(percent);
    };

    handleScroll();
>>>>>>> origin/main
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
<<<<<<< HEAD
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
=======
    <div className="min-h-screen bg-brand-night flex flex-col font-sans selection:bg-brand-gold selection:text-black overflow-x-hidden">
      <Header />
      <div className="hidden lg:block progress-rail">
        <div className="progress-fill" style={{ height: `${scrollProgress}%` }}></div>
      </div>

      <main className="flex-grow flex flex-col">
        {/* Cinematic Hero Section */}
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/menu-items/WhatsApp Image 2025-11-10 at 8.56.31 PM (3).jpeg"
              alt="Charcoal flames over halal meats"
              fill
              className="object-cover scale-105"
              priority
            />
            <div className="absolute inset-0 bg-hero-vignette" />
            <div className="grain-layer" />
          </div>

          <div className="absolute top-[-30%] right-[-10%] w-[65vw] h-[65vw] bg-brand-gold/10 blur-[160px] rounded-full opacity-70"></div>

          <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-24 pb-16">
            <div className="space-y-8 max-w-3xl">
              <div className="inline-flex items-center gap-3 px-5 py-2 border border-brand-gold/40 bg-black/30 backdrop-blur-md rounded-full">
                <span className="w-2 h-2 rounded-full bg-brand-jade animate-pulse"></span>
                <span className="text-brand-gold font-heading tracking-[0.3em] text-xs font-bold uppercase">Charcoal Halal · Gold Label</span>
              </div>
              <h1 className="text-5xl md:text-7xl xl:text-8xl font-display text-white leading-[0.95] drop-shadow-2xl">
                Ember-lit burritos and bowls, plated with
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-200 to-brand-gold text-glow italic">
                  mezcal-night drama.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
                Smoke, silk, and spice: premium halal ingredients slow-marinated, then charred over mesquite. A cinematic taqueria crafted for night owls, romantics, and discerning gourmands.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/build" className="group relative inline-flex items-center">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-brand-gold via-brand-ember to-brand-gold blur opacity-30 group-hover:opacity-80 transition-all duration-[var(--motion-slow)]"></div>
                  <span className="relative bg-black/70 border border-brand-gold/60 text-white text-sm tracking-[0.2em] font-heading px-8 py-4 uppercase rounded-full hover:translate-y-[-2px] transition-transform duration-[var(--motion-base)]">
                    Build Your Ritual
                  </span>
                </Link>
                <Link href="/our-story#reserve" className="inline-flex items-center gap-3 text-brand-gold font-heading tracking-[0.18em] text-sm">
                  <span className="h-8 w-8 rounded-full border border-brand-gold/60 flex items-center justify-center">★</span>
                  Reserve Chef’s Table
>>>>>>> origin/main
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 max-w-xl">
                {[['Charcoal-Fired', 'Small batch, ember-kissed proteins'], ['Halal Certified', '100% Zabiha ingredients'], ['Chef’s Notes', 'Nightly finishes & sauces']].map(([title, desc]) => (
                  <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-4 parallax-hover">
                    <p className="text-xs text-brand-gold tracking-[0.24em] uppercase">{title}</p>
                    <p className="text-sm text-gray-300 mt-2 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="glass-panel rounded-[28px] border border-white/10 p-6 micro-glow">
                <div className="relative w-full h-[460px] overflow-hidden rounded-3xl">
                  <Image
                    src="/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (2).jpeg"
                    alt="Gilded burrito close-up"
                    fill
                    className="object-cover scale-105 hover:scale-110 transition-transform duration-[var(--motion-slow)]"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-sm text-gray-200 flex items-center justify-between">
                    <span className="font-display text-lg text-white">Chef Yusef’s Ember Burrito</span>
                    <span className="text-brand-gold font-mono">$18</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                  <span>Mesquite charcoal · Ancho-honey glaze · Citrus crema</span>
                  <span className="text-brand-jade">Swipe for menu →</span>
                </div>
              </div>
            </div>
          </div>
        </section>

<<<<<<< HEAD
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
=======
        {/* Storytelling & Sensory Cues */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_20%_20%,rgba(11,175,135,0.35),transparent_30%),radial-gradient(circle_at_80%_0,rgba(212,175,55,0.25),transparent_28%)]"></div>
          <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-xs tracking-[0.28em] uppercase text-brand-gold">Origin & Ritual</p>
              <h2 className="text-4xl md:text-5xl font-display text-white leading-tight">
                Crafted for the soul. Born for the night.
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                We slow-marinate proteins for 16 hours, grill over live fire, and finish each order table-side with torched citrus, smoked salts, and chef whispers. Every bite honors halal tradition while flirting with speakeasy drama.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Charcoal-Fired · Halal Certified · Small Batch", "Chef-led tasting flights with mezcal-free pairings", "Hand-pressed tortillas · Heritage grains", "Midnight-only specials after 9p"].map((badge) => (
                  <div key={badge} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand-gold"></span>
                    <p className="text-sm text-gray-200 leading-relaxed">{badge}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (4).jpeg", "/menu-items/WhatsApp Image 2025-11-10 at 8.56.28 PM (6).jpeg", "/menu-items/WhatsApp Image 2025-11-10 at 8.56.27 PM (2).jpeg", "/menu-items/WhatsApp Image 2025-11-10 at 8.56.29 PM.jpeg"].map((src, idx) => (
                <div key={src} className={`relative h-44 sm:h-56 rounded-3xl overflow-hidden parallax-hover ${idx % 2 === 0 ? 'translate-y-4' : ''}`}>
                  <Image src={src} alt={`Artful plating ${idx + 1}`} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sourcing & Chef Highlights */}
        <section className="py-24 bg-black/50 border-y border-white/5 relative overflow-hidden">
          <div className="grain-layer"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-wrap gap-8 items-start justify-between">
              {experienceMoments.map((moment) => (
                <div key={moment.title} className="flex-1 min-w-[260px] bg-white/5 border border-white/10 rounded-3xl p-6 parallax-hover">
                  <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">{moment.title}</p>
                  <p className="text-sm text-gray-300 leading-relaxed mt-3">{moment.copy}</p>
                </div>
              ))}
              <div className="flex-1 min-w-[280px] bg-gradient-to-r from-brand-dark-gray via-black to-brand-dark-gray border border-brand-gold/30 rounded-3xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
                <p className="text-xs uppercase tracking-[0.28em] text-brand-gold">Chef Highlights</p>
                <h3 className="text-2xl font-display text-white mt-3">Torched citrus crema, ember butter, jade chimichurri.</h3>
                <p className="text-sm text-gray-300 mt-3 leading-relaxed">Hover to feel the heat — these finishing sauces are plated live at your table for a sensorial crescendo.</p>
                <div className="mt-4 flex gap-3 text-xs text-brand-jade uppercase tracking-[0.2em]">
                  <span className="px-3 py-2 bg-white/5 rounded-full border border-white/10">Table-side fire</span>
                  <span className="px-3 py-2 bg-white/5 rounded-full border border-white/10">Chef-led tastings</span>
>>>>>>> origin/main
                </div>
              </div>
            </div>
          </div>
        </section>

<<<<<<< HEAD
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
=======
        {/* Menu Showcase */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6 space-y-12">
            <div className="max-w-3xl">
              <p className="text-xs tracking-[0.28em] uppercase text-brand-gold">Menu Preview</p>
              <h2 className="text-4xl md:text-5xl font-display text-white leading-tight">Gold-label favorites & chef drops</h2>
              <p className="text-lg text-gray-300 mt-4 leading-relaxed">Staggered reveals, tactile controls, and notes from our chef to guide your cravings. Each card leans on cinemagraph textures instead of flat gradients.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Ember Steak Burrito',
                  price: '$18',
                  note: 'Ancho-honey glaze · charred jalapeño · smoked salt',
                  image: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.31 PM (2).jpeg',
                },
                {
                  title: 'Jade Citrus Bowl',
                  price: '$17',
                  note: 'Jade chimichurri · citrus crema · heritage grains',
                  image: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (1).jpeg',
                },
                {
                  title: 'Midnight Veg Al Pastor',
                  price: '$15',
                  note: 'Charred pineapple · guajillo lacquer · toasted pepitas',
                  image: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (6).jpeg',
                },
              ].map((item, idx) => (
                <div key={item.title} className="relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden group parallax-hover" style={{ animationDelay: `${idx * 120}ms` }}>
                  <div className="relative h-72 overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-[var(--motion-slow)] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-start justify-between text-white">
                      <div>
                        <p className="text-sm tracking-[0.18em] uppercase text-brand-gold">Chef Drop</p>
                        <h3 className="text-2xl font-display leading-tight">{item.title}</h3>
                      </div>
                      <span className="text-brand-gold font-mono">{item.price}</span>
                    </div>
                  </div>
                  <div className="p-5 text-sm text-gray-300 leading-relaxed border-t border-white/10">
                    {item.note}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 items-center text-sm text-gray-300">
              <Link href="/menu" className="px-5 py-3 bg-white/5 border border-white/10 rounded-full hover:border-brand-gold/60 transition-all">
                View the full menu
              </Link>
              <Link href="/build" className="px-5 py-3 border border-brand-jade/40 text-brand-jade rounded-full hover:bg-brand-jade/10 transition-all">
                Build a bespoke bowl
              </Link>
              <Link href="/our-story#loyalty" className="px-5 py-3 border border-brand-ember/40 text-brand-ember rounded-full hover:bg-brand-ember/10 transition-all">
                Join Ember Loyalty
>>>>>>> origin/main
              </Link>
            </div>
          </div>
        </section>

<<<<<<< HEAD
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
=======
        {/* Experience Track */}
        <section className="py-24 bg-brand-black/70 border-t border-white/5">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="space-y-4">
              <p className="text-xs tracking-[0.28em] uppercase text-brand-gold">Your Evening</p>
              <h2 className="text-4xl font-display text-white leading-tight">A scroll-driven journey with tactile pauses.</h2>
              <p className="text-lg text-gray-300 leading-relaxed">Follow the progress rail as you glide — each stop reveals provenance, chef notes, and indulgent controls for a bespoke build.</p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[{ step: 'Arrival', desc: 'Ghost nav appears with concierge actions and cart peek.' }, { step: 'Sourcing', desc: 'Staggered ingredient mosaics with grain & glow.' }, { step: 'Build', desc: 'Tactile steppers, hover parallax on proteins, scroll-linked progress.' }, { step: 'Reserve', desc: 'Book chef’s table or late-night pickup with one tap.' }].map((stage) => (
                <div key={stage.step} className="bg-white/5 border border-white/10 rounded-2xl p-5 parallax-hover">
                  <p className="text-xs tracking-[0.25em] uppercase text-brand-gold">{stage.step}</p>
                  <p className="text-sm text-gray-300 mt-2 leading-relaxed">{stage.desc}</p>
                </div>
              ))}
>>>>>>> origin/main
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
