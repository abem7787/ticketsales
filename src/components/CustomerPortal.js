// CustomerPortalPage.js
import React from "react";
import { QRCodeSVG } from "qrcode.react";

const CustomerPortalPage = ({ tickets }) => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        Your Purchased Tickets
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="border rounded-2xl shadow-md overflow-hidden bg-white flex flex-col items-center p-4"
          >
            {/* Image at the top */}
            <img
              src={ticket.image}
              alt={`${ticket.type} Seat`}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            {/* Ticket details */}
            <h3 className="font-bold text-lg mb-2">{ticket.type} Seat</h3>
            <p className="mb-3 text-gray-600">Price: ${ticket.price}</p>

            {/* QR Code */}
            <div className="p-2 bg-gray-100 rounded-lg">
              <QRCodeSVG
                value={`Ticket-${ticket.id}-${ticket.type}`}
                size={128}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerPortalPage;
