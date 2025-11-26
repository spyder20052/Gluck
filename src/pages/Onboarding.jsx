import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ShoppingBag, MapPin, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    icon: ShoppingBag,
    title: 'Commandez en Ligne',
    description: 'Parcourez des centaines de restaurants et découvrez de délicieux repas de vos cuisines préférées',
    color: '#F4B400'
  },
  {
    icon: MapPin,
    title: 'Suivi en Temps Réel',
    description: 'Suivez votre commande de la cuisine à votre porte avec le GPS en direct et les notifications',
    color: '#0B3A2E'
  },
  {
    icon: Wallet,
    title: 'Paiement Mobile',
    description: 'Paiements rapides et sécurisés avec MTN MoMo, Airtel Money ou en espèces à la livraison',
    color: '#E68931'
  }
];

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/home');
    }
  };

  const handleSkip = () => {
    navigate('/home');
  };

  return (
    <>
      <Helmet>
        <title>Bienvenue sur GLUCK Eats</title>
        <meta name="description" content="Commencez avec GLUCK Eats - Votre application de livraison préférée" />
      </Helmet>
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12"
              >
                {React.createElement(slides[currentSlide].icon, {
                  size: 120,
                  strokeWidth: 1.5,
                  color: slides[currentSlide].color
                })}
              </motion.div>
              
              <h1 className="text-3xl font-bold text-white mb-4">
                {slides[currentSlide].title}
              </h1>
              
              <p className="text-[#E8DDB5] text-lg leading-relaxed mb-8">
                {slides[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-2 mb-12">
            {slides.map((_, index) => (
              <motion.div
                key={index}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: currentSlide === index ? '32px' : '8px',
                  backgroundColor: currentSlide === index ? '#F4B400' : '#E8DDB5'
                }}
              />
            ))}
          </div>
        </div>

        <div className="px-6 pb-8 space-y-3">
          <Button
            onClick={handleNext}
            className="w-full bg-[#F4B400] hover:bg-[#E68931] text-[#0A0A0A] font-semibold py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            {currentSlide < slides.length - 1 ? 'Suivant' : 'Commencer'}
            <ChevronRight className="ml-2" size={20} />
          </Button>
          
          <Button
            onClick={handleSkip}
            variant="ghost"
            className="w-full text-[#E8DDB5] hover:text-white hover:bg-white/10 py-6 rounded-xl transition-all duration-300"
          >
            Passer
          </Button>
        </div>
      </div>
    </>
  );
};

export default Onboarding;