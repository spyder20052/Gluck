import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Send, HelpCircle, RefreshCw, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const faqs = [
  {
    question: 'Comment suivre ma commande ?',
    answer: 'Vous pouvez suivre votre commande en temps réel depuis la page Suivi de Commande. Vous recevrez des notifications à chaque étape.'
  },
  {
    question: 'Quels modes de paiement sont acceptés ?',
    answer: 'Nous acceptons MTN MoMo, Airtel Money et le paiement en espèces à la livraison pour votre confort.'
  },
  {
    question: 'Comment annuler une commande ?',
    answer: 'Vous pouvez annuler une commande dans les 5 minutes suivant sa validation. Allez dans les détails de votre commande et cliquez sur Annuler la Commande.'
  },
  {
    question: 'Comment fonctionne le programme de fidélité ?',
    answer: 'Gagnez des points à chaque commande et échangez-les contre des récompenses comme la livraison gratuite et des réductions.'
  }
];

const Support = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Bonjour ! Comment pouvons-nous vous aider aujourd\'hui ?', sender: 'support', time: '14:30' }
  ]);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          text: 'Merci pour votre message. Notre équipe de support vous répondra sous peu.',
          sender: 'support',
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
  };

  const handleRefundRequest = () => {
    toast({
      title: "Demande de Remboursement Envoyée",
      description: "Nous examinerons votre demande sous 24 heures"
    });
  };

  const handleCancelOrder = () => {
    toast({
      title: "Commande Annulée",
      description: "Votre remboursement sera traité sous 3 à 5 jours ouvrables"
    });
  };

  return (
    <>
      <Helmet>
        <title>Support Client - GLUCK Eats</title>
        <meta name="description" content="Obtenez de l'aide pour vos commandes et votre compte" />
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
            <h1 className="text-xl font-bold text-[#0A0A0A]">Support Client</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 py-4 bg-white border-b">
          <div className="flex gap-2">
            {[
              { id: 'chat', label: 'Discussion' },
              { id: 'faq', label: 'FAQ' },
              { id: 'actions', label: 'Actions' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#F4B400] text-[#0A0A0A]'
                    : 'bg-[#F7F7F7] text-[#0A0A0A]/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-[calc(100vh-180px)]">
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.sender === 'user'
                        ? 'bg-[#F4B400] text-[#0A0A0A]'
                        : 'bg-white text-[#0A0A0A] shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-[#0A0A0A]/60' : 'text-[#0A0A0A]/40'}`}>
                      {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-white p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Tapez votre message..."
                  className="flex-1 bg-[#F7F7F7] rounded-xl px-4 py-3 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#F4B400]"
                />
                <button
                  onClick={handleSendMessage}
                  className="w-12 h-12 bg-[#F4B400] rounded-xl flex items-center justify-center hover:bg-[#E68931] transition-all"
                >
                  <Send size={20} className="text-[#0A0A0A]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="px-6 py-6 space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-4 flex items-start gap-3 text-left hover:bg-[#F7F7F7] transition-all"
                >
                  <HelpCircle size={20} className="text-[#F4B400] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-[#0A0A0A]">{faq.question}</p>
                    {expandedFaq === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-sm text-[#0A0A0A]/60 mt-2"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Actions Tab */}
        {activeTab === 'actions' && (
          <div className="px-6 py-6 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#F4B400]/20 rounded-xl flex items-center justify-center">
                  <RefreshCw size={24} className="text-[#F4B400]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#0A0A0A]">Demander un Remboursement</h3>
                  <p className="text-sm text-[#0A0A0A]/60">Obtenez un remboursement pour votre commande</p>
                </div>
              </div>
              <Button
                onClick={handleRefundRequest}
                className="w-full bg-[#F4B400] hover:bg-[#E68931] text-[#0A0A0A]"
              >
                Soumettre la Demande
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <XCircle size={24} className="text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#0A0A0A]">Annuler la Commande</h3>
                  <p className="text-sm text-[#0A0A0A]/60">Annuler votre commande en cours</p>
                </div>
              </div>
              <Button
                onClick={handleCancelOrder}
                variant="outline"
                className="w-full border-2 border-red-300 text-red-600 hover:bg-red-50"
              >
                Annuler Ma Commande
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default Support;