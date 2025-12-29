import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { Linkedin, Mail } from 'lucide-react';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RestaurantMenu from './pages/RestaurantMenu';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import OrderSuccess from './pages/OrderSuccess';
import Orders from './pages/Orders';
import Offers from './pages/Offers';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="min-h-screen bg-gray-50 flex flex-col">
                        <Navbar />
                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/offers" element={<Offers />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/restaurant/:id" element={<RestaurantMenu />} />

                                {/* Protected Routes */}
                                <Route
                                    path="/cart"
                                    element={
                                        <ProtectedRoute>
                                            <Cart />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/payment"
                                    element={
                                        <ProtectedRoute>
                                            <Payment />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/order-success"
                                    element={
                                        <ProtectedRoute>
                                            <OrderSuccess />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/orders"
                                    element={
                                        <ProtectedRoute>
                                            <Orders />
                                        </ProtectedRoute>
                                    }
                                />

                                {/* Catch-all redirect */}
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </main>
                        <footer className="bg-white border-t border-gray-100 py-12">
                            <div className="w-full px-4 sm:px-10 lg:px-16 text-center">
                                <p className="text-gray-400 font-black text-[10px] tracking-[0.3em] uppercase mb-4">FoodKart © 2025</p>
                                <div className="flex flex-col items-center gap-6">
                                    <p className="text-gray-900 font-bold text-sm tracking-tight">
                                        Developed By <span className="text-primary-600">Devaprakash J</span>
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-4">
                                        <a
                                            href="https://www.linkedin.com/in/devaprakashj/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-primary-50 text-gray-600 hover:text-primary-600 rounded-full text-xs font-black transition-all border border-gray-100 hover:border-primary-100 shadow-sm"
                                        >
                                            <Linkedin size={14} />
                                            <span className="uppercase tracking-widest">LinkedIn</span>
                                        </a>
                                        <a
                                            href="mailto:devaprakashofficial@gmail.com"
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-primary-50 text-gray-600 hover:text-primary-600 rounded-full text-xs font-black transition-all border border-gray-100 hover:border-primary-100 shadow-sm"
                                        >
                                            <Mail size={14} />
                                            <span className="uppercase tracking-widest text-[10px]">devaprakashofficial@gmail.com</span>
                                        </a>
                                    </div>
                                </div>
                                <p className="mt-8 text-gray-300 text-[10px] font-medium uppercase tracking-[0.2em]">A Premium Firebase-powered React Experience</p>
                            </div>
                        </footer>
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
