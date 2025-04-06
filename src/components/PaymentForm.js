// src/components/PaymentForm.js
import React, { useState } from 'react';
import { Button, Grid, Box, TextField, FormControl, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ total, eventId }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
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

    // Send formData to your server to create a payment intent
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: total * 100, // Amount in cents
        currency: 'usd',
        billingDetails: formData,
      }),
    });

    const { clientSecret } = await response.json();

    // Navigate to the Purchase page with the payment intent details
    navigate(`/purchase/${eventId}`, {
      state: {
        customerName: `${formData.firstName} ${formData.lastName}`,
        eventId,
        total,
        clientSecret,
      },
    });
  };

  return (
    <div className="payment-form-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px', flexDirection: 'column' }}>
      <form onSubmit={handleSubmit} className="payment-form" style={{ width: '100%', maxWidth: '1200px', padding: '20px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <Typography variant="h3" gutterBottom style={{ fontWeight: 700, fontFamily: 'sans-serif', color: '#3f51b5' }}>
          Tickets
        </Typography>

        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={7}>
            <Box display="flex" flexDirection="column" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', backgroundColor: '#fff', width: '500px' }}>
              <Typography variant="h6" gutterBottom style={{ marginBottom: '10px' }}>
                Enter Your Details
              </Typography>
              <TextField label="First Name" variant="outlined" fullWidth name="firstName" value={formData.firstName} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
              <TextField label="Last Name" variant="outlined" fullWidth name="lastName" value={formData.lastName} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
              <TextField label="Address" variant="outlined" fullWidth name="address" value={formData.address} onChange={handleInputChange} style={{ marginBottom: '10px' }} />
              <TextField label="City" variant="outlined" fullWidth name="city" value={formData.city} onChange={handleInputChange} style={{ marginBottom: '10px' }} />

              <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
                Proceed to Purchase
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default PaymentForm;
