import React from 'react';
import Select from 'react-select';
import { Country } from 'country-state-city';
import { useField, useFormikContext } from 'formik';
import { styled } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateState } from '../../../../lib/redux/features/payment/paymentSlice';

const CountryComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField('country');

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  // Custom styles for react-select dropdown
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: state.isFocused ? 'var(--primary)' : provided.borderColor,
      '&:hover': {
        borderColor: state.isFocused ? 'var(--primary)' : provided.borderColor,
      },
      boxShadow: state.isFocused ? `0 0 0 1px var(--primary)` : 'none',
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 1000,
    }),
  };
  const handleChange = (option: any) => {
    setFieldValue('country', option?.label);
    dispatch(updateState({ key: 'country', value: option?.label }));
  };

  return (
    <Wrapper>
      <Select
        id="country"
        options={countryOptions}
        name="country"
        value={countryOptions.find((option) => option.value === field.value)}
        onChange={(option: any) => handleChange(option)}
        placeholder="Select your country"
        styles={customStyles}
      />
      {meta.touched && meta.error ? (
        <div style={{ color: 'red', marginTop: '0.5rem' }}>{meta.error}</div>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled('div')({
  marginTop: '1rem',
  marginBottom: '.5rem',
  div: {
    marginTop: '0.3rem',
    marginBottom: '0.3rem',
  },
});

export default CountryComponent;
