import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Palette, Type, Layout, Zap } from 'lucide-react';

const DesignSystem = () => {
  const navigate = useNavigate();

  const colors = [
    { name: 'Primaire', hex: '#F4B400', usage: 'Couleur principale, Appels à l\'action' },
    { name: 'Secondaire', hex: '#0B3A2E', usage: 'Accents, états de succès' },
    { name: 'Sombre', hex: '#0A0A0A', usage: 'Texte, arrière-plans' },
    { name: 'Clair', hex: '#F7F7F7', usage: 'Arrière-plans, cartes' },
    { name: 'Orange Brûlé', hex: '#E68931', usage: 'Mises en avant, promotions' },
    { name: 'Sable Chaud', hex: '#E8DDB5', usage: 'Accents subtils' }
  ];

  const typography = [
    { name: 'Titre 1', class: 'text-4xl font-bold', sample: 'Bienvenue' },
    { name: 'Titre 2', class: 'text-2xl font-bold', sample: 'Restaurants en Vedette' },
    { name: 'Titre 3', class: 'text-xl font-bold', sample: 'Résumé de la Commande' },
    { name: 'Corps', class: 'text-base', sample: 'Parcourez des centaines de restaurants' },
    { name: 'Petit', class: 'text-sm', sample: 'Temps de livraison : 20-30 min' }
  ];

  const spacing = [
    { name: 'Très Petit', value: '0.5rem (8px)', class: 'p-2' },
    { name: 'Petit', value: '0.75rem (12px)', class: 'p-3' },
    { name: 'Moyen', value: '1rem (16px)', class: 'p-4' },
    { name: 'Grand', value: '1.5rem (24px)', class: 'p-6' },
    { name: 'Très Grand', value: '2rem (32px)', class: 'p-8' }
  ];

  const components = [
    { name: 'Bouton Primaire', element: 'bg-[#F4B400] hover:bg-[#E68931] text-[#0A0A0A] px-6 py-3 rounded-xl font-semibold' },
    { name: 'Bouton Secondaire', element: 'border-2 border-[#F4B400] text-[#F4B400] px-6 py-3 rounded-xl font-semibold' },
    { name: 'Carte', element: 'bg-white rounded-2xl shadow-sm p-4' },
    { name: 'Champ de Saisie', element: 'bg-[#F7F7F7] rounded-xl px-4 py-3 w-full border border-transparent focus:border-[#F4B400]' }
  ];

  return (
    <>
      <Helmet>
        <title>Système de Design - GLUCK Eats</title>
        <meta name="description" content="Documentation complète du système de design" />
      </Helmet>
      <div className="min-h-screen bg-[#F7F7F7]">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#F4B400] to-[#E68931] px-6 pt-12 pb-8">
          <button
            onClick={() => navigate('/home')}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all mb-6"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">Système de Design</h1>
          <p className="text-white/90">Charte Graphique GLUCK Eats</p>
        </div>

        {/* Color Palette */}
        <div className="px-6 py-8">
          <div className="flex items-center gap-3 mb-6">
            <Palette size={24} className="text-[#F4B400]" />
            <h2 className="text-2xl font-bold text-[#0A0A0A]">Palette de Couleurs</h2>
          </div>
          <div className="grid gap-4">
            {colors.map((color) => (
              <div key={color.name} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-xl flex-shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="flex-1">
                  <h3 className="font-bold text-[#0A0A0A]">{color.name}</h3>
                  <p className="text-sm text-[#0A0A0A]/60">{color.hex}</p>
                  <p className="text-xs text-[#0A0A0A]/40 mt-1">{color.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="px-6 py-8 bg-white">
          <div className="flex items-center gap-3 mb-6">
            <Type size={24} className="text-[#F4B400]" />
            <h2 className="text-2xl font-bold text-[#0A0A0A]">Typographie</h2>
          </div>
          <div className="space-y-6">
            {typography.map((type) => (
              <div key={type.name} className="border-b border-[#F7F7F7] pb-4">
                <p className="text-sm text-[#0A0A0A]/60 mb-2">{type.name}</p>
                <p className={type.class + ' text-[#0A0A0A]'}>{type.sample}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Spacing */}
        <div className="px-6 py-8">
          <div className="flex items-center gap-3 mb-6">
            <Layout size={24} className="text-[#F4B400]" />
            <h2 className="text-2xl font-bold text-[#0A0A0A]">Échelle d'Espacement</h2>
          </div>
          <div className="space-y-3">
            {spacing.map((space) => (
              <div key={space.name} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-[#0A0A0A]">{space.name}</h3>
                  <span className="text-sm text-[#0A0A0A]/60">{space.value}</span>
                </div>
                <div className="bg-[#F7F7F7] rounded-lg inline-block">
                  <div className={space.class + ' bg-[#F4B400]'} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Components */}
        <div className="px-6 py-8 pb-12 bg-white">
          <div className="flex items-center gap-3 mb-6">
            <Zap size={24} className="text-[#F4B400]" />
            <h2 className="text-2xl font-bold text-[#0A0A0A]">Composants</h2>
          </div>
          <div className="space-y-6">
            {components.map((component) => (
              <div key={component.name} className="bg-[#F7F7F7] rounded-2xl p-6">
                <h3 className="font-bold text-[#0A0A0A] mb-4">{component.name}</h3>
                {component.name.includes('Bouton') ? (
                  <button className={component.element}>
                    {component.name}
                  </button>
                ) : component.name === 'Carte' ? (
                  <div className={component.element}>
                    <p className="font-semibold text-[#0A0A0A]">Composant Carte</p>
                    <p className="text-sm text-[#0A0A0A]/60 mt-1">Ceci est un exemple de carte</p>
                  </div>
                ) : (
                  <input
                    type="text"
                    placeholder="Entrez du texte..."
                    className={component.element}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignSystem;