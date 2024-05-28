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
  const { showPackage, packageName, country, province } = useSelector(
    (state: any) => state.payment
  );

  // Define package prices based on country and package type
  const packagePrices = {
    US: {
      SingleDryermaster: 99,
      MultipleDryermaster: 119,
    },
    CA: {
      SingleDryermaster: 134,
      MultipleDryermaster: 164,
    },
    default: {
      SingleDryermaster: 99,
      MultipleDryermaster: 119,
    },
  };

  // Function to get the currency based on the country
  const getCurrency = (country: string) => {
    switch (country) {
      case 'US':
        return 'USD';
      case 'CA':
        return 'CAD';
      default:
        return 'USD';
    }
  };

  // Custom handleChange function
  const handleChange = (key: keyof FormValues, value: any) => {
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

  return (
    <Wrapper>
      <NavigatePages />
      <CardWrapper variant="outlined">
        <Formik
          initialValues={{
            packageName: packageName || 'SingleDryermaster',
            packagePrice:
              packagePrices[country || 'default'][
                packageName || 'SingleDryermaster'
              ],
            packageSerialNumber: [],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched, isSubmitting }) => {
            // Update package price based on packageName and country
            const price = (packagePrices[country] || packagePrices.default)[
              values.packageName
            ];

            // Update currency based on country
            const currency = getCurrency(country);

            return (
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
                        // Update package price in Formik state
                        setFieldValue(
                          'packagePrice',
                          (packagePrices[country] || packagePrices.default)[
                            value as string
                          ]
                        );
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

                  {/* Display Country and Currency */}
                  <Typography variant="h6">Country: {country}</Typography>
                  <Typography variant="h6">Currency: {currency}</Typography>

                  {/* Display Package Price */}
                  <Typography variant="h6">
                    Package Price: {price} {currency}
                  </Typography>

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
  overflow: 'visible',
  width: '90%',
  margin: 'auto',
  marginTop: '50px',
  padding: '20px',
});

export default Package;
