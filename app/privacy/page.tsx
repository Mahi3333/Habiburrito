'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-black text-brand-cream flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-4xl space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-display font-bold text-white">Privacy Policy</h1>
            <p className="text-sm text-gray-300">Last updated: {new Date().getFullYear()}</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-display text-white">What we collect</h2>
            <p className="text-gray-200">
              We collect the basics needed to process your order and protect against fraud: your name (optional), phone number, email, and order details.
              We do not store your full payment card details; payments are handled by our payment processor.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display text-white">How we use it</h2>
            <ul className="list-disc pl-5 text-gray-200 space-y-2">
              <li>Process pickup orders and provide order updates.</li>
              <li>Verify and prevent fraudulent or abusive orders.</li>
              <li>Respond to support requests.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display text-white">Sharing</h2>
            <p className="text-gray-200">
              We share data only with service providers that help us run the site (hosting, analytics, payments). We do not sell or rent your personal information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display text-white">Retention</h2>
            <p className="text-gray-200">
              Order/contact data may be kept for a reasonable period to resolve disputes and prevent fraud. If you want your contact details deleted, reach out and we will remove them unless we are required to retain them.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display text-white">Security</h2>
            <p className="text-gray-200">
              We use reasonable technical and organizational measures to protect data, but no method is 100% secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display text-white">Your choices</h2>
            <p className="text-gray-200">
              To request access, correction, or deletion of your contact info, email us at <a href="mailto:admin@habiburrito.com" className="text-brand-gold underline">admin@habiburrito.com</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-display text-white">Kids</h2>
            <p className="text-gray-200">
              Our site is not directed to children under 13, and we do not knowingly collect data from them.
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
