'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-brand-black text-brand-cream flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-4xl space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-display font-bold text-white">Accessibility</h1>
            <p className="text-sm text-gray-300">Last updated: {new Date().getFullYear()}</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-display text-white">Our commitment</h2>
            <p className="text-gray-200">
              We want everyone to be able to browse our menu and place pickup orders. We aim to follow accessible, semantic HTML, provide alt text for images, and keep contrast high.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display text-white">What we&apos;re doing</h2>
            <ul className="list-disc pl-5 text-gray-200 space-y-2">
              <li>Keyboard-friendly navigation and focus states.</li>
              <li>Alt text on meaningful images.</li>
              <li>Readable fonts and sufficient color contrast.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display text-white">Feedback</h2>
            <p className="text-gray-200">
              If you experience accessibility issues, tell us what page and what assistive technology you use. We will work to fix it.
            </p>
            <p className="text-gray-200">
              Contact: <a href="mailto:admin@habiburrito.com" className="text-brand-gold underline">admin@habiburrito.com</a> or call +1 (978) 000-0000.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
