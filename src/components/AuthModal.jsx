import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./AuthModal.css";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";

export default function AuthModal({ onClose }) {
  const googleProvider = new GoogleAuthProvider();
  const appleProvider = new OAuthProvider("apple.com");

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [authInProgress, setAuthInProgress] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthInProgress(true);
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      if (userCredential?.user) {
        if (typeof onClose === "function") onClose();
        navigate("/form-builder");
      } else {
        setMessage("Authentication failed. Try again.");
      }
    } catch (error) {
      console.error("Auth error:", error);
      setMessage(error.message);
    } finally {
      setAuthInProgress(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setMessage("Please enter your email to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent.");
    } catch (error) {
      console.error("Reset error:", error);
      setMessage(error.message);
    }
  };

  const signInWithGoogle = async () => {
    if (authInProgress) return;
    setAuthInProgress(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result?.user) {
        if (typeof onClose === "function") onClose();
        navigate("/form-builder");
      } else {
        setMessage("Google sign-in failed.");
      }
    } catch (error) {
      console.error("Google error:", error);
      setMessage(error.message);
    } finally {
      setAuthInProgress(false);
    }
  };

  const signInWithApple = async () => {
    if (authInProgress) return;
    setAuthInProgress(true);
    try {
      const result = await signInWithPopup(auth, appleProvider);
      if (result?.user) {
        if (typeof onClose === "function") onClose();
        navigate("/form-builder");
      } else {
        setMessage("Apple sign-in failed.");
      }
    } catch (error) {
      console.error("Apple error:", error);
      setMessage(error.message);
    } finally {
      setAuthInProgress(false);
    }
  };

  return (
    <div className="auth-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={authInProgress}>
            {isSignUp ? "Create Account" : "Login"}
          </button>
        </form>

        <div className="auth-options">
          <button onClick={signInWithGoogle} disabled={authInProgress}>
            Sign in with Google
          </button>
          <button onClick={signInWithApple} disabled={authInProgress}>
            Sign in with Apple
          </button>
          <button className="link-button" onClick={handleResetPassword}>
            Forgot password?
          </button>
        </div>

        <p className="switch-mode">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button className="link-button" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Login" : "Sign up"}
          </button>
        </p>

        {message && <p className="error-message">{message}</p>}
      </div>
    </div>
  );
}
