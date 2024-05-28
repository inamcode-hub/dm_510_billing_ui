import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, FormikHelpers } from 'formik';
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
  Chip,
  Box,
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
  country: string;
}

// Define the validation schema
const validationSchema = Yup.object({
  packageName: Yup.string()
    .oneOf(['SingleDryermaster', 'MultipleDryermaster'], 'Invalid package type')
    .required('Package type is required'),
  packagePrice: Yup.number().required('Package price is required'),
  packageSerialNumber: Yup.array()
    .of(
      Yup.number()
        .min(100, 'Serial number must be at least 3 digits')
        .max(9999999999, 'Serial number must be at most 10 digits')
    )
    .min(1, 'At least one serial number is required')
    .required('Serial number(s) are required'),
  country: Yup.string().required('Country is required'),
});

const packagePrices: Record<string, Record<string, number>> = {
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

const Package: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showPackage, packageName, country } = useSelector(
    (state: any) => state.payment
  );

  const [newSerialNumber, setNewSerialNumber] = useState('');
  const [serialNumberError, setSerialNumberError] = useState('');

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

  const handleDelete = (
    serialNumber: number,
    values: FormValues,
    setFieldValue: any
  ) => {
    const updatedSerialNumbers = values.packageSerialNumber.filter(
      (sn) => sn !== serialNumber
    );
    setFieldValue('packageSerialNumber', updatedSerialNumbers);
    handleChange('packageSerialNumber', updatedSerialNumbers);
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
            country: country || 'US',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched, isSubmitting }) => {
            // Update package price based on packageName and country
            const price = (packagePrices[values.country] ||
              packagePrices.default)[values.packageName];

            // Update currency based on country
            const currency = getCurrency(values.country);

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
                          (packagePrices[values.country] ||
                            packagePrices.default)[value as string]
                        );
                        // If changing to SingleDryermaster, keep only the first serial number
                        if (value === 'SingleDryermaster') {
                          const updatedSerialNumbers =
                            values.packageSerialNumber.slice(0, 1);
                          setFieldValue(
                            'packageSerialNumber',
                            updatedSerialNumbers
                          );
                          handleChange(
                            'packageSerialNumber',
                            updatedSerialNumbers
                          );
                        }
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
                    <FormHelperText
                      error={touched.packageName && Boolean(errors.packageName)}
                    >
                      {touched.packageName && errors.packageName
                        ? errors.packageName
                        : ''}
                    </FormHelperText>
                  </FormControl>

                  {/* Display Country and Currency */}

                  {/* Display Package Price */}
                  <Typography variant="h6">
                    Package Price: {price} {currency}
                  </Typography>

                  <Box>
                    <Typography variant="h6">Serial Numbers</Typography>
                    <Box display="flex" alignItems="center">
                      <TextField
                        label="New Serial Number"
                        value={newSerialNumber}
                        onChange={(e) => setNewSerialNumber(e.target.value)}
                        margin="normal"
                        style={{ marginRight: '10px' }}
                        error={Boolean(serialNumberError)}
                        helperText={serialNumberError}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          const newSerial = parseInt(
                            newSerialNumber.trim(),
                            10
                          );
                          if (
                            isNaN(newSerial) ||
                            newSerial < 100 ||
                            newSerial > 9999999999
                          ) {
                            setSerialNumberError(
                              'Serial number must be between 3 and 10 digits'
                            );
                          } else if (
                            values.packageSerialNumber.includes(newSerial)
                          ) {
                            setSerialNumberError(
                              'Duplicate serial number. Please enter a unique serial number.'
                            );
                          } else if (
                            values.packageSerialNumber.length >=
                            (values.packageName === 'SingleDryermaster'
                              ? 1
                              : 10)
                          ) {
                            setSerialNumberError(
                              `Cannot add more than ${
                                values.packageName === 'SingleDryermaster'
                                  ? 1
                                  : 10
                              } serial numbers`
                            );
                          } else {
                            setSerialNumberError('');
                            setFieldValue('packageSerialNumber', [
                              ...values.packageSerialNumber,
                              newSerial,
                            ]);
                            handleChange('packageSerialNumber', [
                              ...values.packageSerialNumber,
                              newSerial,
                            ]);
                            setNewSerialNumber('');
                          }
                        }}
                        disabled={
                          values.packageSerialNumber.length >=
                          (values.packageName === 'SingleDryermaster' ? 1 : 10)
                        }
                      >
                        Add
                      </Button>
                    </Box>
                    <Box mt={2}>
                      {values.packageSerialNumber.map((serialNumber, index) => (
                        <Chip
                          key={index}
                          label={serialNumber}
                          onDelete={() =>
                            handleDelete(serialNumber, values, setFieldValue)
                          }
                          style={{ marginRight: '10px', marginBottom: '10px' }}
                        />
                      ))}
                    </Box>
                    <FormHelperText
                      error={
                        touched.packageSerialNumber &&
                        Boolean(errors.packageSerialNumber)
                      }
                    >
                      {touched.packageSerialNumber && errors.packageSerialNumber
                        ? typeof errors.packageSerialNumber === 'string'
                          ? errors.packageSerialNumber
                          : ''
                        : ''}
                    </FormHelperText>
                  </Box>
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
