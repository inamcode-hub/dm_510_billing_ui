import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesConfig from './RoutesConfig';
import Provider from './lib/redux/Provider.tsx'
import { ThemeProvider } from '@emotion/react'
import theme from './lib/styles/theme.ts'
import { GlobalStyles } from '@mui/system'
import { globalStyles } from './lib/styles/GlobalStyles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <ThemeProvider theme={theme}>
      <GlobalStyles styles={globalStyles} />  {/* Use global styles */}
      <Router>
          <RoutesConfig />
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
