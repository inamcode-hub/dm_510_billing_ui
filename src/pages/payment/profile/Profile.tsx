import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  styled,
} from '@mui/material';
import NavigatePages from '../components/NavigatePages';
import {
  setShowPackage,
  updateState,
} from '../../../lib/redux/features/payment/paymentSlice';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import * as Yup from 'yup';
import CountryComponent from './components/CountryComponent';

// Type script definitions
interface FormValues {
  email: string;
  phone: string;
  apartment?: string;
  building?: string;
  street?: string;
  city?: string;
  province?: string;
  country?: string;
  postalCode?: string;
}
type FormValueKey = keyof FormValues;

// Form validation schema

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string()
    .required('Required')
    .test('isValidPhoneNumber', 'Phone number is not valid', (value) => {
      if (!value) return false;
      try {
        const phoneNumber = parsePhoneNumberFromString(value);
        if (!phoneNumber || !phoneNumber.isValid()) {
          return false;
        }
        return true;
      } catch {
        return false;
      }
    }),
  country: Yup.string().required('Country is required'),
});

// Profile component

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { payment } = useSelector((state: any) => state);
  const {
    showProfile,
    email,
    phone,
    apartment,
    building,
    street,
    city,
    province,
    country,
    postalCode,
  } = payment;

  // Handle change function

  const handleChange = (key: FormValueKey, value: any) => {
    dispatch(updateState({ key, value }));
  };

  // handle submit function

  const handleSubmit = (
    _values: { email: string; phone: string },
    actions: FormikHelpers<{ email: string; phone: string }>
  ) => {
    dispatch(setShowPackage());
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (!showProfile) {
      navigate('/package');
    }
  }, [showProfile]);
  return (
    <Wrapper>
      <NavigatePages />
      <CardWrapper
        variant="outlined"
        sx={{
          width: '90%',
          margin: 'auto',
          marginTop: '50px',
          padding: '20px',
        }}
      >
        <Formik
          initialValues={{
            email,
            phone,
            apartment,
            building,
            street,
            city,
            province,
            country,
            postalCode,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            setFieldValue,
            values,
            errors,
            touched,
            isSubmitting,
            // isValid,
          }) => {
            return (
              <Form>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Profile
                  </Typography>
                  {/*  ============Email========== */}
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
                    // required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('email', e.target.value);
                      handleChange('email', e.target.value);
                    }}
                  />
                  {/*  ============Phone========== */}
                  <FormControl
                    fullWidth
                    error={touched.phone && Boolean(errors.phone)}
                  >
                    <PhoneInputWrapper
                      international
                      defaultCountry="US"
                      // @ts-ignore
                      value={values.phone}
                      onChange={(value) => {
                        setFieldValue('phone', value);
                        handleChange('phone', value);
                      }}
                      style={{ width: '100%' }} // Ensures full width
                    />
                    <FormHelperText>
                      {touched.phone && errors.phone
                        ? errors.phone
                        : 'Enter your phone number in international format (e.g., +12345678900)'}
                    </FormHelperText>
                  </FormControl>

                  {/*  ============Apartment========== */}
                  <Field
                    as={TextField}
                    fullWidth
                    id="apartment"
                    name="apartment"
                    label="Apartment"
                    placeholder="Enter your apartment"
                    margin="normal"
                    variant="outlined"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('apartment', e.target.value);
                      handleChange('apartment', e.target.value);
                    }}
                  />
                  {/*  ============Building========== */}
                  <Field
                    as={TextField}
                    fullWidth
                    id="building"
                    name="building"
                    label="Building"
                    placeholder="Enter your building"
                    margin="normal"
                    variant="outlined"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('building', e.target.value);
                      handleChange('building', e.target.value);
                    }}
                  />
                  {/*  ============Street========== */}
                  <Field
                    as={TextField}
                    fullWidth
                    id="street"
                    name="street"
                    label="Street"
                    placeholder="Enter your street"
                    margin="normal"
                    variant="outlined"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('street', e.target.value);
                      handleChange('street', e.target.value);
                    }}
                  />
                  {/*  ============City========== */}
                  <Field
                    as={TextField}
                    fullWidth
                    id="city"
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                    margin="normal"
                    variant="outlined"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('city', e.target.value);
                      handleChange('city', e.target.value);
                    }}
                  />
                  {/*  ============Province========== */}
                  <Field
                    as={TextField}
                    fullWidth
                    id="province"
                    name="province"
                    label="Province"
                    placeholder="Enter your province"
                    margin="normal"
                    variant="outlined"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('province', e.target.value);
                      handleChange('province', e.target.value);
                    }}
                  />
                  {/*  ============Country========== */}
                  <CountryComponent />
                  {/*  ============Postal Code========== */}
                  <Field
                    as={TextField}
                    fullWidth
                    id="postalCode"
                    name="postalCode"
                    label="Postal Code"
                    placeholder="Enter your postal code"
                    margin="normal"
                    variant="outlined"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('postalCode', e.target.value);
                      handleChange('postalCode', e.target.value);
                    }}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginLeft: 'auto' }}
                    // disabled={isSubmitting || !isValid}
                    disabled={isSubmitting}
                  >
                    Next
                  </Button>
                </CardActions>
              </Form>
            );
          }}
        </Formik>
      </CardWrapper>
    </Wrapper>
  );
};

const Wrapper = styled('div')({
  minHeight: '150vh',
});

const CardWrapper = styled(Card)({
  overflow: 'visible', // This allows dropdowns to overlap the card boundaries
  width: '90%',
  margin: 'auto',
  marginTop: '50px',
  padding: '20px',
});

const PhoneInputWrapper = styled(PhoneInput)({
  width: '100%',
  border: '1px solid #ccc',
  borderRadius: '4px',
  paddingLeft: '10px',
  input: {
    width: '100%',
    padding: '16.5px 14px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    // on focus
    '&:focus': {
      outline: 'none',
    },
  },
});

export default Profile;
