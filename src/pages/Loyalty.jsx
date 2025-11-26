import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Gift, Star, Trophy, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import BottomNav from '@/components/BottomNav';

const rewards = [
  { id: 1, title: 'Livraison Gratuite', points: 500, icon: Zap, color: '#F4B400' },
  { id: 2, title: '-10% Prochaine Commande', points: 1000, icon: Gift, color: '#E68931' },
  { id: 3, title: 'Dessert Gratuit', points: 750, icon: Star, color: '#0B3A2E' },
  { id: 4, title: '-20% Prochaine Commande', points: 2000, icon: Trophy, color: '#F4B400' }
];

const tiers = [
  { name: 'Bronze', minPoints: 0, color: '#CD7F32', benefits: 'Gagnez 1 point par commande' },
  { name: 'Argent', minPoints: 5000, color: '#C0C0C0', benefits: 'Gagnez 1.5 points par commande' },
  { name: 'Or', minPoints: 15000, color: '#F4B400', benefits: 'Gagnez 2 points par commande + offres exclusives' }
];

const Loyalty = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentPoints = 3250;
  const currentTier = 'Bronze';
  const nextTier = 'Argent';
  const pointsToNextTier = 5000 - currentPoints;

  const handleRedeem = (reward) => {
    if (currentPoints >= reward.points) {
      toast({
        title: "Récompense Échangée !",
        description: `${reward.title} a été ajouté à votre compte`
      });
    } else {
      toast({
        title: "Points insuffisants",
        description: `Il vous manque ${reward.points - currentPoints} points`,
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Fidélité & Récompenses - GLUCK Eats</title>
        <meta name="description" content="Gagnez des points et débloquez des récompenses" />
      </Helmet>
      <div className="min-h-screen bg-[#F7F7F7] pb-24">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#F4B400] to-[#E68931] px-6 pt-12 pb-32 rounded-b-3xl">
          <button
            onClick={() => navigate('/home')}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all mb-6"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Programme de Fidélité</h1>
            <p className="text-white/90 mb-8">Gagnez des points à chaque commande</p>
            
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy size={32} className="text-[#F4B400]" />
                <span className="text-2xl font-bold text-[#0A0A0A]">{currentTier}</span>
              </div>
              <div className="text-5xl font-bold text-[#F4B400] mb-2">{currentPoints.toLocaleString()}</div>
              <p className="text-[#0A0A0A]/60">Points Disponibles</p>
            </motion.div>
          </div>
        </div>

        {/* Progress to Next Tier */}
        <div className="px-6 -mt-16 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-[#0A0A0A]">{currentTier}</span>
              <span className="text-sm font-medium text-[#0A0A0A]">{nextTier}</span>
            </div>
            <div className="h-3 bg-[#F7F7F7] rounded-full overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(currentPoints / 5000) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[#F4B400] to-[#E68931]"
              />
            </div>
            <p className="text-sm text-[#0A0A0A]/60 text-center">
              {pointsToNextTier.toLocaleString()} points jusqu'au niveau {nextTier}
            </p>
          </div>
        </div>

        {/* Available Rewards */}
        <div className="px-6 mb-6">
          <h2 className="text-xl font-bold text-[#0A0A0A] mb-4">Récompenses Disponibles</h2>
          <div className="grid gap-4">
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${reward.color}20` }}
                  >
                    {React.createElement(reward.icon, {
                      size: 32,
                      style: { color: reward.color }
                    })}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#0A0A0A] mb-1">{reward.title}</h3>
                    <p className="text-sm text-[#F4B400] font-semibold">{reward.points.toLocaleString()} points</p>
                  </div>
                  <Button
                    onClick={() => handleRedeem(reward)}
                    disabled={currentPoints < reward.points}
                    className="bg-[#F4B400] hover:bg-[#E68931] text-[#0A0A0A] disabled:opacity-50 px-6"
                  >
                    Échanger
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tier Benefits */}
        <div className="px-6 mb-6">
          <h2 className="text-xl font-bold text-[#0A0A0A] mb-4">Niveaux d'Adhésion</h2>
          <div className="space-y-3">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-4 shadow-sm ${
                  tier.name === currentTier ? 'ring-2 ring-[#F4B400]' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: tier.color }}
                  >
                    <Trophy size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#0A0A0A]">{tier.name}</h3>
                    <p className="text-xs text-[#0A0A0A]/60">{tier.minPoints.toLocaleString()}+ points</p>
                  </div>
                  {tier.name === currentTier && (
                    <span className="text-xs font-semibold text-[#F4B400] bg-[#F4B400]/10 px-3 py-1 rounded-full">
                      Actuel
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#0A0A0A]/60">{tier.benefits}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <BottomNav />
      </div>
    </>
  );
};

export default Loyalty;