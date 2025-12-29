import React, { useState, useEffect } from 'react';
import { Package, Clock, ChevronRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserOrders } from '../services/foodService';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                setLoading(true);
                try {
                    const data = await getUserOrders(user.uid);
                    setOrders(data);
                } catch (error) {
                    console.error("Failed to fetch orders:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-10 lg:px-16">
            <div className="w-full">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 uppercase tracking-tight">Your Order History</h1>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 size={48} className="text-primary-600 animate-spin mb-4" />
                        <p className="text-gray-500 font-bold uppercase tracking-widest">Fetching Orders...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
                        <Package size={64} className="mx-auto text-gray-200 mb-6" />
                        <h2 className="text-xl font-bold text-gray-800">No orders yet</h2>
                        <p className="text-gray-500 mt-2">When you order, they will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                                <div className="flex justify-between items-start mb-6 pb-4 border-b">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order #FK-{order.id.slice(-7)}</p>
                                        <h3 className="text-lg font-bold text-gray-800">{order.restaurantName}</h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-black text-primary-600">₹{order.total.toFixed(2)}</p>
                                        <span className="text-xs font-bold bg-green-100 text-green-600 px-2 py-1 rounded-full uppercase">Delivered</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex -space-x-3 overflow-hidden">
                                        {(order.items || []).slice(0, 3).map((item, i) => (
                                            <img key={i} className="inline-block h-10 w-10 rounded-full ring-4 ring-white object-cover" src={item.image} alt={item.name} />
                                        ))}
                                        {(order.items || []).length > 3 && (
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-400 ring-4 ring-white">
                                                +{(order.items || []).length - 3}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest cursor-pointer hover:text-primary-600 transition-colors">
                                        View Details <ChevronRight size={16} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
