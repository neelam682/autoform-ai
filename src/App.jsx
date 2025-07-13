// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage.jsx';
import FormBuilder from './Pages/FormBuilder.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import SavedForms from './Pages/SavedForms.jsx';
import Settings from './Pages/Settings.jsx';
import Billing from './Pages/Billing.jsx';

import DashboardLayout from './layouts/DashboardLayout';
import { UserProvider } from './context/UserContext';

const App = () => (
  <UserProvider>
    <Routes>
      {/* Public Home Page */}
      <Route path="/" element={<Home />} />

      {/* Dashboard Layout Pages */}
      <Route path="/dashboard" element={
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      } />

      <Route path="/form-builder" element={
        <DashboardLayout>
          <FormBuilder />
        </DashboardLayout>
      } />

      <Route path="/saved" element={
        <DashboardLayout>
          <SavedForms />
        </DashboardLayout>
      } />

      <Route path="/settings" element={
        <DashboardLayout>
          <Settings />
        </DashboardLayout>
      } />

      <Route path="/billing" element={
        <DashboardLayout>
          <Billing />
        </DashboardLayout>
      } />
    </Routes>
  </UserProvider>
);

export default App;












