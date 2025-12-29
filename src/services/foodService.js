import { db } from '../firebase';
import {
    collection,
    getDocs,
    addDoc,
    query,
    where,
    doc,
    setDoc,
    getDoc,
    orderBy
} from 'firebase/firestore';

// Fetch all restaurants
export const getRestaurants = async () => {
    try {
        const restaurantsCol = collection(db, 'restaurants');
        const restaurantSnapshot = await getDocs(restaurantsCol);
        const restaurantList = restaurantSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return restaurantList;
    } catch (error) {
        console.error("Error fetching restaurants: ", error);
        throw error;
    }
};

// Seed function (to be called once to upload data)
export const seedRestaurants = async (restaurantsData) => {
    try {
        const restaurantsCol = collection(db, 'restaurants');
        for (const restaurant of restaurantsData) {
            // Using restaurant.id as doc ID if possible, or letting firebase generate
            const docRef = doc(restaurantsCol, restaurant.id.toString());
            await setDoc(docRef, restaurant);
        }
        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database: ", error);
        throw error;
    }
};

// Fetch orders for a user
export const getUserOrders = async (userId) => {
    try {
        const ordersCol = collection(db, 'orders');
        const q = query(ordersCol, where("userId", "==", userId));
        const orderSnapshot = await getDocs(q);
        const orders = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Sort locally to avoid needing a composite index in Firestore
        return orders.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (error) {
        console.error("Error fetching orders: ", error);
        throw error;
    }
};

// Place an order
export const placeOrder = async (orderData) => {
    try {
        const docRef = await addDoc(collection(db, 'orders'), {
            ...orderData,
            date: new Date().toISOString(),
            status: 'Delivered' // Mock status
        });
        return docRef.id;
    } catch (error) {
        console.error("Error placing order: ", error);
        throw error;
    }
};

// Sync Cart to Firestore
export const syncCartToFirebase = async (userId, cartItems) => {
    try {
        const cartRef = doc(db, 'carts', userId);
        await setDoc(cartRef, { items: cartItems, updatedAt: new Date().toISOString() });
    } catch (error) {
        console.error("Error syncing cart: ", error);
    }
};

// Fetch Cart from Firestore
export const getCartFromFirebase = async (userId) => {
    try {
        const cartRef = doc(db, 'carts', userId);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
            return cartSnap.data().items;
        }
        return [];
    } catch (error) {
        console.error("Error fetching cart: ", error);
        return [];
    }
};
