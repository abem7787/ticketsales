import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, selectedSeats, totalPrice } = location.state || {};

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">No confirmation data found</p>
          <button 
            onClick={() => navigate("/event-list")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center">
      <div className="bg-green-900 p-8 rounded-lg max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Booking Confirmed! 🎉</h2>
        <p className="text-lg mb-2"><strong>Event:</strong> {event.name}</p>
        <p className="text-lg mb-2"><strong>Seats:</strong> {selectedSeats.map(s => s.id).join(", ")}</p>
        <p className="text-lg mb-4"><strong>Total Paid:</strong> ${totalPrice.toFixed(2)}</p>
        <p className="text-sm text-gray-300 mb-6">A confirmation email has been sent to your email address.</p>
        <button 
          onClick={() => navigate("/event-list")}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded"
        >
          Back to Events
        </button>
      </div>
    </div>
  );
};

export default Confirmation;