import React from 'react';
import { offers } from '../data/restaurants';
import { Ticket, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Offers = () => {
    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-10">
            <div className="w-full px-4 sm:px-10 lg:px-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Exclusive Offers</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">Delicious deals just for you. Grab them before they're gone!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {offers.map((offer) => (
                        <div key={offer.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                            <div className="relative h-48">
                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-4 left-6">
                                    <span className="bg-primary-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest border border-primary-400">Limited Time</span>
                                    <h2 className="text-3xl font-black text-white mt-1 leading-tight">{offer.title}</h2>
                                </div>
                            </div>

                            <div className="p-8">
                                <p className="text-gray-600 font-medium mb-6 leading-relaxed">{offer.description}</p>

                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Promo Code</span>
                                        <div className="flex items-center gap-2 bg-primary-50 px-3 py-2 rounded-xl border border-primary-100">
                                            <Tag size={16} className="text-primary-600" />
                                            <span className="font-black text-primary-700 font-mono tracking-tighter">{offer.code}</span>
                                        </div>
                                    </div>

                                    <Link
                                        to={`/restaurant/${offer.restaurantId}`}
                                        className="flex h-14 w-14 items-center justify-center bg-gray-900 text-white rounded-2xl hover:bg-primary-600 transition-colors shadow-lg active:scale-95 group"
                                    >
                                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bonus Referral Section */}
                <div className="mt-20 bg-primary-600 rounded-[3rem] p-8 sm:p-16 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight uppercase tracking-tighter">Refer a Friend <br />Get ₹100 Free</h2>
                        <p className="text-primary-100 text-lg mb-10 font-medium">Invite your fellow foodies and earn credits for every successful referral. It's time to share the joy of FoodKart!</p>
                        <button className="bg-white text-primary-600 px-10 py-5 rounded-3xl font-black text-lg shadow-xl shadow-black/10 hover:bg-primary-50 transition-all active:scale-95 uppercase tracking-tight">
                            Invite Now
                        </button>
                    </div>

                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-20 text-white/10 select-none">
                        <Ticket size={240} strokeWidth={1} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offers;
