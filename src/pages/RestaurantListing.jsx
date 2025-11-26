import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, SlidersHorizontal, Star, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';

const filters = ['Tout', 'Congolais', 'Fast Food', 'Grillades', 'Healthy', 'Vegan'];
const sortOptions = ['Recommandé', 'Note', 'Distance', 'Temps de livraison'];

const allRestaurants = [
  {
    id: 1,
    name: 'Chez Maman',
    cuisine: 'Congolais',
    rating: 4.8,
    deliveryTime: '20-30 min',
    distance: '2.5 km',
    image: 'Traditional Congolese restaurant exterior',
    promo: '-20%'
  },
  {
    id: 2,
    name: 'Le Grill King',
    cuisine: 'Grillades',
    rating: 4.6,
    deliveryTime: '25-35 min',
    distance: '3.2 km',
    image: 'Modern grill restaurant with outdoor seating',
    promo: null
  },
  {
    id: 3,
    name: 'Fresh & Green',
    cuisine: 'Healthy',
    rating: 4.9,
    deliveryTime: '15-25 min',
    distance: '1.8 km',
    image: 'Bright healthy food restaurant interior',
    promo: 'LIVRAISON GRATUITE'
  },
  {
    id: 4,
    name: 'Burger Palace',
    cuisine: 'Fast Food',
    rating: 4.5,
    deliveryTime: '20-30 min',
    distance: '2.1 km',
    image: 'American style burger restaurant',
    promo: null
  },
  {
    id: 5,
    name: 'Le Jardin Végétal',
    cuisine: 'Vegan',
    rating: 4.7,
    deliveryTime: '30-40 min',
    distance: '4.5 km',
    image: 'Cozy vegan restaurant with plants',
    promo: '-15%'
  },
  {
    id: 6,
    name: 'Poulet DG Express',
    cuisine: 'Congolais',
    rating: 4.4,
    deliveryTime: '25-35 min',
    distance: '3.8 km',
    image: 'Local Congolese food restaurant',
    promo: null
  }
];

const RestaurantListing = () => {
  const [selectedFilter, setSelectedFilter] = useState('Tout');
  const [selectedSort, setSelectedSort] = useState('Recommandé');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Restaurants - GLUCK Eats</title>
        <meta name="description" content="Parcourez tous les restaurants et cuisines" />
      </Helmet>
      <div className="min-h-screen bg-[#F7F7F7] pb-24">
        {/* Header */}
        <div className="bg-white px-6 py-4 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/home')}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F7F7F7] transition-all"
            >
              <ArrowLeft size={20} className="text-[#0A0A0A]" />
            </button>
            <h1 className="text-xl font-bold text-[#0A0A0A]">Tous les Restaurants</h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F7F7F7] transition-all"
            >
              <SlidersHorizontal size={20} className="text-[#0A0A0A]" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white px-6 py-4 border-b">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedFilter === filter
                    ? 'bg-[#F4B400] text-[#0A0A0A]'
                    : 'bg-[#F7F7F7] text-[#0A0A0A]/60 hover:bg-[#E8DDB5]/30'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="px-6 py-3 flex items-center gap-2">
          <span className="text-sm text-[#0A0A0A]/60">Trier par :</span>
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="text-sm font-medium text-[#0A0A0A] bg-transparent border-none outline-none cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Restaurant Grid */}
        <div className="px-6 pb-6">
          <div className="grid gap-4">
            {allRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden cursor-pointer"
              >
                <div className="flex gap-4 p-4">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                    <img
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                     src="https://images.unsplash.com/photo-1470256699805-a29e1b58598a" />
                    {restaurant.promo && (
                      <div className="absolute top-1 left-1 bg-[#E68931] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {restaurant.promo}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-[#0A0A0A] mb-1">{restaurant.name}</h3>
                      <p className="text-sm text-[#0A0A0A]/60">{restaurant.cuisine}</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-[#F4B400] fill-[#F4B400]" />
                        <span className="font-semibold text-[#0A0A0A]">{restaurant.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#0A0A0A]/60">
                        <Clock size={14} />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#0A0A0A]/60">
                        <MapPin size={14} />
                        <span>{restaurant.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <BottomNav />
      </div>
    </>
  );
};

export default RestaurantListing;