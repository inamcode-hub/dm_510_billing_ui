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
  const [_field2, meta2] = useField('province');
  const [stateOptions, setStateOptions] = useState<OptionType[]>([]);

  const countryOptions: OptionType[] = Country.getAllCountries().map(
    (country: ICountry) => ({
      value: country.isoCode, // Normalize values to lowercase
      label: country.name,
    })
  );

  // Function to load state options based on the selected country
  const loadStates = (countryCode: string) => {
    const states = State.getStatesOfCountry(countryCode.toUpperCase()); // API expects uppercase ISO codes
    setStateOptions(
      states.map((state: IState) => ({
        value: state.isoCode,
        label: state.name,
      }))
    );
  };

  useEffect(() => {
    // Normalize and set initial values from Redux state
    if (country && values.country !== country) {
      setFieldValue('country', country);
      loadStates(country);
    }

    if (province && values.province !== province) {
      setFieldValue('province', province);
    }
  }, [country, province, setFieldValue, values.country, values.province]);

  useEffect(() => {
    // Load states when country changes
    if (values.country) {
      loadStates(values.country);
    }
  }, [values.country]);

  useEffect(() => {
    if (values.country && values.province) {
      const states = State.getStatesOfCountry(values.country.toUpperCase());
      const state = states.find(
        (state: IState) => state.isoCode === values.province
      );
      if (!state) {
        setFieldValue('province', '');
        dispatch(updateState({ key: 'province', value: '' }));
      }
    }
  }, [values.province, values.country, country, setFieldValue, dispatch]);
  return (
    <Wrapper>
      <Select<OptionType>
        id="country"
        options={countryOptions}
        name="country"
        value={
          countryOptions.find((option) => option.value === values.country) ||
          null
        }
        onChange={(option: OptionType | null) => {
          const newValue = option ? option.value : '';
          setFieldValue('country', newValue);
          dispatch(updateState({ key: 'country', value: newValue }));
          loadStates(newValue);
        }}
        placeholder="Select your country"
        styles={customStyles}
      />
      {meta.touched && meta.error && (
        <div style={{ color: '#d32f2f', marginTop: '0.5rem' }}>
          {meta.error}
        </div>
      )}
      <Select<OptionType>
        id="province"
        options={stateOptions}
        name="province"
        value={
          stateOptions.find((option) => option.value === values.province) ||
          null
        }
        onChange={(option: OptionType | null) => {
          const newValue = option ? option.value : '';
          setFieldValue('province', newValue);
          dispatch(updateState({ key: 'province', value: newValue }));
        }}
        placeholder="Select your province"
        isDisabled={!values.country}
        styles={customStyles}
      />
      {meta2.touched && meta2.error && (
        <div style={{ color: '#d32f2f', marginTop: '0.5rem' }}>
          {meta2.error}
        </div>
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
  // id province margin top
  '#province': {
    marginTop: '1.5rem',
  },
});

export default CountryComponent;
