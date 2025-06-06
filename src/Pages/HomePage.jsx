import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./HomePage.css";
import AuthModal from "../components/AuthModal";

import completeForm from "../assets/complete-form.svg";
import forms from "../assets/forms.svg";
import pdf from "../assets/pdf.svg";
import smart from "../assets/smart.svg";
import secureLogin from "../assets/secure-login.svg";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    if (localStorage.getItem("walletConnected") === "true") {
      setWalletConnected(true);
    }
  }, []);

  const navigate = useNavigate();

  const handleConnectWallet = () => {
    // Optional: simulate wallet connection status
    if (!walletConnected) {
      // your wallet connection logic (if any)
      setWalletConnected(true); // assuming you're using state
    }

    // Navigate to TrustPage
    navigate("/connect");
  };


  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert("📬 You're on the early access list!");
      setEmail("");
    }
  };

  return (
    <div className="homepage">
      <header className="navbar">
        <div className="logo">AutoForm AI </div>
        <button
          className="hamburger"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <nav className={menuOpen ? "open" : ""}>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#connect">Connect</a></li>
            <li><button className="login-btn" onClick={openModal}>Login</button></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Auto-fill Professional Forms with AI</h1>
        <p>AutoForm AI helps you complete rental, visa, job, and more forms effortlessly—just answer a few key questions once.</p>
        <img src={completeForm} alt="AutoForm Illustration" className="hero-image" />
        <button className="cta-big" onClick={openModal}>Try It Now</button>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3 className="feature-title">Form Intelligence</h3>
            <p className="feature-description">Auto-detects and fills out relevant fields intelligently based on your answers.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3 className="feature-title">Memory-Based Filling</h3>
            <p className="feature-description">Never repeat yourself—your data is securely reused across forms.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3 className="feature-title">Export to PDF</h3>
            <p className="feature-description">Download filled forms as ready-to-submit professional PDFs.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" id="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4 className="step-title">Answer Once</h4>
              <p className="step-description">Input key personal info once and we store it securely.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4 className="step-title">AI Fills Forms</h4>
              <p className="step-description">Our AI detects the form type and fills it with your saved data.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4 className="step-title">Download Instantly</h4>
              <p className="step-description">Get a filled, ready-to-use PDF instantly for download or printing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="connect-section" id="connect">
        <h2>Get Early Access</h2>
        <div className="connect-actions">
          <button className="wallet-button" onClick={handleConnectWallet}>
            {walletConnected ? "✅ Wallet Connected" : "🔗 Connect Trust Wallet"}
          </button>
          <form onSubmit={handleEmailSubmit} className="email-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Join Waitlist</button>
          </form>
        </div>
        <p className="wallet-note">*Simulated wallet connect. Full integration coming soon.</p>
      </section>

      {/* Footer */}
      <footer className="footer">© {new Date().getFullYear()} AutoForm AI. All rights reserved.</footer>

      {/* Auth Modal */}
      {showModal && <AuthModal onClose={closeModal} />}
    </div>
  );
}

