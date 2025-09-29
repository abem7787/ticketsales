import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SeatMap from "./SeatMap";

const CustomerSeatSelection = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const savedEvent = localStorage.getItem("eventConfig");
    if (savedEvent) {
      setEvent(JSON.parse(savedEvent));
    }
  }, []);

  if (!event) {
    return <p className="text-center mt-8 text-gray-500">No event available.</p>;
  }

  const handleSeatClick = (seat) => {
    if (seat.status !== "available") return;

    setSelectedSeats((prev) =>
      prev.some((s) => s.id === seat.id)
        ? prev.filter((s) => s.id !== seat.id)
        : [...prev, seat]
    );
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + event.seatPrices[seat.type], 0);

  const handleConfirm = () => {
    if (!selectedSeats.length) {
      alert("Please select at least one seat.");
      return;
    }
    navigate("/payment", { state: { event, selectedSeats, totalPrice } });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-xl w-full">
        <h2 className="text-2xl font-semibold mb-6">{event.eventName} - Select Seats</h2>

        {/* Seat Map */}
        <SeatMap
          seats={event.seats.flat()} // flatten the 2D array from admin
          selectedSeats={selectedSeats}
          onSeatClick={handleSeatClick}
        />

        {/* Selected Seats & Total */}
        <div className="mb-4">
          Selected Seats: {selectedSeats.length ? selectedSeats.map(s => s.id).join(", ") : "None"}
        </div>
        <div className="text-xl font-bold mb-6">Total: ${totalPrice}</div>

        <button
          onClick={handleConfirm}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-xl"
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default CustomerSeatSelection;
