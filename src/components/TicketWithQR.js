import React from "react";
import { QRCodeCanvas } from "qrcode.react"; // <-- use named import

const TicketWithQR = ({ ticket }) => {
  return (
    <div className="ticket p-4 border rounded shadow space-y-2">
      <h2 className="font-bold text-lg">{ticket.event}</h2>
      <p>Seat: {ticket.seat}</p>
      <p>Price: ${ticket.price}</p>
      <QRCodeCanvas value={JSON.stringify(ticket)} size={128} />
    </div>
  );
};

export default TicketWithQR;
