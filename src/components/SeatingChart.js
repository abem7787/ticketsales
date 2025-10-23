import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const serviceFeePercentage = 0.05;

const seatPatterns = {
  "Standard Layout": { rows: 6, cols: 12 },
  "Compact Layout": { rows: 5, cols: 10 },
  "Wide Layout": { rows: 6, cols: 16 },
};

const initialSeatPrices = { Standard: 50, VIP: 200, Reserved: 500 };

const createSeats = (rows, cols) => {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      id: `${r}-${c}`,
      status: "available",
      type: null,
    }))
  );
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
    setSeats(prevSeats => {
      const updated = prevSeats.map(row => [...row]);
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

  const selectedSeats = seats.flat().filter(seat => seat.status === "selected");
  const subtotal = selectedSeats.reduce((sum, seat) => sum + seatPrices[seat.type], 0);
  const serviceFee = subtotal * serviceFeePercentage;
  const total = subtotal + serviceFee;

  const handlePatternChange = newPattern => {
    setPatternName(newPattern);
    const { rows, cols } = seatPatterns[newPattern];
    setSeats(createSeats(rows, cols));
  };

  const handleSaveEvent = () => {
    localStorage.setItem("eventConfig", JSON.stringify({ eventName, seatPrices, seats, patternName }));
    alert("✅ Event saved successfully!");
  };

  const handleReset = () => {
    const { rows, cols } = seatPatterns[patternName];
    setSeats(createSeats(rows, cols));
    alert("🔄 Event reset complete!");
  };

  const handleCheckout = () => {
    if (!selectedSeats.length) return;

    const tickets = selectedSeats.map(seat => {
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
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 rounded-3xl shadow-2xl space-y-8">
      <h2 className="text-3xl font-bold text-center text-gray-800">{eventName} - Admin Seating</h2>

      {/* Event Input */}
      <div className="flex justify-center mt-4">
        <input
          type="text"
          value={eventName}
          onChange={e => setEventName(e.target.value)}
          placeholder="Enter Event Name"
          className="border border-gray-300 p-3 rounded-xl w-80 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Layout Selection */}
      <div className="flex justify-center mt-6 gap-4 flex-wrap">
        {Object.keys(seatPatterns).map(pattern => (
          <button
            key={pattern}
            onClick={() => handlePatternChange(pattern)}
            className={`px-5 py-2 rounded-xl font-medium transition-colors ${
              patternName === pattern ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {pattern}
          </button>
        ))}
      </div>

      {/* Seat Type Selection */}
      <div className="flex justify-center mt-4 gap-4 flex-wrap">
        {["Standard", "VIP", "Reserved"].map(type => (
          <button
            key={type}
            onClick={() => setSeatType(type)}
            className={`px-5 py-2 rounded-xl font-medium transition transform ${
              seatType === type ? "bg-blue-600 text-white shadow-lg scale-105" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {type} (${seatPrices[type]})
          </button>
        ))}
      </div>

      {/* Stage */}
      <div className="text-center font-semibold text-lg bg-gradient-to-r from-gray-800 via-gray-700 to-black text-white py-2 rounded-xl shadow-inner mt-6">
        Stage
      </div>

      {/* Seat Grid */}
      <div className="mt-4 space-y-2 select-none">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2 flex-wrap">
            {row.map((seat, colIndex) => {
              const seatLabel = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
              return (
                <button
                  key={seat.id}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseOver={() => handleMouseOver(rowIndex, colIndex)}
                  title={seat.status === "selected" ? `${seat.type} ($${seatPrices[seat.type]})` : seat.status}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-all transform ${
                    seat.status === "selected"
                      ? seat.type === "VIP"
                        ? "bg-yellow-400 text-black shadow-lg"
                        : seat.type === "Reserved"
                        ? "bg-red-500 text-white shadow-lg"
                        : "bg-blue-500 text-white shadow-lg"
                      : seat.status === "unavailable"
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                  }`}
                >
                  {seatLabel}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Pricing & Actions */}
      <div className="mt-8 border-t pt-6 text-center space-y-3 text-lg">
        {selectedSeats.length > 0 && (
          <>
            <p><strong>Selected Seats:</strong> {selectedSeats.length}</p>
            <p><strong>Subtotal:</strong> ${subtotal}</p>
            <p><strong>Service Fee (5%):</strong> ${serviceFee.toFixed(2)}</p>
            <p className="text-xl font-bold"><strong>Total:</strong> ${total.toFixed(2)}</p>
          </>
        )}
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <button
            onClick={handleCheckout}
            disabled={selectedSeats.length === 0}
            className={`px-6 py-3 font-semibold rounded-xl transition-all ${
              selectedSeats.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:scale-105"
            }`}
          >
            Preview Tickets
          </button>
          <button
            onClick={handleSaveEvent}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg hover:scale-105 transition-transform"
          >
            Save Event
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-lg hover:scale-105 transition-transform"
          >
            Reset Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatingChart;
