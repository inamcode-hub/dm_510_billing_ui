import React from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

const ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const StripeElement: React.FC = () => {
  const { payment } = useSelector((state: any) => state);

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log('Stripe has not fully loaded yet.');
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement!,
    });

    if (!error) {
      const { id } = paymentMethod;
      try {
        setLoading(true);
        const response = await fetch(
          import.meta.env.VITE_API_URL + '/payment',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentMethodId: id, payment }),
          }
        );

        const responseData = await response.json();
        if (response.ok) {
          console.log('Payment successful:', responseData.message);
        } else {
          console.error('Payment error:', responseData.message);
        }
        setLoading(false);
      } catch (error) {
        console.error('Payment error:', error);
        setLoading(false);
      }
    } else {
      console.error('Stripe error:', error);
    }
  };

  return (
    <Wrapper>
      <StyledForm onSubmit={handleSubmit}>
        <Label>
          Card Number
          <CardNumberElement className="element" options={ELEMENT_OPTIONS} />
        </Label>
        <div className="expiry-cvv">
          <Label>
            Expiry Date
            <CardExpiryElement className="element" options={ELEMENT_OPTIONS} />
          </Label>
          <Label>
            CVC / CVV
            <CardCvcElement className="element" options={ELEMENT_OPTIONS} />
          </Label>
        </div>
        <PayButton
          type="submit"
          variant="contained"
          disabled={!stripe || loading}
        >
          {loading ? 'Please wait...' : 'Pay Now'}
        </PayButton>
      </StyledForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;

  .element {
    width: 100%;
    padding: 10px 14px;
    margin: 10px 0;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    background-color: #f9f9f9;
    min-width: 130px;
  }

  .expiry-cvv {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
`;

const PayButton = styled(Button)``;

export default StripeElement;
