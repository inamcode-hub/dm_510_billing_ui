import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, FormikHelpers } from 'formik'; // Import FormikHelpers
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  styled,
} from '@mui/material';
import NavigatePages from '../components/NavigatePages';
import {
  setShowProfile,
  updateState,
} from '../../../lib/redux/features/payment/paymentSlice';
import * as Yup from 'yup';

// TypeScript definitions
type FormValues = {
  packageName: string;
  packagePrice: number;
  packageSerialNumber: never[];
};

// Form validation schema
const validationSchema = Yup.object({
  packageName: Yup.string().required('Package name is required'),
  packagePrice: Yup.number().required('Package price is required'),
  packageSerialNumber: Yup.array()
    .of(Yup.number())
    .min(1, 'At least one serial number is required')
    .required('Serial number(s) are required'),
});

const Package: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showPackage } = useSelector((state: any) => state.payment);

  const handleChange = (key: keyof FormValues, value: any) => {
    dispatch(updateState({ key, value }));
  };

  const handleSubmit = (
    _values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    console.log('values', _values);
    dispatch(setShowProfile());
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (!showPackage) {
      navigate('/profile');
    }
  }, [showPackage, navigate]);
  return (
    <Wrapper>
      <NavigatePages />
      <CardWrapper variant="outlined">
        <Formik
          initialValues={{
            packageName: '',
            packagePrice: 0,
            packageSerialNumber: [],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched, isSubmitting }) => (
            <Form>
              <CardContent>
                <Typography variant="h5">Package Details</Typography>
                <TextField
                  fullWidth
                  id="packageName"
                  name="packageName"
                  label="Package Name"
                  placeholder="Enter package name"
                  margin="normal"
                  variant="outlined"
                  value={values.packageName}
                  onChange={(e) => {
                    setFieldValue('packageName', e.target.value);
                    handleChange('packageName', e.target.value);
                  }}
                  error={touched.packageName && Boolean(errors.packageName)}
                  helperText={touched.packageName && errors.packageName}
                />
                <TextField
                  fullWidth
                  id="packagePrice"
                  name="packagePrice"
                  label="Package Price"
                  type="number"
                  placeholder="Enter package price"
                  margin="normal"
                  variant="outlined"
                  value={values.packagePrice}
                  onChange={(e) => {
                    setFieldValue('packagePrice', parseFloat(e.target.value));
                    handleChange('packagePrice', parseFloat(e.target.value));
                  }}
                  error={touched.packagePrice && Boolean(errors.packagePrice)}
                  helperText={touched.packagePrice && errors.packagePrice}
                />
                <TextField
                  fullWidth
                  id="packageSerialNumber"
                  name="packageSerialNumber"
                  label="Serial Number"
                  placeholder="Enter serial numbers separated by commas"
                  margin="normal"
                  variant="outlined"
                  value={values.packageSerialNumber.join(', ')}
                  onChange={(e) => {
                    const nums = e.target.value
                      .split(',')
                      .map((num) => parseInt(num.trim(), 10));
                    setFieldValue('packageSerialNumber', nums);
                    handleChange('packageSerialNumber', nums);
                  }}
                  error={
                    touched.packageSerialNumber &&
                    Boolean(errors.packageSerialNumber)
                  }
                  helperText={
                    touched.packageSerialNumber && errors.packageSerialNumber
                  }
                />
              </CardContent>
              <CardActions>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Next
                </Button>
              </CardActions>
            </Form>
          )}
        </Formik>
      </CardWrapper>
    </Wrapper>
  );
};

const Wrapper = styled('div')({
  minHeight: '150vh',
});

const CardWrapper = styled(Card)({
  overflow: 'visible',
  width: '90%',
  margin: 'auto',
  marginTop: '50px',
  padding: '20px',
});

export default Package;
