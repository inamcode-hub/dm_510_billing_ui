import React from 'react';
import styled from '@emotion/styled';
import Header from './components/Header';

const NavbarMobile: React.FC = () => {
  return (
    <React.Fragment>
      <Wrapper>
       <Header />
        <h1>Mobile navbar</h1>
      </Wrapper>
    </React.Fragment>
  );
};

// css here
const Wrapper = styled.div `
 
`
export default NavbarMobile;