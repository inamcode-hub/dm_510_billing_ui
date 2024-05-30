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
import styled from '@emotion/styled';

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
      <Box sx={{ alignItems: 'center', display: 'flex' }}>
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
          <ListWrapper>
            <li>
              The Dryer Master <strong>username</strong> is the same as the
              Dryer Master serial number.
            </li>
          </ListWrapper>
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

const ListWrapper = styled('ul')`
  margin-top: -0.5rem;
  li {
    padding: 0.3rem;
    margin: 0rem 1.2rem;
  }
`;
export default SerialNumberHelp;
