import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    toast({
      title: "Connexion Réussie !",
      description: "Bon retour sur GLUCK Eats"
    });
    navigate('/home');
  };

  const handleMoMoLogin = () => {
    navigate('/momo-login');
  };

  return (
    <>
      <Helmet>
        <title>Connexion - GLUCK Eats</title>
        <meta name="description" content="Connectez-vous à votre compte GLUCK Eats" />
      </Helmet>
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Bon Retour</h1>
          <p className="text-[#E8DDB5]">Connectez-vous pour continuer à commander</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleLogin}
          className="flex-1 flex flex-col"
        >
          <div className="space-y-4 mb-6">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E8DDB5]" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Adresse e-mail"
                className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-[#E8DDB5]/60 focus:outline-none focus:border-[#F4B400] transition-all duration-300"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E8DDB5]" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-12 text-white placeholder:text-[#E8DDB5]/60 focus:outline-none focus:border-[#F4B400] transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#E8DDB5] hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="button"
            className="text-[#F4B400] text-sm text-right mb-6 hover:text-[#E68931] transition-colors"
          >
            Mot de passe oublié ?
          </button>

          <div className="mt-auto space-y-3">
            <Button
              type="submit"
              className="w-full bg-[#F4B400] hover:bg-[#E68931] text-[#0A0A0A] font-semibold py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Se Connecter
            </Button>

            <Button
              type="button"
              onClick={handleMoMoLogin}
              className="w-full bg-[#0B3A2E] hover:bg-[#0B3A2E]/90 text-white font-semibold py-6 rounded-xl transition-all duration-300"
            >
              Connexion avec MTN MoMo
            </Button>

            <div className="text-center pt-4">
              <span className="text-[#E8DDB5]">Pas encore de compte ? </span>
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-[#F4B400] font-semibold hover:text-[#E68931] transition-colors"
              >
                S'inscrire
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </>
  );
};

export default Login;