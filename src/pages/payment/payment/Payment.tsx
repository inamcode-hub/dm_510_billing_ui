import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavigatePages from '../components/NavigatePages';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { setShowPackage } from '../../../lib/redux/features/payment/paymentSlice';
import AmountCalculator from './components/AmountCalculator';
import StripeElement from './components/StripeElement';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const Payment: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showPayment, showProfile, country } = useSelector(
    (state: any) => state.payment
  );

  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    if (!showPayment && !showProfile) {
      navigate('/package');
      return;
    }
    if (!showPayment) {
      navigate('/profile');
    }

    const getStripeKey = () => {
      const isCanada = country === 'CA';
      // vite project env
      const key = import.meta.env.VITE_STRIPE_KEY;
      return isCanada ? key : import.meta.env.VITE_STRIPE_KEY_US;
    };

    const stripeKey = getStripeKey();
    console.log('stripeKey', stripeKey);
    setStripePromise(loadStripe(stripeKey));
  }, [showPayment, showProfile, navigate]);

  const handleBack = () => {
    dispatch(setShowPackage());
  };

  return (
    <React.Fragment>
      <div>
        <NavigatePages />
        <Card
          variant="outlined"
          sx={{
            width: '90%',
            margin: 'auto',
            marginTop: '50px',
            padding: '20px',
            maxWidth: '600px',
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2">
              Payment page
            </Typography>
            {/* ===========Amount calculator=========== */}
            <AmountCalculator />
            {/* ===========Stripe Element============ */}
            {stripePromise && (
              <Elements stripe={stripePromise}>
                <StripeElement />
              </Elements>
            )}
          </CardContent>
          <CardActions>
            <Button
              type="button"
              variant="contained"
              color="primary"
              sx={{ marginLeft: 'auto' }}
              onClick={handleBack}
            >
              Previous
            </Button>
          </CardActions>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Payment;
