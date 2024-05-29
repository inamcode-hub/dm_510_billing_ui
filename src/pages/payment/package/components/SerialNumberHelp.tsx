import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Box,
} from '@mui/material';
import image from '../../../../../public/Dryer_Master_Serial_Number.jpg';

const SerialNumberHelp: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Box sx={{ alignItems: 'center', display: 'flex', mt: 2 }}>
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            marginRight: '8px',
          }}
        >
          Need help finding the serial number?
        </Typography>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={handleClickOpen}
        >
          Click here
        </Button>
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>Find the Serial Number</DialogTitle>
          <DialogContent>
            <Box sx={{ position: 'relative', textAlign: 'center' }}>
              <img
                src={image}
                alt="Dryer Master Serial Number Location"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%', // Adjust the position as needed
                  left: '50%', // Adjust the position as needed
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'rgba(255, 0, 0, 0.5)',
                  color: 'white',
                  padding: '5px',
                  borderRadius: '4px',
                }}
              >
                Serial Number Here
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </React.Fragment>
  );
};

export default SerialNumberHelp;
