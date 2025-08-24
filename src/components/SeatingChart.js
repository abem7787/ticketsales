import React, { useState } from 'react';

const rows = 6;
const cols = 12;
const seatPrices = {
  "Standard": 50,
  "VIP": 200,
  "Reserved": 500
};

const serviceFeePercentage = 0.05; // 5% service fee

const initialSeats = () => {
  const seats = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        id: `${r}-${c}`,
        status: "available",
        type: null,
      });
    }
    seats.push(row);
  }
  return seats;
};

const SeatingChart = () => {
  const [seats, setSeats] = useState(initialSeats());
  const [seatType, setSeatType] = useState("Standard");
  const [showModal, setShowModal] = useState(false);

  const toggleSeat = React.useCallback((rowIndex, colIndex) => {
  setSeats(prevSeats => {
    const updated = [...prevSeats];
    const seat = updated[rowIndex][colIndex];

    if (seat.status === "available") {
      seat.status = "selected";
      seat.type = seatType;
    } else {
      seat.status = "available";
      seat.type = null;
    }

    return updated;
  });
}, [seatType]);

  const getColor = (seat) => {
    if (seat.status === "selected") {
      if (seat.type === "VIP") return "bg-yellow-400";
      if (seat.type === "Reserved") return "bg-red-500";
      return "bg-blue-500"; // Standard
    }
    return "bg-gray-300 hover:bg-gray-400"; // Available
  };

  const selectedSeats = seats.flat().filter(seat => seat.status === "selected");
  const subtotal = selectedSeats.reduce((sum, seat) => sum + seatPrices[seat.type], 0);
  const serviceFee = subtotal * serviceFeePercentage;
  const total = subtotal + serviceFee;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center">🎭 Event Seating Chart</h2>

      {/* Seat Type Selector */}
      <div className="flex justify-center gap-4">
        <select
          value={seatType}
          onChange={(e) => setSeatType(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="Standard">Standard Seat ($50)</option>
          <option value="VIP">VIP Seat ($200)</option>
          <option value="Reserved">Reserved Seat ($500)</option>
        </select>
      </div>

      {/* Stage Label */}
      <div className="text-center font-semibold text-lg bg-black text-white py-2 rounded">
        🎤 Stage
      </div>

      {/* Section Labels */}
      <div className="flex justify-center gap-[1.5rem] mb-2 text-sm font-medium">
        <div className="w-[8rem] text-center">Left</div>
        <div className="w-[8rem] text-center ml-4">Center</div>
        <div className="w-[8rem] text-center ml-8">Right</div>
      </div>

      {/* Seating Grid with Sections */}
      <div className="space-y-2">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            {row.map((seat, colIndex) => {
              const sectionBorder =
                colIndex === 4 || colIndex === 8 ? "ml-6" : ""; // spacing between sections
              return (
                <button
                  key={seat.id}
                  onClick={() => toggleSeat(rowIndex, colIndex)}
                  className={`w-8 h-8 rounded-full border-2 border-gray-400 ${getColor(
                    seat
                  )} ${sectionBorder}`}
                  title={
                    seat.status === "selected"
                      ? `${seat.type} ($${seatPrices[seat.type]})`
                      : "Available"
                  }
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-gray-300 border border-gray-400" /> Available
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-blue-500" /> Standard ($50)
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-yellow-400" /> VIP ($200)
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-red-500" /> Reserved ($500)
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="mt-6 border-t pt-6 text-center space-y-2 text-lg">
        {selectedSeats.length > 0 && (
          <>
            <p><strong>Selected Seats:</strong> {selectedSeats.length}</p>
            <p><strong>Subtotal:</strong> ${subtotal}</p>
            <p><strong>Service Fee (5%):</strong> ${serviceFee.toFixed(2)}</p>
            <p className="text-xl font-bold"><strong>Total:</strong> ${total.toFixed(2)}</p>
          </>
        )}

        <button
          onClick={() => setShowModal(true)}
          disabled={selectedSeats.length === 0}
          className={`mt-4 px-6 py-3 font-semibold rounded-lg ${
            selectedSeats.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          Proceed to Checkout
        </button>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-center space-y-4">
            <h3 className="text-xl font-semibold">Confirm Payment</h3>
            <p>Total: <strong>${total.toFixed(2)}</strong> for {selectedSeats.length} seat(s)</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  alert("Payment successful!");
                  setSeats(initialSeats());
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Confirm Payment
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatingChart;
