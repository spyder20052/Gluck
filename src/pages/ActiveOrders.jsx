import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Bike, Clock, ChevronRight, Phone, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import { useToast } from '@/components/ui/use-toast';

const ActiveOrders = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filter, setFilter] = useState('all'); // all, preparing, delivery

  // Mock data for ongoing orders
  const activeOrders = [
    {
      id: 'ORD-2839',
      restaurant: 'Chez Maman',
      items: ['Poulet DG x2', 'Fufu & Pondu'],
      total: 42000,
      status: 'delivery', // delivery, preparing
      statusLabel: 'En route',
      eta: '15 min',
      address: '123 Blvd du 30 Juin, Gombe',
      driver: {
        name: 'Jean-Paul M.',
        rating: 4.9,
        phone: '+243 81 234 5678'
      }
    },
    {
      id: 'ORD-2840',
      restaurant: 'Le Grill King',
      items: ['Brochettes Boeuf x5', 'Banane Plantain'],
      total: 25000,
      status: 'preparing',
      statusLabel: 'En cuisine',
      eta: '35 min',
      address: '123 Blvd du 30 Juin, Gombe',
      driver: null
    }
  ];

  const filteredOrders = activeOrders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const handleCallDriver = (e, phone) => {
    e.stopPropagation();
    toast({
      title: "Appel en cours...",
      description: `Numérotation de ${phone}`
    });
  };

  return (
    <>
      <Helmet>
        <title>Suivi des Commandes - GLUCK Eats</title>
        <meta name="description" content="Suivez vos commandes en cours en temps réel" />
      </Helmet>
      <div className="min-h-screen bg-[#F7F7F7] pb-24">
        {/* Header */}
        <div className="bg-white px-6 py-4 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/home')}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F7F7F7] transition-all"
            >
              <ArrowLeft size={20} className="text-[#0A0A0A]" />
            </button>
            <h1 className="text-xl font-bold text-[#0A0A0A]">Commandes en cours</h1>
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {[
              { id: 'all', label: 'Tout' },
              { id: 'preparing', label: 'En cuisine' },
              { id: 'delivery', label: 'En livraison' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  filter === tab.id
                    ? 'bg-[#F4B400] text-[#0A0A0A]'
                    : 'bg-[#F7F7F7] text-[#0A0A0A]/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="px-6 py-6 space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 bg-[#F7F7F7] rounded-full flex items-center justify-center mb-4">
                <Package size={32} className="text-[#0A0A0A]/20" />
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0A]">Aucune commande en cours</h3>
              <p className="text-[#0A0A0A]/60 mb-6 max-w-xs">Vous n'avez pas de commande active pour le moment.</p>
              <Button 
                onClick={() => navigate('/home')}
                className="bg-[#F4B400] hover:bg-[#E68931] text-[#0A0A0A]"
              >
                Commander maintenant
              </Button>
            </div>
          ) : (
            filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/tracking/${order.id}`)}
                className="bg-white rounded-2xl shadow-sm border border-[#F7F7F7] overflow-hidden cursor-pointer hover:shadow-md transition-all group"
              >
                {/* Status Header */}
                <div className={`px-4 py-3 flex justify-between items-center border-b ${
                  order.status === 'delivery' ? 'bg-[#F4B400]/10 border-[#F4B400]/20' : 'bg-blue-50 border-blue-100'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      order.status === 'delivery' ? 'bg-[#F4B400]' : 'bg-blue-500'
                    }`} />
                    <span className={`text-sm font-bold ${
                      order.status === 'delivery' ? 'text-[#E68931]' : 'text-blue-700'
                    }`}>
                      {order.statusLabel}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-[#0A0A0A]/60">Arrivée: {order.eta}</span>
                </div>

                <div className="p-4">
                  {/* Restaurant & Order Info */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-[#0A0A0A]">{order.restaurant}</h3>
                      <p className="text-xs text-[#0A0A0A]/40">Commande #{order.id}</p>
                    </div>
                    <div className="w-8 h-8 bg-[#F7F7F7] rounded-full flex items-center justify-center group-hover:bg-[#F4B400] transition-colors">
                      <ChevronRight size={18} className="text-[#0A0A0A]" />
                    </div>
                  </div>

                  {/* Items Summary */}
                  <div className="mb-4">
                    <p className="text-sm text-[#0A0A0A]/80 line-clamp-1">{order.items.join(', ')}</p>
                    <p className="text-xs text-[#0A0A0A]/40 mt-1">{order.items.length} articles • {order.total.toLocaleString()} FC</p>
                  </div>

                  {/* Timeline / Progress */}
                  <div className="relative h-1.5 bg-[#F7F7F7] rounded-full mb-4 overflow-hidden">
                    <div 
                      className={`absolute top-0 left-0 h-full rounded-full ${
                        order.status === 'delivery' ? 'w-3/4 bg-[#0B3A2E]' : 'w-1/3 bg-[#F4B400]'
                      }`} 
                    />
                  </div>

                  {/* Driver Info (if applicable) */}
                  {order.status === 'delivery' && order.driver && (
                    <div className="flex items-center justify-between bg-[#F7F7F7] p-3 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0B3A2E] rounded-full flex items-center justify-center">
                          <Bike size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">{order.driver.name}</p>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-[#0A0A0A]/60">Livreur</span>
                            <span className="text-[10px] bg-[#F4B400] px-1.5 rounded text-[#0A0A0A] font-bold">4.9</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={(e) => handleCallDriver(e, order.driver.phone)}
                        className="bg-white border border-[#E8DDB5] hover:bg-[#F4B400] text-[#0A0A0A] h-9 w-9 p-0 rounded-full"
                      >
                        <Phone size={16} />
                      </Button>
                    </div>
                  )}

                  {/* Preparing State Info */}
                  {order.status === 'preparing' && (
                    <div className="flex items-center gap-3 bg-[#F7F7F7] p-3 rounded-xl">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Package size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Préparation en cours</p>
                        <p className="text-xs text-[#0A0A0A]/60">Le restaurant prépare votre repas</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-4 pb-4">
                  <Button 
                    className="w-full bg-[#0A0A0A] hover:bg-[#0A0A0A]/90 text-white font-semibold h-12 rounded-xl flex items-center justify-center gap-2"
                  >
                    {order.status === 'delivery' ? 'Suivre sur la carte' : 'Voir les détails'}
                    <MapPin size={16} />
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <BottomNav />
      </div>
    </>
  );
};

export default ActiveOrders;