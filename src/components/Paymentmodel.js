// PaymentModal.js
import React, { useState } from "react";

const PaymentModal = ({ amount, onClose, onConfirm }) => {
  const [method, setMethod] = useState("Credit");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-80 text-center">
        <h2 className="text-xl font-bold mb-4">Payment</h2>
        <p className="mb-4">Amount: ${amount.toFixed(2)}</p>

        <div className="mb-4">
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
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
