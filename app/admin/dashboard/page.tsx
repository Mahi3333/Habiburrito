'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // Mock data for now, in real app fetch from API
    useEffect(() => {
        if (activeTab === 'orders') {
            // fetchOrders();
        }
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <Header />

            <main className="pt-24 pb-12 container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full md:w-64 bg-white rounded-lg shadow-md p-6 h-fit">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Admin Panel</h2>
                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'overview' ? 'bg-brand-gold text-black font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('menu')}
                                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'menu' ? 'bg-brand-gold text-black font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                Menu Management
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'orders' ? 'bg-brand-gold text-black font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                Orders
                            </button>
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${activeTab === 'users' ? 'bg-brand-gold text-black font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                Users & Rewards
                            </button>
                        </nav>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-grow bg-white rounded-lg shadow-md p-8">
                        {activeTab === 'overview' && (
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                                        <h3 className="text-blue-800 font-bold text-lg">Total Orders</h3>
                                        <p className="text-3xl font-bold text-blue-900 mt-2">1,234</p>
                                    </div>
                                    <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                                        <h3 className="text-green-800 font-bold text-lg">Revenue</h3>
                                        <p className="text-3xl font-bold text-green-900 mt-2">$45,678</p>
                                    </div>
                                    <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                                        <h3 className="text-purple-800 font-bold text-lg">Active Users</h3>
                                        <p className="text-3xl font-bold text-purple-900 mt-2">890</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'menu' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
                                    <button className="bg-brand-green text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                                        + Add New Item
                                    </button>
                                </div>
                                <p className="text-gray-500 mb-4">Manage your menu items, prices, and descriptions here.</p>

                                <div className="space-y-4">
                                    {/* Example Item */}
                                    <div className="border p-4 rounded-md flex justify-between items-center hover:bg-gray-50">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
                                            <div>
                                                <h4 className="font-bold text-lg">Signature Bowl</h4>
                                                <p className="text-sm text-gray-500">Grilled chicken, rice, beans...</p>
                                                <span className="text-brand-gold font-bold">$12.95</span>
                                            </div>
                                        </div>
                                        <div className="space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                                            <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800 mb-6">Users & Rewards</h1>
                                <p className="text-gray-500">Manage user accounts and loyalty points here.</p>
                                <div className="mt-6 border rounded-md overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 border-b">
                                            <tr>
                                                <th className="px-6 py-3 text-gray-600 font-semibold">Username</th>
                                                <th className="px-6 py-3 text-gray-600 font-semibold">Email</th>
                                                <th className="px-6 py-3 text-gray-600 font-semibold">Points</th>
                                                <th className="px-6 py-3 text-gray-600 font-semibold">Role</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            <tr>
                                                <td className="px-6 py-4">john_doe</td>
                                                <td className="px-6 py-4">john@example.com</td>
                                                <td className="px-6 py-4 font-bold text-brand-gold">150</td>
                                                <td className="px-6 py-4"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Customer</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800 mb-6">Recent Orders</h1>
                                <p className="text-gray-500 mb-4">Real-time order tracking.</p>
                                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-6">
                                    <p className="text-yellow-800"><strong>Note:</strong> Connect to the live database to see real-time orders.</p>
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
