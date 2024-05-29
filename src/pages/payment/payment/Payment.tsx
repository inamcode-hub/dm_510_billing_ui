import React, { useEffect } from 'react';
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

const Payment: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showPayment, showProfile } = useSelector(
    (state: any) => state.payment
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleBack = () => {
    dispatch(setShowPackage());
  };

  useEffect(() => {
    if (!showPayment && !showProfile) {
      return navigate('/package');
    }
    if (!showPayment) {
      navigate('/profile');
    }
  }, [showPayment]);
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
          }}
        >
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Payment page
              </Typography>
              {/* ===========Amount calculator=========== */}
              <AmountCalculator />
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginLeft: 'auto' }}
              >
                Next
              </Button>
            </CardActions>
          </form>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Payment;
