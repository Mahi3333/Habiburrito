import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full relative overflow-hidden bg-gradient-to-b from-brand-black via-brand-night to-black text-brand-cream border-t border-white/5">
            <div className="grain-layer"></div>
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
                {/* Concierge */}
                <div className="space-y-4">
                    <p className="text-xs tracking-[0.3em] uppercase text-brand-gold">Concierge</p>
                    <h3 className="text-2xl font-display text-white leading-tight">Habiburrito House</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Ember-lit hospitality, charcoal aromas, and chef-led craftsmanship for the halal gourmand.
                    </p>
                    <div className="flex items-center gap-3 text-sm text-brand-gold">
                        <span className="w-2 h-2 rounded-full bg-brand-jade animate-pulse"></span>
                        <span>WhatsApp Concierge · +1 (555) 333-0999</span>
                    </div>
                </div>

                {/* Reservations & WhatsApp */}
                <div className="space-y-3">
                    <p className="text-xs tracking-[0.28em] uppercase text-brand-gold">Book</p>
                    <div className="space-y-2">
                        <a href="/our-story#reserve" className="block parallax-hover bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm hover:border-brand-gold/50">
                            Reserve a Chef’s Table
                        </a>
                        <a href="https://wa.me/15553330999" className="block parallax-hover bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm hover:border-brand-jade/60">
                            Order via WhatsApp
                        </a>
                        <a href="/locations" className="block parallax-hover bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm hover:border-brand-ember/60">
                            Find a late-night location
                        </a>
                    </div>
                </div>

                {/* Hours & Policies */}
                <div className="space-y-3">
                    <p className="text-xs tracking-[0.28em] uppercase text-brand-gold">Hours</p>
                    <div className="text-sm text-gray-300 leading-relaxed">
                        <p>Mon – Thu: 11:00a – 11:00p</p>
                        <p>Fri – Sat: 11:00a – 1:00a</p>
                        <p>Sun: 12:00p – 10:00p</p>
                    </div>
                    <div className="pt-4 space-y-2 text-sm text-gray-400">
                        <a href="#" className="hover:text-brand-gold transition-colors">Gratuity & Chef Experience</a>
                        <a href="#" className="hover:text-brand-gold transition-colors">Accessibility & Allergen Guide</a>
                        <a href="#" className="hover:text-brand-gold transition-colors">Privacy & Terms</a>
                    </div>
                </div>

                {/* Loyalty & Social */}
                <div className="space-y-3">
                    <p className="text-xs tracking-[0.28em] uppercase text-brand-gold">Circle</p>
                    <div className="space-y-2">
                        <a href="/our-story#loyalty" className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm hover:border-brand-gold/60 transition-all">
                            Ember Loyalty <span className="text-brand-gold text-xs">Earn 2x after 9p</span>
                        </a>
                        <a href="/menu" className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm hover:border-brand-jade/60 transition-all">
                            Midnight Chef Drops <span className="text-brand-jade text-xs">Limited nightly</span>
                        </a>
                    </div>
                    <div className="flex gap-3 pt-2">
                        {['IG', 'TT', 'YT'].map((social) => (
                            <div key={social} className="w-10 h-10 rounded-full border border-white/15 text-white flex items-center justify-center text-xs tracking-[0.2em] hover:border-brand-gold hover:text-brand-gold transition-colors">
                                {social}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-white/5 py-6 text-center text-gray-500 text-sm relative z-10">
                <p>&copy; {new Date().getFullYear()} Habiburrito · Charcoal Halal Taqueria · Crafted with gold-label hospitality.</p>
            </div>
        </footer>
    );
};

export default Footer;
