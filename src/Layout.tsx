// Import necessary modules
import React from 'react';
import { Outlet } from 'react-router-dom';

// Define the Layout component
const Layout: React.FC = () => {
  return (
    <div>
        hello
      {/* This could be a place to add a header, navigation bar, or sidebar */}
      <Outlet />
      {/* This could be a place to add a footer */}
     
    </div>
  );
};

export default Layout;