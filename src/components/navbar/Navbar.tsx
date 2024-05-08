import React, { useState, useEffect } from 'react';
import NavbarMobile from './NavbarMobile';
import NavbarDesktop from './NavbarDesktop';

const Navbar: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {windowWidth <= 768 ? <NavbarMobile /> : <NavbarDesktop />}
    </div>
  );
};

export default Navbar;
