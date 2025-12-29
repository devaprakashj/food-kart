import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
    const navigate = useNavigate();

    // Redirect to home if accessed directly without an order (optional logic)
    // For now, let's just make it look good.

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden"
            >
                <div className="bg-green-500 py-12 text-white text-center relative overflow-hidden">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30">
                            <CheckCircle size={56} className="text-white" />
                        </div>
                    </motion.div>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-4xl font-black uppercase tracking-tight mb-2"
                    >
                        Order Successful!
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="font-bold opacity-80"
                    >
                        Thank you for choosing FoodKart
                    </motion.p>

                    {/* Abstract circles for decoration */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full"></div>
                </div>

                <div className="p-8 sm:p-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                            <div className="flex items-center gap-3 text-primary-600 mb-4">
                                <Package size={24} />
                                <span className="font-black uppercase tracking-widest text-xs">Tracking ID</span>
                            </div>
                            <p className="text-2xl font-black text-gray-800">#FK-9821045</p>
                            <p className="text-sm text-gray-500 font-medium">Estimated Delivery: 30-45 mins</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                            <div className="flex items-center gap-3 text-red-500 mb-4">
                                <Heart size={24} />
                                <span className="font-black uppercase tracking-widest text-xs">Customer Love</span>
                            </div>
                            <p className="text-lg font-bold text-gray-800 leading-tight">Rate your experience</p>
                            <div className="flex gap-1 mt-2">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />)}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Link
                            to="/"
                            className="w-full flex items-center justify-center gap-3 py-5 bg-gray-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all active:scale-95 shadow-xl"
                        >
                            CONTINUE SHOPPING
                            <ArrowRight size={20} />
                        </Link>

                        <button className="w-full py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors uppercase tracking-widest text-sm">
                            VIEW FULL RECEIPT
                        </button>
                    </div>

                    <div className="mt-12 text-center border-t border-gray-100 pt-8">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
                            Stay hungry, stay foolish. Bon Appétit!
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderSuccess;
