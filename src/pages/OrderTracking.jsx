import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, MessageCircle, MapPin, Clock, CheckCircle, Package, Bike, Plus, Minus, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

const orderSteps = [
  { id: 1, title: 'Commande Confirmée', icon: CheckCircle, status: 'completed', time: '14:30' },
  { id: 2, title: 'En Cuisine', icon: Package, status: 'completed', time: '14:35' },
  { id: 3, title: 'En Route', icon: Bike, status: 'active', time: 'Maintenant' },
  { id: 4, title: 'Livré', icon: MapPin, status: 'pending', time: '' }
];

const CustomMap = () => {
  const [zoom, setZoom] = useState(1);
  const [driverProgress, setDriverProgress] = useState(0);

  useEffect(() => {
    // Simulate driver movement
    const interval = setInterval(() => {
      setDriverProgress(prev => (prev < 100 ? prev + 0.5 : 0));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Calculate driver position on a bezier curve or straight line
  const startX = 20;
  const startY = 20;
  const endX = 80;
  const endY = 80;
  
  const currentX = startX + (endX - startX) * (driverProgress / 100);
  const currentY = startY + (endY - startY) * (driverProgress / 100);

  return (
    <div className="relative w-full h-full bg-[#0A0A0A] overflow-hidden">
      {/* Map Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F4B400" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Stylized Roads */}
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 pointer-events-none opacity-30">
        <path d="M0 20 H100 M20 0 V100 M0 80 H100 M80 0 V100" stroke="#F7F7F7" strokeWidth="0.5" fill="none" />
        <path d="M 20 20 Q 50 50 80 80" stroke="#F4B400" strokeWidth="1" fill="none" strokeDasharray="2 2" />
      </svg>

      {/* Map Content Container for Zoom */}
      <motion.div 
        className="w-full h-full relative"
        animate={{ scale: zoom }}
        transition={{ duration: 0.3 }}
      >
        {/* Restaurant Marker */}
        <div className="absolute top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2">
           <div className="flex flex-col items-center">
             <div className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center shadow-lg z-10 border-2 border-[#0A0A0A]">
               <Package size={18} className="text-[#0A0A0A]" />
             </div>
             <span className="text-[10px] font-bold text-[#F7F7F7] bg-[#0A0A0A] px-2 py-0.5 rounded mt-1">Restaurant</span>
           </div>
        </div>

        {/* Customer Marker */}
        <div className="absolute top-[80%] left-[80%] -translate-x-1/2 -translate-y-1/2">
           <div className="flex flex-col items-center">
             <div className="w-10 h-10 bg-[#F4B400] rounded-full flex items-center justify-center shadow-lg z-10 border-2 border-white animate-bounce">
               <MapPin size={20} className="text-[#0A0A0A]" />
             </div>
             <span className="text-[10px] font-bold text-[#F7F7F7] bg-[#0A0A0A] px-2 py-0.5 rounded mt-1">Moi</span>
           </div>
        </div>

        {/* Driver Marker (Animated) */}
        <motion.div 
          className="absolute z-20"
          style={{ top: `${currentY}%`, left: `${currentX}%` }}
          initial={false}
        >
          <div className="flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 bg-[#0B3A2E] rounded-full flex items-center justify-center shadow-xl border-2 border-[#F4B400]">
              <Bike size={24} className="text-white" />
            </div>
            <div className="bg-white text-[#0A0A0A] text-[10px] font-bold px-2 py-0.5 rounded mt-1 shadow-sm whitespace-nowrap">
              5 min
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Map Controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        <button onClick={() => setZoom(Math.min(zoom + 0.2, 2))} className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-[#0A0A0A] hover:bg-[#F4B400] transition-colors">
          <Plus size={20} />
        </button>
        <button onClick={() => setZoom(1)} className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-[#0A0A0A] hover:bg-[#F4B400] transition-colors">
          <Navigation size={20} />
        </button>
        <button onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))} className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-[#0A0A0A] hover:bg-[#F4B400] transition-colors">
          <Minus size={20} />
        </button>
      </div>

      {/* Info Overlay */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md rounded-xl p-3 text-white border border-white/10">
         <div className="flex items-center gap-2">
           <Clock size={14} className="text-[#F4B400]" />
           <span className="text-xs font-bold">14:45 Livraison Estimée</span>
         </div>
         <div className="text-[10px] text-white/60 mt-1">2.5 km restants</div>
      </div>
    </div>
  );
};

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Suivi de Commande - GLUCK Eats</title>
        <meta name="description" content="Suivez votre commande en temps réel" />
      </Helmet>
      <div className="min-h-screen bg-[#F7F7F7]">
        {/* Header */}
        <div className="bg-white px-6 py-4 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/home')}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F7F7F7] transition-all"
            >
              <ArrowLeft size={20} className="text-[#0A0A0A]" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-[#0A0A0A]">Suivi de Commande</h1>
              <p className="text-sm text-[#0A0A0A]/60">Commande #{orderId}</p>
            </div>
          </div>
        </div>

        {/* Map Component */}
        <div className="relative h-[50vh] w-full">
          <CustomMap />
        </div>

        {/* Driver Info */}
        <div className="px-6 py-6 bg-white -mt-8 rounded-t-3xl relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#F4B400] rounded-full flex items-center justify-center">
                <Bike size={32} className="text-[#0A0A0A]" />
              </div>
              <div>
                <p className="font-bold text-[#0A0A0A]">Jean-Paul Mukendi</p>
                <p className="text-sm text-[#0A0A0A]/60">Partenaire Livreur</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.div
                        key={star}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: star * 0.1 }}
                      >
                        <CheckCircle size={12} className="text-[#F4B400] fill-[#F4B400]" />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-xs text-[#0A0A0A]/60 ml-1">4.9</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-12 h-12 bg-[#F4B400] rounded-full flex items-center justify-center hover:bg-[#E68931] transition-all">
                <Phone size={20} className="text-[#0A0A0A]" />
              </button>
              <button className="w-12 h-12 bg-[#0B3A2E] rounded-full flex items-center justify-center hover:bg-[#0B3A2E]/90 transition-all">
                <MessageCircle size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* Estimated Time */}
          <div className="bg-[#F7F7F7] rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-[#F4B400]" />
                <span className="text-sm text-[#0A0A0A]/60">Arrivée Estimée</span>
              </div>
              <span className="font-bold text-[#0A0A0A]">15 mins</span>
            </div>
          </div>

          {/* Order Timeline */}
          <h2 className="font-bold text-[#0A0A0A] mb-4">Statut de la Commande</h2>
          <div className="space-y-4">
            {orderSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      step.status === 'completed'
                        ? 'bg-[#0B3A2E]'
                        : step.status === 'active'
                        ? 'bg-[#F4B400]'
                        : 'bg-[#F7F7F7]'
                    }`}
                  >
                    {React.createElement(step.icon, {
                      size: 20,
                      className: step.status === 'pending' ? 'text-[#0A0A0A]/40' : 'text-white'
                    })}
                  </div>
                  {index < orderSteps.length - 1 && (
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-12 w-0.5 h-8 ${
                        step.status === 'completed' ? 'bg-[#0B3A2E]' : 'bg-[#F7F7F7]'
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`font-semibold ${step.status === 'pending' ? 'text-[#0A0A0A]/40' : 'text-[#0A0A0A]'}`}>
                        {step.title}
                      </p>
                      {step.status === 'active' && (
                        <p className="text-sm text-[#F4B400]">En cours</p>
                      )}
                    </div>
                    {step.time && (
                      <span className="text-sm text-[#0A0A0A]/60">{step.time}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Support Button */}
        <div className="px-6 pb-6">
          <Button
            onClick={() => navigate('/support')}
            variant="outline"
            className="w-full border-2 border-[#F4B400] text-[#0A0A0A] hover:bg-[#F4B400] hover:text-[#0A0A0A] py-6 rounded-xl font-semibold transition-all"
          >
            Besoin d'aide ?
          </Button>
        </div>
      </div>
    </>
  );
};

export default OrderTracking;