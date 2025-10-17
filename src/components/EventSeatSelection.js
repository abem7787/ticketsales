import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SeatMap from "./SeatMap"; // your existing seat map component

const EventSeatSelection = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Load the selected event from localStorage
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

  // Calculate total price
  const totalPrice = selectedSeats.reduce(
    (sum, seat) => sum + (event.seats.find((s) => s.id === seat.id)?.price || 0),
    0
  );

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
        <h2 className="text-2xl font-semibold mb-6">{event.name} - Select Seats</h2>

        <SeatMap
          seats={event.seats} // Pass all seats
          selectedSeats={selectedSeats}
          onSeatClick={handleSeatClick}
        />

        <div className="mb-4">
          Selected Seats:{" "}
          {selectedSeats.length ? selectedSeats.map((s) => s.id).join(", ") : "None"}
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

export default EventSeatSelection;
