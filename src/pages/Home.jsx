import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { restaurants as localRestaurants } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';
import { Search, SlidersHorizontal, Loader2, RefreshCw, ShoppingBag, Clock } from 'lucide-react';
import { getRestaurants, seedRestaurants, getUserOrders } from '../services/foodService';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { user } = useAuth();
    const [restaurants, setRestaurants] = useState([]);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('All');

    useEffect(() => {
        fetchRestaurants();
        if (user) {
            fetchRecentOrders();
        }
    }, [user]);

    const fetchRecentOrders = async () => {
        try {
            const data = await getUserOrders(user.uid);
            setRecentOrders(data.slice(0, 4)); // Show last 4 orders
        } catch (error) {
            console.error("Error fetching recent orders:", error);
        }
    };

    const fetchRestaurants = async () => {
        setLoading(true);
        try {
            let data = await getRestaurants();
            if (data.length === 0) {
                // If DB is empty, seed it with local data automatically
                await seedRestaurants(localRestaurants);
                data = await getRestaurants();
            }
            setRestaurants(data);
        } catch (error) {
            console.error("Failed to fetch restaurants:", error);
        } finally {
            setLoading(false);
        }
    };

    const cuisines = ['All', ...new Set(localRestaurants.map(r => r.cuisine.split(',')[0]))];

    const filteredRestaurants = restaurants.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCuisine = selectedCuisine === 'All' || r.cuisine.includes(selectedCuisine);
        return matchesSearch && matchesCuisine;
    });

    return (
        <div className="min-h-screen pb-20 bg-white">
            {/* Hero Section - Full Width */}
            <div className="w-full px-4 sm:px-10 lg:px-16 mt-4">
                <section className="relative h-[480px] sm:h-[520px] rounded-[3rem] overflow-hidden group">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070"
                            alt="Delicious Food spread"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>

                    {/* Hero Content */}
                    <div className="relative h-full flex flex-col items-start justify-center px-6 sm:px-20 max-w-4xl">
                        <h1 className="text-4xl sm:text-7xl font-extrabold text-white mb-8 sm:mb-10 leading-[1.1] tracking-tight">
                            Order Food From <br className="hidden sm:block" />
                            Your Favorite <br className="hidden sm:block" />
                            Restaurants
                        </h1>

                        {/* Search Bar - Stylized like image */}
                        <div className="w-full max-w-lg relative">
                            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-400">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for restaurants or cuisines..."
                                className="w-full pl-14 pr-4 py-5 rounded-2xl bg-white shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/20 text-gray-800 placeholder-gray-400 text-[15px] font-medium transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </section>
            </div>

            {/* Top Offers for You Section */}
            {!searchTerm && (
                <div className="w-full px-4 sm:px-10 lg:px-16 mt-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Top Offers for You</h2>
                        <Link to="/offers" className="text-sm font-black text-primary-600 hover:text-primary-700 uppercase tracking-widest border-b-2 border-primary-600/20">View All</Link>
                    </div>

                    <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
                        {[
                            { title: 'Free Tacos on Tuesday', subtitle: 'At Taco Fiesta', color: 'from-rose-500 to-pink-600' },
                            { title: 'Buy 1 Get 1 Free', subtitle: 'At Pizza Hut', color: 'from-red-500 to-rose-600' },
                            { title: 'Flat ₹100 OFF', subtitle: 'At Green Garden', color: 'from-pink-500 to-rose-500' },
                            { title: '20% off on first order', subtitle: 'At Pasta Palace', color: 'from-rose-600 to-pink-700' },
                            { title: '50% Off on Desserts', subtitle: 'At Sweet Treats', color: 'from-purple-500 to-indigo-600' },
                        ].map((offer, i) => (
                            <div
                                key={i}
                                className={`min-w-[300px] sm:min-w-[350px] aspect-[16/9] rounded-[2.5rem] bg-gradient-to-br ${offer.color} p-8 flex flex-col justify-between relative overflow-hidden group cursor-pointer shadow-xl shadow-rose-100 hover:scale-[1.02] transition-transform`}
                            >
                                {/* Decorative Star Pattern */}
                                <div className="absolute -right-8 -bottom-8 opacity-20 group-hover:rotate-12 transition-transform duration-700">
                                    <svg width="200" height="200" viewBox="0 0 24 24" fill="white">
                                        <path d="M12 1L14.39 8.26H22L15.81 12.75L18.19 20.01L12 15.52L5.81 20.01L8.19 12.75L2 8.26H9.61L12 1Z" />
                                    </svg>
                                </div>

                                <div>
                                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest mb-4 border border-white/20">
                                        Limited Deal
                                    </span>
                                    <h3 className="text-2xl font-black text-white leading-tight mb-1">{offer.title}</h3>
                                    <p className="text-white/80 font-bold text-sm">{offer.subtitle}</p>
                                </div>

                                <button className="w-fit px-6 py-2.5 bg-white text-rose-600 rounded-xl font-black text-sm shadow-lg hover:bg-rose-50 transition-colors uppercase tracking-tight">
                                    Grab Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Zomato-style Recent Orders Section */}
            {user && recentOrders.length > 0 && !searchTerm && (
                <div className="w-full px-4 sm:px-10 lg:px-16 mt-16 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase flex items-center gap-3">
                            <Clock className="text-primary-600" /> Recent Orders
                        </h2>
                        <Link to="/orders" className="text-sm font-bold text-primary-600 hover:text-primary-700 uppercase tracking-widest border-b-2 border-primary-600/20">View All</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                                        <img src={order.items[0]?.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-bold text-gray-900 truncate uppercase text-sm tracking-tight">{order.restaurantName}</h3>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">₹{order.total.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-[10px] font-bold py-1 px-2 bg-green-50 text-green-600 rounded-lg uppercase tracking-wider">Delivered</span>
                                    <Link to={`/restaurant/${order.items[0]?.restaurantId}`} className="text-[10px] font-black text-primary-600 hover:underline uppercase tracking-widest">Reorder</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Filter Section - Full Width */}
            <div className="w-full px-4 sm:px-10 lg:px-16 mt-16 mb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-gray-100 gap-8">
                    <div className="flex flex-col gap-6 overflow-hidden">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tighter shrink-0">Popular Restaurants</h2>
                        <div className="flex items-center gap-6 py-1 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                            {cuisines.map(cuisine => (
                                <button
                                    key={cuisine}
                                    onClick={() => setSelectedCuisine(cuisine)}
                                    className={`px-1 py-1 text-sm font-black transition-all shrink-0 uppercase tracking-[0.2em] border-b-2 ${selectedCuisine === cuisine
                                        ? 'border-primary-600 text-primary-600'
                                        : 'border-transparent text-gray-300 hover:text-gray-500'
                                        }`}
                                >
                                    {cuisine}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-xs font-black text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                            <SlidersHorizontal size={14} />
                            <span className="uppercase tracking-widest">Filters</span>
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-xs font-black text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                            <span className="uppercase tracking-widest">Rating 4.0+</span>
                        </button>
                    </div>
                </div>

                {/* Restaurant Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 size={48} className="text-primary-600 animate-spin mb-4" />
                        <p className="text-gray-500 font-bold uppercase tracking-widest animate-pulse">Loading Kitchens...</p>
                    </div>
                ) : filteredRestaurants.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {filteredRestaurants.map(restaurant => (
                            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                        <Search size={64} className="mx-auto text-gray-200 mb-6" />
                        <h3 className="text-xl font-bold text-gray-800">No restaurants match your search</h3>
                        <p className="text-gray-400 mt-2">Try different keywords or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
