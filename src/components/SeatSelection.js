import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SeatSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch event & seats from backend
  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events/${id}`);
        const data = await res.json();

        if (!data.seats) {
          setEvent(null);
          return;
        }

        // Convert backend 2D seat array and add 'available' & 'id'
        const seats2D = data.seats.map(row =>
          row.map(seat => ({
            ...seat,
            available: seat.status === "available",
            id: seat.label,
          }))
        );

        setEvent({
          name: data.eventName,
          patternName: data.patternName,
          seats: seats2D,
        });
      } catch (err) {
        console.error(err);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p className="text-white text-center mt-8">Loading event...</p>;
  if (!event) return <p className="text-white text-center mt-8">No event found.</p>;

  // Handle seat selection
  const handleSeatClick = seat => {
    if (!seat.available) return;

    setSelectedSeats(prev =>
      prev.find(s => s.id === seat.id)
        ? prev.filter(s => s.id !== seat.id)
        : [...prev, seat]
    );
  };

  // Compute seat button color
  const getSeatColor = seat => {
    if (!seat.available) return "bg-gray-700 cursor-not-allowed";
    if (selectedSeats.find(s => s.id === seat.id)) return "bg-green-500";
    switch (seat.type) {
      case "VIP": return "bg-yellow-400 hover:bg-yellow-500";
      case "Reserved": return "bg-red-500 hover:bg-red-600";
      default: return "bg-blue-500 hover:bg-blue-600";
    }
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  // Confirm selection handler
  const handleConfirmSelection = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    // Navigate to Payment page with state
    navigate("/payment", { state: { event, seats: selectedSeats, total: totalPrice } });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-6">{event.name} - Select Seats</h2>

      <div className="w-full max-w-xl bg-gray-800 text-center py-2 rounded mb-4">Stage</div>

      <div className="space-y-3">
        {event.seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-3">
            {row.map(seat => (
              <button
                key={seat.id}
                onClick={() => handleSeatClick(seat)}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${getSeatColor(seat)}`}
                title={`Seat ${seat.label} - ${seat.type || "Standard"} - $${seat.price} - ${seat.available ? "Available" : "Unavailable"}`}
              >
                {seat.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6 text-lg">
        Selected Seats: {selectedSeats.length > 0 ? selectedSeats.map(s => s.label).join(", ") : "None"}
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
