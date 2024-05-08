// Import necessary modules
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

// Define the Layout component
const Layout: React.FC = () => {
  return (
    <div >
      {/* This could be a place to add a header, navigation bar, or sidebar */}
       <Navbar />
      <Outlet />
      {/* This could be a place to add a footer */}
     
    </div>
  );
};

export default Layout;