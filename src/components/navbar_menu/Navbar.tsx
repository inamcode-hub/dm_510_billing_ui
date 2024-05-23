import React from 'react';
import styled from '@emotion/styled';
import Header from './components/Header';

const Navbar: React.FC = () => {
  return (
    <React.Fragment>
      <Wrapper>
        <Header />
      </Wrapper>
    </React.Fragment>
  );
};

// css here
const Wrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
`;
export default Navbar;
