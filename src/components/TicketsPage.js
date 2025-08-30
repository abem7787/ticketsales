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
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Your Tickets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {tickets.map((ticket) => (
          <TicketWithQR key={ticket.id} ticket={ticket} className="w-32 h-44" />
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
