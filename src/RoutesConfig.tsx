// RoutesConfig.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import PaymentSuccess from './pages/PaymentSuccess';
import { Profile, Payment, Package } from './pages/payment';

const RoutesConfig: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="payment" element={<Payment />} />
        <Route path="package" element={<Package />} />
        <Route path="payment-success" element={<PaymentSuccess />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  );
};

export default RoutesConfig;
