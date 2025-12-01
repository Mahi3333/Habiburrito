import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
    return (
        <header className="w-full py-4 px-8 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <Link href="/" className="flex items-center">
                <div className="relative h-12 w-48">
                    <Image
                        src="/logo.jpg"
                        alt="Habiburrito Logo"
                        fill
                        className="object-contain object-left"
                        priority
                    />
                </div>
            </Link>

            <nav className="flex items-center gap-6">
                <Link href="/menu" className="text-gray-700 hover:text-brand-orange font-medium transition-colors">
                    MENU
                </Link>

                <Link href="/reserve" className="text-gray-700 hover:text-brand-orange font-medium transition-colors">
                    RESERVE
                </Link>

                <Link
                    href="/order"
                    className="bg-brand-orange text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition-colors"
                >
                    ORDER NOW
                </Link>
            </nav>
        </header>
    );
};

export default Header;
