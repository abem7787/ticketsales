// PaymentPage.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tickets, serviceFee } = location.state || {};

  const [method, setMethod] = useState("Credit");
  const [processing, setProcessing] = useState(false);
  const [cryptoAddress] = useState("0xABC123DEF456XYZ789"); // fake wallet address
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

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

  const generateConfirmation = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handlePayment = () => {
    if (method === "Credit" && (!cardNumber || !expiry || !cvv)) {
      alert("Please fill in all credit card fields.");
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);

      const confirmation = generateConfirmation();

      if (method === "Credit") {
        alert(
          `✅ Service Fee of $${serviceFee.toFixed(
            2
          )} paid with Credit Card.\nConfirmation #: ${confirmation}`
        );
      } else {
        alert(
          `✅ Service Fee of $${serviceFee.toFixed(
            2
          )} received in Crypto wallet: ${cryptoAddress}\nConfirmation #: ${confirmation}`
        );
      }

      navigate("/customer-portal", { state: { tickets, serviceFee, confirmation } });
    }, 2000); // simulate 2s delay
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-center mb-6">Pay Service Fee</h2>

      <div className="mb-6 text-center">
        <p className="text-xl font-bold">
          <strong>Service Fee:</strong> ${serviceFee.toFixed(2)}
        </p>
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

      {method === "Credit" ? (
        <div className="mb-6 space-y-3">
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
      ) : (
        <div className="mb-6 text-center">
          <p className="mb-2 text-gray-600">Send crypto to this address:</p>
          <p className="font-mono bg-gray-100 p-2 rounded">{cryptoAddress}</p>
          <p className="text-sm text-gray-500 mt-2">
            (Simulated – copy address and pretend to send payment)
          </p>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          disabled={processing}
        >
          Cancel
        </button>
        <button
          onClick={handlePayment}
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          disabled={processing}
        >
          {processing ? "Processing..." : "Pay Service Fee"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
