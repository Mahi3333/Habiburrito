import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
    return (
        <footer className="w-full relative overflow-hidden bg-gradient-to-b from-brand-black via-brand-night to-black text-brand-cream border-t border-white/5">
            <div className="grain-layer"></div>
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
                {/* The Inner Circle (Newsletter) */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <span className="h-[1px] w-8 bg-brand-gold/50"></span>
                        <p className="text-xs tracking-[0.3em] uppercase text-brand-gold font-bold">The Inner Circle</p>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Unlock exclusive invites, secret menu drops, and chef's notes.
                    </p>
                    <form className="group flex items-center gap-2 border-b border-white/20 pb-2 focus-within:border-brand-gold transition-colors">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-transparent border-none outline-none text-white placeholder-gray-600 text-sm w-full"
                        />
                        <button type="submit" className="text-brand-gold group-hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">
                            Join
                        </button>
                    </form>
                </div>

                {/* Hours */}
                <div className="space-y-4">
                    <p className="text-xs tracking-[0.28em] uppercase text-brand-gold">Hours</p>
                    <div className="text-sm text-gray-300 leading-relaxed space-y-2">
                        <div className="flex justify-between max-w-[180px] border-b border-white/5 pb-1">
                            <span>Sun – Thu</span>
                            <span>11:00a – 11:00p</span>
                        </div>
                        <div className="flex justify-between max-w-[180px] text-white font-medium border-b border-white/5 pb-1">
                            <span>Fri – Sat</span>
                            <span>11:00a – 12:00a</span>
                        </div>
                    </div>
                </div>

                {/* Social Media Section */}
                <div className="flex flex-col gap-6 md:col-span-2 md:items-end">
                    <h3 className="text-xl font-display font-bold text-brand-gold tracking-widest uppercase">Connect</h3>
                    <div className="flex gap-4">
                        {/* Instagram */}
                        <Link href="https://instagram.com/habiburrito" className="w-12 h-12 rounded-full border border-gray-800 bg-brand-charcoal flex items-center justify-center text-gray-400 hover:text-brand-black hover:bg-brand-gold hover:border-brand-gold transition-all duration-300 group" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </Link>
                        {/* Facebook */}
                        <Link href="https://facebook.com/habiburrito" className="w-12 h-12 rounded-full border border-gray-800 bg-brand-charcoal flex items-center justify-center text-gray-400 hover:text-brand-black hover:bg-brand-gold hover:border-brand-gold transition-all duration-300 group" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </Link>
                        {/* Twitter/X */}
                        <Link href="https://twitter.com/habiburrito" className="w-12 h-12 rounded-full border border-gray-800 bg-brand-charcoal flex items-center justify-center text-gray-400 hover:text-brand-black hover:bg-brand-gold hover:border-brand-gold transition-all duration-300 group" aria-label="Twitter">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                        </Link>
                        {/* TikTok */}
                        <Link href="https://tiktok.com/@habiburrito" className="w-12 h-12 rounded-full border border-gray-800 bg-brand-charcoal flex items-center justify-center text-gray-400 hover:text-brand-black hover:bg-brand-gold hover:border-brand-gold transition-all duration-300 group" aria-label="TikTok">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                        </Link>
                    </div>
                    <p className="text-sm text-gray-500 mt-4 text-right max-w-xs ml-auto">
                        Follow our journey for exclusive offers and behind-the-scenes content.
                    </p>
                </div>
            </div>

            <div className="border-t border-white/5 py-6 text-center text-gray-500 text-sm relative z-10">
                <p>© {new Date().getFullYear()} Habiburrito · Premium Halal Kitchen · Crafted with gold-label hospitality.</p>
            </div>
        </footer>
    );
};

export default Footer;
