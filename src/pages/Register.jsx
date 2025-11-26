import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Compte Créé !",
      description: "Bienvenue sur GLUCK Eats"
    });
    navigate('/location');
  };

  return (
    <>
      <Helmet>
        <title>Inscription - GLUCK Eats</title>
        <meta name="description" content="Créez votre compte GLUCK Eats" />
      </Helmet>
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Créer un Compte</h1>
          <p className="text-[#E8DDB5]">Rejoignez GLUCK Eats aujourd'hui</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleRegister}
          className="flex-1 flex flex-col"
        >
          <div className="space-y-4 mb-6">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E8DDB5]" size={20} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nom complet"
                className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-[#E8DDB5]/60 focus:outline-none focus:border-[#F4B400] transition-all duration-300"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E8DDB5]" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Adresse e-mail"
                className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-[#E8DDB5]/60 focus:outline-none focus:border-[#F4B400] transition-all duration-300"
                required
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E8DDB5]" size={20} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Numéro de téléphone"
                className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-[#E8DDB5]/60 focus:outline-none focus:border-[#F4B400] transition-all duration-300"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E8DDB5]" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
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

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E8DDB5]" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmer le mot de passe"
                className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-[#E8DDB5]/60 focus:outline-none focus:border-[#F4B400] transition-all duration-300"
                required
              />
            </div>
          </div>

          <div className="mt-auto space-y-3">
            <Button
              type="submit"
              className="w-full bg-[#F4B400] hover:bg-[#E68931] text-[#0A0A0A] font-semibold py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Créer un Compte
            </Button>

            <div className="text-center pt-4">
              <span className="text-[#E8DDB5]">Déjà un compte ? </span>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-[#F4B400] font-semibold hover:text-[#E68931] transition-colors"
              >
                Se Connecter
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </>
  );
};

export default Register;