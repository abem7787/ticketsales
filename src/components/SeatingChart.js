import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const SeatingChart = () => {
  // Seat types and initial prices
  const [seatPrices, setSeatPrices] = useState({
    Standard: 50,
    VIP: 200,
    Reserved: 500,
  });

  // Sample seats layout
  const seats = [
    { id: 1, type: "Standard" },
    { id: 2, type: "Standard" },
    { id: 3, type: "VIP" },
    { id: 4, type: "Reserved" },
    { id: 5, type: "VIP" },
  ];

  const [selectedSeats, setSelectedSeats] = useState([]);

  const serviceFeePercentage = 0.1;

  // Handle seat selection
  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const subtotal = selectedSeats.reduce(
    (sum, seat) => sum + seatPrices[seat.type],
    0
  );
  const serviceFee = subtotal * serviceFeePercentage;
  const total = subtotal + serviceFee;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Seating Chart</h2>

      {/* Admin inputs to change prices */}
      <div className="flex justify-center gap-4 mb-6">
        {Object.keys(seatPrices).map((type) => (
          <div key={type} className="flex flex-col items-center">
            <label className="font-semibold">{type} Price ($)</label>
            <input
              type="number"
              value={seatPrices[type]}
              min={0}
              className="border rounded p-1 w-20 text-center"
              onChange={(e) =>
                setSeatPrices({
                  ...seatPrices,
                  [type]: Number(e.target.value),
                })
              }
            />
          </div>
        ))}
      </div>

      {/* Seats display */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => toggleSeat(seat)}
            className={`p-4 rounded border ${
              selectedSeats.includes(seat)
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {seat.type} ${seatPrices[seat.type]}
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="mb-4">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Service Fee: ${serviceFee.toFixed(2)}</p>
        <p className="font-bold">Total: ${total.toFixed(2)}</p>
      </div>

      {/* QR Code for selected seats */}
      {selectedSeats.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Your QR Code</h3>
          <QRCodeCanvas
            value={JSON.stringify(selectedSeats.map((s) => s.id))}
            size={128}
          />
        </div>
      )}
    </div>
  );
};

export default SeatingChart;
