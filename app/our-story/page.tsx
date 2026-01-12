'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

const IconCheck = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
);
const IconFlame = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5a2.5 2.5 0 0 0 3.5 2.3 2.5 2.5 0 0 0 4-2.3c0-1.5-1.6-3-3.1-4.7l-1.1-1.3-.9 1.2c-1.5 1.9-2.9 3.4-2.9 4.8Z" /><path d="M12 22c4.2-1.5 7-5.2 7-9.4 0-2.3-.9-4.5-2.5-6.1L12 2 7.5 6.5A8.6 8.6 0 0 0 5 12.6C5 16.8 7.8 20.4 12 22Z" /></svg>
);
const IconClock = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
const IconPin = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);

export default function OurStoryPage() {
    const [activeSection, setActiveSection] = useState('story');

    return (
        <div className="min-h-screen bg-brand-night flex flex-col font-sans selection:bg-brand-gold selection:text-black">
            <Header />

            <main className="flex-grow pt-28 pb-16 relative overflow-hidden">
                <div className="grain-layer"></div>
                <div className="container mx-auto px-6">
                    {/* Hero */}
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-black via-brand-charcoal/70 to-brand-black p-8 md:p-12 mb-12 md:mb-16 vignette">
                        <div className="absolute inset-0 opacity-60">
                            <Image
                                src="/menu-items/WhatsApp Image 2025-11-10 at 8.56.31 PM (2).jpeg"
                                alt="Charcoal-fired halal spread"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                            <div className="space-y-4 md:max-w-2xl">
                                <span className="text-brand-gold font-heading tracking-[0.35em] text-xs font-bold uppercase">The Journey</span>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-tight">
                                    Crafting <span className="text-gradient-gold italic">Authenticity</span>
                                </h1>
                                <p className="text-lg text-gray-200 max-w-2xl">
                                    Smoke, spice, and a steadfast Halal promise. Habiburrito blends Mexican street food soul with precise Halal standards.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <span className="pill flex items-center gap-2"><IconCheck /> Halal</span>
                                    <span className="pill flex items-center gap-2"><IconPin /> Haverhill / Bradford</span>
                                    <span className="pill flex items-center gap-2"><IconClock /> Daily 11a–11p</span>
                                </div>
                            </div>
                            <Link href="/menu" className="self-start md:self-end">
                                <button className="group relative overflow-hidden px-8 py-4 rounded-full font-display font-bold tracking-[0.2em] uppercase text-sm bg-brand-gold text-brand-black hover:bg-white transition-colors">
                                    <span className="relative z-10">Order Online</span>
                                    <span className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform" />
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex justify-center gap-4 mb-12 flex-wrap">
                        {[
                            { id: 'story', label: 'Our Story' },
                            { id: 'team', label: 'Our Team' },
                            { id: 'ordering', label: 'Ordering & Delivery' },
                            { id: 'catering', label: 'Catering' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveSection(tab.id)}
                                className={`px-6 py-3 rounded-full text-sm font-medium tracking-widest uppercase transition-all ${activeSection === tab.id
                                    ? 'bg-brand-gold text-black shadow-[0_10px_30px_rgba(212,175,55,0.35)]'
                                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-16">
                        {/* Our Story Section */}
                        {activeSection === 'story' && (
                            <div className="space-y-12">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center card-surface p-8 md:p-10 relative overflow-hidden">
                                    <div className="absolute inset-0 texture-overlay"></div>
                                    <div className="space-y-4 relative z-10">
                                        <p className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold">Origin</p>
                                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                                            Born from fire, guided by faith.
                                        </h2>
                                        <p className="text-gray-300 leading-relaxed">
                                            We started as a passion project to bring honest Mexican street flavors to a Halal community that refused to compromise. Every bowl and burrito is marinated, grilled, and assembled to order—no shortcuts, no filler.
                                        </p>
                                        <ul className="space-y-3 text-gray-200">
                                            {[
                                                'Proteins marinated for hours, grilled over high heat.',
                                                'Fresh salsas, cilantro lime rice, and toppings prepped daily.',
                                                'Built in front of you—your way, every time.'
                                            ].map((item) => (
                                                <li key={item} className="flex items-center gap-3">
                                                    <span className="text-brand-gold bg-brand-gold/10 rounded-full p-1.5">
                                                        <IconCheck />
                                                    </span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="relative h-80 w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                        <Image
                                            src="/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (1).jpeg"
                                            alt="Grilled halal proteins"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                                        <div className="absolute bottom-4 left-4 bg-black/60 px-4 py-2 rounded-full text-xs tracking-[0.3em] uppercase text-white/80">Charcoal Fired</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { title: 'Halal Certified', desc: 'Ethically sourced meats, no alcohol in our kitchen, handled with care.', icon: <IconCheck /> },
                                        { title: 'No Compromise on Flavor', desc: 'Bold spice blends, citrus, and smoke for layered depth.', icon: <IconFlame /> },
                                        { title: 'Trusted Supply Chain', desc: 'Direct relationships with suppliers to keep quality tight.', icon: <IconCheck /> },
                                        { title: 'Clean, Daily Prep', desc: 'Fresh mise en place every day; if it’s not pristine, it’s not served.', icon: <IconClock /> },
                                    ].map((item) => (
                                        <div key={item.title} className="card-surface card-hover p-6 flex gap-4 items-start">
                                            <div className="p-3 rounded-full bg-brand-gold/10 text-brand-gold">{item.icon}</div>
                                            <div>
                                                <h3 className="text-lg font-display text-white mb-2">{item.title}</h3>
                                                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Our Team Section */}
                        {activeSection === 'team' && (
                            <div className="space-y-10">
                                <div className="text-center">
                                    <h2 className="text-4xl font-display font-bold text-white mb-4">Meet Our Team</h2>
                                    <p className="text-gray-300 max-w-2xl mx-auto">
                                        Hospitality-first, flavor-obsessed, and proud to serve the community.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {[
                                        {
                                            name: 'Chef Yusef',
                                            role: 'Executive Chef & Founder',
                                            detail: 'Signature move: slow-marinated lamb finished over charcoal.',
                                            img: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.30 PM (2).jpeg',
                                        },
                                        {
                                            name: 'Maria Rodriguez',
                                            role: 'Head of Operations',
                                            detail: 'Drives the gold-label service playbook and guest flow.',
                                            img: '/menu-items/WhatsApp Image 2025-11-10 at 8.56.29 PM.jpeg',
                                        },
                                    ].map((member) => (
                                        <div key={member.name} className="card-surface card-hover p-6 flex flex-col items-center text-center gap-4">
                                            <div className="w-32 h-32 rounded-full overflow-hidden border border-white/10">
                                                <Image
                                                    src={member.img}
                                                    alt={member.name}
                                                    width={128}
                                                    height={128}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <h3 className="text-xl font-display text-white">{member.name}</h3>
                                                <span className="pill">{member.role}</span>
                                                <p className="text-gray-300 text-sm leading-relaxed">{member.detail}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Ordering & Delivery Section */}
                        {activeSection === 'ordering' && (
                            <div className="space-y-10">
                                <div className="text-center">
                                    <h2 className="text-4xl font-display font-bold text-white mb-4">How to Order</h2>
                                    <p className="text-gray-300 max-w-2xl mx-auto">
                                        Skip the line, swing by, or plan ahead for catering. Simple, fast, and built your way.
                                    </p>
                                </div>

                                <div className="timeline">
                                    {[
                                        {
                                            step: '01',
                                            title: 'Order Your Way',
                                            desc: 'Customize bowls and burritos online or at the counter.',
                                            icon: <IconCheck />,
                                            cta: { label: 'Menu', href: '/menu' },
                                        },
                                        {
                                            step: '02',
                                            title: 'Fire & Prep',
                                            desc: 'Proteins hit the grill; toppings and salsas are assembled fresh.',
                                            icon: <IconFlame />,
                                        },
                                        {
                                            step: '03',
                                            title: 'Pickup & Go',
                                            desc: 'Grab in-store at 124 S Main St. Delivery rolling out soon.',
                                            icon: <IconPin />,
                                            meta: 'Bradford / Haverhill',
                                        },
                                    ].map((item) => (
                                        <div key={item.step} className="timeline-step card-hover" data-step={item.step}>
                                            <div className="flex items-center gap-3">
                                                <div className="p-3 rounded-full bg-brand-gold/10 text-brand-gold">{item.icon}</div>
                                                <h3 className="text-xl font-display text-white">{item.title}</h3>
                                            </div>
                                            <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {item.meta && <span className="pill">{item.meta}</span>}
                                                {item.cta && (
                                                    <Link href={item.cta.href} className="text-brand-gold text-xs tracking-[0.3em] uppercase border-b border-brand-gold pb-1 hover:text-white hover:border-white transition-colors">
                                                        {item.cta.label}
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Catering Section */}
                        {activeSection === 'catering' && (
                            <div className="space-y-10">
                                <div className="text-center">
                                    <h2 className="text-4xl font-display font-bold text-white mb-4">Catering for Any Occasion</h2>
                                    <p className="text-gray-300 max-w-2xl mx-auto">
                                        Burrito bars, bowl spreads, and sides that travel well. We handle the fire; you host.
                                    </p>
                                </div>

                                <div className="card-surface card-hover p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative overflow-hidden">
                                    <div className="absolute inset-0 texture-overlay"></div>
                                    <div className="space-y-4 relative z-10">
                                        <h3 className="text-2xl font-display text-white">The Taco & Bowl Bar</h3>
                                        <div className="flex flex-wrap gap-3">
                                            <span className="pill flex items-center gap-2"><IconClock /> Lead time: 24h</span>
                                            <span className="pill">Min 10 guests</span>
                                        </div>
                                        <ul className="space-y-3 text-gray-200">
                                            {[
                                                'Choice of 2 proteins (chicken, steak, lamb).',
                                                'Cilantro lime rice, beans, and warm tortillas.',
                                                'Fresh salsas, toppings, chips & guac.',
                                                'Setup guidance so your line moves fast.',
                                            ].map((item) => (
                                                <li key={item} className="flex items-start gap-3">
                                                    <span className="text-brand-gold bg-brand-gold/10 rounded-full p-1.5 mt-0.5">
                                                        <IconCheck />
                                                    </span>
                                                    <span className="text-sm leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Link href="mailto:admin@habiburrito.com">
                                            <button className="mt-2 bg-brand-gold text-black px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-white transition-colors">
                                                Inquire Now
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="relative h-72 w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                        <Image
                                            src="/menu-items/WhatsApp Image 2025-11-10 at 8.56.31 PM (2).jpeg"
                                            alt="Catering spread"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
