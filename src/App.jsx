// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage"; // or landing page
import FormBuilder from "./components/FormBuilder";
import AuthPage from "./components/AuthModal"; // the one that shows AuthModal
import TrustPage from "./components/TrustPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/form-builder" element={<FormBuilder />} />
      <Route path="/connect" element={<TrustPage />} /> {/* 👈 Add this line */}
    </Routes>
  );
}








