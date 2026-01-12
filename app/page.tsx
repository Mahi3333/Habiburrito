'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useScroll, useTransform, useInView } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const containerRef = useRef(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showFavoritesCTA, setShowFavoritesCTA] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowServiceModal(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const favoritesRef = useRef<HTMLDivElement | null>(null);
  const favoritesInView = useInView(favoritesRef, { amount: 0.5 });

  const hoursSchedule: Record<string, { open: string; close: string; closed?: boolean }> = {
    Sunday: { open: '11:00', close: '23:00' },
    Monday: { open: '11:00', close: '23:00' },
    Tuesday: { open: '11:00', close: '23:00' },
    Wednesday: { open: '11:00', close: '23:00' },
    Thursday: { open: '11:00', close: '23:00' },
    Friday: { open: '11:00', close: '24:00' },
    Saturday: { open: '11:00', close: '24:00' },
  };

  const computeTodayStatus = () => {
    const now = new Date();
    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
    const entry = hoursSchedule[dayName];
    if (!entry || entry.closed) {
      return { status: 'CLOSED', box: 'border-red-500/60 text-red-400', range: 'Closed today', dayName };
    }
    const toMinutes = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const openMin = toMinutes(entry.open);
    const closeMin = toMinutes(entry.close);
    const isOpen = nowMin >= openMin && nowMin < closeMin;
    return {
      status: isOpen ? 'OPEN' : 'CLOSED',
      box: isOpen ? 'border-green-500/60 text-green-300' : 'border-red-500/60 text-red-400',
      range: `${entry.open} – ${entry.close}`,
      dayName,
    };
  };

  const todayStatus = computeTodayStatus();

  const trendingItems = [
    { title: "The Ember Steak", price: "$18", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.31 PM (2).jpeg" },
    { title: "Jade Citrus Bowl", price: "$17", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (1).jpeg" },
    { title: "Golden Hour Chicken", price: "$16", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.28 PM (1).jpeg" },
    { title: "Spice Route Lamb", price: "$19", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.29 PM (2).jpeg" },
    { title: "Oasis Bowl", price: "$16", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.29 PM (5).jpeg" },
  ];

  const showcaseItems = [
    { title: "Street Quesa", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (6).jpeg" },
    { title: "Charcoal Chicken", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.27 PM (1).jpeg" },
    { title: "Lamb Flame", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.29 PM (3).jpeg" },
    { title: "Garden Bowl", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.28 PM (3).jpeg" },
    { title: "Smoked Steak", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.28 PM (2).jpeg" },
    { title: "Charred Veg", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.28 PM (4).jpeg" },
    { title: "Fire Shrimp", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.27 PM.jpeg" },
    { title: "Ember Rice", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.29 PM (4).jpeg" },
    { title: "Ember Steak", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.31 PM (2).jpeg" },
    { title: "Citrus Bowl", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (1).jpeg" },
    { title: "Golden Chicken", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.28 PM (1).jpeg" },
    { title: "Spice Lamb", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.29 PM (2).jpeg" },
    { title: "Oasis Veg", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.29 PM (5).jpeg" },
    { title: "Crisp Greens", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.28 PM (5).jpeg" },
  ];

  const reviews = [
    { name: "Carol K.", source: "Google", rating: 5, text: "We ate here for brunch before a family graduation. 11 of us and everyone loved their food. The espresso martini was perfect." },
    { name: "Ali M.", source: "Google", rating: 5, text: "Halal, charcoal-fired, and packed with flavor. Bowls are generous and the team is super friendly." },
    { name: "Sarah L.", source: "Google", rating: 4, text: "Loved the lamb and citrus bowl. Quick pickup and fresh toppings—will be back." },
  ];

  const nextReview = () => setReviewIndex((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    setShowFavoritesCTA(favoritesInView);
  }, [favoritesInView]);

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
              <h1 className="text-[13vw] md:text-[12vw] leading-[0.9] font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mix-blend-overlay pb-4">
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
              <div className="flex flex-wrap justify-center gap-3">
                <span className="pill">Halal</span>
                <span className="pill">Charcoal Fired</span>
                <span className="pill">Haverhill / Bradford</span>
              </div>

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

        {/* TRENDING STRIP */}
        <section className="bg-brand-black py-12 border-t border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {trendingItems.map((item) => (
                <div
                  key={item.title}
                  className="group relative aspect-square bg-black p-[4px] overflow-hidden"
                >
                  <div className="absolute inset-0 border-[4px] border-transparent transition-all duration-300 group-hover:border-white/80 pointer-events-none" />
                  <div className="relative h-full w-full overflow-hidden border border-transparent group-hover:border-black transition-all duration-300">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ORDER ONLINE CTA */}
        <section className="py-16 md:py-20 bg-brand-dark text-center border-b border-white/5">
          <div className="container mx-auto px-6 max-w-3xl space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">ORDER ONLINE</h2>
            <p className="text-brand-gold text-lg tracking-widest uppercase">Pickup ready, dine-in</p>
            <p className="text-gray-200 text-base md:text-lg">Order for pickup or enjoy a quick bite—our cozy spot fills fast.</p>
            <Link href="/order">
              <button className="mt-4 px-8 py-3 bg-brand-gold text-brand-black font-display font-bold uppercase tracking-[0.25em] text-sm rounded-md hover:bg-white transition-colors">
                Order
              </button>
            </Link>
          </div>
        </section>

        {/* ABOUT US CTA */}
        <section className="py-16 md:py-20 bg-brand-black border-b border-white/5">
          <div className="container mx-auto px-6 text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight">HABIBURRITO</h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              Fire-kissed, halal street classics built fresh daily. From Bradford to Haverhill, we&apos;re your go-to for bowls, burritos, and chef-crafted specials.
            </p>
            <Link href="/our-story">
              <button className="px-8 py-3 rounded-full bg-brand-gold text-brand-black font-display font-bold uppercase tracking-[0.25em] text-sm hover:bg-white transition-colors shadow-[0_8px_24px_rgba(212,175,55,0.35)]">
                About Us
              </button>
            </Link>
          </div>
        </section>

        {/* MENU SHOWCASE (dense, two rows) */}
        <section className="py-16 md:py-20 bg-brand-black border-b border-white/5">
          <div className="container mx-auto px-6 space-y-0">
            {/* Row 1: feature on right */}
            <div className="grid lg:grid-cols-[2fr_1fr] gap-0 overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-0">
                {showcaseItems.slice(0, 6).map((item) => (
                  <div key={item.title} className="relative aspect-square overflow-hidden bg-brand-charcoal group">
                    <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                ))}
              </div>
              <div className="relative h-full min-h-[320px] bg-brand-charcoal group">
                <Image src={showcaseItems[6]?.img || showcaseItems[0].img} alt="Feature" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            </div>

            {/* Row 2: feature on left */}
            <div className="grid lg:grid-cols-[1fr_2fr] gap-0 overflow-hidden">
              <div className="relative h-full min-h-[320px] bg-brand-charcoal group">
                <Image src={showcaseItems[13]?.img || showcaseItems[7]?.img || showcaseItems[0].img} alt="Feature" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-0">
                {showcaseItems.slice(7, 13).map((item) => (
                  <div key={item.title} className="relative aspect-square overflow-hidden bg-brand-charcoal group">
                    <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="py-16 md:py-20 bg-brand-dark relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <Image src="/background_bowls_blur.png" alt="Reviews bg" fill className="object-cover opacity-20" />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">REVIEWS</h3>
            <p className="text-brand-gold text-lg uppercase tracking-[0.25em] mb-8">Review By - Google</p>
            <div className="space-y-4">
              <p className="text-white font-semibold">{reviews[reviewIndex].name} · {reviews[reviewIndex].source}</p>
              <p className="text-brand-gold text-lg">
                {"★".repeat(reviews[reviewIndex].rating)}{"☆".repeat(5 - reviews[reviewIndex].rating)}
              </p>
              <p className="text-gray-100 text-lg leading-relaxed">{reviews[reviewIndex].text}</p>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8">
              <button onClick={prevReview} className="text-white hover:text-brand-gold text-2xl" aria-label="Previous review">‹</button>
              <div className="flex gap-2">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setReviewIndex(idx)}
                    className={`w-3 h-3 rounded-full ${idx === reviewIndex ? 'bg-brand-gold' : 'bg-white/30'}`}
                    aria-label={`Go to review ${idx + 1}`}
                  />
                ))}
              </div>
              <button onClick={nextReview} className="text-white hover:text-brand-gold text-2xl" aria-label="Next review">›</button>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-brand-black py-16 md:py-20 border-t border-b border-white/5 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="h-[1px] w-10 bg-brand-gold/50" />
                  <span className="text-brand-gold font-mono text-xs tracking-[0.3em] uppercase">How it works</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Order. Fire. Enjoy.</h2>
              </div>
              <Link href="/menu" className="text-xs uppercase tracking-[0.3em] text-gray-300 hover:text-brand-gold transition-colors">
                View Menu
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'Order Your Way', desc: 'Customize bowls or burritos online or in-store.', meta: 'Pickup / soon: delivery' },
                { title: 'Charcoal Fire', desc: 'Proteins marinated for hours, finished over flame.', meta: 'Halal • Made to order' },
                { title: 'Grab & Go', desc: 'Skip the line, grab at 124 S Main St.', meta: 'Haverhill / Bradford' },
              ].map((item, idx) => (
                <div key={item.title} className="card-surface card-hover p-6 relative overflow-hidden">
                  <span className="absolute top-3 right-4 text-xs font-mono tracking-[0.3em] text-brand-gold">0{idx + 1}</span>
                  <h3 className="text-xl font-display text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">{item.desc}</p>
                  <span className="pill text-xs">{item.meta}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MANIFESTO SECTION */}
        <section className="py-16 bg-brand-black relative z-10 overflow-hidden">
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
              We don&apos;t just serve food. We curate <span className="text-brand-gold italic">freshness</span>.
              Premium Halal ingredients, prepared daily, and assembled exactly how you crave it.
            </p>
          </div>
        </section>

        {/* FAN FAVORITES (Infinite Marquee) */}
        <section ref={favoritesRef} className="py-12 bg-brand-dark border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/background_burritos_blur.png"
              alt="Background"
              fill
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-brand-black/50" />
          </div>

          <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end relative z-10">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="h-[1px] w-12 bg-brand-gold/50" />
                <span className="text-brand-gold font-mono text-sm tracking-[0.3em] uppercase block">Trending Now</span>
              </div>
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
                    { title: "Spice Route Lamb", price: "$19", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.29 PM (2).jpeg", tag: "Chef&apos;s Pick" },
                    { title: "The Oasis Bowl", price: "$16", img: "/menu-items/WhatsApp Image 2025-11-10 at 8.56.29 PM (5).jpeg", tag: "Vegetarian" },
                  ].map((item, i) => (
                    <div key={`${setIndex}-${i}`} className="w-[80vw] md:w-[400px] flex-shrink-0 group cursor-pointer">
                      <div className="relative aspect-[4/5] overflow-hidden bg-brand-charcoal mb-6 rounded-lg">
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
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
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Floating CTA for fan favorites */}
        <AnimatePresence>
          {showFavoritesCTA && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
            >
              <div className="flex gap-4 bg-black/70 border border-white/10 rounded-full px-4 py-3 shadow-lg">
                <Link href="/order">
                  <button className="px-4 py-2 rounded-full bg-brand-gold text-brand-black font-display font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors">
                    Order Now
                  </button>
                </Link>
                <Link href="/menu">
                  <button className="px-4 py-2 rounded-full border border-white/20 text-white font-display font-bold uppercase tracking-[0.2em] text-xs hover:border-brand-gold hover:text-brand-gold transition-colors">
                    View Menu
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CHEF'S TABLE */}
        <section className="py-16 md:py-20 bg-brand-black border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-10 bg-brand-gold/50" />
              <span className="text-brand-gold font-mono text-xs tracking-[0.3em] uppercase">Chef&apos;s Table</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'The Ember Steak', price: '$18', img: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.31 PM (2).jpeg', note: 'Marinated then fired over charcoal' },
                { title: 'Jade Citrus Bowl', price: '$17', img: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (1).jpeg', note: 'Citrus lift with crisp toppings' },
                { title: 'Midnight Al Pastor', price: '$15', img: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (6).jpeg', note: 'Smoky, sweet-heat balance' },
                { title: 'Spice Route Lamb', price: '$19', img: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.29 PM (2).jpeg', note: 'Slow marinated, bold spice' },
              ].map((item) => (
                <div key={item.title} className="card-surface card-hover grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden">
                  <div className="relative h-48 md:h-full rounded-2xl overflow-hidden border border-white/10 md:col-span-1">
                    <Image src={item.img} alt={item.title} fill className="object-cover" />
                    <div className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 rounded-full text-xs text-brand-gold font-mono">{item.price}</div>
                  </div>
                  <div className="md:col-span-2 p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-2xl font-display text-white">{item.title}</h3>
                      <span className="pill">Signature</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{item.note}</p>
                    <div className="flex gap-3">
                      <Link href="/menu">
                        <button className="px-4 py-2 rounded-full border border-white/20 text-white text-xs uppercase tracking-[0.2em] hover:border-brand-gold hover:text-brand-gold transition-colors">
                          View Menu
                        </button>
                      </Link>
                      <Link href="/order">
                        <button className="px-4 py-2 rounded-full bg-brand-gold text-black text-xs uppercase tracking-[0.2em] font-display hover:bg-white transition-colors">
                          Order Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOCATION / VISIT */}
        <section className="relative py-16 bg-brand-black overflow-hidden">
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

                  <h2 className="text-5xl md:text-8xl font-display font-bold text-white leading-[0.9] mb-8">
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
                        <p className="text-gray-400 font-light text-sm">Located inside &quot;Mediterranean Pizza &amp; Roast Beef&quot;</p>
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
                      src="https://maps.google.com/maps?width=100%25&height=100%25&hl=en&q=124%20S%20Main%20St%2C%20Bradford%2C%20MA%2001835&ie=UTF8&t=&z=15&iwloc=B&output=embed"
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
                    <div className="absolute bottom-6 left-6 right-6 bg-black/85 backdrop-blur-md border border-white/10 p-4 rounded-xl flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{todayStatus.dayName}</p>
                        <p className="text-white font-bold text-sm">{todayStatus.range}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${todayStatus.box}`}>
                        {todayStatus.status}
                      </div>
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

      {/* Service Status Modal */}
      <motion.div>
        {showServiceModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
              onClick={() => setShowServiceModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[90%] max-w-md"
            >
              <div className="bg-brand-black border border-brand-gold/20 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wider">Service Update</h3>

                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${todayStatus.box}`}>{todayStatus.status}</span>
                    <div className="text-left">
                      <p className="text-white font-semibold text-sm">{todayStatus.dayName}</p>
                      <p className="text-gray-300 text-xs">{todayStatus.range}</p>
                      <p className="text-xs text-white/50">Pickup ready, dine-in</p>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed">
                    We are accepting orders for <span className="text-brand-gold font-bold">Pick-Up &amp; Takeout</span>.
                    <br />
                    <span className="text-sm text-white/40 mt-2 block">Order ahead and grab at 124 S Main St.</span>
                  </p>

                  <div className="flex gap-3 w-full">
                    <button
                      onClick={() => setShowServiceModal(false)}
                      className="flex-1 px-8 py-3 border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:border-brand-gold hover:text-brand-gold transition-colors rounded-lg"
                    >
                      Continue
                    </button>
                    <Link href="/order" className="flex-1">
                      <button
                        onClick={() => setShowServiceModal(false)}
                        className="w-full px-8 py-3 bg-brand-gold text-brand-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors rounded-lg"
                      >
                        Order Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}
