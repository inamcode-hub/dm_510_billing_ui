import React, { useState, useEffect } from 'react';
import Select, {
  // @ts-ignore
  OptionsType,
  // @ts-ignore
  OptionTypeBase,
  StylesConfig,
} from 'react-select';
import { Country, State, ICountry, IState } from 'country-state-city';
import { useField, useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateState } from '../../../../lib/redux/features/payment/paymentSlice';
import { styled } from '@mui/material';
import { RootState } from '../../../../lib/redux/store';

interface OptionType extends OptionTypeBase {
  label: string;
  value: string;
}

const CountryComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { country, province } = useSelector(
    (state: RootState) => state.payment
  );
  const { setFieldValue, values } = useFormikContext<any>();
  const [field, meta] = useField('country');
  const [stateOptions, setStateOptions] = useState<OptionsType<OptionType>>([]);

  const countryOptions: OptionsType<OptionType> = Country.getAllCountries().map(
    (country: ICountry) => ({
      value: country.isoCode,
      label: country.name,
    })
  );

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

  useEffect(() => {
    if (values.country) {
      const states = State.getStatesOfCountry(values.country);
      const stateFormattedOptions: OptionsType<OptionType> = states.map(
        (state: IState) => ({
          value: state.isoCode,
          label: state.name,
        })
      );
      setStateOptions(stateFormattedOptions);
    } else {
      setStateOptions([]);
    }
  }, [values.country]);

  useEffect(() => {
    const countryInRedux = countryOptions.find(
      (option: OptionType) => option.value === country?.toUpperCase()
    );
    if (countryInRedux) {
      setFieldValue('country', countryInRedux.value);
    }
  }, []);

  return (
    <Wrapper>
      <Select<OptionType>
        id="country"
        options={countryOptions}
        name="country"
        value={countryOptions.find(
          (option: OptionType) => option.value === field.value
        )}
        onChange={(option: OptionType | null) => {
          setFieldValue('country', option ? option.value : '');
          dispatch(
            updateState({ key: 'country', value: option ? option.value : '' })
          );
        }}
        placeholder="Select your country"
        styles={customStyles}
      />
      {/* ==========province========== */}
      <Select<OptionType>
        id="province"
        options={stateOptions}
        name="province"
        value={
          province
            ? stateOptions.find(
                (option: OptionType) => option.value === province.toUpperCase()
              )
            : stateOptions.find(
                (option: OptionType) => option.value === values.province
              )
        }
        onChange={(option: OptionType | null) => {
          setFieldValue('province', option ? option.value : '');
          dispatch(
            updateState({ key: 'province', value: option ? option.value : '' })
          );
        }}
        placeholder="Select your province"
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
