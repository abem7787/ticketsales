import React from "react";
import TicketWithQR from "./TicketWithQR";

const CustomerPortal = () => {
  // Example tickets (replace with API or DB data later)
  const tickets = [
    { id: 1, event: "Concert A", seat: "A1", row: "A", price: 120 },
    { id: 2, event: "Concert A", seat: "A2", row: "A", price: 120 },
    { id: 3, event: "Concert B", seat: "B5", row: "B", price: 95 },
    { id: 4, event: "Concert C", seat: "C10", row: "C", price: 75 },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">🎟️ My Tickets</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <TicketWithQR key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default CustomerPortal;
