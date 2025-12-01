/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './context/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'brand-black': '#050505',
                'brand-dark-gray': '#121212',
                'brand-gold': '#D4AF37',
                'brand-orange': '#E65100', // Deeper, richer orange
                'brand-cream': '#F5F5DC',
            },
            backgroundImage: {
                'premium-gradient': 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.95))',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                heading: ['var(--font-outfit)', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
