import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
} from '@mui/material';
import NavigatePages from '../components/NavigatePages';
import { setShowPackage } from '../../../lib/redux/features/payment/paymentSlice';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
});

interface InitialState {
  email: string;
  phone: string;
}
const initialState = {
  email: '',
  phone: '',
};

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { payment } = useSelector((state: any) => state);
  const { showProfile } = payment;

  const handleSubmit = (values: InitialState, actions: any) => {
    console.log(
      '🚀 ~ file: Profile.tsx ~ line 98 ~ handleSubmit ~ values',
      values
    );
    dispatch(setShowPackage());
    actions.setSubmitting(false);
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
        <Formik
          initialValues={initialState as InitialState}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => {
            return (
              <Form>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Profile
                  </Typography>
                  <Field
                    as={TextField}
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    helperText={<ErrorMessage name="email" />}
                    placeholder="Enter your email"
                    margin="normal"
                    variant="outlined"
                    error={touched.email && Boolean(errors.email)}
                    required
                  />

                  <Field
                    as={TextField}
                    fullWidth
                    id="phone"
                    name="phone"
                    label="Phone"
                    helperText={<ErrorMessage name="phone" />}
                    placeholder="Enter your phone number"
                    margin="normal"
                    variant="outlined"
                    error={touched.phone && Boolean(errors.phone)}
                    required
                  />
                </CardContent>
                <CardActions>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginLeft: 'auto' }}
                    disabled={isSubmitting}
                  >
                    Next
                  </Button>
                </CardActions>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </div>
  );
};

export default Profile;
