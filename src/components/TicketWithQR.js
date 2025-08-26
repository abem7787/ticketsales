// src/components/TicketWithQR.jsx
import React from 'react';
import QRCode from 'qrcode.react';

const TicketWithQR = ({ ticket }) => {
  const qrData = JSON.stringify({
    seat: ticket.seat,
    price: ticket.price,
    event: ticket.event,
    id: ticket.id
  });

  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-md text-white">
      <h4 className="font-semibold mb-2">Seat: {ticket.seat}</h4>
      <p>Event: {ticket.event}</p>
      <p>Price: ${ticket.price}</p>
      <div className="mt-4 flex justify-center">
        <QRCode value={qrData} size={100} />
      </div>
    </div>
  );
};

export default TicketWithQR;
