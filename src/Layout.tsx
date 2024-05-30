// Import necessary modules
import React from 'react';
import { Outlet } from 'react-router-dom';
import useWindowSize from './lib/hooks/useWindowSize';
import styled from '@emotion/styled';
import Navbar from './components/navbar_menu/Navbar';
import DropdownContent from './components/navbar_menu/components/DropdownContent';
const Layout: React.FC = () => {
  const { width } = useWindowSize();
  return (
    <Wrapper>
      <Navbar />
      <div className="container">
        <div className="drawer">
          <div className="drawer-content">
            {width <= 768 ? null : <DropdownContent />}
          </div>
        </div>
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media (min-width: 768px) {
    .container {
      display: flex;
      .drawer {
        background-color: var(--menu-color);
        width: 225px;
      }
    }
  }
  .drawer {
    .drawer-content {
      width: 225px;
      @media (max-width: 768px) {
        display: none;
      }
      min-height: calc(100vh - 50px);
      position: sticky;
      top: 51px;
    }
  }
  .outlet {
    padding: 10px;
    width: 100%;
  }
`;

export default Layout;
