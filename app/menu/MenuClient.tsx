"use client";

import React, { useState, useMemo } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { Plus, Minus, Edit2, ChefHat } from "lucide-react";
import { useStoreStatus } from "../../app/hooks/useStoreStatus";
import BuildModal from "../../components/BuildModal";

// Interface must match transformation in page.tsx
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  chefNote: string;
  isSignature: boolean;
  includedItems?: string[];
  modifierGroups?: {
    id: number;
    name: string;
    min: number;
    max: number;
    required: boolean;
    options: {
      id: number;
      name: string;
      price: number;
    }[];
  }[];
}

interface MenuClientProps {
  initialMenuItems: MenuItem[];
}

// Utility to Title Case
const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

// --- Sub-Components ---

const ItemCard = ({ item, isOpen, onAdd, onRemove, onCustomize, quantity }: {
  item: MenuItem;
  isOpen: boolean;
  onAdd: () => void;
  onRemove: () => void;
  onCustomize: () => void;
  quantity: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white/5 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden hover:border-brand-gold/30 transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-brand-gold/5"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] md:aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-transparent to-transparent opacity-60" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {item.isSignature && (
            <span className="bg-brand-gold text-black text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              <ChefHat size={12} /> Signature
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-display font-bold text-white leading-tight pr-2">
            {toTitleCase(item.name)}
          </h3>
          <span className="font-mono text-brand-gold font-bold text-base whitespace-nowrap">
            {item.price}
          </span>
        </div>

        <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Included Items List (if any) */}
        {item.includedItems && item.includedItems.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-1">
            {item.includedItems.slice(0, 5).map((inc, i) => (
              <span key={i} className="text-[10px] uppercase font-bold text-gray-500 bg-white/5 px-2 py-1 rounded-full border border-white/5">
                {inc}
              </span>
            ))}
            {item.includedItems.length > 5 && (
              <span className="text-[10px] text-gray-500 py-1 pl-1">+{item.includedItems.length - 5} more</span>
            )}
          </div>
        )}

        {/* Spacer to push actions down */}
        <div className="flex-grow" />

        {/* Actions */}
        <div className="pt-4 border-t border-white/5 flex flex-col gap-3">

          {item.category !== 'Sides' && (
            <button
              onClick={(e) => { e.stopPropagation(); onCustomize(); }}
              className="w-full py-1.5 rounded-lg border border-white/10 text-white hover:border-brand-gold hover:text-brand-gold text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
            >
              <Edit2 size={12} /> Customize
            </button>
          )}

          <div className="flex items-center justify-between gap-3">
            {/* Quantity Stepper */}
            {isOpen ? (
              <div className="flex items-center bg-black/40 rounded-full border border-white/10 p-0.5">
                <button
                  onClick={(e) => { e.stopPropagation(); onRemove(); }}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors disabled:opacity-30"
                  disabled={quantity === 0}
                >
                  <Minus size={12} />
                </button>
                <span className="w-6 text-center font-mono text-white text-xs">
                  {quantity}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); onAdd(); }}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 text-brand-gold transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>
            ) : (
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold py-1">Closed</span>
            )}

            {/* Direct Add Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd(); // Simple add 1
              }}
              disabled={!isOpen}
              className={`
                                flex-1 py-1.5 rounded-full font-display font-bold uppercase tracking-widest text-[10px] transition-all
                                ${quantity > 0
                  ? 'bg-brand-gold text-black hover:bg-white'
                  : 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20 hover:bg-brand-gold hover:text-black'}
                            `}
            >
              {quantity > 0 ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Client Component ---

export default function MenuClient({ initialMenuItems }: MenuClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);

  const { addItemToCart } = useCart();
  const { isOpen } = useStoreStatus();

  // Extract Categories with enforced order
  const categories = useMemo(() => {
    const dynamicCats = Array.from(new Set(initialMenuItems.map(i => i.category)));
    const fixedOrder = ['Bowls', 'Wraps & Burritos', 'Quesadillas', 'Sides'];

    // Merge: Filter dynamic cats to remove ones firmly in fixedOrder
    // Then append any leftovers (like 'Drinks' if it exists dynamically)
    const otherCats = dynamicCats.filter(c => !fixedOrder.includes(c));

    // Final explicit order as requested
    return ["All", ...fixedOrder, ...otherCats];
  }, [initialMenuItems]);

  // Filter Logic
  const displayedItems = useMemo(() => {
    if (activeCategory === "All") return [];
    return initialMenuItems.filter(i => i.category === activeCategory);
  }, [activeCategory, initialMenuItems]);

  // Counts for Category Cards
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    initialMenuItems.forEach(i => {
      counts[i.category] = (counts[i.category] || 0) + 1;
    });
    return counts;
  }, [initialMenuItems]);

  // Handlers
  const updateQuantity = (id: number, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const handleSimpleAdd = (item: MenuItem) => {
    const qty = quantities[item.id] || 1;
    const price = parseFloat(item.price.replace("$", ""));
    // Safe ID generation for non-secure contexts (e.g. mobile testing on HTTP)
    const uniqueId = `${item.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    addItemToCart({
      uniqueId,
      base: { id: item.id, name: item.name, base_price: price },
      rice: null, protein: null, toppings: [], sauces: [], addons: [], extras: [],
      totalPrice: price * qty,
      quantity: qty
    });
    setQuantities(prev => ({ ...prev, [item.id]: 0 }));
  };

  // Open Modal
  const openBuildModal = (item: MenuItem) => {
    setSelectedItemForModal(item);
    setIsModalOpen(true);
  };

  const buildCategories = ['Bowls', 'Wraps & Burritos', 'Quesadillas'];
  const buildKeywords = ['build', 'create', 'custom'];
  const isBuildItem = (menuItem: MenuItem) => {
    const name = menuItem.name.toLowerCase();
    return buildKeywords.some(keyword => name.includes(keyword));
  };

  // Find "Build Your Own" item for a category
  // Helper to match "Build Your Own Wrap" item to "Wraps/Burritos" category
  const findBuildItem = (category: string) => {
    return initialMenuItems.find(i => {
      // Strict match for category
      if (i.category !== category) return false;

      // Check if it's a build item
      return isBuildItem(i);
    });
  };

  // Add from Modal
  const handleModalAddToCart = (finalItem: any) => {
    // Safe ID generation
    const uniqueId = `${finalItem.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const customization = finalItem.customization || {};
    const getFirst = (group: string) => customization[group]?.[0] || null;
    const getAll = (group: string) => customization[group] || [];

    addItemToCart({
      uniqueId,
      base: { id: finalItem.id, name: finalItem.name, base_price: parseFloat(finalItem.price.replace('$', '')) },
      customization: finalItem.customization,
      rice: getFirst('Habiburrito Base') || getFirst('Base'),
      protein: getFirst('Habiburrito Protein Choice') || getFirst('Proteins'),
      toppings: [...getAll('Habiburrito Veggie Choices'), ...getAll('Veg & Toppings')],
      sauces: getAll('Habiburrito Sauce Choices') || getAll('Sauces'),
      addons: [],
      extras: [],
      totalPrice: finalItem.totalPrice,
      quantity: finalItem.quantity
    });
  };

  return (
    <div className="min-h-screen bg-brand-black text-brand-cream selection:bg-brand-gold selection:text-black overflow-x-hidden">
      <Header />

      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/background_bowls_blur.png" alt="bg" fill className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/95 to-brand-black" />
      </div>

      <main className="pt-32 md:pt-40 pb-4 container mx-auto px-4 md:px-6 relative z-10">

        {/* Navigation - Improved Sticky & Scroll */}
        <div className="sticky top-[72px] md:top-24 z-40 mb-4 md:mb-8 py-2 bg-brand-black/90 backdrop-blur-xl border-y border-white/5 -mx-4 px-4 md:mx-0 md:px-6 md:rounded-full md:border overflow-x-auto overflow-y-hidden touch-pan-x snap-x scrollbar-thin scrollbar-thumb-white/20 hover:scrollbar-thumb-brand-gold/50 scrollbar-track-transparent">
          <div className="flex gap-2 md:gap-4 min-w-max md:min-w-0 md:w-full">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                            px-4 py-1.5 rounded-full font-display font-bold uppercase tracking-widest text-sm md:text-base transition-all whitespace-nowrap snap-start
                            ${activeCategory === cat
                    ? 'bg-brand-gold text-black shadow-[0_0_20px_rgba(198,168,124,0.4)]'
                    : 'text-gray-400 hover:text-white bg-white/5 border border-transparent hover:border-white/10'}
                        `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="min-h-[60vh]">

          {/* ALL VIEW */}
          {activeCategory === "All" && (
            <div className="flex flex-col gap-6">

              {/* 1. Build Your Own Card - Custom Prominent Card */}
              <div
                className="bg-brand-gold/10 border border-brand-gold/30 rounded-3xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 hover:bg-brand-gold/20 transition-all cursor-pointer group relative overflow-hidden min-h-[140px] md:min-h-[180px]"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 bg-[url('/background_create.png')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                <div className="relative z-10 text-center md:text-left">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-white mb-1 md:mb-2">Build Your Own</h2>
                  <p className="text-gray-300 text-sm md:text-base max-w-xl">Craft your masterpiece from scratch. Choose your base, proteins, and unlimited toppings.</p>
                </div>

                <div className="relative z-10 flex gap-2 md:gap-4 flex-wrap justify-center">
                  {['Bowls', 'Wraps & Burritos', 'Quesadillas'].map(cat => {
                    const buildItem = findBuildItem(cat);
                    return (
                      <button
                        key={cat}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (buildItem) openBuildModal(buildItem);
                        }}
                        disabled={!buildItem}
                        className={`px-3 md:px-5 py-1.5 md:py-2 bg-brand-gold text-black font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-lg text-xs md:text-sm ${!buildItem ? 'opacity-50 cursor-not-allowed grayscale' : ''
                          }`}
                      >
                        Build {cat.replace('Wraps & Burritos', 'Burrito')}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 2. Category Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {['Bowls', 'Wraps & Burritos', 'Quesadillas', 'Sides'].map((cat, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveCategory(cat)}
                    className="group cursor-pointer relative h-48 rounded-2xl overflow-hidden border border-white/10 hover:border-brand-gold/50 transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-brand-charcoal hover:scale-105 transition-transform duration-700">
                      <Image
                        src={
                          cat === 'Bowls' ? '/background_bowls_blur.png' :
                            (cat === 'Wraps/Burritos' || cat === 'Wraps & Burritos') ? '/background_burritos_blur.png' :
                              cat === 'Quesadillas' ? '/background_tacos_blur.png' :
                                cat === 'Sides' ? '/background_bowls_blur.png' :
                                  '/background_tacos_blur.png' // Fallback
                        }
                        alt={cat}
                        fill
                        className="object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </div>

                    <div className="absolute bottom-0 left-0 p-4 w-full">
                      <div className="flex justify-between items-end">
                        <div>
                          <h2 className="text-2xl font-display font-bold text-white mb-0.5 group-hover:text-brand-gold transition-colors">
                            {cat}
                          </h2>
                          <span className="text-gray-400 font-mono text-[10px] tracking-widest uppercase">
                            {categoryCounts[cat] || 0} Items
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-brand-gold group-hover:text-black transition-colors">
                          <Plus size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CATEGORY VIEW */}
          {activeCategory !== "All" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-end justify-between border-b border-white/5 pb-4 mb-8">
                <div>
                  <h2 className="text-4xl font-display font-bold text-white mb-2">{activeCategory}</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
                {/* Insert "Build Your Own" for this category as first item if it exists */}
                {(() => {
                  const buildItem = findBuildItem(activeCategory);
                  if (buildItem) {
                    return (
                      <div
                        onClick={() => openBuildModal(buildItem)}
                        className="cursor-pointer border border-dashed border-brand-gold/30 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:bg-brand-gold/5 transition-colors min-h-[400px]"
                      >
                        <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-4">
                          <Edit2 size={32} />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-white mb-2">Build Your Own {activeCategory.slice(0, -1)}</h3>
                        <p className="text-gray-400 text-sm mb-6">Fully custom. You are the chef.</p>
                        <button className="px-6 py-2 bg-brand-gold text-black uppercase font-bold tracking-widest text-xs rounded-full">
                          Start Building
                        </button>
                      </div>
                    );
                  }
                  return null;
                })()}

                {displayedItems.filter(i => !isBuildItem(i)).map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    isOpen={isOpen}
                    quantity={quantities[item.id] || 0}
                    onAdd={() => handleSimpleAdd(item)} // Or updateQuantity logic? 
                    onRemove={() => updateQuantity(item.id, -1)}
                    onCustomize={() => openBuildModal(item)}
                  />
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </main>

      <Footer />

      {/* Build Modal */}
      {selectedItemForModal && (
        <BuildModal
          item={selectedItemForModal}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={handleModalAddToCart}
        />
      )}

    </div>
  );
}
