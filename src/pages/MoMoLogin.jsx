import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const MoMoLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleMoMoLogin = (e) => {
    e.preventDefault();
    toast({
      title: "Vérification Envoyée !",
      description: "Veuillez approuver la demande de paiement sur votre téléphone"
    });
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Connexion MTN MoMo - GLUCK Eats</title>
        <meta name="description" content="Connexion avec MTN Mobile Money" />
      </Helmet>
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col px-6 py-12">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-[#E8DDB5] mb-8 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Retour à la connexion</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="w-24 h-24 bg-[#F4B400] rounded-full flex items-center justify-center mx-auto mb-6">
            <Phone size={48} className="text-[#0A0A0A]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Connexion MTN MoMo</h1>
          <p className="text-[#E8DDB5]">Connexion rapide et sécurisée par Mobile Money</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleMoMoLogin}
          className="flex-1 flex flex-col"
        >
          <div className="mb-6">
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E8DDB5]" size={20} />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Numéro MTN MoMo"
                className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-[#E8DDB5]/60 focus:outline-none focus:border-[#F4B400] transition-all duration-300"
                required
              />
            </div>
            <p className="text-[#E8DDB5]/60 text-sm mt-2 ml-4">
              Vous recevrez une demande de paiement à approuver
            </p>
          </div>

          <div className="mt-auto">
            <Button
              type="submit"
              className="w-full bg-[#F4B400] hover:bg-[#E68931] text-[#0A0A0A] font-semibold py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Envoyer la Vérification
            </Button>
          </div>
        </motion.form>
      </div>
    </>
  );
};

export default MoMoLogin;