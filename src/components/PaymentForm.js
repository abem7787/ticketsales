import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Box, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';  // Import the QRCode library

const PaymentForm = ({ total, eventId, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    password: '',  // Added password field
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (paymentMethod === 'card') {
      if (!stripe || !elements) return;

      const { error, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          name: `${formData.firstName} ${formData.lastName}`,
          address: {
            line1: formData.address,
            city: formData.city,
          },
        },
      });

      if (error) {
        console.error(error);
      } else {
        onSuccess(stripePaymentMethod.id);
        navigate(`/purchase/${eventId}`, {
          state: {
            customerName: `${formData.firstName} ${formData.lastName}`,
            eventId,
            total,
          },
        });
      }
    } else if (paymentMethod === 'crypto') {
      window.location.href = 'https://www.coinbase.com/checkout/xyz';  // Replace with actual crypto checkout URL
    }
  };

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // Combine the first name, last name, and password for QR code generation
  const qrCodeData = `${formData.firstName} ${formData.lastName} - ${formData.password}`;

  return (
    <div className="payment-form-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px', flexDirection: 'column' }}>
      <form onSubmit={handleSubmit} className="payment-form" style={{ width: '100%', maxWidth: '1200px', padding: '20px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <Typography variant="h3" gutterBottom style={{ fontWeight: 700, fontFamily: 'sans-serif', color: '#3f51b5' }}>
          Tickets
        </Typography>

        {/* Payment Method Selection */}
        <FormControl component="fieldset" fullWidth style={{ marginBottom: '20px' }}>
          <RadioGroup row value={paymentMethod} onChange={handleChange}>
            <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
            <FormControlLabel value="crypto" control={<Radio />} label="Cryptocurrency" />
          </RadioGroup>
        </FormControl>

        {/* Card Payment Form */}
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={7}>
            <Box display="flex" flexDirection="column" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', backgroundColor: '#fff', width: '500px' }}>
              <Typography variant="h6" gutterBottom style={{ marginBottom: '10px' }}>
                Enter Card Details
              </Typography>
              <TextField label="First Name" variant="outlined" fullWidth name="firstName" value={formData.firstName} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
              <TextField label="Last Name" variant="outlined" fullWidth name="lastName" value={formData.lastName} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
              <TextField label="Address" variant="outlined" fullWidth name="address" value={formData.address} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
              <TextField label="City" variant="outlined" fullWidth name="city" value={formData.city} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
              <TextField label="Password" variant="outlined" fullWidth name="password" value={formData.password} onChange={handleInputChange} style={{ marginBottom: '10px' }} />

              <CardElement />
              <Button type="submit" variant="contained" color="primary" disabled={!stripe} fullWidth style={{ marginTop: '20px' }}>
                Pay ${total}
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* QR Code Display */}
        {formData.firstName && formData.lastName && formData.password && (
          <Box mt={4} style={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Your QR Code:
            </Typography>
            <QRCode value={qrCodeData} size={256} />
          </Box>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
