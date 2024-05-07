// RoutesConfig.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';


const RoutesConfig: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>Home</div>} />
        <Route path="about" element={<div>About</div>} />
        <Route path="*" element={<div>Not Found</div>} />
       
      </Route>
    </Routes>
  );
};

export default RoutesConfig;