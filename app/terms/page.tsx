'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-black text-brand-cream flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-4xl space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-display font-bold text-white">Terms of Service</h1>
            <p className="text-sm text-gray-400">Last updated: {new Date().getFullYear()}</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-display text-white">Service</h2>
            <p className="text-gray-200">
              We provide pickup ordering (and limited dine-in) for our halal menu. Availability, items, and pricing may change.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display text-white">Orders & Payments</h2>
            <ul className="list-disc pl-5 text-gray-200 space-y-2">
              <li>Orders are subject to acceptance and availability.</li>
              <li>Pricing errors may be corrected; we will notify you if changes affect your order.</li>
              <li>All sales are pickup; please arrive within the stated window.</li>
              <li>Refunds/cancellations: contact us promptly; we&apos;ll handle reasonable requests case by case.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display text-white">User conduct</h2>
            <p className="text-gray-200">
              Do not place fraudulent, abusive, or deceptive orders. We may refuse service or cancel orders suspected of fraud.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display text-white">Disclaimer & liability</h2>
            <p className="text-gray-200">
              The service is provided &quot;as is&quot; and &quot;as available.&quot; To the fullest extent permitted by law, we disclaim warranties and limit liability for indirect or consequential damages.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display text-white">Contact</h2>
            <p className="text-gray-200">Questions? Email <a href="mailto:admin@habiburrito.com" className="text-brand-gold underline">admin@habiburrito.com</a> or call +1 (978) 000-0000.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
