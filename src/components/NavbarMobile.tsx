import React, { useState } from 'react';
import { styled } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';

// Create a custom dropdown menu container
const DropdownMenuContainer = styled('div')(({ theme, open }) => ({
  position: 'absolute',
  top: '50px', // Height of the AppBar
  left: 0,
  width: '100%',
  zIndex: 1300,
  overflow: 'hidden',
  maxHeight: open ? '260px' : '0', // Max height when open, 0 when closed
  transition: 'max-height 0.3s ease-in-out', // Smooth transition animation
 backgroundColor: '#222222',
 color: '#9d9d9d',
fontSize: '14px',
}));

const MenuItem = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickAway = () => {
    setDropdownOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }} 
     
    >
      {/* Custom Navbar */}
      <AppBar position="fixed" 
        sx={{  backgroundColor: '#222222', height:'50px' ,
        boxShadow: 0, 
         }}
      >
        <Toolbar  sx={{
            padding: '0 0px', // Adjust padding as needed
            // large screens
            '@media (min-width: 600px)': {
              padding: '0 16px', // Adjust padding as needed
            },
          }}>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 , color: '#9d9d9d', fontSize: "18px", padding:'15px 15px', lineHeight:'20px',

        // large screens
        '@media (min-width: 600px)': {
            padding: '0px', // Adjust padding as needed
            },
            
           }}>
            DM Mobile
          </Typography>
          <Hidden lgUp>
            <IconButton color="inherit" aria-label="open drawer" onClick={toggleDropdown}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>

      {/* Mobile Dropdown Menu */}
      <DropdownMenuContainer open={dropdownOpen} onClick={handleClickAway} 
             >
        <MenuItem>Dashboard</MenuItem>
        <MenuItem>Charts</MenuItem>
        <MenuItem>History</MenuItem>
        <MenuItem>Preferences</MenuItem>
        <MenuItem>Log Out</MenuItem>
      </DropdownMenuContainer>

      {/* Desktop Sidebar */}
      <Hidden lgDown >
        <Box
          sx={{
            width: 225,
            position: 'fixed',
            top: '50px',
            left: 0,
            height: 'calc(100% - 50px)',
            zIndex: 1200,
            boxShadow: 2,
            backgroundColor: '#222222',
            color: '#9d9d9d',
            fontSize: '14px',
            

          }}
        >
          <MenuItem>Dashboard</MenuItem>
          <MenuItem>Charts</MenuItem>
          <MenuItem>History</MenuItem>
          <MenuItem>Preferences</MenuItem>
          <MenuItem>Log Out</MenuItem>
        </Box>
      </Hidden>
    </Box>
  );
};

export default Navbar;
