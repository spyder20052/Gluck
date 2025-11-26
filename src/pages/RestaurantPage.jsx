import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Clock, MapPin, Heart, Share2, Plus, Minus, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const menuCategories = [
  { id: 'popular', name: 'Populaire' },
  { id: 'mains', name: 'Plats Principaux' },
  { id: 'sides', name: 'Accompagnements' },
  { id: 'drinks', name: 'Boissons' }
];

const menuItems = [
  {
    id: 1,
    name: 'Poulet DG Royal',
    description: 'Poulet tendre mijoté avec des plantains, des légumes et notre mélange d\'épices secret.',
    price: 15000,
    rating: 4.9,
    reviews: 85,
    category: 'popular',
    image: 'Gourmet Poulet DG high resolution'
  },
  {
    id: 2,
    name: 'Fufu & Pondu Suprême',
    description: 'Fufu de manioc traditionnel servi avec un ragoût riche et crémeux de feuilles de manioc et du poisson fumé.',
    price: 12000,
    rating: 4.7,
    reviews: 42,
    category: 'popular',
    image: 'Authentic fufu and pondu bowl aesthetic'
  },
  {
    id: 3,
    name: 'Festin de Tilapia Grillé',
    description: 'Tilapia frais entier mariné aux herbes épicées, grillé à la perfection avec des oignons.',
    price: 18000,
    rating: 4.8,
    reviews: 64,
    category: 'mains',
    image: 'Whole grilled tilapia with garnish'
  },
  {
    id: 4,
    name: 'Plantains Dorés',
    description: 'Plantains mûrs et sucrés frits à la perfection, dorés et croustillants.',
    price: 3000,
    rating: 4.9,
    reviews: 120,
    category: 'sides',
    image: 'Stack of fried plantains'
  },
  {
    id: 5,
    name: 'Coucher de Soleil Tropical',
    description: 'Mélange fraîchement pressé de mangue, ananas et fruit de la passion.',
    price: 2500,
    rating: 4.6,
    reviews: 30,
    category: 'drinks',
    image: 'Fresh tropical juice glass with ice'
  }
];

const RestaurantPage = () => {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [deliveryMode, setDeliveryMode] = useState('delivery');
  const [cart, setCart] = useState({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const addToCart = (item) => {
    setCart(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
    toast({
      title: "Délicieux choix !",
      description: `${item.name} ajouté au panier`
    });
  };

  const updateQuantity = (itemId, change) => {
    setCart(prev => {
      const newQuantity = (prev[itemId] || 0) + change;
      if (newQuantity <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Chez Maman - GLUCK Eats</title>
        <meta name="description" content="Parcourez le menu et commandez chez Chez Maman" />
      </Helmet>
      <div className="min-h-screen bg-[#F7F7F7] pb-32">
        {/* Immersive Header Image */}
        <div className="relative h-[35vh]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10"></div>
          <img
            alt="Chez Maman Restaurant"
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1657778413492-cd8980e7fa41" />

          {/* Navigation Overlay */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
            <button
              onClick={() => navigate('/home')}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex gap-3">
              <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all">
                <Heart size={20} />
              </button>
              <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-500 transition-all">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Restaurant Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
            <h1 className="text-3xl font-bold mb-2 shadow-black drop-shadow-md">Chez Maman</h1>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="bg-[#F4B400] text-[#0A0A0A] px-2 py-0.5 rounded-md">Congolais</span>
              <span className="flex items-center gap-1"><Star size={14} className="fill-current text-[#F4B400]" /> 4.8 (200+)</span>
              <span className="flex items-center gap-1"><Clock size={14} /> 20-30 min</span>
            </div>
          </div>
        </div>

        {/* Content Container with negative margin for overlap */}
        <div className="relative z-20 -mt-6 bg-[#F7F7F7] rounded-t-[2rem] px-6 pt-8">

          {/* Delivery Mode Toggle */}
          <div className="bg-white p-1.5 rounded-2xl flex shadow-sm mb-8">
            <button
              onClick={() => setDeliveryMode('delivery')}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${deliveryMode === 'delivery'
                  ? 'bg-[#0A0A0A] text-white shadow-md'
                  : 'text-[#0A0A0A]/60 hover:bg-[#F7F7F7]'
                }`}
            >
              Livraison
            </button>
            <button
              onClick={() => setDeliveryMode('pickup')}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${deliveryMode === 'pickup'
                  ? 'bg-[#0A0A0A] text-white shadow-md'
                  : 'text-[#0A0A0A]/60 hover:bg-[#F7F7F7]'
                }`}
            >
              A emporter
            </button>
          </div>

          {/* Sticky Categories */}
          <div className="sticky top-0 z-30 bg-[#F7F7F7]/95 backdrop-blur-sm py-4 -mx-6 px-6 border-b border-gray-200/50 mb-6">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {menuCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === category.id
                      ? 'bg-[#F4B400] text-[#0A0A0A] shadow-lg shadow-[#F4B400]/30'
                      : 'bg-white text-[#0A0A0A]/60 border border-transparent hover:border-[#E8DDB5]'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-6">
            <h2 className="font-bold text-xl text-[#0A0A0A] mb-4 capitalize">{menuCategories.find(c => c.id === selectedCategory)?.name}</h2>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-3 shadow-sm border border-[#F7F7F7] hover:shadow-md transition-all group"
              >
                <div className="flex gap-4">
                  <div
                    className="w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden relative cursor-pointer"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <img
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  </div>

                  <div className="flex-1 flex flex-col py-1 pr-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3
                        className="font-bold text-[#0A0A0A] text-lg leading-tight cursor-pointer hover:text-[#F4B400] transition-colors"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[#0A0A0A]/60 line-clamp-2 mb-3">{item.description}</p>

                    <div className="flex items-center gap-1 mb-auto">
                      <Star size={12} className="text-[#F4B400] fill-[#F4B400]" />
                      <span className="text-xs font-bold">{item.rating}</span>
                      <span className="text-[10px] text-gray-400">({item.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-lg text-[#0B3A2E]">{item.price.toLocaleString()} FC</span>

                      {cart[item.id] ? (
                        <div className="flex items-center bg-[#F4B400] rounded-xl px-2 py-1 shadow-md">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center bg-white/20 rounded-lg text-black hover:bg-white/40 transition-colors"><Minus size={14} /></button>
                          <span className="font-bold text-black w-8 text-center">{cart[item.id]}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center bg-white/20 rounded-lg text-black hover:bg-white/40 transition-colors"><Plus size={14} /></button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          className="w-9 h-9 bg-[#0A0A0A] rounded-xl flex items-center justify-center text-white shadow-lg hover:bg-[#F4B400] hover:text-black transition-all"
                        >
                          <Plus size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating Cart Button */}
        <AnimatePresence>
          {getTotalItems() > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-6 left-6 right-6 z-40"
            >
              <Button
                onClick={() => navigate('/cart')}
                className="w-full bg-[#0A0A0A] text-white hover:bg-[#0A0A0A]/90 py-7 rounded-2xl shadow-2xl shadow-black/30 flex items-center justify-between px-6 group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#F4B400] text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {getTotalItems()}
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-white/60 font-medium uppercase tracking-wide">Total</p>
                    <p className="font-bold text-lg leading-none">{(Object.keys(cart).reduce((sum, id) => sum + (menuItems.find(i => i.id === parseInt(id))?.price || 0) * cart[id], 0)).toLocaleString()} FC</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-bold text-[#F4B400] group-hover:translate-x-1 transition-transform">
                  Payer <ChevronRight size={20} />
                </div>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default RestaurantPage;