import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X, ChevronDown, ShoppingBag, Heart, Settings, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await logout();
        setIsProfileOpen(false);
        navigate('/login');
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <nav className="bg-white sticky top-0 z-50 py-4 shadow-sm select-none">
            <div className="w-full px-4 sm:px-10 lg:px-16">
                <div className="flex justify-between h-12 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex flex-col items-start group">
                        <div className="flex items-center">
                            <Logo />
                        </div>
                        <span className="text-[7px] sm:text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] -mt-1 ml-10 group-hover:text-primary-600 transition-colors">Developed by Deva</span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-10">
                        <Link to="/" className="text-[14px] font-black text-gray-900 hover:text-primary-600 transition-colors uppercase tracking-widest">Home</Link>
                        <Link to="/" className="text-[14px] font-black text-gray-400 hover:text-primary-600 transition-colors uppercase tracking-widest">Restaurants</Link>
                        <Link to="/offers" className="text-[14px] font-black text-gray-400 hover:text-primary-600 transition-colors uppercase tracking-widest">Offers</Link>
                    </div>

                    {/* User Actions */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/cart" className="relative text-gray-900 hover:text-primary-600 transition-all p-2 bg-gray-50 rounded-full hover:bg-primary-50">
                            <ShoppingBag size={22} />
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] font-black min-w-[20px] h-[20px] flex items-center justify-center rounded-full ring-2 ring-white"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </Link>

                        {user ? (
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-3 p-1.5 pl-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all group border border-transparent hover:border-gray-200"
                                >
                                    <span className="text-[15px] font-bold text-gray-800 hidden lg:inline-block">
                                        {user.displayName?.split(' ')[0] || 'User'}
                                    </span>
                                    <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md shadow-primary-200 group-hover:rotate-6 transition-transform">
                                        {getInitials(user.displayName || user.email)}
                                    </div>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Zomato-style Dropdown */}
                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                            className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden py-3 p-2 z-[60]"
                                        >
                                            <div className="px-4 py-3 mb-2 border-b border-gray-50">
                                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Logged in as</p>
                                                <p className="font-bold text-gray-900 truncate">{user.displayName || 'FoodKart User'}</p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>

                                            <div className="space-y-1">
                                                <Link
                                                    to="/orders"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-2xl transition-all"
                                                >
                                                    <ShoppingBag size={18} />
                                                    My Orders
                                                </Link>
                                                <Link
                                                    to="#"
                                                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-2xl transition-all"
                                                >
                                                    <Heart size={18} />
                                                    Favorites
                                                </Link>
                                                <Link
                                                    to="#"
                                                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-2xl transition-all"
                                                >
                                                    <Settings size={18} />
                                                    Settings
                                                </Link>
                                            </div>

                                            <div className="mt-2 pt-2 border-t border-gray-50">
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                                >
                                                    <LogOut size={18} />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center gap-6">
                                <Link to="/login" className="text-[14px] font-black text-gray-900 hover:text-primary-600 uppercase tracking-tight">Login</Link>
                                <Link to="/signup" className="bg-primary-600 text-white px-8 py-3 rounded-2xl font-black text-[14px] hover:bg-primary-700 transition-all shadow-xl shadow-primary-200 active:scale-95 uppercase tracking-widest">
                                    Join Us
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-5">
                        <Link to="/cart" className="relative text-gray-900 p-2 bg-gray-50 rounded-xl">
                            <ShoppingBag size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-900 p-2 bg-gray-50 rounded-xl">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 overflow-hidden z-50 shadow-2xl"
                    >
                        <div className="p-6 flex flex-col gap-6">
                            <div className="grid grid-cols-3 gap-4">
                                <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl">
                                    <Menu size={20} className="text-primary-600" />
                                    <span className="text-xs font-black">HOME</span>
                                </Link>
                                <Link to="/offers" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl">
                                    <Tag size={20} className="text-primary-600" />
                                    <span className="text-xs font-black">OFFERS</span>
                                </Link>
                                <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl">
                                    <ShoppingBag size={20} className="text-primary-600" />
                                    <span className="text-xs font-black">CART</span>
                                </Link>
                            </div>

                            <div className="pt-4 border-t border-gray-50 flex flex-col gap-4">
                                {user ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-2xl">
                                            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">
                                                {getInitials(user.displayName || user.email)}
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900">{user.displayName || 'FoodKart User'}</p>
                                                <p className="text-xs text-primary-600 font-bold uppercase tracking-widest">Premium Member</p>
                                            </div>
                                        </div>
                                        <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-4 font-black text-gray-600 border border-gray-100 rounded-2xl">
                                            <ShoppingBag size={20} /> MY ORDERS
                                        </Link>
                                        <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="flex items-center gap-3 p-4 font-black text-red-500 border border-red-50 rounded-2xl w-full">
                                            <LogOut size={20} /> SIGN OUT
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-center py-4 font-black text-gray-900 border border-gray-100 rounded-2xl uppercase tracking-widest">Login</Link>
                                        <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block w-full text-center py-4 bg-primary-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary-100">Join Us Now</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
