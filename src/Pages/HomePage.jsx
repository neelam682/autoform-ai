// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeatureCards from '../components/FeatureCards';
import PricingPlans from '../components/PricingPlans';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';
import About from '../components/About';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = (planType) => {
    setSelectedPlan(planType); // 'free', 'pro', or 'team'
    setShowLogin(true);
  };

  const handleLoginSuccess = async () => {
    setShowLogin(false);
    setLoading(true);

    if (selectedPlan === 'free') {
      // Free plan → go directly
      setTimeout(() => {
        setLoading(false);
        navigate('/form-builder');
      }, 1200);
    } else {
      // Paid plan → create Stripe checkout session
      try {
        const API_URL =
          import.meta.env.MODE === 'development'
            ? 'http://localhost:4000/create-checkout-session'
            : '/api/create-checkout-session';

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planType: selectedPlan }),
        });

        let data;
        try {
          data = await response.json();
        } catch (e) {
          console.error('❌ Non-JSON response:', e);
          setLoading(false);
          alert('Server did not return valid JSON. Check backend logs.');
          return;
        }

        if (data.url) {
          window.location.href = data.url; // redirect to Stripe checkout
        } else {
          setLoading(false);
          alert('❌ Stripe session could not be created.');
        }
      } catch (err) {
        console.error('❌ Stripe error:', err);
        setLoading(false);
        alert('Payment initiation failed.');
      }
    }
  };

  return (
    <div className="relative bg-background-light text-gray-900 font-display min-h-screen">
      <Navbar onLoginClick={handleLoginClick} />
      <section id="hero">
        <Hero onLoginClick={handleLoginClick} />
      </section>
      <section id="features">
        <FeatureCards />
      </section>
      <section id="pricingplans">
        <PricingPlans
          onLoginClick={handleLoginClick}
          onProClick={handleLoginClick}
        />
      </section>
      <section id="about">
        <About />
      </section>
      <Footer />

      <LoginModal
        show={showLogin}
        onClose={() => setShowLogin(false)}
        selectedPlan={selectedPlan}
        onSuccess={handleLoginSuccess}
      />

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Home;












