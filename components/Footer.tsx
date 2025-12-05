import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
    return (
<<<<<<< HEAD
        <footer className="w-full bg-brand-black border-t border-brand-gold/20 pt-20 pb-10 px-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                {/* Brand Column */}
                <div className="space-y-6">
                    <div className="relative h-16 w-48">
                        <Image
                            src="/logo.jpg"
                            alt="Habiburrito Logo"
                            fill
                            className="object-contain object-left"
                        />
=======
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
>>>>>>> origin/main
                    </div>
                    <p className="text-gray-400 font-light leading-relaxed">
                        Elevating fast food with premium Halal ingredients and authentic Mexican flavors. Experience the extraordinary.
                    </p>
                </div>

<<<<<<< HEAD
                {/* Quick Links */}
                <div className="flex flex-col gap-6">
                    <h3 className="text-xl font-heading font-bold text-brand-gold tracking-widest uppercase">Explore</h3>
                    <ul className="space-y-4">
                        {['Menu', 'Our Story', 'Order Online', 'Locations'].map((item) => (
                            <li key={item}>
                                <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-brand-gold transition-colors duration-300 flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-px bg-brand-gold transition-all duration-300"></span>
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact & Hours */}
                <div className="flex flex-col gap-6">
                    <h3 className="text-xl font-heading font-bold text-brand-gold tracking-widest uppercase">Visit Us</h3>
                    <div className="text-gray-400 space-y-4 font-light">
                        <div>
                            <p className="text-white font-medium mb-1">Location</p>
                            <p>124 S Main St, Bradford, MA 01835</p>
                            <p className="text-sm italic mt-1">Inside "Mediterranean Pizza & Roast Beef"</p>
                        </div>
                        <div>
                            <p className="text-white font-medium mb-1">Opening Hours</p>
                            <p>Mon - Thu: 11:00 AM - 11:00 PM</p>
                            <p>Fri - Sat: 11:00 AM - 12:00 AM</p>
                        </div>
=======
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
>>>>>>> origin/main
                    </div>
                </div>

                {/* Newsletter / Social */}
                <div className="flex flex-col gap-6">
                    <h3 className="text-xl font-heading font-bold text-brand-gold tracking-widest uppercase">Connect</h3>
                    <div className="flex gap-4">
                        {/* Instagram */}
                        <a href="#" className="w-12 h-12 rounded-full border border-gray-800 bg-brand-dark-gray flex items-center justify-center text-gray-400 hover:text-brand-black hover:bg-brand-gold hover:border-brand-gold transition-all duration-300 group" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        {/* Facebook */}
                        <a href="#" className="w-12 h-12 rounded-full border border-gray-800 bg-brand-dark-gray flex items-center justify-center text-gray-400 hover:text-brand-black hover:bg-brand-gold hover:border-brand-gold transition-all duration-300 group" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </a>
                        {/* Twitter/X */}
                        <a href="#" className="w-12 h-12 rounded-full border border-gray-800 bg-brand-dark-gray flex items-center justify-center text-gray-400 hover:text-brand-black hover:bg-brand-gold hover:border-brand-gold transition-all duration-300 group" aria-label="Twitter">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                        </a>
                        {/* TikTok */}
                        <a href="#" className="w-12 h-12 rounded-full border border-gray-800 bg-brand-dark-gray flex items-center justify-center text-gray-400 hover:text-brand-black hover:bg-brand-gold hover:border-brand-gold transition-all duration-300 group" aria-label="TikTok">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                        </a>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                        Follow our journey for exclusive offers and behind-the-scenes content.
                    </p>
                </div>
            </div>

<<<<<<< HEAD
            {/* Bottom Bar */}
            <div className="mt-20 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 font-light">
                <p>&copy; {new Date().getFullYear()} Habiburrito. All rights reserved.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
                </div>
=======
            <div className="border-t border-white/5 py-6 text-center text-gray-500 text-sm relative z-10">
                <p>&copy; {new Date().getFullYear()} Habiburrito · Charcoal Halal Taqueria · Crafted with gold-label hospitality.</p>
>>>>>>> origin/main
            </div>
        </footer>
    );
};

export default Footer;
