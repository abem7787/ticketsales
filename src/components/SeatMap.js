import React, { useState } from 'react';
import { Box, Typography, Button } from '@material-ui/core';

const SeatMap = ({ venueLayout, onSeatSelect }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    // Toggle seat selection logic
  };

  return (
    <Box className="seat-map">
      <Typography variant="h6">Select Your Seats</Typography>
      <div className="stage">Stage</div>
      <div className="seats-grid">
        {venueLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat, seatIndex) => (
              <button
                key={seatIndex}
                className={`seat ${seat.status} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
                onClick={() => handleSeatClick(seat)}
                disabled={seat.status === 'unavailable'}
              >
                {seat.label}
              </button>
            ))}
          </div>
        ))}
      </div>
      <Button 
        variant="contained" 
        color="primary"
        onClick={() => onSeatSelect(selectedSeats)}
      >
        Confirm Seats
      </Button>
    </Box>
  );
};

export default SeatMap;