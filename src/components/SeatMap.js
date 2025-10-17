import React from "react";

const SeatMap = ({ seats, selectedSeats, onSeatMouseDown, onSeatMouseOver }) => {
  const seatsPerRow = 6;
  const rows = [];
  for (let i = 0; i < seats.length; i += seatsPerRow) {
    rows.push(seats.slice(i, i + seatsPerRow));
  }

  const getSeatClass = (seat) => {
    if (seat.status !== "available") return "bg-gray-700 cursor-not-allowed";
    if (selectedSeats.some((s) => s.id === seat.id)) return "bg-green-500";
    switch (seat.type) {
      case "VIP":
        return "bg-yellow-400 hover:bg-yellow-500";
      case "Reserved":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  return (
    <div className="space-y-3">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-3">
          {row.map((seat) => (
            <div
              key={seat.id}
              onMouseDown={() => onSeatMouseDown(seat)}
              onMouseOver={() => onSeatMouseOver(seat)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold cursor-pointer ${getSeatClass(seat)}`}
              title={`Seat ${seat.id} - ${seat.type || "Standard"} - $${seat.price} - ${
                seat.status === "available" ? "Available" : "Unavailable"
              }`}
            >
              {seat.id}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatMap;
