'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background-light flex flex-col font-sans">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-background-light to-gray-100">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-extrabold text-brand-green tracking-tight leading-tight">
            Welcome to <span className="text-brand-orange">Habiburrito</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-2xl mx-auto">
            Build Your Own Halal Meal. Fresh ingredients, bold flavors, made just for you.
          </p>

          <div className="pt-8">
            <Link href="/build" className="inline-block transform hover:scale-105 transition-transform duration-300">
              <button className="bg-brand-orange text-white text-xl md:text-2xl font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl hover:bg-orange-600 transition-all flex items-center gap-3">
                START YOUR ORDER 🌯
              </button>
            </Link>
          </div>
        </div>

        {/* Decorative elements or features could go here */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full text-left">
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-brand-green">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Fresh Ingredients</h3>
            <p className="text-gray-600">We source the finest halal meats and freshest produce daily.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-brand-orange">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Fully Customizable</h3>
            <p className="text-gray-600">Build your burrito, bowl, or salad exactly how you like it.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-brand-green">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Fast & Friendly</h3>
            <p className="text-gray-600">Order online and pick up your delicious meal in minutes.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
