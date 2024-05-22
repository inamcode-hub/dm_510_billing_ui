import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavigatePages from '../components/NavigatePages';

import {
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
} from '@mui/material';
import { setShowPackage } from '../../../lib/redux/features/payment/paymentSlice';
import { useNavigate } from 'react-router-dom';

const initialState = {
  input: '',
};

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showProfile } = useSelector((state: any) => state.payment);

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
      dispatch(setShowPackage());
    }
  };

  useEffect(() => {
    if (!showProfile) {
      navigate('/package');
    }
  }, [showProfile]);

  return (
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
              Profile
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
  );
};

export default Profile;
