import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, RotateCcw, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import BottomNav from '@/components/BottomNav';

const orders = [
  {
    id: '12345',
    restaurant: 'Chez Maman',
    date: '24-11-2025',
    items: 'Poulet DG x2, Fufu & Pondu',
    total: 42000,
    status: 'delivered',
    rating: null
  },
  {
    id: '12344',
    restaurant: 'Le Grill King',
    date: '23-11-2025',
    items: 'Poisson Grillé, Bananes Plantains',
    total: 21000,
    status: 'delivered',
    rating: 5
  },
  {
    id: '12343',
    restaurant: 'Fresh & Green',
    date: '22-11-2025',
    items: 'Bol Santé, Jus Frais',
    total: 17500,
    status: 'delivered',
    rating: 4
  }
];

const OrderHistory = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleReorder = (order) => {
    toast({
      title: "Ajouté au panier !",
      description: `Les articles de ${order.restaurant} ont été ajoutés`
    });
    navigate('/cart');
  };

  const handleSubmitReview = () => {
    toast({
      title: "Avis envoyé !",
      description: "Merci pour votre retour"
    });
    setSelectedOrder(null);
    setRating(0);
    setReview('');
  };

  return (
    <>
      <Helmet>
        <title>Historique - GLUCK Eats</title>
        <meta name="description" content="Voir vos commandes passées et avis" />
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
            <h1 className="text-xl font-bold text-[#0A0A0A]">Historique des Commandes</h1>
          </div>
        </div>

        {/* Orders List */}
        <div className="px-6 py-6 space-y-4">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-[#0A0A0A]">{order.restaurant}</h3>
                    <p className="text-sm text-[#0A0A0A]/60">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#F4B400]">{order.total.toLocaleString()} FC</p>
                    <p className="text-xs text-[#0B3A2E] mt-1">Livré</p>
                  </div>
                </div>
                <p className="text-sm text-[#0A0A0A]/60 mb-4">{order.items}</p>
                
                {order.rating ? (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-[#0A0A0A]/60">Votre note :</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={star <= order.rating ? 'text-[#F4B400] fill-[#F4B400]' : 'text-[#0A0A0A]/20'}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => setSelectedOrder(order)}
                    variant="outline"
                    className="w-full border border-[#F4B400] text-[#F4B400] hover:bg-[#F4B400] hover:text-[#0A0A0A] mb-2"
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Noter la commande
                  </Button>
                )}
                
                <Button
                  onClick={() => handleReorder(order)}
                  className="w-full bg-[#F4B400] hover:bg-[#E68931] text-[#0A0A0A] font-semibold"
                >
                  <RotateCcw size={16} className="mr-2" />
                  Commander à nouveau
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Review Modal */}
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold text-[#0A0A0A] mb-2">Noter votre commande</h2>
              <p className="text-[#0A0A0A]/60 mb-6">{selectedOrder.restaurant}</p>
              
              <div className="mb-6">
                <p className="text-sm text-[#0A0A0A]/60 mb-3">Comment s'est passée votre expérience ?</p>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={40}
                        className={star <= rating ? 'text-[#F4B400] fill-[#F4B400]' : 'text-[#0A0A0A]/20'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-[#0A0A0A]/60 mb-2">Partagez votre avis (optionnel)</p>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Racontez-nous votre expérience..."
                  className="w-full h-32 p-4 bg-[#F7F7F7] rounded-xl text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#F4B400] resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setSelectedOrder(null)}
                  variant="outline"
                  className="flex-1 border-2 border-[#F7F7F7] text-[#0A0A0A]"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleSubmitReview}
                  disabled={rating === 0}
                  className="flex-1 bg-[#F4B400] hover:bg-[#E68931] text-[#0A0A0A] disabled:opacity-50"
                >
                  Envoyer
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        <BottomNav />
      </div>
    </>
  );
};

export default OrderHistory;