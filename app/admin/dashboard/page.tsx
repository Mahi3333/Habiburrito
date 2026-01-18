'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Image from 'next/image';

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image_url: string;
    is_available: boolean;
    is_signature: boolean;
    chef_note?: string;
}

interface ModifierOption {
    id: number;
    name: string;
    price_adjustment: number;
    is_active: boolean;
}

interface Modifier {
    id: number;
    name: string;
    type: 'SELECT' | 'FREE_TEXT';
    options: ModifierOption[];
}

interface ItemModifierGroup {
    id: number;
    menu_item_id: number;
    modifier_id: number;
    title_override: string | null;
    required: boolean;
    min_select: number;
    max_select: number;
    modifier: Modifier;
}

interface Order {
    id: number;
    user_id: number | null;
    user?: { name: string; email: string };
    total_amount: number;
    status: string;
    created_at: string;
    items: { item_name: string; quantity: number }[];
}

interface User {
    id: number;
    name: string | null;
    email: string | null;
    role: string;
    rewards_points: number;
    created_at: string;
    _count: { orders: number };
}

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    // Data States
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    // Form States
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [currentItem, setCurrentItem] = useState<Partial<MenuItem>>({
        name: '',
        description: '',
        price: 0,
        category: 'bowls',
        image_url: '',
        is_available: true,
        is_signature: false,
        chef_note: ''
    });

    // Modifier State
    const [allModifiers, setAllModifiers] = useState<Modifier[]>([]);
    const [itemModifiers, setItemModifiers] = useState<ItemModifierGroup[]>([]);
    const [showModifierSelector, setShowModifierSelector] = useState(false);


    // Operations State
    const [storeSettings, setStoreSettings] = useState({
        online_ordering_enabled: true,
        override_message: ''
    });

    const fetchData = async () => {
        try {
            const [menuRes, settingsRes, ordersRes, usersRes] = await Promise.all([
                fetch('/api/menu'),
                fetch('/api/admin/settings'),
                fetch('/api/admin/orders'),
                fetch('/api/admin/users')
            ]);

            if (menuRes.ok) setMenuItems(await menuRes.json());
            if (settingsRes.ok) setStoreSettings(await settingsRes.json());
            if (ordersRes.ok) setOrders(await ordersRes.json());
            if (usersRes.ok) setUsers(await usersRes.json());
        } catch (error) {
            console.error('Failed to fetch dashboard data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        fetchGlobalModifiers(); // Fetch global modifiers on load
    }, []);

    const fetchGlobalModifiers = async () => {
        try {
            const res = await fetch('/api/admin/modifiers');
            if (res.ok) {
                const data = await res.json();
                setAllModifiers(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchItemModifiers = async (itemId: number) => {
        try {
            const res = await fetch(`/api/menu/${itemId}/modifiers`);
            if (res.ok) {
                const data = await res.json();
                setItemModifiers(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Handle Adding a Modifier Group
    const handleAddModifierGroup = async (modifierId: number) => {
        if (!currentItem.id) {
            alert("Please save the item first before adding modifiers.");
            return;
        }

        try {
            const res = await fetch(`/api/menu/${currentItem.id}/modifiers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    modifier_id: modifierId,
                    required: false, // default
                    max_select: 1,
                    title_override: null
                })
            });

            if (res.ok) {
                await fetchItemModifiers(currentItem.id);
                setShowModifierSelector(false);
            }
        } catch (err) {
            console.error('Failed to add modifier', err);
        }
    };

    const handleRemoveModifierGroup = async (linkId: number) => {
        if (!confirm('Remove this modifier group from the item?')) return;
        try {
            const res = await fetch(`/api/menu/${currentItem.id}/modifiers?linkId=${linkId}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                await fetchItemModifiers(currentItem.id!);
            }
        } catch (err) {
            console.error('Failed to remove modifier', err);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setCurrentItem(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSaveItem = async () => {
        try {
            let finalImageUrl = currentItem.image_url;

            // Upload Image if selected
            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);
                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });
                if (uploadRes.ok) {
                    const data = await uploadRes.json();
                    finalImageUrl = data.url;
                } else {
                    alert('Image upload failed, saving item without new image.');
                }
            }

            const payload = { ...currentItem, image_url: finalImageUrl, price: Number(currentItem.price) };

            if (isEditing && currentItem.id) {
                await fetch(`/api/menu/${currentItem.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            } else {
                await fetch('/api/menu', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            }
            fetchData(); // Refresh all data
            setShowForm(false);
            resetForm();
        } catch (error) {
            console.error('Failed to save item', error);
        }
    };

    const resetForm = () => {
        setCurrentItem({
            name: '',
            description: '',
            price: 0,
            category: 'bowls',
            image_url: '',
            is_available: true,
            is_signature: false,
            chef_note: ''
        });
        setImageFile(null);
        setIsEditing(false);
    };

    const handleDeleteItem = async (id: number) => {
        if (confirm('Are you sure you want to delete this item?')) {
            try {
                await fetch(`/api/menu/${id}`, { method: 'DELETE' });
                fetchData();
            } catch (error) {
                console.error('Failed to delete item', error);
            }
        }
    };

    const openEdit = (item: MenuItem) => {
        setCurrentItem(item);
        setImageFile(null);
        setIsEditing(true);
        setShowForm(true);
        setItemModifiers([]);
        if (item.id) fetchItemModifiers(item.id);
    };

    const openAdd = () => {
        resetForm();
        setItemModifiers([]);
        setShowForm(true);
    };

    const handleLogout = () => {
        // Here you would clear cookies/tokens if applicable
        router.push('/');
    };

    const categories = ['bowls', 'burritos', 'tacos', 'sides', 'drinks'];

    const filteredMenu = menuItems.filter((item) => {
        const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
        const term = search.trim().toLowerCase();
        const matchesSearch = !term || item.name.toLowerCase().includes(term) || (item.description || '').toLowerCase().includes(term);
        return matchesCategory && matchesSearch;
    });

    const handleSaveSettings = async () => {
        try {
            await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(storeSettings),
            });
            alert('Store settings updated!');
        } catch (error) {
            console.error('Failed to save settings', error);
        }
    };

    const handleExport = async () => {
        try {
            const res = await fetch('/api/menu/export');
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'menu-export.csv';
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Export failed', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-brand-night flex flex-col">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-black text-brand-cream font-sans flex flex-col">
            <Header />

            <main className="pt-36 pb-20 container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-72 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-fit sticky top-28">
                        <div className="mb-8 px-2">
                            <h2 className="text-xl font-display font-bold text-white tracking-wide">Admin Portal</h2>
                            <p className="text-xs text-brand-gold uppercase tracking-widest mt-1">HabiBurrito HQ</p>
                        </div>
                        <nav className="space-y-1">
                            {[
                                { tab: 'overview', label: 'Overview', icon: 'M3 3v18h18' },
                                { tab: 'menu', label: 'Menu Management', icon: 'M4 6h16M4 12h16M4 18h16' },
                                { tab: 'orders', label: 'Orders', icon: 'M9 11l3 3L22 4' },
                                { tab: 'users', label: 'Users & Rewards', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' },
                                { tab: 'operations', label: 'Operations', icon: 'M12 2v20' }
                            ].map((item) => (
                                <button
                                    key={item.tab}
                                    onClick={() => setActiveTab(item.tab)}
                                    className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-200 flex items-center gap-3 ${activeTab === item.tab
                                        ? 'bg-brand-gold text-brand-black font-bold shadow-lg shadow-brand-gold/20'
                                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <div className={`w-1 h-4 rounded-full ${activeTab === item.tab ? 'bg-black' : 'bg-gray-600'}`} />
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </nav>

                        <div className="mt-8 pt-8 border-t border-white/10 px-4">
                            <button
                                onClick={handleLogout}
                                className="text-gray-300 hover:text-red-400 text-sm font-medium transition-colors flex items-center gap-2"
                            >
                                <span>Log Out</span>
                            </button>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-grow bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 min-h-[600px]">
                        {activeTab === 'overview' && (
                            <div className="space-y-8 animate-fade-in">
                                <div>
                                    <h1 className="text-3xl font-display font-bold text-white mb-2">Dashboard Overview</h1>
                                    <p className="text-gray-300">Welcome back. Here's what's happening today.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-gradient-to-br from-blue-900/40 to-blue-900/10 p-6 rounded-2xl border border-blue-500/20 card-hover">
                                        <h3 className="text-blue-200 font-bold text-sm uppercase tracking-wider mb-4">Total Orders</h3>
                                        <p className="text-4xl font-display font-bold text-white">{orders.length}</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-900/40 to-green-900/10 p-6 rounded-2xl border border-green-500/20 card-hover">
                                        <h3 className="text-green-200 font-bold text-sm uppercase tracking-wider mb-4">Revenue</h3>
                                        <p className="text-4xl font-display font-bold text-white">${orders.reduce((sum, order) => sum + order.total_amount, 0).toFixed(2)}</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-900/40 to-purple-900/10 p-6 rounded-2xl border border-purple-500/20 card-hover">
                                        <h3 className="text-purple-200 font-bold text-sm uppercase tracking-wider mb-4">Active Users</h3>
                                        <p className="text-4xl font-display font-bold text-white">{users.length}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'menu' && (
                            <div className="animate-fade-in">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                                    <div>
                                        <h1 className="text-3xl font-display font-bold text-white mb-2">Menu Management</h1>
                                        <p className="text-gray-300 text-sm">Update prices, items, and inventory in real-time.</p>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={handleExport}
                                            className="px-5 py-2.5 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors text-sm font-medium"
                                        >
                                            Export CSV
                                        </button>
                                        <button
                                            onClick={openAdd}
                                            className="bg-brand-gold text-brand-black px-5 py-2.5 rounded-lg hover:bg-white transition-colors text-sm font-bold uppercase tracking-wide"
                                        >
                                            + Add Item
                                        </button>
                                    </div>
                                </div>

                                {/* Filters */}
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8 bg-black/20 p-4 rounded-xl border border-white/5">
                                    <div className="md:col-span-5">
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Search menu items..."
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-300 focus:outline-none focus:border-brand-gold/50"
                                        />
                                    </div>
                                    <div className="md:col-span-4">
                                        <select
                                            value={categoryFilter}
                                            onChange={(e) => setCategoryFilter(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-gold/50"
                                        >
                                            <option value="all" className="bg-gray-800">All Categories</option>
                                            {categories.map((cat) => (
                                                <option key={cat} value={cat} className="bg-gray-800 capitalize">{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md:col-span-3 flex items-center justify-center bg-white/5 rounded-lg border border-white/5">
                                        <span className="text-gray-300 text-sm mr-2">Visible:</span>
                                        <span className="text-brand-gold font-bold">{filteredMenu.length}</span>
                                    </div>
                                </div>

                                {/* Side Drawer Form (Replaces Modal) */}
                                {showForm && (
                                    <>
                                        {/* Backdrop */}
                                        <div
                                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity animate-fade-in"
                                            onClick={() => { setShowForm(false); setImageFile(null); }}
                                        />

                                        {/* Drawer */}
                                        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-brand-black border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col animate-slide-in-right">
                                            {/* Header */}
                                            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-brand-black z-10">
                                                <div>
                                                    <h3 className="text-xl font-display font-bold text-white">
                                                        {isEditing ? `Edit: ${currentItem.name}` : 'Create New Item'}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs text-brand-gold uppercase tracking-wider font-bold">
                                                            {currentItem.id ? `ID: #${currentItem.id}` : 'New Draft'}
                                                        </span>
                                                        {isEditing && (
                                                            <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-gray-400">
                                                                Last updated today
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => { setShowForm(false); setImageFile(null); }}
                                                        className="px-4 py-2 text-gray-400 hover:text-white transition-colors hover:bg-white/5 rounded-lg text-sm font-medium"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={handleSaveItem}
                                                        className="px-6 py-2 bg-brand-gold text-black rounded-lg hover:bg-white transition-colors font-bold uppercase tracking-wide text-xs shadow-lg shadow-brand-gold/10 flex items-center gap-2"
                                                    >
                                                        <span>Save Changes</span>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Scrollable Content */}
                                            <div className="flex-grow overflow-y-auto custom-scrollbar bg-brand-black">
                                                <div className="p-8 space-y-8">

                                                    {/* Section: Basic Info */}
                                                    <section className="space-y-6">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className="w-1 h-4 bg-brand-gold rounded-full" />
                                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Basic Information</h4>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 bg-white/5 rounded-xl border border-white/5">
                                                            <div className="md:col-span-8">
                                                                <label className="block text-[10px] uppercase tracking-wider text-brand-gold mb-2 font-bold">Item Name</label>
                                                                <input
                                                                    type="text"
                                                                    name="name"
                                                                    value={currentItem.name}
                                                                    onChange={handleInputChange}
                                                                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-gold transition-colors font-medium"
                                                                    placeholder="e.g. Signature Bowl"
                                                                />
                                                            </div>

                                                            <div className="md:col-span-4">
                                                                <label className="block text-[10px] uppercase tracking-wider text-brand-gold mb-2 font-bold">Price ($)</label>
                                                                <input
                                                                    type="number"
                                                                    name="price"
                                                                    step="0.01"
                                                                    value={currentItem.price}
                                                                    onChange={handleInputChange}
                                                                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-gold transition-colors font-mono"
                                                                />
                                                            </div>

                                                            <div className="md:col-span-12">
                                                                <label className="block text-[10px] uppercase tracking-wider text-brand-gold mb-2 font-bold">Category</label>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {categories.map(cat => (
                                                                        <button
                                                                            key={cat}
                                                                            onClick={() => setCurrentItem(prev => ({ ...prev, category: cat }))}
                                                                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide border transition-all ${currentItem.category === cat
                                                                                ? 'bg-brand-gold text-black border-brand-gold'
                                                                                : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
                                                                                }`}
                                                                        >
                                                                            {cat}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <div className="md:col-span-12">
                                                                <label className="block text-[10px] uppercase tracking-wider text-brand-gold mb-2 font-bold">Description</label>
                                                                <textarea
                                                                    name="description"
                                                                    value={currentItem.description || ''}
                                                                    onChange={handleInputChange}
                                                                    rows={3}
                                                                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-gold resize-none transition-colors"
                                                                    placeholder="Describe the ingredients and flavors..."
                                                                />
                                                            </div>
                                                        </div>
                                                    </section>

                                                    {/* Section: Configuration */}
                                                    <section className="space-y-6">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className="w-1 h-4 bg-purple-500 rounded-full" />
                                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Configuration</h4>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            {/* Image Upload Compact */}
                                                            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                                                <label className="block text-[10px] uppercase tracking-wider text-brand-gold mb-3 font-bold">Display Image</label>
                                                                <div className="flex items-center gap-4">
                                                                    <div className="relative w-20 h-20 bg-black/50 rounded-lg border border-white/10 overflow-hidden flex-shrink-0 group">
                                                                        {currentItem.image_url ? (
                                                                            <Image src={currentItem.image_url} alt="Preview" fill className="object-cover" />
                                                                        ) : (
                                                                            <div className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-600 font-bold uppercase">No Img</div>
                                                                        )}
                                                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-grow">
                                                                        <input type="file" id="drawer-file-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
                                                                        <label htmlFor="drawer-file-upload" className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold uppercase tracking-wide transition-colors">
                                                                            Upload New
                                                                        </label>
                                                                        <p className="text-[10px] text-gray-500 mt-2">Max 2MB. JPG/PNG.</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Status Toggles */}
                                                            <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col justify-center gap-4">
                                                                <label className="flex items-center justify-between cursor-pointer group">
                                                                    <span className="text-xs font-bold text-gray-300 group-hover:text-white">Available Online</span>
                                                                    <div className="relative">
                                                                        <input
                                                                            type="checkbox"
                                                                            name="is_available"
                                                                            checked={currentItem.is_available}
                                                                            onChange={handleInputChange}
                                                                            className="sr-only peer"
                                                                        />
                                                                        <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-gold"></div>
                                                                    </div>
                                                                </label>

                                                                <div className="h-px bg-white/5" />

                                                                <label className="flex items-center justify-between cursor-pointer group">
                                                                    <span className="text-xs font-bold text-gray-300 group-hover:text-white">Signature Badge</span>
                                                                    <div className="relative">
                                                                        <input
                                                                            type="checkbox"
                                                                            name="is_signature"
                                                                            checked={currentItem.is_signature}
                                                                            onChange={handleInputChange}
                                                                            className="sr-only peer"
                                                                        />
                                                                        <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                                                                    </div>
                                                                </label>
                                                            </div>

                                                            <div className="md:col-span-2">
                                                                <label className="block text-[10px] uppercase tracking-wider text-brand-gold mb-2 font-bold">Marketing Tag</label>
                                                                <input
                                                                    type="text"
                                                                    name="chef_note"
                                                                    value={currentItem.chef_note || ''}
                                                                    onChange={handleInputChange}
                                                                    placeholder="e.g. 'Spicy', 'Chef's Choice'"
                                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-gold transition-colors text-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                    </section>

                                                    {/* Section: Recipe & Modifiers */}
                                                    <section className="space-y-6">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-1 h-4 bg-brand-gold rounded-full" />
                                                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recipe & Modifiers</h4>
                                                            </div>
                                                            {currentItem.id && (
                                                                <button
                                                                    onClick={() => setShowModifierSelector(!showModifierSelector)}
                                                                    className="text-[10px] font-bold uppercase tracking-wider text-brand-gold hover:text-white transition-colors flex items-center gap-1"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                                                    Add Group
                                                                </button>
                                                            )}
                                                        </div>

                                                        {currentItem.id ? (
                                                            <div className="space-y-4">
                                                                {/* Modifier Selector Dropdown */}
                                                                {showModifierSelector && (
                                                                    <div className="p-4 bg-gray-800 rounded-xl border border-white/10 animate-fade-in mb-4">
                                                                        <h5 className="text-xs font-bold text-white mb-3">Select Modifier Group to Add</h5>
                                                                        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto custom-scrollbar">
                                                                            {allModifiers.map(mod => (
                                                                                <button
                                                                                    key={mod.id}
                                                                                    onClick={() => handleAddModifierGroup(mod.id)}
                                                                                    className="text-left px-3 py-2 rounded bg-black/40 hover:bg-brand-gold/20 hover:text-brand-gold text-xs text-gray-300 transition-colors truncate"
                                                                                >
                                                                                    {mod.name}
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* Attached Modifiers List */}
                                                                {itemModifiers.length > 0 ? (
                                                                    itemModifiers.map((group) => (
                                                                        <div key={group.id} className="p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-brand-gold/20 transition-colors">
                                                                            <div className="flex items-center justify-between mb-3">
                                                                                <div>
                                                                                    <h5 className="font-bold text-white text-sm">
                                                                                        {group.title_override || group.modifier.name}
                                                                                    </h5>
                                                                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                                                                                        {group.required ? 'Required' : 'Optional'} • Select {group.min_select} - {group.max_select}
                                                                                    </p>
                                                                                </div>
                                                                                <button
                                                                                    onClick={() => handleRemoveModifierGroup(group.id)}
                                                                                    className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-black/40 rounded transition-colors"
                                                                                >
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                                                </button>
                                                                            </div>

                                                                            {/* Options Preview */}
                                                                            <div className="flex flex-wrap gap-2">
                                                                                {group.modifier.options?.map(opt => (
                                                                                    <span key={opt.id} className="px-2 py-1 rounded bg-black/40 text-[10px] text-gray-400 border border-white/5">
                                                                                        {opt.name} {opt.price_adjustment > 0 && `(+$${opt.price_adjustment})`}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <div className="p-6 bg-brand-gold/5 border border-brand-gold/10 rounded-xl text-center border-dashed">
                                                                        <p className="text-gray-500 text-xs">No modifiers attached to this item yet.</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <div className="p-4 bg-brand-gold/10 border border-brand-gold/20 rounded-xl text-center">
                                                                <p className="description text-brand-gold text-xs font-bold">Save this item as a draft first to attach modifiers.</p>
                                                            </div>
                                                        )}
                                                    </section>

                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* List */}
                                <div className="space-y-4">
                                    {filteredMenu.length > 0 ? (
                                        filteredMenu.map((item) => (
                                            <div key={item.id} className="bg-white/5 border border-white/5 rounded-2xl p-4 md:p-5 hover:border-brand-gold/30 transition-all flex flex-col md:flex-row gap-6 group">
                                                <div className="w-full md:w-32 h-32 flex-shrink-0 relative bg-black/50 rounded-xl overflow-hidden border border-white/10">
                                                    {item.image_url ? (
                                                        <Image
                                                            src={item.image_url}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs uppercase tracking-wider font-bold">No Image</div>
                                                    )}
                                                </div>
                                                <div className="flex-grow flex flex-col justify-between">
                                                    <div>
                                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                                            <div className="flex items-center gap-3">
                                                                <h4 className="font-bold text-xl text-white group-hover:text-brand-gold transition-colors">{item.name}</h4>
                                                                {item.is_signature && (
                                                                    <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full tracking-wider">Signature</span>
                                                                )}
                                                                {!item.is_available && (
                                                                    <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-red-500/20 text-red-400 border border-red-500/30 rounded-full tracking-wider">Sold Out</span>
                                                                )}
                                                            </div>
                                                            <span className="text-brand-gold font-mono text-xl">${Number(item.price).toFixed(2)}</span>
                                                        </div>
                                                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
                                                        <div className="flex items-center gap-4 text-xs text-gray-500 uppercase tracking-wider font-medium">
                                                            <span className="px-2 py-1 bg-white/5 rounded">{item.category}</span>
                                                            {item.chef_note && <span className="text-brand-gold/70">• {item.chef_note}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-end gap-3 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                                                        <button
                                                            onClick={() => {
                                                                // DUPLICATE LOGIC
                                                                const newItem = { ...item, name: `${item.name} (Copy)`, id: undefined };
                                                                setCurrentItem(newItem);
                                                                setIsEditing(false);
                                                                setShowForm(true);
                                                            }}
                                                            className="text-gray-400 hover:text-brand-gold font-medium text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                                            Duplicate
                                                        </button>
                                                        <button
                                                            onClick={() => openEdit(item)}
                                                            className="text-white hover:bg-white/10 font-medium text-xs px-4 py-2 rounded-lg transition-colors border border-white/10"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteItem(item.id)}
                                                            className="text-red-400 hover:bg-red-500/10 font-medium text-xs px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                            <p className="text-gray-400 mb-4">No menu items match your search.</p>
                                            <button onClick={() => { setSearch(''); setCategoryFilter('all'); }} className="text-brand-gold hover:text-white transition-colors text-sm font-bold uppercase tracking-wide">Clear filters</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'operations' && (
                            <div className="animate-fade-in max-w-2xl mx-auto">
                                <h1 className="text-3xl font-display font-bold text-white mb-8">Store Operations</h1>

                                <div className="bg-red-900/10 border border-red-500/30 rounded-2xl p-8 mb-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <div className="w-32 h-32 bg-red-500 rounded-full blur-3xl"></div>
                                    </div>

                                    <h3 className="text-red-400 font-bold text-lg mb-6 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                        Panic Mode (Emergency)
                                    </h3>

                                    <div className="flex items-center justify-between mb-8 pb-8 border-b border-red-500/20">
                                        <div>
                                            <p className="font-bold text-white text-lg">Online Ordering Status</p>
                                            <p className="text-sm text-gray-300 mt-1">
                                                {storeSettings.online_ordering_enabled
                                                    ? 'Currently accepting orders normally.'
                                                    : 'Orders are currently PAUSED globally.'}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setStoreSettings(prev => ({ ...prev, online_ordering_enabled: !prev.online_ordering_enabled }))}
                                            className={`relative inline-flex h-9 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-black ${storeSettings.online_ordering_enabled ? 'bg-green-500' : 'bg-red-600'}`}
                                        >
                                            <span className={`inline-block h-7 w-7 transform rounded-full bg-white transition-transform duration-200 ${storeSettings.online_ordering_enabled ? 'translate-x-8' : 'translate-x-1'}`} />
                                        </button>
                                    </div>

                                    {!storeSettings.online_ordering_enabled && (
                                        <div className="mb-8 animate-fade-in">
                                            <label className="block text-sm font-medium text-red-200 mb-2">Public Explanation Message</label>
                                            <input
                                                type="text"
                                                value={storeSettings.override_message || ''}
                                                onChange={(e) => setStoreSettings(prev => ({ ...prev, override_message: e.target.value }))}
                                                placeholder="e.g. 'Kitchen closed for maintenance, back at 5pm.'"
                                                className="w-full px-4 py-3 bg-red-950/30 border border-red-500/30 rounded-xl text-white placeholder:text-red-400/30 focus:outline-none focus:border-red-400"
                                            />
                                        </div>
                                    )}

                                    <button
                                        onClick={handleSaveSettings}
                                        className="w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg shadow-red-900/20"
                                    >
                                        Save Operational Status
                                    </button>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                                    <h3 className="text-white font-bold text-lg mb-4">Standard Hours</h3>
                                    <div className="space-y-3 text-gray-300 font-mono text-sm border-t border-white/5 pt-4">
                                        <div className="flex justify-between">
                                            <span>Mon - Thu</span>
                                            <span className="text-white">11:00 AM - 11:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Fri - Sat</span>
                                            <span className="text-white">11:00 AM - 12:00 AM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Sunday</span>
                                            <span className="text-white">11:00 AM - 11:00 PM</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-brand-gold mt-6 opacity-60">* Standard hours are overridden by the panic switch above.</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="animate-fade-in">
                                <h1 className="text-3xl font-display font-bold text-white mb-6">Recent Orders</h1>
                                {orders.length > 0 ? (
                                    <div className="overflow-x-auto rounded-xl border border-white/10">
                                        <table className="w-full text-left text-sm text-gray-300">
                                            <thead className="bg-white/5 text-brand-gold uppercase tracking-wider font-bold">
                                                <tr>
                                                    <th className="px-6 py-4">Order ID</th>
                                                    <th className="px-6 py-4">Customer</th>
                                                    <th className="px-6 py-4">Items</th>
                                                    <th className="px-6 py-4">Total</th>
                                                    <th className="px-6 py-4">Status</th>
                                                    <th className="px-6 py-4">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/10">
                                                {orders.map((order) => (
                                                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                                        <td className="px-6 py-4">#{order.id}</td>
                                                        <td className="px-6 py-4 text-white font-medium">
                                                            {order.user?.name || 'Guest'}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {order.items.map(i => `${i.quantity}x ${i.item_name}`).join(', ')}
                                                        </td>
                                                        <td className="px-6 py-4 font-mono text-white">${order.total_amount.toFixed(2)}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-xs">{new Date(order.created_at).toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                        <p className="text-gray-300">No orders found.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <div className="animate-fade-in">
                                <h1 className="text-3xl font-display font-bold text-white mb-6">Users & Rewards</h1>
                                {users.length > 0 ? (
                                    <div className="overflow-x-auto rounded-xl border border-white/10">
                                        <table className="w-full text-left text-sm text-gray-300">
                                            <thead className="bg-white/5 text-brand-gold uppercase tracking-wider font-bold">
                                                <tr>
                                                    <th className="px-6 py-4">User</th>
                                                    <th className="px-6 py-4">Email</th>
                                                    <th className="px-6 py-4">Role</th>
                                                    <th className="px-6 py-4">Rewards Points</th>
                                                    <th className="px-6 py-4">Total Orders</th>
                                                    <th className="px-6 py-4">Joined</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/10">
                                                {users.map((user) => (
                                                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                                        <td className="px-6 py-4 text-white font-medium">{user.name || 'N/A'}</td>
                                                        <td className="px-6 py-4">{user.email || 'N/A'}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.role === 'ADMIN' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                                                {user.role}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 font-mono text-brand-gold">{user.rewards_points}</td>
                                                        <td className="px-6 py-4">{user._count?.orders || 0}</td>
                                                        <td className="px-6 py-4 text-xs">{new Date(user.created_at).toLocaleDateString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                        <p className="text-gray-300">No users found.</p>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}


