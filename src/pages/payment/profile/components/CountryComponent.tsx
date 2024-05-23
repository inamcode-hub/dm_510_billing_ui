import React, { useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import { Country, State, ICountry, IState } from 'country-state-city';
import { useField, useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateState } from '../../../../lib/redux/features/payment/paymentSlice';
import { styled } from '@mui/material';
import { RootState } from '../../../../lib/redux/store';

interface OptionType {
  label: string;
  value: string;
}

const customStyles: StylesConfig<OptionType, false> = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? 'var(--primary)' : provided.borderColor,
    '&:hover': {
      borderColor: state.isFocused ? 'var(--primary)' : provided.borderColor,
    },
    boxShadow: state.isFocused ? `0 0 0 1px var(--primary)` : 'none',
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 1000,
  }),
};

const CountryComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { country, province } = useSelector(
    (state: RootState) => state.payment
  );
  const { setFieldValue, values } = useFormikContext<any>();
  const [_field, meta] = useField('country');
  const [stateOptions, setStateOptions] = useState<OptionType[]>([]);

  const countryOptions: OptionType[] = Country.getAllCountries().map(
    (country: ICountry) => ({
      value: country.isoCode.toLowerCase(), // Normalize values to lowercase
      label: country.name,
    })
  );

  // Function to load state options based on the selected country
  const loadStates = (countryCode: string) => {
    const states = State.getStatesOfCountry(countryCode.toUpperCase()); // API expects uppercase ISO codes
    setStateOptions(
      states.map((state: IState) => ({
        value: state.isoCode.toLowerCase(),
        label: state.name,
      }))
    );
  };

  useEffect(() => {
    // Normalize and set initial values from Redux state
    if (country && values.country.toLowerCase() !== country.toLowerCase()) {
      setFieldValue('country', country.toLowerCase());
      loadStates(country);
    }

    if (province && values.province.toLowerCase() !== province.toLowerCase()) {
      setFieldValue('province', province.toLowerCase());
    }
  }, [country, province, setFieldValue, values.country, values.province]);

  useEffect(() => {
    // Load states when country changes
    if (values.country) {
      loadStates(values.country);
    }
  }, [values.country]);

  return (
    <Wrapper>
      <Select<OptionType>
        id="country"
        options={countryOptions}
        name="country"
        value={
          countryOptions.find(
            (option) => option.value === values.country.toLowerCase()
          ) || null
        }
        onChange={(option: OptionType | null) => {
          const newValue = option ? option.value.toLowerCase() : '';
          setFieldValue('country', newValue);
          dispatch(updateState({ key: 'country', value: newValue }));
          loadStates(newValue);
        }}
        placeholder="Select your country"
        styles={customStyles}
      />
      <Select<OptionType>
        id="province"
        options={stateOptions}
        name="province"
        value={
          stateOptions.find(
            (option) => option.value === values.province.toLowerCase()
          ) || null
        }
        onChange={(option: OptionType | null) => {
          const newValue = option ? option.value.toLowerCase() : '';
          setFieldValue('province', newValue);
          dispatch(updateState({ key: 'province', value: newValue }));
        }}
        placeholder="Select your province"
        isDisabled={!values.country}
        styles={customStyles}
      />
      {meta.touched && meta.error && (
        <div style={{ color: 'red', marginTop: '0.5rem' }}>{meta.error}</div>
      )}
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
