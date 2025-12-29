import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { placeOrder } from '../services/foodService';
import { CreditCard, ShieldCheck, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

const Payment = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const tax = cartTotal * 0.05;
    const deliveryFee = 40.00;
    const grandTotal = cartTotal + tax + deliveryFee;

    useEffect(() => {
        if (cartTotal === 0) {
            navigate('/');
        }
    }, [cartTotal, navigate]);

    const handlePayment = async (e) => {
        e.preventDefault();
        setError('');

        const enteredAmount = parseFloat(amount);
        if (isNaN(enteredAmount)) {
            setError("Please enter a valid amount");
            return;
        }

        if (enteredAmount !== parseFloat(grandTotal.toFixed(2))) {
            setError(`Amount must be exactly ₹${grandTotal.toFixed(2)}`);
            return;
        }

        setIsProcessing(true);

        try {
            // Save to Firestore
            await placeOrder({
                userId: user?.uid,
                userName: user?.displayName || user?.email,
                items: cartItems,
                total: grandTotal,
                restaurantName: cartItems[0]?.restaurantName || 'Unknown',
                paymentStatus: 'Paid'
            });

            setIsProcessing(false);
            clearCart();
            navigate('/order-success');
        } catch (err) {
            console.error("Payment error:", err);
            setError("Payment failed. Please try again.");
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="bg-primary-600 p-8 text-white text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-md mb-4 border border-white/30">
                            <CreditCard size={32} />
                        </div>
                        <h1 className="text-3xl font-black uppercase tracking-tight">Payment Portal</h1>
                        <p className="opacity-80 font-medium">Safe & Secure Transaction</p>
                    </div>

                    <div className="p-8 sm:p-10">
                        <div className="mb-10 text-center">
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">Total Amount Payable</p>
                            <div className="text-5xl font-black text-gray-900 tracking-tighter">₹{grandTotal.toFixed(2)}</div>
                        </div>

                        {error && (
                            <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-bold flex items-center gap-3 rounded-r-xl">
                                <AlertCircle size={20} />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handlePayment} className="space-y-8">
                            <div className="relative group">
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Confirm Amount</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500">
                                        <span className="font-bold text-lg">₹</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-12 py-5 bg-gray-50 border border-gray-200 rounded-2xl text-2xl font-black text-gray-800 focus:outline-none focus:ring-4 focus:ring-primary-400/20 focus:bg-white focus:border-primary-500 transition-all placeholder-gray-300"
                                        placeholder="0.00"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        disabled={isProcessing}
                                    />
                                    {amount === grandTotal.toFixed(2) && (
                                        <div className="absolute inset-y-0 right-4 flex items-center text-green-500">
                                            <CheckCircle2 size={24} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full flex items-center justify-center gap-3 py-5 px-4 bg-primary-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-primary-200 hover:bg-primary-700 transition-all active:scale-95 disabled:bg-gray-400 disabled:shadow-none"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 size={24} className="animate-spin" />
                                        VERIFYING...
                                    </>
                                ) : (
                                    <>
                                        CONFIRM PAYMENT
                                        <ShieldCheck size={24} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-12 flex flex-col items-center">
                            <div className="flex items-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
                            </div>
                            <p className="mt-8 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] flex items-center gap-2">
                                <ShieldCheck size={14} /> PCI-DSS COMPLIANT SYSTEM
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
