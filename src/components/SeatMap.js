import React from "react";

const SeatMap = ({ seats, selectedSeats, onSeatClick }) => {
  return (
    <div className="grid grid-cols-8 gap-2 mb-6">
      {seats.map((seat) => {
        const isSelected = selectedSeats.some((s) => s.id === seat.id);
        return (
          <button
            key={seat.id}
            onClick={() => onSeatClick(seat)}
            disabled={!seat.available}
            className={`w-10 h-10 rounded-md ${
              !seat.available
                ? "bg-gray-400 cursor-not-allowed"
                : isSelected
                ? "bg-green-500 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {seat.id} - ${seat.price}
          </button>
        );
      })}
    </div>
  );
};

export default SeatMap;
