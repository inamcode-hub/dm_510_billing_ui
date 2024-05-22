import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Payment: React.FC = () => {
  const { showPayment } = useSelector((state: any) => state.payment);
  const navigate = useNavigate();

  useEffect(() => {
    // if showPayment page is true show the payment otherwise redirect to the package
    if (!showPayment) {
      navigate('/profile');
    }
  }, [showPayment]);
  return (
    <React.Fragment>
      <div>
        <h1>Payment page</h1>
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

export default Payment;
