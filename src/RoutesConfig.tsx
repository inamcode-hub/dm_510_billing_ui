// RoutesConfig.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';


const RoutesConfig: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route index element={<Login />} /> */}
        {/* <Route path="testpage" element={<TestPage />} />  */}

        {/* <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<LayoutDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route> */}
        {/* <Route path="*" element={<NotFound />} />  */}
      </Route>
    </Routes>
  );
};

export default RoutesConfig;