import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import TicketWithQR from "./TicketWithQR"; // import your QR ticket component

const rows = 6;
const cols = 12;
const initialSeatPrices = { Standard: 50, VIP: 200, Reserved: 500 };
const serviceFeePercentage = 0.05;

const initialSeats = () => {
  const seats = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push({ id: `${r}-${c}`, status: "available", type: null });
    }
    seats.push(row);
  }
  return seats;
};

const SeatingChart = () => {
  const [seats, setSeats] = useState(initialSeats());
  const [seatType, setSeatType] = useState("Standard");
  const [seatPrices, setSeatPrices] = useState(initialSeatPrices);
  const [showModal, setShowModal] = useState(false);
  const [tickets, setTickets] = useState([]); // tickets with QR codes
 const navigate = useNavigate();

  const toggleSeat = (rowIndex, colIndex) => {
    const updated = [...seats];
    const seat = updated[rowIndex][colIndex];
    if (seat.status === "available") {
      seat.status = "selected";
      seat.type = seatType;
    } else {
      seat.status = "available";
      seat.type = null;
    }
    setSeats(updated);
  };

  const selectedSeats = seats.flat().filter((seat) => seat.status === "selected");
  const subtotal = selectedSeats.reduce((sum, seat) => sum + seatPrices[seat.type], 0);
  const serviceFee = subtotal * serviceFeePercentage;
  const total = subtotal + serviceFee;

  const handlePriceChange = (type, value) => {
    setSeatPrices({ ...seatPrices, [type]: Number(value) });
  };

  const handleCheckout = () => {
    // Generate tickets for selected seats
    const newTickets = selectedSeats.map((seat) => ({
      id: `${seat.id}-${Date.now()}`,
      seat: seat.id,
      price: seatPrices[seat.type],
      event: "Demo Event",
    }));
    // setTickets(newTickets);
    // setShowModal(true);
       navigate("/tickets", { state: { tickets } });


  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center">Event Seating Chart</h2>

      {/* Seat Selector */}
      <div className="flex justify-center gap-4">
        <select
          value={seatType}
          onChange={(e) => setSeatType(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="Standard">Standard Seat (${seatPrices.Standard})</option>
          <option value="VIP">VIP Seat (${seatPrices.VIP})</option>
          <option value="Reserved">Reserved Seat (${seatPrices.Reserved})</option>
        </select>
      </div>

      {/* Price Inputs */}
      <div className="flex justify-center gap-6 mt-4">
        {["Standard", "VIP", "Reserved"].map((type) => (
          <div key={type} className="flex flex-col items-center">
            <label className="font-medium">{type} Price</label>
            <input
              type="number"
              value={seatPrices[type]}
              onChange={(e) => handlePriceChange(type, e.target.value)}
              className="border p-1 rounded w-20 text-center"
            />
          </div>
        ))}
      </div>

      {/* Stage Label */}
      <div className="text-center font-semibold text-lg bg-black text-white py-2 rounded mt-6">
        Stage
      </div>

      {/* Seating Grid */}
      <div className="space-y-2 mt-4">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            {row.map((seat, colIndex) => {
              const sectionBorder = colIndex === 4 || colIndex === 8 ? "ml-6" : "";
              const seatLabel = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
              return (
                <button
                  key={seat.id}
                  onClick={() => toggleSeat(rowIndex, colIndex)}
                  className={`w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center text-xs font-semibold ${
                    seat.status === "selected"
                      ? seat.type === "VIP"
                        ? "bg-yellow-400"
                        : seat.type === "Reserved"
                        ? "bg-red-500"
                        : "bg-blue-500"
                      : "bg-gray-300 hover:bg-gray-400"
                  } ${sectionBorder}`}
                  title={
                    seat.status === "selected"
                      ? `${seat.type} ($${seatPrices[seat.type]})`
                      : "Available"
                  }
                >
                  {seatLabel}
                </button>
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
          <span className="w-4 h-4 rounded-full bg-blue-500" /> Standard (${seatPrices.Standard})
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-yellow-400" /> VIP (${seatPrices.VIP})
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-red-500" /> Reserved (${seatPrices.Reserved})
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="mt-6 border-t pt-6 text-center space-y-2 text-lg">
        {selectedSeats.length > 0 && (
          <>
            <p>
              <strong>Selected Seats:</strong> {selectedSeats.length}
            </p>
            <p>
              <strong>Subtotal:</strong> ${subtotal}
            </p>
            <p>
              <strong>Service Fee (5%):</strong> ${serviceFee.toFixed(2)}
            </p>
            <p className="text-xl font-bold">
              <strong>Total:</strong> ${total.toFixed(2)}
            </p>
          </>
        )}

        <button
          onClick={handleCheckout}
          disabled={selectedSeats.length === 0}
          className={`mt-4 px-6 py-3 font-semibold rounded-lg ${
            selectedSeats.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          Proceed to Checkout
        </button>
      </div>

      {/* Payment Modal with QR Tickets */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50 p-4 overflow-auto">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-center space-y-4">
            <h3 className="text-xl font-semibold">Your Tickets</h3>
            {tickets.map((ticket) => (
              <TicketWithQR key={ticket.id} ticket={ticket} />
            ))}

            <button
              onClick={() => {
                setShowModal(false);
                setSeats(initialSeats());
                setTickets([]);
              }}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatingChart;
