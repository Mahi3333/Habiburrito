'use client';

import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Button from '../../../components/Button';

interface OrderItem {
    id: number;
    item_name: string;
    quantity: number;
    json_details: string;
}

interface Order {
    id: number;
    total_amount: number;
    status: string;
    created_at: string;
    items: OrderItem[];
}

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    // Check auth status on mount (by trying to fetch orders)
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/orders');
            if (res.ok) {
                const data = await res.json();
                setOrders(data.orders);
                setIsAuthenticated(true);
            } else if (res.status === 401) {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Failed to fetch orders', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                setIsAuthenticated(true);
                fetchOrders(); // Load data
            } else {
                setLoginError('Invalid username or password');
            }
        } catch (error) {
            setLoginError('An error occurred. Please try again.');
        }
    };

    const handleStatusUpdate = async (orderId: number, newStatus: string) => {
        try {
            const res = await fetch('/api/admin/update-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, status: newStatus }),
            });

            if (res.ok) {
                fetchOrders();
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status', error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PAID': return 'bg-green-100 text-green-800';
            case 'IN PROGRESS': return 'bg-blue-100 text-blue-800';
            case 'READY FOR PICKUP': return 'bg-yellow-100 text-yellow-800';
            case 'COMPLETED': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (!isAuthenticated && !loading) {
        return (
            <div className="min-h-screen bg-background-light flex flex-col">
                <Header />
                <main className="flex-grow flex items-center justify-center p-8">
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 w-full max-w-md">
                        <h1 className="text-2xl font-bold text-brand-green mb-6 text-center">Admin Login</h1>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                                    required
                                />
                            </div>

                            {loginError && (
                                <p className="text-red-500 text-sm text-center">{loginError}</p>
                            )}

                            <Button variant="primary" className="w-full py-3">
                                Login
                            </Button>
                        </form>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-light flex flex-col">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto w-full p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-brand-green">Order Dashboard</h1>
                    <button
                        onClick={fetchOrders}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700"
                    >
                        Refresh Data
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-gray-700">Order ID</th>
                                        <th className="px-6 py-4 font-semibold text-gray-700">Date</th>
                                        <th className="px-6 py-4 font-semibold text-gray-700">Items</th>
                                        <th className="px-6 py-4 font-semibold text-gray-700">Total</th>
                                        <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                                        <th className="px-6 py-4 font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">#{order.id}</td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {new Date(order.created_at).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                                                {order.items.map(i => `${i.quantity}x ${i.item_name}`).join(', ')}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                ${order.total_amount.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                    className="block w-full px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                                                >
                                                    <option value="PENDING_PAYMENT">Pending Payment</option>
                                                    <option value="PAID">Paid</option>
                                                    <option value="IN PROGRESS">In Progress</option>
                                                    <option value="READY FOR PICKUP">Ready for Pickup</option>
                                                    <option value="COMPLETED">Completed</option>
                                                    <option value="CANCELLED">Cancelled</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                    {orders.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                                No orders found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
