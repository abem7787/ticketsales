import React, { useState } from 'react';

const SeatSelection = () => {
  // Mock seat data: 5 rows and 6 seats per row
  const rows = 5;
  const seatsPerRow = 6;

  // State to hold selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Seat click handler
  const handleSeatClick = (seatId) => {
    setSelectedSeats((prevSeats) => {
      // If the seat is already selected, remove it
      if (prevSeats.includes(seatId)) {
        return prevSeats.filter((id) => id !== seatId);
      }
      // Otherwise, add the seat to the selected seats
      return [...prevSeats, seatId];
    });
  };

  // Generate seat grid
  const seatGrid = [];
  for (let row = 1; row <= rows; row++) {
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      const seatId = `${row}-${seat}`;
      seatGrid.push(seatId);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 flex justify-center items-center">
      <div className="bg-slate-700 p-8 rounded-xl shadow-lg max-w-xl w-full">
        <h2 className="text-2xl font-semibold mb-6">Select Your Seat</h2>
        <div className="grid grid-cols-6 gap-4 mb-4">
          {seatGrid.map((seatId) => {
            const isSelected = selectedSeats.includes(seatId);
            return (
              <div
                key={seatId}
                onClick={() => handleSeatClick(seatId)}
                className={`w-12 h-12 flex items-center justify-center rounded-lg cursor-pointer transition ${
                  isSelected
                    ? 'bg-indigo-600' // Selected seat
                    : 'bg-gray-400' // Available seat
                }`}
              >
                {seatId}
              </div>
            );
          })}
        </div>
        <button
          onClick={() => alert(`Selected Seats: ${selectedSeats.join(', ')}`)}
          className="w-full py-2 text-xl bg-indigo-600 hover:bg-indigo-700 rounded-md"
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
