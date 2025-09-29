import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const SeatSelection = ({ events = [], setEvents }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (location.state?.event) {
      setEvent(location.state.event);
    } else if (id) {
      const found = events.find((e) => e.eventIndex === parseInt(id));
      setEvent(found || null);
    }
  }, [location.state, id, events]);

  if (!event) {
    return <p className="text-white text-center mt-8">No event selected.</p>;
  }

  const handleSeatClick = (seat) => {
    if (!seat.available) return;
    setSelectedSeats((prev) =>
      prev.find((s) => s.id === seat.id)
        ? prev.filter((s) => s.id !== seat.id)
        : [...prev, seat]
    );
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const handleConfirmSelection = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    // Update seat availability in the events array
    const updatedEvents = events.map((e) => {
      if (e.eventIndex === event.eventIndex) {
        const updatedSeats = e.seats.map((seat) =>
          selectedSeats.some((s) => s.id === seat.id)
            ? { ...seat, available: false }
            : seat
        );
        return { ...e, seats: updatedSeats };
      }
      return e;
    });

    setEvents(updatedEvents);

    navigate("/payment", { state: { event, selectedSeats, totalPrice } });
  };

  // Arrange seats in rows for stage layout
  const seatsPerRow = 6; // adjust if needed
  const rows = [];
  for (let i = 0; i < event.seats.length; i += seatsPerRow) {
    rows.push(event.seats.slice(i, i + seatsPerRow));
  }

  // Function to get seat color based on type and availability
  const getSeatColor = (seat) => {
    if (!seat.available) return "bg-gray-700 cursor-not-allowed";
    if (selectedSeats.find((s) => s.id === seat.id)) return "bg-green-500";
    switch (seat.type) {
      case "VIP":
        return "bg-yellow-400 hover:bg-yellow-500";
      case "Reserved":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-6">{event.name} - Select Seats</h2>

      {/* Stage */}
      <div className="w-full max-w-xl bg-gray-800 text-center py-2 rounded mb-4">
        Stage
      </div>

      {/* Seat Grid */}
      <div className="space-y-3">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-3">
            {row.map((seat) => (
              <button
                key={seat.id}
                onClick={() => handleSeatClick(seat)}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${getSeatColor(seat)}`}
                title={`Seat ${seat.id} - ${seat.type || "Standard"} - $${seat.price} - ${seat.available ? "Available" : "Unavailable"}`}
              >
                {seat.id}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Selection Summary */}
      <div className="mt-6 text-lg">
        Selected Seats:{" "}
        {selectedSeats.length > 0 ? selectedSeats.map((s) => s.id).join(", ") : "None"}
      </div>
      <div className="text-xl font-bold mb-6">Total Price: ${totalPrice}</div>

      <button
        onClick={handleConfirmSelection}
        className="w-full max-w-xl py-2 text-xl bg-indigo-600 hover:bg-indigo-700 rounded-md"
      >
        Confirm Selection
      </button>
    </div>
  );
};

export default SeatSelection;
