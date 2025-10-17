import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, selectedSeats, totalPrice } = location.state || {};

  if (!event || !selectedSeats) {
    return <p className="text-center text-white mt-10">No payment data found.</p>;
  }

  const handlePayment = () => {
    // Simulate successful payment
    alert("Payment successful!");
    navigate("/confirmation", { state: { event, selectedSeats, totalPrice } });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-6">{event.name} - Payment</h2>

      <div className="w-full max-w-md bg-gray-800 p-4 rounded-lg mb-4">
        <h3 className="text-xl mb-2 font-bold">Selected Seats:</h3>
        <p>{selectedSeats.map((s) => s.id).join(", ")}</p>
        <h3 className="text-xl mt-4 font-bold">Total: ${totalPrice}</h3>
      </div>

      <button
        onClick={handlePayment}
        className="w-full max-w-md py-2 bg-green-600 hover:bg-green-700 rounded-md text-xl"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
