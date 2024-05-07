// Import necessary modules
import { createTheme } from '@mui/material/styles';

// Define a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#213966',  
    },
    secondary: {
      main: '#58a645', // Material-UI's secondary color
    },
    
  },
  
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Default font family
    h1: {
      fontSize: '6rem', // same as h1 in Material-UI
    },
    
  },
  
  components: {
    // Example: Customize MUI Button component styling
    MuiButton: {
      styleOverrides: {
        root: {
          // borderRadius: 20, // Rounded corners for buttons
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'var(--primary-18)', // Change link color to primary color
          textDecoration: 'none', // Remove underline from links
          fontWeight: 'bold', // Make links bold
         
          '&:hover': {
            textDecoration: 'underline', // Add underline on hover
          },
        }, // Add closing curly brace here
      },
    },
  },
});

export default theme;