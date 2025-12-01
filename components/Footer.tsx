import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-background-light py-12 px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Location & Hours */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-brand-green">Location & Hours</h3>
                    <div className="text-gray-700">
                        <p>123 Burrito Lane</p>
                        <p>Food City, FC 12345</p>
                        <div className="mt-4">
                            <p>Mon-Sun: 11:00 AM - 10:00 PM</p>
                        </div>
                    </div>
                </div>

                {/* Policies */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-brand-green">Policies</h3>
                    <ul className="text-gray-700 space-y-2">
                        <li>
                            <a href="#" className="hover:text-brand-orange transition-colors">Gratuity Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-brand-orange transition-colors">Accessibility</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-brand-orange transition-colors">Terms of Service</a>
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-brand-green">Connect With Us</h3>
                    <div className="flex gap-4">
                        {/* Social Icons Placeholders */}
                        <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-brand-orange transition-colors">
                            <span>IG</span>
                        </div>
                        <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-brand-orange transition-colors">
                            <span>FB</span>
                        </div>
                        <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-brand-orange transition-colors">
                            <span>TT</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-300 text-center text-gray-600">
                <p>&copy; {new Date().getFullYear()} Habiburrito. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
