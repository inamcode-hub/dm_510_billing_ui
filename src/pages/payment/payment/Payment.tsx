import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavigatePages from '../components/NavigatePages';

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
        <NavigatePages />
        <h1>Payment page</h1>
      </div>
    </React.Fragment>
  );
};

export default Payment;
