import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Package, DollarSign, TrendingUp, Edit, Plus, Trash2, 
  BarChart3, Clock, CheckCircle2, XCircle, AlertCircle, ChefHat, 
  Settings, Users, Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const RestaurantDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { toast } = useToast();

  // KPI Stats
  const stats = [
    { label: 'Revenus (Auj)', value: '450,000 FC', sub: '+12% vs hier', icon: DollarSign, color: '#0B3A2E' },
    { label: 'Commandes Totales', value: '24', sub: '4 en attente', icon: Package, color: '#F4B400' },
    { label: 'Note Moyenne', value: '4.8', sub: 'Basé sur 120 avis', icon: TrendingUp, color: '#E68931' }
  ];

  // Mock Orders Data
  const [orders, setOrders] = useState([
    { id: 101, customer: 'Jean Mukendi', items: ['Poulet DG x2', 'Fufu'], total: 34000, status: 'en attente', time: 'il y a 10 min' },
    { id: 102, customer: 'Marie Kabongo', items: ['Poisson Grillé'], total: 18000, status: 'en préparation', time: 'il y a 25 min' },
    { id: 103, customer: 'Paul K.', items: ['Burger King Spécial'], total: 12500, status: 'prêt', time: 'il y a 40 min' },
  ]);

  // Mock Menu Data
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Poulet DG', category: 'Plats', price: 15000, stock: 12, status: 'actif' },
    { id: 2, name: 'Fufu & Pondu', category: 'Accompagnements', price: 12000, stock: 5, status: 'faible' },
    { id: 3, name: 'Tilapia Grillé', category: 'Plats', price: 18000, stock: 0, status: 'épuisé' }
  ]);

  const updateOrderStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    toast({ title: "Commande Mise à Jour", description: `Commande #${id} marquée comme ${newStatus}` });
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="space-y-6 animate-in fade-in">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-[#F7F7F7]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-opacity-10" style={{ backgroundColor: `${stat.color}20` }}>
                      {React.createElement(stat.icon, { size: 24, color: stat.color })}
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Actif</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A0A0A]">{stat.value}</h3>
                  <p className="text-sm text-[#0A0A0A]/60 font-medium">{stat.label}</p>
                  <p className="text-xs text-[#0A0A0A]/40 mt-1">{stat.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F7F7F7]">
              <h3 className="font-bold text-lg mb-4">Commandes en Direct</h3>
              <div className="space-y-4">
                {orders.slice(0, 3).map(order => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-[#F7F7F7]/50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#F4B400]/20 flex items-center justify-center text-[#F4B400] font-bold">
                        #{order.id}
                      </div>
                      <div>
                        <p className="font-bold text-[#0A0A0A]">{order.customer}</p>
                        <p className="text-xs text-[#0A0A0A]/60">{order.items.length} articles • {order.time}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                      order.status === 'en attente' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'en préparation' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button onClick={() => setActiveTab('orders')} variant="ghost" className="w-full mt-4 text-[#F4B400]">Voir Toutes les Commandes</Button>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-4 animate-in fade-in">
             <div className="flex gap-2 overflow-x-auto pb-2">
               {['Toutes', 'En Attente', 'En Préparation', 'Prêtes', 'Livrées'].map(status => (
                 <button key={status} className="px-4 py-2 rounded-full bg-white border hover:border-[#F4B400] text-sm whitespace-nowrap shadow-sm">
                   {status}
                 </button>
               ))}
             </div>
             
             {orders.map(order => (
               <motion.div key={order.id} layout className="bg-white p-5 rounded-2xl shadow-sm border border-[#F7F7F7]">
                 <div className="flex justify-between items-start mb-4">
                   <div>
                     <div className="flex items-center gap-2">
                       <h3 className="font-bold text-lg">#{order.id}</h3>
                       <span className="text-xs text-gray-400">• {order.time}</span>
                     </div>
                     <p className="text-sm font-medium text-[#0B3A2E]">{order.customer}</p>
                   </div>
                   <p className="font-bold text-[#F4B400]">{order.total.toLocaleString()} FC</p>
                 </div>
                 
                 <div className="bg-[#F7F7F7] p-3 rounded-xl mb-4">
                   <ul className="text-sm space-y-1 text-[#0A0A0A]/80">
                     {order.items.map((item, i) => <li key={i}>• {item}</li>)}
                   </ul>
                 </div>

                 <div className="flex gap-2">
                   {order.status === 'en attente' && (
                     <>
                       <Button onClick={() => updateOrderStatus(order.id, 'en préparation')} className="flex-1 bg-[#0B3A2E] hover:bg-[#0B3A2E]/90">Accepter</Button>
                       <Button variant="outline" className="flex-1 border-red-200 text-red-500 hover:bg-red-50">Rejeter</Button>
                     </>
                   )}
                   {order.status === 'en préparation' && (
                     <Button onClick={() => updateOrderStatus(order.id, 'prêt')} className="flex-1 bg-[#F4B400] text-[#0A0A0A] hover:bg-[#E68931]">Marquer Prêt</Button>
                   )}
                   {order.status === 'prêt' && (
                     <Button className="flex-1 bg-gray-100 text-gray-500 cursor-not-allowed">En attente du livreur</Button>
                   )}
                 </div>
               </motion.div>
             ))}
          </div>
        );

      case 'menu':
        return (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg">Articles du Menu</h2>
              <Button size="sm" className="bg-[#F4B400] text-[#0A0A0A]"><Plus size={16} className="mr-1"/> Ajouter</Button>
            </div>
            
            {menuItems.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-[#F7F7F7] flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden">
                    <img alt={item.name} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1629386200770-756bc54f9d0a" />
                  </div>
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.category} • {item.price.toLocaleString()} FC</p>
                    <div className={`text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full inline-block ${
                      item.status === 'actif' ? 'bg-green-100 text-green-700' : 
                      item.status === 'faible' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status === 'actif' ? 'En Stock' : item.status === 'faible' ? `Stock Faible (${item.stock})` : 'Épuisé'}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="p-2 text-gray-400 hover:text-[#F4B400]"><Edit size={18}/></button>
                  <button className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={18}/></button>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return <div className="p-8 text-center text-gray-400">Fonctionnalité bientôt disponible !</div>;
    }
  };

  const NavButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full ${
        activeTab === id ? 'bg-[#F4B400] text-[#0A0A0A] font-bold shadow-md' : 'text-white/60 hover:bg-white/10'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <>
      <Helmet>
        <title>Admin Restaurant - GLUCK Eats</title>
      </Helmet>
      <div className="min-h-screen bg-[#F7F7F7] flex flex-col lg:flex-row">
        {/* Sidebar (Desktop) / Topbar (Mobile) */}
        <div className="bg-[#0B3A2E] text-white p-4 lg:w-64 lg:min-h-screen flex-shrink-0">
          <div className="flex items-center gap-3 mb-8 px-2">
            <button onClick={() => navigate('/home')} className="lg:hidden"><ArrowLeft /></button>
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          
          <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
            <NavButton id="overview" icon={BarChart3} label="Aperçu" />
            <NavButton id="orders" icon={Clock} label="Commandes" />
            <NavButton id="menu" icon={ChefHat} label="Menu" />
            <NavButton id="stock" icon={Package} label="Stock" />
            <NavButton id="marketing" icon={Tag} label="Marketing" />
            <NavButton id="settings" icon={Settings} label="Paramètres" />
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-[#0A0A0A] capitalize">
                  {activeTab === 'overview' ? 'Aperçu' : activeTab === 'orders' ? 'Commandes' : activeTab === 'menu' ? 'Menu' : activeTab}
                </h2>
                <p className="text-gray-500 text-sm">Bon retour, Gérant</p>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-500 hover:text-[#F4B400]">
                  <AlertCircle size={20} />
                </button>
              </div>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantDashboard;