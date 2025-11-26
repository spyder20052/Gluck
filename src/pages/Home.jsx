import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, SlidersHorizontal, Star, Clock, Heart, ChevronRight } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

// Custom SVG components for categories
const IllustrationCongolese = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="80" height="80" rx="20" fill="#FFF8E1" />
    <path d="M20 55C20 66.0457 28.9543 75 40 75C51.0457 75 60 66.0457 60 55V45H20V55Z" fill="#E68931" />
    <path d="M25 45V35C25 35 30 25 40 25C50 25 55 35 55 35V45" stroke="#0B3A2E" strokeWidth="3" strokeLinecap="round" />
    <path d="M40 25V15" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
    <path d="M32 28V18" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
    <path d="M48 28V18" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
  </svg>
);

const IllustrationFastFood = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="80" height="80" rx="20" fill="#FFF3E0" />
    <path d="M20 45H60V50C60 55.5228 55.5228 60 50 60H30C24.4772 60 20 55.5228 20 50V45Z" fill="#F4B400" />
    <path d="M20 40H60V35C60 26.7157 53.2843 20 45 20H35C26.7157 20 20 26.7157 20 35V40Z" fill="#E68931" />
    <rect x="18" y="40" width="44" height="6" rx="3" fill="#0B3A2E" />
    <rect x="22" y="43" width="36" height="4" rx="2" fill="#8D6E63" />
  </svg>
);

const IllustrationGrill = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="80" height="80" rx="20" fill="#FFEBEE" />
    <path d="M25 65L55 35" stroke="#8D6E63" strokeWidth="4" strokeLinecap="round" />
    <circle cx="30" cy="60" r="5" fill="#E68931" />
    <circle cx="40" cy="50" r="5" fill="#D84315" />
    <circle cx="50" cy="40" r="5" fill="#E68931" />
    <path d="M45 25C45 25 48 15 55 15C62 15 60 25 60 25" stroke="#F4B400" strokeWidth="3" strokeLinecap="round" />
    <path d="M50 28C50 28 53 18 60 18" stroke="#E64A19" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const IllustrationHealthy = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="80" height="80" rx="20" fill="#E8F5E9" />
    <path d="M40 65C53.8071 65 65 53.8071 65 40H15C15 53.8071 26.1929 65 40 65Z" fill="#81C784" />
    <path d="M40 40V20" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" />
    <path d="M40 30C40 30 50 20 55 25" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" />
    <path d="M40 35C40 35 25 25 25 30" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" />
    <circle cx="35" cy="50" r="4" fill="#FF5252" />
    <circle cx="45" cy="55" r="4" fill="#FF5252" />
    <circle cx="50" cy="45" r="4" fill="#FF5252" />
  </svg>
);

const IllustrationVegan = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="80" height="80" rx="20" fill="#F1F8E9" />
    <path d="M40 60V25" stroke="#33691E" strokeWidth="3" strokeLinecap="round" />
    <path d="M40 45C40 45 20 40 20 25C20 15 40 25 40 25" fill="#8BC34A" />
    <path d="M40 45C40 45 60 40 60 25C60 15 40 25 40 25" fill="#AED581" />
    <path d="M30 60H50" stroke="#5D4037" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const IllustrationSnacks = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="80" height="80" rx="20" fill="#F3E5F5" />
    <circle cx="40" cy="40" r="20" stroke="#8E24AA" strokeWidth="10" />
    <circle cx="40" cy="40" r="20" stroke="#BA68C8" strokeWidth="4" strokeDasharray="10 10" />
    <circle cx="30" cy="30" r="2" fill="#F4B400" />
    <circle cx="50" cy="50" r="2" fill="#F4B400" />
    <circle cx="50" cy="30" r="2" fill="#E68931" />
  </svg>
);

const categories = [
  { id: 1, name: 'Congolais', Icon: IllustrationCongolese },
  { id: 2, name: 'Fast Food', Icon: IllustrationFastFood },
  { id: 3, name: 'Grillades', Icon: IllustrationGrill },
  { id: 4, name: 'Healthy', Icon: IllustrationHealthy },
  { id: 5, name: 'Vegan', Icon: IllustrationVegan },
  { id: 6, name: 'Snacks', Icon: IllustrationSnacks }
];

