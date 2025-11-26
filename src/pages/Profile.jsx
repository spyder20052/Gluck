import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, User, Mail, Phone, MapPin, CreditCard, Bell, Shield, 
  Globe, LogOut, ChevronRight, Edit2, Trash2, Plus, CheckCircle, Leaf,
  UtensilsCrossed
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import BottomNav from '@/components/BottomNav';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const [user, setUser] = useState({
    name: 'Jean-Luc Kabangu',
    email: 'jean.luc@example.com',
    phone: '+243 81 234 5678',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200',
    completion: 85
  });

  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Maison', text: '123 Blvd du 30 Juin, Gombe, Kinshasa' },
    { id: 2, type: 'Travail', text: 'Immeuble Sky, Royal, Kinshasa' }
  ]);

  const [payments, setPayments] = useState([
    { id: 1, type: 'MTN MoMo', number: '...5678', default: true },
    { id: 2, type: 'Visa', number: '...4242', default: false }
  ]);

  const [dietary, setDietary] = useState(['Épicé', 'Halal']);
  
  const dietaryOptions = ['Végétarien', 'Végan', 'Sans Gluten', 'Halal', 'Épicé', 'Sans Arachide'];

  const toggleDietary = (option) => {
    setDietary(prev => 
      prev.includes(option) ? prev.filter(i => i !== option) : [...prev, option]
    );
  };

  const sections = [
    { id: 'addresses', icon: MapPin, title: 'Adresses Enregistrées', count: addresses.length },
    { id: 'payments', icon: CreditCard, title: 'Méthodes de Paiement', count: payments.length },
    { id: 'dietary', icon: UtensilsCrossed, title: 'Préférences Alimentaires', count: dietary.length },
    { id: 'notifications', icon: Bell, title: 'Notifications' },
    { id: 'language', icon: Globe, title: 'Langue & Devise' },
    { id: 'security', icon: Shield, title: 'Confidentialité & Sécurité' },
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profil Mis à Jour",
      description: "Vos modifications ont été enregistrées avec succès."
    });
  };

  const handleLogout = () => {
    toast({
      title: "Déconnecté",
      description: "À bientôt !"
    });
    navigate('/home');
  };

  return (
    <>
      <Helmet>
        <title>Mon Profil - GLUCK Eats</title>
      </Helmet>
      <div className="min-h-screen bg-[#F7F7F7] pb-24">
        {/* Header with Gradient */}
        <div className="relative bg-gradient-to-br from-[#0B3A2E] to-[#1a5c4a] pb-24 pt-12 px-6 rounded-b-[2.5rem] shadow-lg overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#F4B400 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <div className="relative z-10 flex justify-between items-start mb-6">
            <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all">
              <ArrowLeft size={20} />
            </button>
            <button onClick={() => setIsEditing(!isEditing)} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all">
              {isEditing ? <CheckCircle size={20} className="text-[#F4B400]" /> : <Edit2 size={18} />}
            </button>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative mb-4 group">
              <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-r from-[#F4B400] to-[#E68931]">
                <div className="w-full h-full rounded-full overflow-hidden bg-white border-4 border-[#0B3A2E]">
                  <img alt="Avatar Profil" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1580128637392-35b81ba47467" />
                </div>
              </div>
              {isEditing && (
                <button className="absolute bottom-1 right-1 bg-[#F4B400] text-[#0A0A0A] p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Plus size={16} />
                </button>
              )}
            </div>
            
            {isEditing ? (
              <div className="w-full max-w-xs space-y-3 animate-in fade-in slide-in-from-bottom-4">
                <input type="text" value={user.name} onChange={e => setUser({...user, name: e.target.value})} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 text-center" placeholder="Nom Complet" />
                <input type="email" value={user.email} onChange={e => setUser({...user, email: e.target.value})} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 text-center" placeholder="Email" />
                <Button onClick={handleSaveProfile} className="w-full bg-[#F4B400] text-[#0A0A0A] hover:bg-[#E68931]">Enregistrer</Button>
              </div>
            ) : (
              <div className="animate-in fade-in">
                <h1 className="text-2xl font-bold text-white mb-1">{user.name}</h1>
                <p className="text-[#E8DDB5]">{user.email}</p>
                <div className="mt-6 w-full max-w-[200px] bg-black/20 rounded-full h-1.5 mx-auto overflow-hidden">
                  <div className="h-full bg-[#F4B400] rounded-full" style={{ width: `${user.completion}%` }}></div>
                </div>
                <p className="text-xs text-[#E8DDB5]/80 mt-1">Complétion du profil : {user.completion}%</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 -mt-12 relative z-20 space-y-4">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeSection === section.id ? 'bg-[#F4B400] text-[#0A0A0A]' : 'bg-[#F7F7F7] text-[#0A0A0A]/60'}`}>
                    {React.createElement(section.icon, { size: 20 })}
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-[#0A0A0A]">{section.title}</h3>
                    {section.count !== undefined && (
                      <p className="text-xs text-[#0A0A0A]/40">{section.count} éléments enregistrés</p>
                    )}
                  </div>
                </div>
                <ChevronRight size={20} className={`text-[#0A0A0A]/30 transition-transform ${activeSection === section.id ? 'rotate-90' : ''}`} />
              </button>

              <AnimatePresence>
                {activeSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-[#F7F7F7] bg-[#FAFAFA]"
                  >
                    <div className="p-4 space-y-3">
                      {section.id === 'addresses' && (
                        <>
                          {addresses.map(addr => (
                            <div key={addr.id} className="flex justify-between items-center bg-white p-3 rounded-xl border border-[#F7F7F7]">
                              <div className="flex items-center gap-3">
                                <MapPin size={16} className="text-[#F4B400]" />
                                <div>
                                  <p className="font-bold text-sm">{addr.type}</p>
                                  <p className="text-xs text-gray-500">{addr.text}</p>
                                </div>
                              </div>
                              <button className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                            </div>
                          ))}
                          <Button variant="outline" className="w-full border-dashed border-2 text-gray-500">
                            <Plus size={16} className="mr-2" /> Ajouter une adresse
                          </Button>
                        </>
                      )}

                      {section.id === 'dietary' && (
                        <div className="flex flex-wrap gap-2">
                          {dietaryOptions.map(opt => (
                            <button
                              key={opt}
                              onClick={() => toggleDietary(opt)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                dietary.includes(opt)
                                  ? 'bg-[#0B3A2E] text-white shadow-md transform scale-105'
                                  : 'bg-white border border-[#E8DDB5] text-[#0A0A0A]/60 hover:border-[#0B3A2E]'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Placeholder for other sections */}
                      {['payments', 'notifications', 'language', 'security'].includes(section.id) && (
                        <div className="text-center py-4 text-gray-400 text-sm">
                          Gérez vos paramètres de {section.title.toLowerCase()} ici.
                          <br/>
                          <span className="text-xs text-[#F4B400] mt-2 inline-block">Fonctionnalité bientôt disponible !</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Account Actions */}
          <div className="space-y-3 pt-4">
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="w-full border-[#F4B400] text-[#0A0A0A] font-semibold py-6 rounded-xl hover:bg-[#F4B400]/10"
            >
              <LogOut size={20} className="mr-2" /> Se Déconnecter
            </Button>
            <button className="w-full text-red-500 text-sm font-medium py-2 opacity-60 hover:opacity-100">
              Supprimer le Compte
            </button>
          </div>
        </div>

        <BottomNav />
      </div>
    </>
  );
};

export default Profile;