import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="w-full py-4 px-8 flex justify-between items-center bg-white shadow-sm">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold tracking-wider text-brand-green">HABIBURRITO</h1>
            </div>

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
