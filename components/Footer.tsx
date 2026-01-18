import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full relative overflow-hidden bg-gradient-to-b from-brand-black via-brand-night to-black text-brand-cream border-t border-white/5">
            <div className="grain-layer" />

            <div className="max-w-7xl mx-auto px-6 py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 relative z-10">
                <div className="space-y-3 md:space-y-5">
                    <p className="text-sm tracking-[0.3em] uppercase text-brand-gold font-bold">Habiburrito</p>
                    <p className="text-base md:text-xl text-gray-200 leading-relaxed">
                        Fire-kissed halal burritos, bowls, and street classics — crafted in Haverhill/Bradford.
                    </p>
                    <div className="flex gap-3">
                        <Link
                            href="https://instagram.com/habiburrito"
                            aria-label="Instagram"
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-300 hover:text-brand-black hover:bg-brand-gold hover:border-brand-gold transition-all duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </Link>
                        <Link
                            href="https://facebook.com/habiburrito"
                            aria-label="Facebook"
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-300 hover:text-brand-black hover:bg-brand-gold hover:border-brand-gold transition-all duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </Link>
                        <Link
                            href="https://twitter.com/habiburrito"
                            aria-label="Twitter"
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-300 hover:text-brand-black hover:bg-brand-gold hover:border-brand-gold transition-all duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                        </Link>
                        <Link
                            href="https://tiktok.com/@habiburrito"
                            aria-label="TikTok"
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-300 hover:text-brand-black hover:bg-brand-gold hover:border-brand-gold transition-all duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                        </Link>
                    </div>
                </div>

                <div className="space-y-3 md:space-y-5">
                    <p className="text-base tracking-[0.3em] uppercase text-brand-gold font-bold">Visit</p>
                    <div className="space-y-3 text-sm md:text-lg text-gray-200">
                        <p className="text-white font-semibold leading-snug">124 S Main St, Bradford, MA 01835</p>
                        <p className="text-brand-gold font-mono text-sm md:text-lg">+1 (978) 000-0000</p>
                        <Link href="mailto:admin@habiburrito.com" className="underline underline-offset-4 decoration-brand-gold hover:text-brand-gold transition-colors">
                            admin@habiburrito.com
                        </Link>
                    </div>
                </div>

                <div className="space-y-3 md:space-y-5">
                    <p className="text-base tracking-[0.3em] uppercase text-brand-gold font-bold">Hours</p>
                    <div className="space-y-3 text-sm md:text-lg text-gray-200">
                        <p className="flex items-center justify-between gap-3">
                            <span>Sun – Thu</span>
                            <span className="font-mono text-brand-gold">11am – 11pm</span>
                        </p>
                        <p className="flex items-center justify-between gap-3">
                            <span>Fri – Sat</span>
                            <span className="font-mono text-brand-gold font-bold">11am – 12am</span>
                        </p>
                    </div>
                </div>

                <div className="space-y-3 md:space-y-5">
                    <p className="text-base tracking-[0.3em] uppercase text-brand-gold font-bold">Ordering</p>
                    <div className="space-y-3 text-sm md:text-lg text-gray-200">
                        <Link href="/order" className="hover:text-brand-gold transition-colors block">Order Online</Link>

                        <Link href="/faq" className="hover:text-brand-gold transition-colors block">FAQs</Link>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/5 py-6 md:py-8 text-center text-gray-300 text-sm md:text-base relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-sm md:text-lg text-white/80">© {year} Habiburrito — Premium Halal Kitchen</p>
                    <div className="flex gap-4 text-sm md:text-base text-gray-300">
                        <Link href="/privacy" className="hover:text-brand-gold transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-brand-gold transition-colors">Terms</Link>
                        <Link href="/accessibility" className="hover:text-brand-gold transition-colors">Accessibility</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
