import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavigatePages from '../components/NavigatePages';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import {
  setShowPayment,
  setShowProfile,
} from '../../../lib/redux/features/payment/paymentSlice';

const initialState = {
  input: '',
};

const Package: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showPackage } = useSelector((state: any) => state.payment);

  const [state, setState] = useState(initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.input.trim() === '') {
      alert('Please enter your name');
    } else {
      // console.log('Form submitted with name:', state.input);
      dispatch(setShowPayment());
    }
  };
  const handleBack = () => {
    dispatch(setShowProfile());
  };
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
                Package
              </Typography>
              <TextField
                id="input"
                name="input"
                label="Name"
                placeholder="Enter your name"
                fullWidth
                margin="normal"
                value={state.input}
                onChange={onChange}
                variant="outlined"
                required
              />
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

export default Package;
