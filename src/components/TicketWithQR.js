import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const TicketWithQR = ({ ticket, className }) => {
  return (
    <div
      className={`ticket p-2 border rounded shadow-sm space-y-1 bg-white flex flex-col items-center ${className}`}
    >
      <h2 className="font-semibold text-sm text-center">{ticket.event}</h2>
      <div className="flex items-center justify-center w-full">
        <span className="text-xs font-bold px-2 py-1 border rounded bg-gray-100">
          Seat {ticket.seat}
        </span>
      </div>
      <p className="text-xs">Price: ${ticket.price}</p>
      <QRCodeCanvas value={JSON.stringify(ticket)} size={96} />
    </div>
  );
};

export default TicketWithQR;
