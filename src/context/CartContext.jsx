import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { syncCartToFirebase, getCartFromFirebase } from '../services/foodService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useAuth();

    // Load cart initially from localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem('foodkart_cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    // Load cart from Firebase when user logs in
    useEffect(() => {
        const loadFirebaseCart = async () => {
            if (user) {
                const firebaseCart = await getCartFromFirebase(user.uid);
                if (firebaseCart && firebaseCart.length > 0) {
                    setCartItems(firebaseCart);
                }
            }
        };
        loadFirebaseCart();
    }, [user]);

    // Save cart to LocalStorage and Firebase on change
    useEffect(() => {
        localStorage.setItem('foodkart_cart', JSON.stringify(cartItems));
        if (user) {
            syncCartToFirebase(user.uid, cartItems);
        }
    }, [cartItems, user]);

    const addToCart = (item, restaurantId, restaurantName) => {
        setCartItems(prev => {
            const currentRestaurant = prev.length > 0 ? prev[0].restaurantId : null;
            if (currentRestaurant && currentRestaurant !== restaurantId) {
                if (!window.confirm("Adding this item will clear your current cart from another restaurant. Continue?")) {
                    return prev;
                }
                return [{ ...item, quantity: 1, restaurantId, restaurantName }];
            }
            const existingItem = prev.find(i => i.id === item.id);
            if (existingItem) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1, restaurantId, restaurantName }];
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems(prev => prev.filter(i => i.id !== itemId));
    };

    const updateQuantity = (itemId, delta) => {
        setCartItems(prev => {
            return prev.map(i => {
                if (i.id === itemId) {
                    const newQty = Math.max(1, i.quantity + delta);
                    return { ...i, quantity: newQty };
                }
                return i;
            });
        });
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('foodkart_cart');
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount
    };

    return (
        <AuthCartSyncWrapper>
            <CartContext.Provider value={value}>
                {children}
            </CartContext.Provider>
        </AuthCartSyncWrapper>
    );
};

// Internal wrapper to ensure useAuth is available if needed, 
// though actually AuthProvider wraps CartProvider in App.jsx usually
const AuthCartSyncWrapper = ({ children }) => {
    return children;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
