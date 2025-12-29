import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
    return (
        <Link to={`/restaurant/${restaurant.id}`} className="block group">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-bold text-gray-800">{restaurant.rating}</span>
                    </div>
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight truncate flex-1">{restaurant.name}</h3>
                        <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded uppercase">{restaurant.priceRange}</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-3 truncate italic">{restaurant.cuisine}</p>
                    <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 border-t pt-3">
                        <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{restaurant.deliveryTime}</span>
                        </div>
                        <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                        <div>Free Delivery</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default RestaurantCard;
