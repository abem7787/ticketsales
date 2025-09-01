// PaymentPage.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tickets, subtotal, serviceFee, total } = location.state || {};

  const [method, setMethod] = useState("Credit");

  if (!tickets) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">No Payment Data Found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handlePayment = () => {
    alert(`Paid ${total} using ${method}`);
    navigate("/customer-portal", { state: { tickets } });
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-center mb-6">Complete Your Payment</h2>

      <div className="mb-6">
        <p><strong>Subtotal:</strong> ${subtotal}</p>
        <p><strong>Service Fee:</strong> ${serviceFee.toFixed(2)}</p>
        <p className="text-xl font-bold"><strong>Total:</strong> ${total.toFixed(2)}</p>
      </div>

      <div className="mb-6 text-center">
        <button
          className={`mr-2 px-4 py-2 rounded border ${
            method === "Credit" ? "bg-blue-600 text-white" : ""
          }`}
          onClick={() => setMethod("Credit")}
        >
          Credit
        </button>
        <button
          className={`px-4 py-2 rounded border ${
            method === "Crypto" ? "bg-purple-600 text-white" : ""
          }`}
          onClick={() => setMethod("Crypto")}
        >
          Crypto
        </button>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handlePayment}
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
