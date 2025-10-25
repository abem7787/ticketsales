import React, { useState } from "react";
import RewardPoints from "../components/rewardpoints";

const RewardPointsPage = () => {
  const [subtotal, setSubtotal] = useState(250);
  const [discount, setDiscount] = useState(0);
  const total = (subtotal - discount).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-700 text-white p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Reward Points Management
      </h2>

      <div className="max-w-md mx-auto bg-white text-gray-800 rounded-xl p-6 shadow-lg">
        <p className="mb-4">
          <strong>Example Purchase Subtotal:</strong> ${subtotal.toFixed(2)}
        </p>
        <RewardPoints subtotal={subtotal} onUpdateTotal={setDiscount} />
        <p className="mt-4 text-lg font-semibold">Final Total: ${total}</p>
      </div>
    </div>
  );
};

export default RewardPointsPage;
