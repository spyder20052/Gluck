import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const LocationPermission = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEnableLocation = () => {
    toast({
      title: "Localisation Activée !",
      description: "Recherche des restaurants à proximité..."
    });
    setTimeout(() => {
      navigate('/home');
    }, 1500);
  };

  const handleSkip = () => {
    navigate('/home');
  };

  return (
    <>
      <Helmet>
        <title>Activer la Localisation - GLUCK Eats</title>
        <meta name="description" content="Activez la localisation pour trouver des restaurants près de chez vous" />
      </Helmet>
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col px-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-32 h-32 bg-gradient-to-br from-[#F4B400] to-[#E68931] rounded-full flex items-center justify-center mb-8"
          >
            <Navigation size={64} className="text-[#0A0A0A]" />
          </motion.div>

          <h1 className="text-4xl font-bold text-white mb-4">Activer la Localisation</h1>
          <p className="text-[#E8DDB5] text-lg leading-relaxed mb-2">
            Aidez-nous à trouver les meilleurs restaurants et les options de livraison les plus rapides près de chez vous
          </p>
          <p className="text-[#E8DDB5]/60 text-sm">
            Nous ne partagerons jamais votre position sans permission
          </p>
        </motion.div>

        <div className="space-y-3">
          <Button
            onClick={handleEnableLocation}
            className="w-full bg-[#F4B400] hover:bg-[#E68931] text-[#0A0A0A] font-semibold py-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <MapPin size={20} />
            Activer la Localisation
          </Button>

          <Button
            onClick={handleSkip}
            variant="ghost"
            className="w-full text-[#E8DDB5] hover:text-white hover:bg-white/10 py-6 rounded-xl transition-all duration-300"
          >
            Passer pour l'instant
          </Button>
        </div>
      </div>
    </>
  );
};

export default LocationPermission;