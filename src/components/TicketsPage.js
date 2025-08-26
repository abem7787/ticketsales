import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TicketWithQR from "./TicketWithQR";

const TicketsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tickets = location.state?.tickets || [];

  if (tickets.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">No Tickets Found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center">Your Tickets</h2>
      {tickets.map((ticket) => (
        <TicketWithQR key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketsPage;
