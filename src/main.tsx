import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesConfig from './RoutesConfig';
import Provider from './lib/redux/Provider.tsx';
import { ThemeProvider } from '@emotion/react';
import { GlobalStyles } from '@mui/system';
import theme from './lib/styles/theme.ts';
import { globalStyles } from './lib/styles/GlobalStyles.js';
import './lib/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={globalStyles} /> {/* Use global styles */}
        <Router>
          <RoutesConfig />
        </Router>
      </ThemeProvider>
    </Provider>
    <ToastContainer />
  </React.StrictMode>
);
