// Import necessary modules
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      {children}
    </ReduxProvider>
  );
};

export default Provider;