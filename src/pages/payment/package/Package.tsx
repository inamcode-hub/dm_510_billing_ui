import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Package: React.FC = () => {
  const { showPackage } = useSelector((state: any) => state.payment);
  const navigate = useNavigate();
  useEffect(() => {
    // if showPackage page is true show the package otherwise redirect to the payment
    if (!showPackage) {
      navigate('/payment');
    }
  }, [showPackage]);
  return (
    <React.Fragment>
      <div>
        <h1>Package page</h1>
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
      </div>
    </React.Fragment>
  );
};

export default Package;
