import React from 'react';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const redirectToDashboard = () => {
    navigate('/');
  };

  return (
    <Container>
      <Content>
        <CheckCircleIcon sx={{ fontSize: 60, color: 'green' }} />
        <Header>Payment Successful!</Header>
        <Message>
          Thank you for your payment. Your transaction has been completed
          successfully.
        </Message>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={redirectToDashboard}
        >
          Go to Dashboard
        </Button>
      </Content>
    </Container>
  );
};
const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'calc(100vh - 80px)',
  backgroundColor: '#f3f4f6',
});
const Content = styled('div')({
  textAlign: 'center',
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  maxWidth: '400px',
  width: '100%',
});

const Header = styled('h1')({
  color: '#4CAF50', // A green color to signify success
  marginTop: '20px',
});

const Message = styled('p')({
  fontSize: '16px',
  color: '#333333',
  marginBottom: '20px',
  marginTop: '20px',
});

export default PaymentSuccess;
