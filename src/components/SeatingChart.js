import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [eventName, setEventName] = useState("Demo Event");
  const [seatImages, setSeatImages] = useState({ Standard: null, VIP: null, Reserved: null });
  const [flyer, setFlyer] = useState(null); // Flyer state

  const navigate = useNavigate();

  const toggleSeat = (rowIndex, colIndex) => {
    const updated = [...seats];
    const seat = updated[rowIndex][colIndex];

    if (seat.status === "available") {
      seat.status = "selected";
      seat.type = seatType;
    } else if (seat.status === "selected") {
      seat.status = "unavailable";
      seat.type = null;
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

  const handleImageUpload = (type, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setSeatImages({ ...seatImages, [type]: reader.result });
    reader.readAsDataURL(file);
  };

  const handleFlyerUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFlyer(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSaveEvent = () => {
    const eventConfig = { eventName, seatPrices, seatImages, seats, flyer };
    localStorage.setItem("eventConfig", JSON.stringify(eventConfig));
    alert("Event configuration saved for clients!");
  };

  const handleReset = () => {
    localStorage.removeItem("eventConfig");
    setSeats(initialSeats());
    setSeatPrices(initialSeatPrices);
    setSeatImages({ Standard: null, VIP: null, Reserved: null });
    setFlyer(null);
    setEventName("Demo Event");
    alert("Event reset!");
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
        image: seatImages[seat.type],
        flyer, // include flyer
        qrData: JSON.stringify({ id: ticketId, seat: seatLabel, price: seatPrices[seat.type], event: eventName }),
      };
    });

    navigate("/tickets", { state: { tickets, subtotal, serviceFee, total, flyer } });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center">Admin Event Setup</h2>

      {/* Event Name */}
      <div className="flex justify-center mt-4">
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter Event Name"
          className="border p-2 rounded-md w-80 text-center"
        />
      </div>

      {/* Flyer Upload */}
      {/* <div className="flex flex-col items-center space-y-3 mt-6">
        <h3 className="font-bold text-lg">Event Flyer</h3>
        {flyer ? (
          <img src={flyer} alt="Event Flyer" className="w-64 h-40 object-cover rounded-lg shadow" />
        ) : (
          <div className="w-64 h-40 bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">No Flyer Uploaded</span>
          </div>
        )}
        <input type="file" accept="image/*" onChange={(e) => handleFlyerUpload(e.target.files[0])} className="text-sm" />
      </div> */}

      {/* Seat Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {["Standard", "VIP", "Reserved"].map((type) => (
          <div key={type} className="border rounded-2xl shadow p-4 flex flex-col items-center space-y-3">
            <h3 className="font-bold text-lg">{type} Seat</h3>
            {seatImages[type] ? (
              <img src={seatImages[type]} alt={`${type} preview`} className="w-32 h-32 object-cover rounded-lg" />
            ) : (
              <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-500 text-sm">No Image</span>
              </div>
            )}
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(type, e.target.files[0])} className="text-sm" />
            <input type="number" value={seatPrices[type]} onChange={(e) => handlePriceChange(type, e.target.value)} className="border p-1 rounded w-24 text-center" />
          </div>
        ))}
      </div>

      {/* Seat Selector */}
      <div className="flex justify-center gap-4 mt-6">
        <select value={seatType} onChange={(e) => setSeatType(e.target.value)} className="border p-2 rounded-md">
          <option value="Standard">Standard (${seatPrices.Standard})</option>
          <option value="VIP">VIP (${seatPrices.VIP})</option>
          <option value="Reserved">Reserved (${seatPrices.Reserved})</option>
        </select>
      </div>

      {/* Stage */}
      <div className="text-center font-semibold text-lg bg-black text-white py-2 rounded mt-6">Stage</div>

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
                      : seat.status === "unavailable"
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gray-300 hover:bg-gray-400"
                  } ${sectionBorder}`}
                  title={seat.status === "selected" ? `${seat.type} ($${seatPrices[seat.type]})` : seat.status === "unavailable" ? "Blocked" : "Available"}
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
            <p><strong>Selected Seats:</strong> {selectedSeats.length}</p>
            <p><strong>Subtotal:</strong> ${subtotal}</p>
            <p><strong>Service Fee (5%):</strong> ${serviceFee.toFixed(2)}</p>
            <p className="text-xl font-bold"><strong>Total:</strong> ${total.toFixed(2)}</p>
          </>
        )}

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleCheckout}
            disabled={selectedSeats.length === 0}
            className={`px-6 py-3 font-semibold rounded-lg ${selectedSeats.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"}`}
          >
            Preview Tickets
          </button>
          <button onClick={handleSaveEvent} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Event Setup</button>
          <button onClick={handleReset} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">Reset Event</button>
        </div>
      </div>
    </div>
  );
};

export default SeatingChart;
