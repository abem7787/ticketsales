// PaymentForm.js
import React, { useState } from 'react';
import { Button, Grid, Box, TextField, FormControl, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ total, eventId }) => {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('card');
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Route the user to the Purchase page with the event details
    navigate(`/purchase/${eventId}`, {
      state: {
        customerName: `${formData.firstName} ${formData.lastName}`,
        eventId,
        total,
        address: formData.address,
        city: formData.city,
      },
    });
  };

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

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

        {/* User Information Form */}
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
                Proceed to Purchase (${total})
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default PaymentForm;
