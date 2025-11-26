import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Minus, Trash2, MapPin, Wallet, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Cart = () => {
  const [deliveryMode, setDeliveryMode] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [promoCode, setPromoCode] = useState('');
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Poulet DG', price: 15000, quantity: 2 },
    { id: 2, name: 'Fufu & Pondu', price: 12000, quantity: 1 }
  ]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const updateQuantity = (id, change) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Article supprimé",
      description: "L'article a été retiré du panier"
    });
  };

  const applyPromo = () => {
    toast({
      title: "Promo appliquée !",
      description: "Vous avez économisé 2000 FC"
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = deliveryMode === 'delivery' ? 2000 : 0;
  const discount = 2000;
  const total = subtotal + deliveryFee - discount;

  const handleCheckout = () => {
    toast({
      title: "Commande passée !",
      description: "Votre commande est en cours de préparation"
    });
    navigate('/tracking/12345');
  };

  return (
    <>
      <Helmet>
        <title>Panier & Paiement - GLUCK Eats</title>
        <meta name="description" content="Vérifiez votre commande et passez au paiement" />
      </Helmet>
      <div className="min-h-screen bg-[#F7F7F7] pb-32">
        {/* Header */}
        <div className="bg-white px-6 py-4 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F7F7F7] transition-all"
            >
              <ArrowLeft size={20} className="text-[#0A0A0A]" />
            </button>
            <h1 className="text-xl font-bold text-[#0A0A0A]">Panier & Paiement</h1>
          </div>
        </div>

        {/* Delivery Mode */}
        <div className="px-6 py-6 bg-white mt-2">
          <h2 className="font-bold text-[#0A0A0A] mb-4">Mode de Livraison</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setDeliveryMode('delivery')}
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                deliveryMode === 'delivery'
                  ? 'bg-[#F4B400] text-[#0A0A0A]'
                  : 'bg-[#F7F7F7] text-[#0A0A0A]/60'
              }`}
            >
              Livraison
            </button>
            <button
              onClick={() => setDeliveryMode('pickup')}
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                deliveryMode === 'pickup'
                  ? 'bg-[#F4B400] text-[#0A0A0A]'
                  : 'bg-[#F7F7F7] text-[#0A0A0A]/60'
              }`}
            >
              A Emporter
            </button>
          </div>
        </div>

        {/* Delivery Address */}
        {deliveryMode === 'delivery' && (
          <div className="px-6 py-4 bg-white mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-[#F4B400]" />
                <div>
                  <p className="font-medium text-[#0A0A0A]">Livrer à</p>
                  <p className="text-sm text-[#0A0A0A]/60">Gombe, Kinshasa</p>
                </div>
              </div>
              <button className="text-[#F4B400] text-sm font-semibold">Modifier</button>
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="px-6 py-6 bg-white mt-2">
          <h2 className="font-bold text-[#0A0A0A] mb-4">Articles</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                className="flex items-center gap-4 p-4 bg-[#F7F7F7] rounded-xl"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-[#0A0A0A]">{item.name}</h3>
                  <p className="text-[#F4B400] font-bold mt-1">{item.price.toLocaleString()} FC</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-[#E8DDB5] transition-all"
                  >
                    <Minus size={16} className="text-[#0A0A0A]" />
                  </button>
                  <span className="font-bold text-[#0A0A0A] w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-[#E8DDB5] transition-all"
                  >
                    <Plus size={16} className="text-[#0A0A0A]" />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-red-50 transition-all"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Promo Code */}
        <div className="px-6 py-4 bg-white mt-2">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0A0A0A]/40" size={18} />
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Code promo"
                className="w-full pl-10 pr-4 py-3 bg-[#F7F7F7] rounded-xl text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#F4B400]"
              />
            </div>
            <Button
              onClick={applyPromo}
              className="px-6 bg-[#F4B400] hover:bg-[#E68931] text-[#0A0A0A] rounded-xl"
            >
              Appliquer
            </Button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="px-6 py-6 bg-white mt-2">
          <h2 className="font-bold text-[#0A0A0A] mb-4">Méthode de Paiement</h2>
          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod('momo')}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                paymentMethod === 'momo'
                  ? 'bg-[#F4B400] text-[#0A0A0A]'
                  : 'bg-[#F7F7F7] text-[#0A0A0A]/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Wallet size={20} />
                <span className="font-medium">MTN MoMo</span>
              </div>
              {paymentMethod === 'momo' && (
                <div className="w-5 h-5 bg-[#0A0A0A] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#F4B400] rounded-full"></div>
                </div>
              )}
            </button>
            <button
              onClick={() => setPaymentMethod('cash')}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                paymentMethod === 'cash'
                  ? 'bg-[#F4B400] text-[#0A0A0A]'
                  : 'bg-[#F7F7F7] text-[#0A0A0A]/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Wallet size={20} />
                <span className="font-medium">Espèces à la livraison</span>
              </div>
              {paymentMethod === 'cash' && (
                <div className="w-5 h-5 bg-[#0A0A0A] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#F4B400] rounded-full"></div>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="px-6 py-6 bg-white mt-2">
          <h2 className="font-bold text-[#0A0A0A] mb-4">Résumé de la Commande</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-[#0A0A0A]/60">
              <span>Sous-total</span>
              <span>{subtotal.toLocaleString()} FC</span>
            </div>
            <div className="flex justify-between text-[#0A0A0A]/60">
              <span>Frais de livraison</span>
              <span>{deliveryFee.toLocaleString()} FC</span>
            </div>
            <div className="flex justify-between text-[#0B3A2E]">
              <span>Réduction</span>
              <span>-{discount.toLocaleString()} FC</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg font-bold text-[#0A0A0A]">
              <span>Total</span>
              <span className="text-[#F4B400]">{total.toLocaleString()} FC</span>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#F7F7F7] to-transparent z-20">
          <Button
            onClick={handleCheckout}
            className="w-full bg-[#F4B400] hover:bg-[#E68931] text-[#0A0A0A] font-semibold py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Commander • {total.toLocaleString()} FC
          </Button>
        </div>
      </div>
    </>
  );
};

export default Cart;