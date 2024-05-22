import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Wrapper>
        <h1>Home</h1>
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/package">Package</Link>
          </li>
          <li>
            <Link to="/payment">Payment</Link>
          </li>
          <li>
            <Link to="/payment-success">Payment Success</Link>
          </li>
        </ul>
      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  min-height: 300vh;
`;
export default Home;
