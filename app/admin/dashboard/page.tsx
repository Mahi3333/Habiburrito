'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
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

interface Order {
    id: number;
    customerName: string;
    items: string[];
    total: number;
    status: string;
    createdAt: string;
}

interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    rewardsPoints: number;
    lastOrder: string;
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    // Data States
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    // Form States
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);
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

    // Fetch Data
    useEffect(() => {
        fetchMenuItems();
        // Mock data for orders and users for now
        setOrders([
            { id: 101, customerName: 'Ali K.', items: ['Ember Steak Burrito x2'], total: 36, status: 'Preparing', createdAt: '10 mins ago' },
            { id: 102, customerName: 'Sarah M.', items: ['Jade Bowl'], total: 17, status: 'Completed', createdAt: '25 mins ago' },
        ]);
        setUsers([
            { id: 1, username: 'alik', email: 'ali@example.com', role: 'Customer', rewardsPoints: 120, lastOrder: '2023-10-25' },
        ]);
        setLoading(false);
    }, []);

    const fetchMenuItems = async () => {
        try {
            const res = await fetch('/api/menu');
            if (res.ok) {
                const data = await res.json();
                setMenuItems(data);
            }
        } catch (error) {
            console.error('Failed to fetch menu items', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setCurrentItem(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSaveItem = async () => {
        try {
            if (isEditing && currentItem.id) {
                await fetch(`/api/menu/${currentItem.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(currentItem),
                });
            } else {
                await fetch('/api/menu', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(currentItem),
                });
            }
            fetchMenuItems();
            setShowForm(false);
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
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to save item', error);
        }
    };

    const handleDeleteItem = async (id: number) => {
        if (confirm('Are you sure you want to delete this item?')) {
            try {
                await fetch(`/api/menu/${id}`, { method: 'DELETE' });
                fetchMenuItems();
            } catch (error) {
                console.error('Failed to delete item', error);
            }
        }
    };

    const openEdit = (item: MenuItem) => {
        setCurrentItem(item);
        setIsEditing(true);
        setShowForm(true);
    };

    const openAdd = () => {
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
        setIsEditing(false);
        setShowForm(true);
    };

    const categories = ['bowls', 'burritos', 'tacos', 'drinks'];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="pt-24 pb-12 container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 bg-white rounded-lg shadow-md p-6 h-fit">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Admin Panel</h2>
                        <nav className="space-y-2">
                            {[
                                { tab: 'overview', label: 'Overview' },
                                { tab: 'menu', label: 'Menu Management' },
                                { tab: 'orders', label: 'Orders' },
                                { tab: 'users', label: 'Users & Rewards' }
                            ].map((item) => (
                                <button
                                    key={item.tab}
                                    onClick={() => setActiveTab(item.tab)}
                                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === item.tab
                                        ? 'bg-brand-gold text-black font-bold'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-grow bg-white rounded-lg shadow-md p-8">
                        {activeTab === 'overview' && (
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                                        <h3 className="text-blue-800 font-bold text-lg">Total Orders</h3>
                                        <p className="text-3xl font-bold text-blue-900 mt-2">{orders.length}</p>
                                    </div>
                                    <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                                        <h3 className="text-green-800 font-bold text-lg">Revenue</h3>
                                        <p className="text-3xl font-bold text-green-900 mt-2">${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</p>
                                    </div>
                                    <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                                        <h3 className="text-purple-800 font-bold text-lg">Active Users</h3>
                                        <p className="text-3xl font-bold text-purple-900 mt-2">{users.length}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'menu' && (
                            <div>
                                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                                    <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
                                    <button
                                        onClick={openAdd}
                                        className="bg-brand-gold text-black px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors font-medium"
                                    >
                                        + Add New Item
                                    </button>
                                </div>

                                {/* Add/Edit Form */}
                                {showForm && (
                                    <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
                                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                                            {isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={currentItem.name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                                <select
                                                    name="category"
                                                    value={currentItem.category}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                                                >
                                                    {categories.map(cat => (
                                                        <option key={cat} value={cat}>{cat}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    step="0.01"
                                                    value={currentItem.price}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                                <input
                                                    type="text"
                                                    name="image_url"
                                                    value={currentItem.image_url || ''}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                                <textarea
                                                    name="description"
                                                    value={currentItem.description || ''}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Chef Note</label>
                                                <input
                                                    type="text"
                                                    name="chef_note"
                                                    value={currentItem.chef_note || ''}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6 mb-4">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    name="is_available"
                                                    checked={currentItem.is_available}
                                                    onChange={handleInputChange}
                                                    className="rounded border-gray-300 text-brand-gold"
                                                />
                                                <span className="text-sm text-gray-700">Available</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    name="is_signature"
                                                    checked={currentItem.is_signature}
                                                    onChange={handleInputChange}
                                                    className="rounded border-gray-300 text-brand-gold"
                                                />
                                                <span className="text-sm text-gray-700">Signature Item</span>
                                            </label>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={handleSaveItem}
                                                className="bg-brand-gold text-black px-6 py-2 rounded-md hover:bg-yellow-600 transition-colors font-medium"
                                            >
                                                {isEditing ? 'Update Item' : 'Add Item'}
                                            </button>
                                            <button
                                                onClick={() => setShowForm(false)}
                                                className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Menu Items List */}
                                <div className="space-y-4">
                                    {menuItems.length > 0 ? (
                                        menuItems.map((item) => (
                                            <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    <div className="w-24 h-24 flex-shrink-0 relative bg-gray-100 rounded-lg overflow-hidden">
                                                        {item.image_url ? (
                                                            <Image
                                                                src={item.image_url}
                                                                alt={item.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                                                        )}
                                                    </div>
                                                    <div className="flex-grow">
                                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                                            <h4 className="font-bold text-lg text-gray-800">{item.name}</h4>
                                                            {item.is_signature && (
                                                                <span className="px-2 py-1 text-xs uppercase bg-brand-gold text-black rounded-full">Signature</span>
                                                            )}
                                                            {!item.is_available && (
                                                                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">Unavailable</span>
                                                            )}
                                                        </div>
                                                        <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                                                        <p className="text-brand-gold font-bold text-lg">${item.price.toFixed(2)}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-2 justify-between">
                                                        <button
                                                            onClick={() => openEdit(item)}
                                                            className="text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteItem(item.id)}
                                                            className="text-red-600 hover:text-red-800 font-medium text-sm px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-12 text-gray-500">
                                            <p>No menu items found.</p>
                                        </div>
                                    )}
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
