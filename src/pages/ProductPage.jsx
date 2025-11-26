import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Clock, Minus, Plus, Heart, Share2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Mock data (ideally this would come from a shared source or API)
const menuItems = [
    {
        id: 1,
        name: 'Poulet DG Royal',
        description: 'Poulet tendre mijoté avec des plantains, des légumes et notre mélange d\'épices secret. Un plat traditionnel camerounais revisité avec une touche gastronomique.',
        price: 15000,
        rating: 4.9,
        reviews: 85,
        category: 'popular',
        image: 'https://images.unsplash.com/photo-1595872018818-97555653a011',
        ingredients: ['Poulet Fermier', 'Plantains Mûrs', 'Carottes', 'Haricots Verts', 'Poivrons', 'Épices Secrètes'],
        calories: 850,
        prepTime: '25-35 min'
    },
    {
        id: 2,
        name: 'Fufu & Pondu Suprême',
        description: 'Fufu de manioc traditionnel servi avec un ragoût riche et crémeux de feuilles de manioc et du poisson fumé.',
        price: 12000,
        rating: 4.7,
        reviews: 42,
        category: 'popular',
        image: 'https://images.unsplash.com/photo-1626202158864-8835e985871c', // Placeholder
        ingredients: ['Farine de Manioc', 'Feuilles de Manioc', 'Huile de Palme', 'Poisson Fumé', 'Oignons'],
        calories: 700,
        prepTime: '20-30 min'
    },
    {
        id: 3,
        name: 'Festin de Tilapia Grillé',
        description: 'Tilapia frais entier mariné aux herbes épicées, grillé à la perfection avec des oignons.',
        price: 18000,
        rating: 4.8,
        reviews: 64,
        category: 'mains',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947', // Placeholder
        ingredients: ['Tilapia Entier', 'Gingembre', 'Ail', 'Piment', 'Oignons', 'Citron'],
        calories: 600,
        prepTime: '30-40 min'
    },
    {
        id: 4,
        name: 'Plantains Dorés',
        description: 'Plantains mûrs et sucrés frits à la perfection, dorés et croustillants.',
        price: 3000,
        rating: 4.9,
        reviews: 120,
        category: 'sides',
        image: 'https://images.unsplash.com/photo-1604543666270-3622416030f8', // Placeholder
        ingredients: ['Plantains Mûrs', 'Huile Végétale', 'Sel'],
        calories: 300,
        prepTime: '10-15 min'
    },
    {
        id: 5,
        name: 'Coucher de Soleil Tropical',
        description: 'Mélange fraîchement pressé de mangue, ananas et fruit de la passion.',
        price: 2500,
        rating: 4.6,
        reviews: 30,
        category: 'drinks',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', // Placeholder
        ingredients: ['Mangue', 'Ananas', 'Fruit de la Passion', 'Glace'],
        calories: 150,
        prepTime: '5-10 min'
    }
];

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');

    const product = menuItems.find(item => item.id === parseInt(id));

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center">Produit non trouvé</div>;
    }

    const handleAddToCart = () => {
        toast({
            title: "Ajouté au panier",
            description: `${quantity}x ${product.name} ajouté avec succès.`,
        });
    };

    return (
        <>
            <Helmet>
                <title>{product.name} - GLUCK Eats</title>
                <meta name="description" content={product.description} />
            </Helmet>
            <div className="min-h-screen bg-background pb-24">
                {/* Header Image */}
                <div className="relative h-[45vh]">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background z-10"></div>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />

                    {/* Navigation */}
                    <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div className="flex gap-3">
                            <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all">
                                <Heart size={20} />
                            </button>
                            <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-500 transition-all">
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-20 -mt-10 px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card rounded-[2.5rem] p-6 shadow-xl border border-border/50"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h1 className="font-serif text-3xl font-bold text-foreground leading-tight max-w-[70%]">{product.name}</h1>
                            <div className="flex flex-col items-end">
                                <span className="font-bold text-2xl text-primary">{product.price.toLocaleString()} FC</span>
                                <span className="text-xs text-muted-foreground line-through">{(product.price * 1.2).toLocaleString()} FC</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mb-6 text-sm">
                            <div className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-lg">
                                <Star size={14} className="text-primary fill-primary" />
                                <span className="font-bold">{product.rating}</span>
                                <span className="text-muted-foreground">({product.reviews})</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock size={16} />
                                <span>{product.prepTime}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <span className="font-bold text-foreground">{product.calories}</span> kcal
                            </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Ingredients */}
                        <div className="mb-8">
                            <h3 className="font-serif font-bold text-lg mb-3">Ingrédients</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.ingredients.map((ing, index) => (
                                    <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-xs font-medium">
                                        {ing}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex items-center gap-4 pt-4 border-t border-border">
                            <div className="flex items-center bg-secondary rounded-2xl p-1">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-background transition-colors"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-background transition-colors"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>

                            <Button
                                onClick={handleAddToCart}
                                className="flex-1 h-14 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20"
                            >
                                Ajouter {(product.price * quantity).toLocaleString()} FC
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default ProductPage;
