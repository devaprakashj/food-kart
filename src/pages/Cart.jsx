import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, MapPin, Tag } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
    const navigate = useNavigate();

    const tax = cartTotal * 0.05; // 5% tax
    const deliveryFee = cartTotal > 0 ? 40.00 : 0;
    const grandTotal = cartTotal + tax + deliveryFee;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4 bg-gray-50">
                <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center max-w-md w-full text-center">
                    <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-6 animate-pulse">
                        <ShoppingBag size={48} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Your Cart is Empty</h2>
                    <p className="text-gray-500 mb-10 leading-relaxed">Sounds like it's a good day for some delicious food! Browse our top restaurants and satisfy your cravings.</p>
                    <Link
                        to="/"
                        className="w-full bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all active:scale-95 flex items-center justify-center gap-2 group"
                    >
                        EXPLORE RESTAURANTS
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="w-full px-4 sm:px-10 lg:px-16">
                <div className="flex items-center gap-3 mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">Your Food Basket</h1>
                    <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-bold">{cartCount} ITEMS</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-6 pb-4 border-b">
                                <div className="p-3 bg-gray-100 rounded-2xl">
                                    <MapPin className="text-gray-500" size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ordering From</p>
                                    <p className="text-xl font-extrabold text-gray-800">{cartItems[0]?.restaurantName}</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 group">
                                        <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform" />
                                        <div className="flex-1 text-center sm:text-left">
                                            <h3 className="font-extrabold text-lg text-gray-900 uppercase tracking-tight">{item.name}</h3>
                                            <p className="text-gray-400 text-sm font-semibold mb-4">₹{item.price.toFixed(2)} each</p>

                                            <div className="flex items-center justify-center sm:justify-start gap-4">
                                                <div className="flex items-center gap-4 bg-gray-100 p-1.5 rounded-xl border border-gray-200">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="p-1 text-gray-600 hover:text-primary-600 transition-colors"
                                                    >
                                                        <Minus size={18} />
                                                    </button>
                                                    <span className="font-bold text-gray-800 w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="p-1 text-gray-600 hover:text-primary-600 transition-colors"
                                                    >
                                                        <Plus size={18} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-2 text-gray-300 hover:text-red-500 transition-colors ml-2"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-right font-black text-xl text-gray-900 border-l-0 sm:border-l sm:pl-8 border-gray-100">
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-primary-50 rounded-2xl p-4 flex items-center justify-between border border-primary-100">
                            <div className="flex items-center gap-3">
                                <Tag className="text-primary-600" size={20} />
                                <span className="font-bold text-primary-700">Apply Promo Code</span>
                            </div>
                            <button className="text-primary-600 font-bold hover:underline">Select</button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 sticky top-24">
                            <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">Summary</h2>

                            <div className="space-y-5 text-gray-600 mb-8 border-b border-gray-100 pb-8 font-semibold">
                                <div className="flex justify-between items-center">
                                    <span>Subtotal</span>
                                    <span className="text-gray-900 font-bold">₹{cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Tax (5%)</span>
                                    <span className="text-gray-900 font-bold">₹{tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-green-600">
                                    <span>Delivery Fee</span>
                                    <span className="font-bold">₹{deliveryFee.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-10">
                                <span className="text-lg font-bold text-gray-900 uppercase">Total Amount</span>
                                <span className="text-3xl font-black text-primary-600">₹{grandTotal.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={() => navigate('/payment')}
                                className="w-full bg-primary-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary-200 hover:bg-primary-700 transition-all active:scale-95 flex items-center justify-center gap-3"
                            >
                                PROCEED TO CHECKOUT
                                <ArrowRight size={20} />
                            </button>

                            <div className="mt-8 flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Secure Checkout Powered by FK Pay</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
