import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { event, seats, total } = location.state || {};

  if (!event || !seats) {
    return (
      <div className="text-white p-6">
        <p>No event or seats selected.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h2 className="text-2xl font-semibold mb-4">{event.name} - Payment</h2>
      <p>Selected Seats: {seats.map(s => s.label).join(", ")}</p>
      <p>Total Price: ${total}</p>
      <button className="mt-4 px-4 py-2 bg-green-600 rounded hover:bg-green-700">Pay Now</button>
    </div>
  );
};

export default Payment;
