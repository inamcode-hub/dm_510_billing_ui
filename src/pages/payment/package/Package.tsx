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
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  styled,
} from '@mui/material';
import NavigatePages from '../components/NavigatePages';
import {
  setShowProfile,
  updateState,
} from '../../../lib/redux/features/payment/paymentSlice';
import * as Yup from 'yup';

// Define the FormValues interface
interface FormValues {
  packageName: 'SingleDryermaster' | 'MultipleDryermaster';
  packagePrice: number;
  packageSerialNumber: number[];
}

// Define the validation schema
const validationSchema = Yup.object({
  packageName: Yup.string()
    .oneOf(['SingleDryermaster', 'MultipleDryermaster'], 'Invalid package type')
    .required('Package type is required'),
  packagePrice: Yup.number().required('Package price is required'),
  packageSerialNumber: Yup.array()
    .of(Yup.number())
    .min(1, 'At least one serial number is required')
    .required('Serial number(s) are required'),
});

const Package: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showPackage, packageName, packagePrice, packageSerialNumber } =
    useSelector((state: any) => state.payment);

  // Custom handleChange function
  const handleChange = (key: keyof FormValues, value: any) => {
    console.log('Updating state', key, value);
    dispatch(updateState({ key, value }));
  };

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    console.log('Submitting form', values);
    dispatch(setShowProfile());
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (!showPackage) {
      navigate('/profile');
    }
  }, [showPackage, navigate]);

  // price is calculated by package type and country code for conversion
  useEffect(() => {
    console.log('Package name changed', packageName);
    if (packageName === 'SingleDryermaster') {
      handleChange('packagePrice', 100);
    } else if (packageName === 'MultipleDryermaster') {
      handleChange('packagePrice', 200);
    }
  }, [packageName, handleChange]);
  return (
    <Wrapper>
      <NavigatePages />
      <CardWrapper variant="outlined">
        <Formik
          initialValues={{
            packageName: packageName || 'SingleDryermaster',
            packagePrice: packagePrice || 0,
            packageSerialNumber: packageSerialNumber || [],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched, isSubmitting }) => (
            <Form>
              <CardContent>
                <Typography variant="h5">Package Details</Typography>
                <FormControl fullWidth margin="normal">
                  <InputLabel
                    id="package-name-label"
                    sx={{
                      backgroundColor: 'white',
                      padding: '0px 5px',
                    }}
                  >
                    Package Name
                  </InputLabel>
                  <Field
                    as={Select}
                    name="packageName"
                    labelId="package-name-label"
                    id="packageName"
                    value={values.packageName}
                    onChange={(
                      e: React.ChangeEvent<{ name?: string; value: unknown }>
                    ) => {
                      const { name, value } = e.target;
                      setFieldValue(name as keyof FormValues, value);
                      handleChange(name as keyof FormValues, value);
                    }}
                    onBlur={() =>
                      handleChange('packageName', values.packageName)
                    }
                    error={touched.packageName && Boolean(errors.packageName)}
                  >
                    <MenuItem value="SingleDryermaster">
                      Single Dryermaster
                    </MenuItem>
                    <MenuItem value="MultipleDryermaster">
                      Multiple Dryermaster
                    </MenuItem>
                  </Field>
                  <FormHelperText>
                    {touched.packageName && errors.packageName
                      ? errors.packageName
                      : ''}
                  </FormHelperText>
                </FormControl>
                <Field
                  as={TextField}
                  fullWidth
                  id="packagePrice"
                  name="packagePrice"
                  label="Package Price"
                  type="number"
                  placeholder="Enter package price"
                  margin="normal"
                  variant="outlined"
                  disabled
                  value={values.packagePrice}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { name, value } = e.target;
                    setFieldValue(name as keyof FormValues, value);
                    handleChange(name as keyof FormValues, parseFloat(value));
                  }}
                  onBlur={() =>
                    handleChange('packagePrice', values.packagePrice)
                  }
                  error={touched.packagePrice && Boolean(errors.packagePrice)}
                  helperText={touched.packagePrice && errors.packagePrice}
                />
                <Field
                  as={TextField}
                  fullWidth
                  id="packageSerialNumber"
                  name="packageSerialNumber"
                  label="Serial Number"
                  placeholder="Enter serial numbers separated by commas"
                  margin="normal"
                  variant="outlined"
                  value={values.packageSerialNumber.join(', ')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const nums = e.target.value
                      .split(',')
                      .map((num) => parseInt(num.trim(), 10));
                    setFieldValue('packageSerialNumber', nums);
                    handleChange('packageSerialNumber', nums);
                  }}
                  onBlur={() =>
                    handleChange(
                      'packageSerialNumber',
                      values.packageSerialNumber
                    )
                  }
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
