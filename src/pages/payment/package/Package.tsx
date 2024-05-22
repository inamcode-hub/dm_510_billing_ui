import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavigatePages from '../components/NavigatePages';

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
        <NavigatePages />
        <h1>Package page</h1>
      </div>
    </React.Fragment>
  );
};

export default Package;
