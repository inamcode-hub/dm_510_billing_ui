import React, { useEffect, useState } from 'react';
import { Country, State, ICountry, IState } from 'country-state-city';
import { useField, useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateState } from '../../../../lib/redux/features/payment/paymentSlice';
import { styled } from '@mui/material';
import { RootState } from '../../../../lib/redux/store';
import CustomSelect from './CustomSelect'; // Import the custom select component

interface OptionType {
  label: string;
  value: string;
}

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
      value: country.isoCode,
      label: country.name,
    })
  );

  // Function to load state options based on the selected country
  const loadStates = (countryCode: string) => {
    const states = State.getStatesOfCountry(countryCode.toUpperCase());
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
      <CustomSelect
        id="country"
        name="country"
        options={countryOptions}
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
        hasError={meta.touched && !!meta.error}
      />
      {meta.touched && meta.error && (
        <div style={{ color: '#d32f2f', marginTop: '0.5rem' }}>
          {meta.error}
        </div>
      )}
      <CustomSelect
        id="province"
        name="province"
        options={stateOptions}
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
        hasError={meta2.touched && !!meta2.error}
      />
      {meta2.touched && meta2.error && (
        <div
          style={{
            color: '#d32f2f',
            marginTop: '0.5rem',
            marginLeft: '0.8rem',
            fontSize: '0.8rem',
          }}
        >
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
