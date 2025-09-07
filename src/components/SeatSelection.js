import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SeatSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event } = location.state || {};

  if (!event) {
    return <p className="text-white">No event selected.</p>;
  }

  const rows = 5;
  const seatsPerRow = 6;
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatId) => {
    if (!event.availableSeats.includes(seatId)) return; // cannot click unavailable seat

    setSelectedSeats((prevSeats) => {
      if (prevSeats.includes(seatId)) return prevSeats.filter((id) => id !== seatId);
      return [...prevSeats, seatId];
    });
  };

  const seatGrid = [];
  for (let row = 1; row <= rows; row++) {
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      seatGrid.push(`${row}-${seat}`);
    }
  }

  const handleConfirmSelection = () => {
    alert(`Selected Seats: ${selectedSeats.join(', ')}`);
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 flex justify-center items-center">
      <div className="bg-slate-700 p-8 rounded-xl shadow-lg max-w-xl w-full">
        <h2 className="text-2xl font-semibold mb-6">{event.name} - Select Your Seat</h2>
        <div className="grid grid-cols-6 gap-4 mb-4">
          {seatGrid.map((seatId) => {
            const isAvailable = event.availableSeats.includes(seatId);
            const isSelected = selectedSeats.includes(seatId);

            return (
              <div
                key={seatId}
                onClick={() => handleSeatClick(seatId)}
                className={`w-12 h-12 flex items-center justify-center rounded-lg cursor-pointer transition ${
                  !isAvailable ? 'bg-gray-700 cursor-not-allowed' :
                  isSelected ? 'bg-indigo-600' : 'bg-gray-400'
                }`}
              >
                {seatId}
              </div>
            );
          })}
        </div>
        <button
          onClick={handleConfirmSelection}
          className="w-full py-2 text-xl bg-indigo-600 hover:bg-indigo-700 rounded-md"
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
