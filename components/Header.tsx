import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
    return (
        <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
            <div className="container mx-auto px-6 py-6 flex justify-between items-center">
                <Link href="/" className="flex items-center group">
                    <div className="relative h-16 w-48 transition-transform duration-500 group-hover:scale-105">
                        <Image
                            src="/logo.jpg"
                            alt="Habiburrito Logo"
                            fill
                            className="object-contain object-left drop-shadow-xl"
                            priority
                        />
                    </div>
                </Link>

                <nav className="hidden md:flex items-center gap-10">
                    {['MENU', 'OUR STORY', 'LOCATIONS'].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase().replace(' ', '-')}`}
                            className="text-white/90 hover:text-brand-gold font-heading tracking-[0.2em] text-sm font-bold transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full"
                        >
                            {item}
                        </Link>
                    ))}

                    <Link
                        href="/order"
                        className="bg-brand-gold text-brand-black px-8 py-3 rounded-none font-heading font-bold tracking-widest hover:bg-white transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    >
                        ORDER ONLINE
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
