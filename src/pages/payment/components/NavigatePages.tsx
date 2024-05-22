import { styled } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const NavigatePages: React.FC = () => {
  return (
    <React.Fragment>
      <Wrapper>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
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

const Wrapper = styled('div')`
  ul {
    display: flex;
    justify-content: center;
    list-style-type: none;
    padding: 0;
    margin: 0;
    li {
      margin: 0 10px;
    }
  }
`;

export default NavigatePages;
