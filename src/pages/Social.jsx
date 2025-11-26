import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, Users, Gift, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import BottomNav from '@/components/BottomNav';

const favoriteRestaurants = [
  { id: 1, name: 'Chez Maman', cuisine: 'Congolais', orders: 12 },
  { id: 2, name: 'Fresh & Green', cuisine: 'Healthy', orders: 8 },
  { id: 3, name: 'Le Grill King', cuisine: 'Grillades', orders: 6 }
];

const favoriteDishes = [
  { id: 1, name: 'Poulet DG', restaurant: 'Chez Maman', image: 'Delicious Poulet DG dish' },
  { id: 2, name: 'Bol Santé', restaurant: 'Fresh & Green', image: 'Fresh healthy bowl' },
  { id: 3, name: 'Poisson Grillé', restaurant: 'Le Grill King', image: 'Grilled fish with vegetables' }
];

const Social = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleShare = (platform) => {
    toast({
      title: "Partagé avec succès !",
      description: `Partagé sur ${platform}`
    });
  };

  const handleInviteFriend = () => {
    toast({
      title: "Invitation envoyée !",
      description: "Vous gagnerez 2000 points lorsqu'ils termineront leur première commande"
    });
  };

  return (
    <>
      <Helmet>
        <title>Social & Favoris - GLUCK Eats</title>
        <meta name="description" content="Partagez vos favoris et invitez des amis" />
      </Helmet>
      <div className="min-h-screen bg-[#F7F7F7] pb-24">
        {/* Header */}
        <div className="bg-white px-6 py-4 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/home')}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F7F7F7] transition-all"
            >
              <ArrowLeft size={20} className="text-[#0A0A0A]" />
            </button>
            <h1 className="text-xl font-bold text-[#0A0A0A]">Social & Favoris</h1>
          </div>
        </div>

        {/* Invite Friends */}
        <div className="px-6 py-6 bg-gradient-to-br from-[#F4B400] to-[#E68931] mt-2">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Gift size={32} className="text-white" />
            </div>
            <div className="flex-1 text-white">
              <h2 className="font-bold text-lg mb-1">Inviter des Amis</h2>
              <p className="text-sm text-white/90">Gagnez 2000 points pour chaque ami</p>
            </div>
          </div>
          <Button
            onClick={handleInviteFriend}
            className="w-full bg-white hover:bg-white/90 text-[#0A0A0A] font-semibold"
          >
            <Users size={18} className="mr-2" />
            Envoyer l'Invitation
          </Button>
        </div>

        {/* Favorite Restaurants */}
        <div className="px-6 py-6">
          <h2 className="text-xl font-bold text-[#0A0A0A] mb-4">Restaurants Favoris</h2>
          <div className="space-y-3">
            {favoriteRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Heart size={20} className="text-[#E68931] fill-[#E68931]" />
                  <div>
                    <h3 className="font-bold text-[#0A0A0A]">{restaurant.name}</h3>
                    <p className="text-sm text-[#0A0A0A]/60">{restaurant.cuisine} • {restaurant.orders} commandes</p>
                  </div>
                </div>
                <button
                  onClick={() => handleShare(restaurant.name)}
                  className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center hover:bg-[#E8DDB5] transition-all"
                >
                  <Share2 size={18} className="text-[#0A0A0A]" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Favorite Dishes */}
        <div className="px-6 pb-6">
          <h2 className="text-xl font-bold text-[#0A0A0A] mb-4">Plats Favoris</h2>
          <div className="grid gap-4">
            {favoriteDishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="flex gap-4 p-4">
                  <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                    <img
                      alt={dish.name}
                      className="w-full h-full object-cover"
                     src="https://images.unsplash.com/photo-1699707141623-168c532eccb7" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-[#0A0A0A] mb-1">{dish.name}</h3>
                      <p className="text-sm text-[#0A0A0A]/60">{dish.restaurant}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleShare('Facebook')}
                        className="flex-1 bg-[#1877F2] text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#1877F2]/90 transition-all"
                      >
                        <Facebook size={16} />
                        <span className="text-sm font-medium">Partager</span>
                      </button>
                      <button
                        onClick={() => handleShare('WhatsApp')}
                        className="flex-1 bg-[#25D366] text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#25D366]/90 transition-all"
                      >
                        <MessageCircle size={16} />
                        <span className="text-sm font-medium">Partager</span>
                      </button>
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

export default Social;