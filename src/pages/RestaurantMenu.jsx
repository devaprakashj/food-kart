import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, Clock, ChevronLeft, Plus, Minus, Info, Loader2 } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const RestaurantMenu = () => {
    const { id } = useParams();
    const { addToCart, updateQuantity, cartItems } = useCart();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurant = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, 'restaurants', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setRestaurant({ id: docSnap.id, ...docSnap.data() });
                }
            } catch (error) {
                console.error("Error fetching restaurant:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurant();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <Loader2 size={48} className="text-primary-600 animate-spin mb-4" />
                <p className="text-gray-500 font-bold uppercase tracking-widest">Loading Menu...</p>
            </div>
        );
    }

    if (!restaurant) {
        return (
            <div className="min-h-screen pt-20 text-center bg-gray-50">
                <h2 className="text-2xl font-bold">Restaurant not found</h2>
                <Link to="/" className="text-primary-600 mt-4 block underline">Back to home</Link>
            </div>
        );
    }

    const getItemQuantity = (itemId) => {
        const item = cartItems.find(i => i.id === itemId);
        return item ? item.quantity : 0;
    };

    return (
        <div className="min-h-screen pb-20 bg-gray-50">
            {/* Restaurant Header */}
            <div className="relative h-64 sm:h-80 bg-gray-900 overflow-hidden">
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>

                <div className="absolute top-6 left-4 sm:left-10">
                    <Link to="/" className="flex items-center gap-2 p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all border border-white/20">
                        <ChevronLeft size={20} />
                        <span className="text-sm font-bold pr-2">Back</span>
                    </Link>
                </div>

                <div className="absolute bottom-10 left-4 sm:left-10 text-white">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-primary-600 rounded-lg text-xs font-bold uppercase tracking-wider">Top Rated</span>
                        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg">
                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-bold">{restaurant.rating}</span>
                        </div>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight">{restaurant.name}</h1>
                    <p className="text-gray-300 italic mb-4">{restaurant.cuisine}</p>
                    <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full border border-white/10">
                            <Clock size={16} className="text-primary-400" />
                            <span className="font-medium text-primary-50">{restaurant.deliveryTime}</span>
                        </div>
                        <div className="font-semibold text-primary-50">{restaurant.priceRange} • Free Delivery</div>
                    </div>
                </div>
            </div>

            {/* Menu Section */}
            <div className="w-full px-4 sm:px-10 lg:px-16 mt-10">
                <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-widest">Full Menu</h2>
                    <div className="bg-primary-100 text-primary-600 text-xs font-bold px-2 py-0.5 rounded-full">{restaurant.menu.length} ITEMS</div>
                </div>

                <div className="space-y-6">
                    {restaurant.menu.map(item => {
                        const qty = getItemQuantity(item.id);
                        return (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-all group"
                            >
                                <div className="relative w-full sm:w-32 h-32 shrink-0 overflow-hidden rounded-xl">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/5"></div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{item.name}</h3>
                                        <span className="text-lg font-bold text-primary-600">₹{item.price.toFixed(2)}</span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-6 leading-relaxed bg-gray-50 p-2 rounded-lg border-l-4 border-primary-200">{item.description}</p>

                                    <div className="flex items-center justify-between mt-auto">
                                        {qty > 0 ? (
                                            <div className="flex items-center gap-4 bg-primary-50 p-1.5 rounded-xl border border-primary-100">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="p-1.5 bg-white text-primary-600 rounded-lg shadow-sm hover:scale-110 active:scale-95 transition-all outline-none"
                                                >
                                                    <Minus size={18} />
                                                </button>
                                                <span className="text-primary-700 font-bold w-4 text-center">{qty}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="p-1.5 bg-primary-600 text-white rounded-lg shadow-sm hover:scale-110 active:scale-95 transition-all outline-none"
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => addToCart(item, restaurant.id, restaurant.name)}
                                                className="flex items-center gap-2 px-8 py-2.5 bg-white text-primary-600 border-2 border-primary-600 rounded-xl font-bold hover:bg-primary-600 hover:text-white transition-all active:scale-95"
                                            >
                                                <Plus size={18} />
                                                <span>ADD TO CART</span>
                                            </button>
                                        )}
                                        <button className="p-2 text-gray-300 hover:text-gray-500 transition-colors">
                                            <Info size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default RestaurantMenu;
