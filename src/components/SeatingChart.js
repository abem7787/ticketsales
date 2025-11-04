import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Configuration
const serviceFeePercentage = 0.05;

const seatPatterns = {
  "Standard Layout": { rows: 6, cols: 12 },
  "Compact Layout": { rows: 5, cols: 10 },
  "Wide Layout": { rows: 6, cols: 16 },
};

const initialSeatPrices = { Standard: 50, VIP: 200, Reserved: 500 };

// Create seat grid helper
const createSeats = (rows, cols) => {
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
  const navigate = useNavigate();

  const [patternName, setPatternName] = useState("Standard Layout");
  const [seatType, setSeatType] = useState("Standard");
  const [seatPrices, setSeatPrices] = useState(initialSeatPrices);
  const [eventName, setEventName] = useState("Demo Event");
  const [isDragging, setIsDragging] = useState(false);

  const initialSeats = useMemo(() => createSeats(6, 12), []);
  const [seats, setSeats] = useState(initialSeats);

  useEffect(() => {
    const stopDragging = () => setIsDragging(false);
    window.addEventListener("mouseup", stopDragging);
    return () => window.removeEventListener("mouseup", stopDragging);
  }, []);

  const toggleSeat = (rowIndex, colIndex) => {
    setSeats((prevSeats) => {
      const updated = prevSeats.map((row) => [...row]);
      const seat = updated[rowIndex][colIndex];

      if (seat.status === "available") {
        seat.status = "selected";
        seat.type = seatType;
      } else if (seat.status === "selected") {
        seat.status = "available";
        seat.type = null;
      }

      return updated;
    });
  };

  const handleMouseDown = (rowIndex, colIndex) => {
    setIsDragging(true);
    toggleSeat(rowIndex, colIndex);
  };

  const handleMouseOver = (rowIndex, colIndex) => {
    if (isDragging) toggleSeat(rowIndex, colIndex);
  };

  const selectedSeats = seats.flat().filter((seat) => seat.status === "selected");
  const subtotal = selectedSeats.reduce((sum, seat) => sum + seatPrices[seat.type], 0);
  const serviceFee = subtotal * serviceFeePercentage;
  const total = subtotal + serviceFee;

  const handlePatternChange = (newPattern) => {
    setPatternName(newPattern);
    const { rows, cols } = seatPatterns[newPattern];
    setSeats(createSeats(rows, cols));
  };

  const handlePriceChange = (type, value) => {
    const num = parseFloat(value) || 0;
    setSeatPrices((prev) => ({ ...prev, [type]: num }));
  };

  const handleSaveEvent = () => {
    const eventConfig = { eventName, seatPrices, seats, patternName };
    localStorage.setItem("eventConfig", JSON.stringify(eventConfig));
    alert("✅ Event saved successfully!");
  };

  const handleReset = () => {
    const { rows, cols } = seatPatterns[patternName];
    setSeats(createSeats(rows, cols));
    alert("🔄 Event reset complete!");
  };

  const handleCheckout = () => {
    if (!selectedSeats.length) return;

    const tickets = selectedSeats.map((seat) => {
      const [rowIndex, colIndex] = seat.id.split("-").map(Number);
      const seatLabel = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
      const ticketId = `${seat.id}-${Date.now()}`;
      return {
        id: ticketId,
        seat: seatLabel,
        type: seat.type,
        price: seatPrices[seat.type],
        event: eventName,
        qrData: JSON.stringify({
          id: ticketId,
          seat: seatLabel,
          price: seatPrices[seat.type],
          event: eventName,
        }),
      };
    });

    navigate("/tickets", { state: { tickets, subtotal, serviceFee, total } });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center">
        {eventName} - Admin Seating
      </h2>

      {/* Event Name Input */}
      <div className="flex justify-center mt-4">
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter Event Name"
          className="border p-2 rounded-md w-80 text-center"
        />
      </div>

      {/* Pattern Selection */}
      <div className="flex justify-center mt-4 gap-4">
        {Object.keys(seatPatterns).map((pattern) => (
          <button
            key={pattern}
            className={`px-4 py-2 rounded ${
              patternName === pattern
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handlePatternChange(pattern)}
          >
            {pattern}
          </button>
        ))}
      </div>

      {/* Seat Type Buttons + Editable Prices */}
      <div className="flex justify-center mt-6 gap-6">
        {["Standard", "VIP", "Reserved"].map((type) => (
          <div key={type} className="flex flex-col items-center">
            <button
              className={`px-4 py-2 rounded mb-2 ${
                seatType === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setSeatType(type)}
            >
              {type}
            </button>
            <input
              type="number"
              value={seatPrices[type]}
              onChange={(e) => handlePriceChange(type, e.target.value)}
              className="w-24 border p-1 rounded text-center"
            />
          </div>
        ))}
      </div>

      {/* Stage Label */}
      <div className="text-center font-semibold text-lg bg-black text-white py-2 rounded mt-6">
        Stage
      </div>

      {/* Seat Grid */}
      <div className="space-y-2 mt-4 select-none">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            {row.map((seat, colIndex) => {
              const seatLabel = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
              return (
                <button
                  key={seat.id}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseOver={() => handleMouseOver(rowIndex, colIndex)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-semibold transition-colors duration-150 ${
                    seat.status === "selected"
                      ? seat.type === "VIP"
                        ? "bg-yellow-400"
                        : seat.type === "Reserved"
                        ? "bg-red-500"
                        : "bg-blue-500"
                      : seat.status === "unavailable"
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  title={
                    seat.status === "selected"
                      ? `${seat.type} ($${seatPrices[seat.type]})`
                      : seat.status
                  }
                >
                  {seatLabel}
                </button>
              );
            })}
          </div>
        ))}
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

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleCheckout}
            disabled={selectedSeats.length === 0}
            className={`px-6 py-3 font-semibold rounded-lg ${
              selectedSeats.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            Preview Tickets
          </button>
          <button
            onClick={handleSaveEvent}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Event
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Reset Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatingChart;