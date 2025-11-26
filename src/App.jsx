import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Onboarding from '@/pages/Onboarding';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import MoMoLogin from '@/pages/MoMoLogin';
import LocationPermission from '@/pages/LocationPermission';
import Home from '@/pages/Home';
import RestaurantListing from '@/pages/RestaurantListing';
import RestaurantPage from '@/pages/RestaurantPage';
import ProductPage from '@/pages/ProductPage';
import Cart from '@/pages/Cart';
import OrderTracking from '@/pages/OrderTracking';
import OrderHistory from '@/pages/OrderHistory';
import ActiveOrders from '@/pages/ActiveOrders';
import Loyalty from '@/pages/Loyalty';
import Social from '@/pages/Social';
import RestaurantDashboard from '@/pages/RestaurantDashboard';
import Profile from '@/pages/Profile';
import Support from '@/pages/Support';
import DesignSystem from '@/pages/DesignSystem';

function App() {
  return (
    <Router>
      <Helmet>
        <title>GLUCK Eats - Livraison de Repas Simplifiée</title>
        <meta name="description" content="Commandez vos repas préférés dans les meilleurs restaurants avec GLUCK Eats. Livraison rapide, suivi en temps réel et récompenses exclusives." />
      </Helmet>
      <div className="min-h-screen bg-[#F7F7F7]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/momo-login" element={<MoMoLogin />} />
          <Route path="/location" element={<LocationPermission />} />
          <Route path="/home" element={<Home />} />
          <Route path="/restaurants" element={<RestaurantListing />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/tracking/:orderId" element={<OrderTracking />} />
          <Route path="/active-orders" element={<ActiveOrders />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/loyalty" element={<Loyalty />} />
          <Route path="/social" element={<Social />} />
          <Route path="/dashboard" element={<RestaurantDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/support" element={<Support />} />
          <Route path="/design-system" element={<DesignSystem />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;