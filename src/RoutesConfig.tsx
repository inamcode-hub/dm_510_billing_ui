// RoutesConfig.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import PaymentSuccess from './pages/PaymentSuccess';

const RoutesConfig: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="payment-success" element={<PaymentSuccess />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  );
};

export default RoutesConfig;
