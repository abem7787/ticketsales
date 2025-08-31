// CustomerPortalPage.js
import React from "react";
import { QRCodeSVG } from "qrcode.react";

const CustomerPortalPage = ({ tickets }) => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Your Purchased Tickets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="border p-4 rounded shadow text-center"
          >
            <h3 className="font-bold mb-2">{ticket.type} Seat</h3>
            <p className="mb-2">Price: ${ticket.price}</p>
            <QRCodeSVG value={`Ticket-${ticket.id}-${ticket.type}`} size={128} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerPortalPage;
