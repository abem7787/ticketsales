// src/components/PaymentForm.js
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Typography } from '@material-ui/core';

const PaymentForm = ({ total, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
    } else {
      // Send paymentMethod.id to your backend
      onSuccess(paymentMethod.id);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">Payment Details</Typography>
      <CardElement />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        disabled={!stripe}
      >
        Pay ${total}
      </Button>
    </form>
  );
};

export default PaymentForm;