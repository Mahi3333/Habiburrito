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
      <div className="relative aspect-[4/3] overflow-hidden">
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
      <div className="p-4 flex flex-col flex-grow">
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

  // Extract Categories
  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(initialMenuItems.map(i => i.category)));
    // Sort: Standard then Sides last
    const standard = uniqueCats.filter(c => c !== "Sides").sort();
    const sides = uniqueCats.filter(c => c === "Sides");
    return ["All", ...standard, ...sides];
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

      // Should we auto-add when user hits +? 
      // Current logic: Stepper only updates LOCAL state. 
      // Button commits it. 
      // Re-aligning with "Add" button logic in ItemCard.

      if (delta > 0 && current === 0) {
        // First click adds to cart immediately for simpler UX? 
        // Or keep as staging. Let's keep as staging for bulk changes, 
        // but standard user flow is + then Add.
      }

      return { ...prev, [id]: next };
    });
  };

  const handleSimpleAdd = (item: MenuItem) => {
    const qty = quantities[item.id] || 1;
    const price = parseFloat(item.price.replace("$", ""));
    const uniqueId = `${item.id}-${crypto.randomUUID()}`;

    addItemToCart({
      uniqueId,
      base: { id: item.id, name: item.name, base_price: price },
      rice: null, protein: null, toppings: [], sauces: [], addons: [], extras: [],
      totalPrice: price * qty,
      quantity: qty
    });
    setQuantities(prev => ({ ...prev, [item.id]: 0 })); // Reset local
  };

  // Open Modal
  const openBuildModal = (item: MenuItem) => {
    setSelectedItemForModal(item);
    setIsModalOpen(true);
  };

  // Find "Build Your Own" item for a category
  const findBuildItem = (category: string) => {
    // Look for item with "Build" in name
    return initialMenuItems.find(i =>
      i.category === category && i.name.toLowerCase().includes('build')
    );
  };

  // Add from Modal
  const handleModalAddToCart = (finalItem: any) => {
    const uniqueId = `${finalItem.id}-${crypto.randomUUID()}`;

    // Transform Modal's rich structure to Cart Context structure
    // CartContext expects: rice, protein, toppings, etc. 
    // We need to map `customization` (which is group-based) to these keys.

    const customization = finalItem.customization || {};

    // Mapping helper
    const getFirst = (group: string) => customization[group]?.[0] || null;
    const getAll = (group: string) => customization[group] || [];

    // Try to map specific groups if they exist in customization
    // This dependency on exact group names from DB is why naming consistency matters.
    // DB Groups: 'base', 'protein', 'sauces', 'veg_toppings' (or 'veg'), 'cheese', 'beans'

    addItemToCart({
      uniqueId,
      base: { id: finalItem.id, name: finalItem.name, base_price: parseFloat(finalItem.price.replace('$', '')) },

      // Pass the full customization object for the updated CartPage to use
      customization: finalItem.customization,

      // Legacy mapping (best effort, can be ignored by new CartPage logic)
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
    <div className="min-h-screen bg-brand-black text-brand-cream selection:bg-brand-gold selection:text-black">
      <Header />

      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image src="/background_bowls_blur.png" alt="bg" fill className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/95 to-brand-black" />
      </div>

      <main className="pt-32 pb-4 container mx-auto px-6 relative z-10">

        {/* Navigation */}
        <div className="sticky top-24 z-30 mb-8 py-4 bg-brand-black/80 backdrop-blur-xl border-y border-white/5 -mx-6 px-6 md:mx-0 md:px-0 md:rounded-full md:border">
          <div className="flex gap-4 overflow-x-auto no-scrollbar md:justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                            px-6 py-2 rounded-full font-display font-bold uppercase tracking-widest text-xs transition-all whitespace-nowrap
                            ${activeCategory === cat
                    ? 'bg-brand-gold text-black shadow-[0_0_20px_rgba(198,168,124,0.4)]'
                    : 'text-gray-400 hover:text-white'}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

              {/* 1. Build Your Own Card - Custom Prominent Card */}
              <div
                className="col-span-1 md:col-span-2 lg:col-span-4 bg-brand-gold/10 border border-brand-gold/30 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-brand-gold/20 transition-all cursor-pointer group relative overflow-hidden min-h-[180px]"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 bg-[url('/background_create.png')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                <div className="relative z-10">
                  <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-2">Build Your Own</h2>
                  <p className="text-gray-300 text-base max-w-xl">Craft your masterpiece from scratch. Choose your base, proteins, and unlimited toppings.</p>
                </div>

                <div className="relative z-10 flex gap-4 flex-wrap justify-center">
                  {['Bowls', 'Burritos', 'Quesadillas'].map(cat => {
                    const buildItem = findBuildItem(cat);
                    if (!buildItem) return null;
                    return (
                      <button
                        key={cat}
                        onClick={(e) => {
                          e.stopPropagation();
                          openBuildModal(buildItem);
                        }}
                        className="px-5 py-2 bg-brand-gold text-black font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-lg text-sm"
                      >
                        Build {cat.slice(0, -1)}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 2. Category Cards (Reduced Size) */}
              {categories.filter(c => c !== "All").map(cat => (
                <div
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="group cursor-pointer relative h-48 rounded-2xl overflow-hidden border border-white/10 hover:border-brand-gold/50 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-brand-charcoal hover:scale-105 transition-transform duration-700">
                    <Image
                      src={
                        cat === 'Bowls' ? '/background_bowls_blur.png' :
                          cat === 'Burritos' ? '/background_burritos_blur.png' :
                            cat === 'Quesadillas' ? '/background_tacos_blur.png' :
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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

                {displayedItems.filter(i => !i.name.toLowerCase().includes('build')).map(item => (
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
