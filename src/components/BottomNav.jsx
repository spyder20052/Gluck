import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, List, Gift, User, Bike } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Accueil', path: '/home' },
    { icon: List, label: 'Historique', path: '/orders' },
    { icon: Bike, label: 'Suivi', path: '/active-orders' },
    { icon: Gift, label: 'Fidélité', path: '/loyalty' },
    { icon: User, label: 'Profil', path: '/profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#F7F7F7] z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center px-4 py-3 max-w-2xl mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-[#F4B400] -translate-y-1' : 'text-[#0A0A0A]/40'
                }`}
            >
              <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-[#F4B400]/10' : 'bg-transparent'}`}>
                {React.createElement(item.icon, {
                  size: 24,
                  strokeWidth: isActive ? 2.5 : 2,
                  className: isActive ? 'text-[#F4B400]' : 'text-[#0A0A0A]/40'
                })}
              </div>
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;