const restaurants = [
  {
    id: 1,
    name: 'Chez Maman',
    cuisine: 'Congolais • Traditionnel',
    rating: 4.8,
    reviews: 234,
    deliveryTime: '20-30 min',
    deliveryFee: '2000 FC',
    image: 'Authentic Congolese feast table spread',
    promo: '-20%'
  },
  {
    id: 2,
    name: 'Le Grill King',
    cuisine: 'BBQ • Grillades',
    rating: 4.6,
    reviews: 189,
    deliveryTime: '35-45 min',
    deliveryFee: '1500 FC',
    image: 'Sizzling steak on grill with flames',
    promo: null
  },
  {
    id: 3,
    name: 'Fresh & Green',
    cuisine: 'Healthy • Smoothies',
    rating: 4.9,
    reviews: 562,
    deliveryTime: '15-25 min',
    deliveryFee: 'Gratuit',
    image: 'Fresh avocado toast and green smoothie',
    promo: 'LIVRAISON GRATUITE'
  }
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Accueil - GLUCK Eats</title>
        <meta name="description" content="Découvrez des restaurants incroyables et commandez vos plats préférés" />
      </Helmet>
      <div className="min-h-screen bg-[#F7F7F7] pb-24">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-b from-[#0A0A0A] to-[#1a1a1a] px-6 pt-12 pb-8 rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4B400] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 flex items-center justify-between mb-8">
            <div className="flex-1">
              <p className="text-[#E8DDB5] text-xs font-medium mb-1 tracking-wider uppercase">Livrer à</p>
              <button className="flex items-center gap-2 text-white hover:bg-white/5 p-2 -ml-2 rounded-xl transition-all group">
                <div className="bg-[#F4B400]/20 p-1.5 rounded-lg group-hover:bg-[#F4B400] transition-colors">
                  <MapPin size={18} className="text-[#F4B400] group-hover:text-[#0A0A0A]" />
                </div>
                <span className="font-bold text-lg">Gombe, Kinshasa</span>
                <ChevronRight size={16} className="text-white/40" />
              </button>
            </div>
            <button onClick={() => navigate('/profile')} className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full p-0.5 border-2 border-transparent hover:border-[#F4B400] transition-all">
              <img alt="Avatar Utilisateur" className="w-full h-full rounded-full object-cover" src="https://images.unsplash.com/photo-1683071765673-ff92ff1645dc" />
            </button>
          </div>

          {/* Enhanced Search Bar */}
          <div className="relative z-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E8DDB5]" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="De quoi avez-vous envie ?"
              className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 pl-12 pr-14 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/15 focus:border-[#F4B400] transition-all duration-300 shadow-inner"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#F4B400] rounded-xl flex items-center justify-center hover:bg-[#E68931] transition-all shadow-lg shadow-[#F4B400]/20">
              <SlidersHorizontal size={18} className="text-[#0A0A0A]" />
            </button>
          </div>
        </div>

        {/* Categories with Custom SVGs */}
        <div className="pt-6 pb-2">
          <div className="px-6 flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#0A0A0A]">Catégories</h2>
            <button className="text-[#F4B400] text-sm font-semibold hover:underline">Voir tout</button>
          </div>
          <div className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileTap={{ scale: 0.95 }}
                whileHover={{ y: -5 }}
                onClick={() => navigate('/restaurants')}
                className="flex-shrink-0 flex flex-col items-center gap-2 group"
              >
                <div className="rounded-2xl shadow-sm group-hover:shadow-md transition-all duration-300">
                  <category.Icon />
                </div>
                <span className="text-sm font-bold text-[#0A0A0A] group-hover:text-[#F4B400] transition-colors">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Responsive Promo Banner */}
        <div className="px-6 mb-8">
          <div className="bg-[#0A0A0A] rounded-3xl overflow-hidden relative shadow-lg shadow-orange-500/20 group cursor-pointer flex flex-col sm:flex-row h-auto sm:h-56 lg:h-64">
            {/* Image Section */}
            <div className="w-full sm:w-1/2 h-48 sm:h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/60 to-transparent z-10"></div>
              <img alt="Offre Spéciale" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1695606392809-0da228da6b83" />
            </div>

            {/* Content Section */}
            <div className="w-full sm:w-1/2 p-6 sm:p-8 flex flex-col justify-center bg-gradient-to-b sm:bg-gradient-to-l from-[#1a1a1a] to-[#0A0A0A] sm:to-transparent z-20">
              <span className="bg-[#F4B400] text-[#0A0A0A] text-[10px] sm:text-xs font-extrabold px-2 py-1 rounded-md w-fit mb-2 sm:mb-3">OFFRE LIMITÉE</span>
              <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mb-2">-30% sur tous les Menus Burgers</h3>
              <p className="text-white/80 text-xs sm:text-sm mb-4 sm:mb-6">Commandez avant 14h00</p>
              <button className="bg-white text-[#0A0A0A] px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-xs sm:text-sm w-fit hover:bg-[#F4B400] transition-colors shadow-md">Commander</button>
            </div>
          </div>
        </div>

        {/* Recommended Restaurants */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#0A0A0A]">Populaire à proximité</h2>
            <button className="w-8 h-8 bg-[#F7F7F7] rounded-full flex items-center justify-center hover:bg-[#E8DDB5]">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid gap-6">
            {restaurants.map((restaurant) => (
              <motion.div
                key={restaurant.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src="https://images.unsplash.com/photo-1470256699805-a29e1b58598a" />

                  {restaurant.promo && (
                    <div className="absolute top-4 left-4 z-20 bg-[#E68931] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {restaurant.promo}
                    </div>
                  )}

                  <button className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all">
                    <Heart size={20} />
                  </button>

                  <div className="absolute bottom-4 left-4 z-20 text-white">
                    <h3 className="font-bold text-2xl mb-1 shadow-black drop-shadow-md">{restaurant.name}</h3>
                    <p className="text-white/90 text-sm font-medium">{restaurant.cuisine}</p>
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-[#F7F7F7] px-2 py-1 rounded-lg">
                      <Star size={16} className="text-[#F4B400] fill-[#F4B400]" />
                      <span className="text-sm font-bold text-[#0A0A0A]">{restaurant.rating}</span>
                      <span className="text-xs text-[#0A0A0A]/40">({restaurant.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#0A0A0A]/60 text-sm">
                      <Clock size={16} className="text-[#0B3A2E]" />
                      <span className="font-medium">{restaurant.deliveryTime}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#0A0A0A]/40">Livraison</p>
                    <p className="font-bold text-[#0B3A2E] text-sm">{restaurant.deliveryFee}</p>
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

export default Home;