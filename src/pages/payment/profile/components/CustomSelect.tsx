import React from 'react';
import Select, { Props as SelectProps, StylesConfig } from 'react-select';

interface OptionType {
  label: string;
  value: string;
}

interface CustomSelectProps extends SelectProps<OptionType, false> {
  hasError?: boolean;
}

const customStyles: StylesConfig<OptionType, false> = {
  control: (provided, state) => ({
    ...provided,
    borderColor: (state.selectProps as CustomSelectProps).hasError
      ? '#d32f2f'
      : provided.borderColor,
    '&:hover': {
      borderColor: (state.selectProps as CustomSelectProps).hasError
        ? '#d32f2f'
        : provided.borderColor,
    },
    boxShadow: state.isFocused
      ? (state.selectProps as CustomSelectProps).hasError
        ? '0 0 0 1px #d32f2f'
        : `0 0 0 1px var(--primary)`
      : 'none',
    fontSize: '16px',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: (state.selectProps as CustomSelectProps).hasError
      ? '#d32f2f'
      : provided.color,
    fontSize: '16px',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: (state.selectProps as CustomSelectProps).hasError
      ? '#d32f2f'
      : provided.color,
    fontSize: '16px',
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 1000,
  }),
};

const CustomSelect: React.FC<CustomSelectProps> = (props) => {
  return <Select {...props} styles={customStyles} />;
};

export default CustomSelect;
