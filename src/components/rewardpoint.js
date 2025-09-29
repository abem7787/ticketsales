// RewardPoints.js
import React, { useState, useEffect } from "react";

const RewardPoints = ({ subtotal, onUpdateTotal }) => {
  // Simulated current user points (could come from API in real case)
  const [userPoints, setUserPoints] = useState(120); 
  const [pointsToRedeem, setPointsToRedeem] = useState(0);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const pointsValue = 0.1; // $0.10 per point

  // Points earned are usually % of subtotal
  useEffect(() => {
    setEarnedPoints(Math.floor(subtotal / 10)); // e.g., 1 point per $10
  }, [subtotal]);

  const handleRedeemChange = (e) => {
    const value = Math.min(Number(e.target.value), userPoints);
    setPointsToRedeem(value);

    const discount = value * pointsValue;
    onUpdateTotal(discount); // Pass discount up to parent
  };

  return (
    <div className="mt-6 p-4 border rounded-lg bg-gray-50 text-gray-800">
      <h3 className="text-lg font-semibold mb-2">Reward Points</h3>
      
      <p className="mb-1">Your Points Balance: <strong>{userPoints}</strong></p>
      <p className="mb-3">You’ll Earn: <strong>{earnedPoints}</strong> points from this purchase</p>

      <div className="flex items-center gap-2">
        <label className="text-sm">Redeem Points:</label>
        <input
          type="number"
          min="0"
          max={userPoints}
          value={pointsToRedeem}
          onChange={handleRedeemChange}
          className="w-24 border rounded-md p-1 text-center"
        />
        <span className="text-sm text-gray-600">
          = ${(pointsToRedeem * pointsValue).toFixed(2)} discount
        </span>
      </div>
    </div>
  );
};

export default RewardPoints;
