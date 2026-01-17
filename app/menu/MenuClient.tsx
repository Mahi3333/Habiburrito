"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { Plus } from "lucide-react";
import { useStoreStatus } from "../../app/hooks/useStoreStatus";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  chefNote: string;
  isSignature: boolean;
}

interface MenuClientProps {
  initialMenuItems: MenuItem[];
}

export default function MenuClient({ initialMenuItems }: MenuClientProps) {
  const [menuItems] = useState<MenuItem[]>(initialMenuItems);
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(8);

  const idCounter = useRef(0);
  const { addItemToCart } = useCart();
  const { isOpen } = useStoreStatus();

  const categories = ["all", "bowls", "burritos", "tacos"];
  const categoryLabels: Record<string, string> = {
    all: "All",
    bowls: "Bowls",
    burritos: "Burritos",
    tacos: "Tacos",
  };

  // Reset visible count when category changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(8);
  }, [activeCategory]);

  const allFilteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((i) => i.category === activeCategory);
  const displayedItems = allFilteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < allFilteredItems.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleAddToCart = (item: MenuItem) => {
    if (!item.price || typeof item.price !== "string") {
      console.error("Invalid item price:", item);
      return;
    }
    const price = parseFloat(item.price.replace("$", ""));
    idCounter.current += 1;
    const uniqueId = `${item.id}-${idCounter.current}`;
    addItemToCart({
      uniqueId,
      base: { id: item.id, name: item.name, base_price: price },
      rice: null,
      protein: null,
      toppings: [],
      sauces: [],
      addons: [],
      extras: [],
      totalPrice: price,
      quantity: 1,
    });
  };

  const getBackgroundImage = () => {
    switch (activeCategory) {
      case "burritos":
        return "/background_burritos_blur.png";
      case "tacos":
        return "/background_tacos_blur.png";
      case "bowls":
        return "/background_bowls_blur.png";
      default:
        return "/background_bowls_blur.png";
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-black selection:bg-brand-black selection:text-brand-gold relative">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-brand-cream/90 z-10" />
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={getBackgroundImage()}
            alt="Background texture"
            fill
            className="object-cover saturate-0"
            priority
          />
        </motion.div>
      </div>

      <div className="relative z-10">
        <Header />

        <main className="pt-32 pb-20 container mx-auto px-6">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-brand-black text-white p-8 md:p-12 mb-14 md:mb-16 shadow-2xl">
            <div className="absolute inset-0 opacity-40">
              <Image
                src="/menu-items/WhatsApp Image 2025-11-10 at 8.56.31 PM (2).jpeg"
                alt="Signature burrito"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <span className="text-brand-gold font-mono text-xs tracking-[0.3em] uppercase">
                  Curated for the obsessed
                </span>
                <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
                  Crafted bowls, burritos, and street classics.
                </h1>
                <p className="text-gray-200 text-lg">
                  Halal, charcoal-fired, chef notes on every plate. Build your
                  own or choose a signature.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="pill bg-white/10 border-white/20 text-white">
                    Halal
                  </span>
                  <span className="pill bg-white/10 border-white/20 text-white">
                    Charcoal Fired
                  </span>
                  <span className="pill bg-white/10 border-white/20 text-white">
                    Haverhill / Bradford
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                {isOpen ? (
                  <Link href="/order">
                    <button className="px-6 py-3 rounded-full bg-brand-gold text-brand-black font-display font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors shadow-lg">
                      Order Now
                    </button>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="px-6 py-3 rounded-full bg-gray-800 text-gray-500 font-display font-bold uppercase tracking-[0.2em] text-xs cursor-not-allowed border border-white/10"
                  >
                    Store Closed
                  </button>
                )}
                <Link href="/build">
                  <button className="px-6 py-3 rounded-full border border-white/20 text-white font-display font-bold uppercase tracking-[0.2em] text-xs hover:border-brand-gold hover:text-brand-gold transition-colors">
                    Build Your Own
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex justify-start md:justify-center gap-3 mb-10 border-b border-black/5 pb-6 overflow-x-auto no-scrollbar px-4 -mx-6 md:mx-0 md:px-0">
            {categories.map((cat) => {
              const count = menuItems.filter(
                (i) => cat === "all" || i.category === cat
              ).length;
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-full border transition-all duration-200 flex items-center gap-2 ${
                    active
                      ? "bg-brand-gold text-brand-black border-brand-gold shadow-[0_10px_30px_rgba(198,168,124,0.35)] z-10"
                      : "bg-brand-black text-white border-black/20 hover:border-black/40"
                  }`}
                >
                  <span className="uppercase tracking-[0.3em] text-[11px] font-bold">
                    {categoryLabels[cat]}
                  </span>
                  <span
                    className={`
                text-xs font-mono px-1.5 py-0.5 rounded border
                ${
                  active
                    ? "border-brand-black/20 bg-brand-black/10 text-brand-black"
                    : "border-white/20 bg-white/10 text-white"
                }
            `}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Signature Strip */}
          {displayedItems.some((item) => item.isSignature) && (
            <div className="mb-14 md:mb-16">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-12 bg-brand-gold/50" />
                  <span className="text-brand-black font-mono text-xs tracking-[0.3em] uppercase">
                    Chef&apos;s Table
                  </span>
                </div>
                <Link
                  href="/build"
                  className="text-xs uppercase tracking-[0.3em] text-brand-black hover:text-brand-gold transition-colors"
                >
                  Build Your Own
                </Link>
              </div>
              <div className="grid grid-flow-col auto-cols-[260px] md:auto-cols-[320px] gap-4 overflow-x-auto no-scrollbar pb-4">
                {displayedItems
                  .filter((item) => item.isSignature)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-black/5 rounded-2xl p-4 relative overflow-hidden card-hover shadow-sm"
                    >
                      <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-3 left-3 bg-brand-gold text-black text-[10px] font-bold uppercase tracking-[0.3em] px-3 py-1 rounded-full shadow-sm">
                          Signature
                        </div>
                        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-brand-black font-bold shadow-sm">
                          {item.price}
                        </div>
                      </div>
                      <h3 className="text-lg font-display text-brand-black mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-brand-black line-clamp-2 mb-4 h-10">
                        {item.description}
                      </p>
                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={!isOpen}
                        className={`w-full font-display font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs py-3 rounded-full transition-all ${
                          isOpen
                            ? "bg-brand-black text-white hover:bg-brand-gold hover:text-black shadow-md"
                            : "bg-gray-100 text-brand-black cursor-not-allowed"
                        }`}
                      >
                        {isOpen ? "Add to Order" : "Closed"}
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-8 gap-y-10 md:gap-y-16">
            {displayedItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative aspect-[4/5] mb-4 md:mb-6 overflow-hidden bg-white/50 group-hover:shadow-xl transition-all rounded-2xl border border-black/10">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 top-0 flex justify-between p-3">
                    {item.isSignature && (
                      <span className="bg-brand-gold text-black text-[10px] font-bold uppercase tracking-[0.3em] px-3 py-1 rounded-full shadow-sm">
                        Signature
                      </span>
                    )}
                    <span className="bg-white/80 backdrop-blur-md text-brand-black text-[10px] px-3 py-1 rounded-full border border-black/5 font-semibold shadow-sm ml-auto">
                      {item.category}
                    </span>
                  </div>

                  {/* Add to Cart Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isOpen) handleAddToCart(item);
                      }}
                      disabled={!isOpen}
                      className={`${
                        isOpen
                          ? "bg-brand-black text-white hover:bg-brand-gold hover:text-black hover:scale-105 shadow-xl"
                          : "bg-gray-200 text-brand-black cursor-not-allowed"
                      } px-5 py-3 rounded-full font-display font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0`}
                    >
                      {isOpen && <Plus size={14} />}
                      {isOpen ? "Add" : "Closed"}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2 gap-1 md:gap-0">
                  <h3 className="text-lg md:text-xl font-display font-bold text-brand-black leading-tight group-hover:text-brand-gold transition-colors">
                    {item.name}
                  </h3>
                  <span className="font-mono text-brand-black text-sm md:text-base font-bold bg-white/50 px-2 rounded-md">
                    {item.price}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-brand-black font-medium leading-relaxed mb-3 md:mb-4 max-w-md line-clamp-3 md:line-clamp-none">
                  {item.description}
                </p>

                <div className="flex items-center gap-2 text-[10px] md:text-xs text-brand-black uppercase tracking-wider font-bold opacity-80">
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                  {item.chefNote || "Chef curated"}
                </div>
              </motion.div>
            ))}

            {/* Sentinel for Infinite Scroll */}
            {hasMore && (
              <motion.div
                onViewportEnter={loadMore}
                className="col-span-full h-20 flex justify-center items-center"
              >
                <div
                  className="w-2 h-2 bg-brand-gold rounded-full animate-bounce"
                  style={{ animationDelay: "0s" }}
                />
                <div
                  className="w-2 h-2 bg-brand-gold rounded-full animate-bounce mx-1"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-2 h-2 bg-brand-gold rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </motion.div>
            )}
          </div>

          <div className="mt-16 text-center">
            <Link href="/build">
              <button className="px-10 py-5 border border-brand-black/10 hover:border-brand-black text-brand-black hover:text-brand-black font-display font-bold tracking-widest uppercase transition-all">
                Build Your Own
              </button>
            </Link>
          </div>
        </main>

        <Footer />

        {/* Sticky Build Your Own Button */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 z-40 w-1/2 md:w-auto px-0 md:px-0"
        >
          <Link href="/build">
            <button className="w-full md:w-auto bg-brand-black text-brand-gold px-4 py-3 md:px-8 md:py-4 rounded-full font-display font-bold tracking-widest uppercase text-sm md:text-base shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 border border-white/10">
              <span>Build Your Own</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="md:w-5 md:h-5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
