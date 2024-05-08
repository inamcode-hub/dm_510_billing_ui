import styled from '@emotion/styled';
import React from 'react';
import Header from './components/Header';

const NavbarDesktop: React.FC = () => {
  return (
    <React.Fragment>
      <Wrapper>
       <Header />
       <h1>Desktop navbar</h1>
      </Wrapper>
    </React.Fragment>
  );
};

// css here
const Wrapper = styled.div `

`

export default NavbarDesktop;