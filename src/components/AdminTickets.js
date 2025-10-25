import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const dummyTickets = [
  {
    id: 'ABC123',
    customer: 'John Doe',
    event: 'Music Fest 2025',
    confirmation: 'CONF001',
  },
  {
    id: 'DEF456',
    customer: 'Jane Smith',
    event: 'Tech Summit 2025',
    confirmation: 'CONF002',
  },
  {
    id: 'GHI789',
    customer: 'John Johnson',
    event: 'Music Expo',
    confirmation: 'CONF003',
  },
  {
    id: 'GHI789',
    customer: 'Bob The Builder',
    event: 'Shakesphere live',
    confirmation: 'CONF004',
  },
  {
    id: 'GHI789',
    customer: 'Bob Dillon',
    event: 'Art Expo',
    confirmation: 'CONF005',
  },
  {
    id: 'GHI789',
    customer: 'Bob Moses',
    event: 'Concert',
    confirmation: 'CONF006',
  },
];

const AdminTickets = () => {
  return (
    <div className="p-8 bg-slate-700 min-h-screen text-white">
      <h2 className="text-2xl mb-6 font-bold">Tickets</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-slate-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="text-left bg-slate-900 text-white">
              <th className="py-3 px-6">QR Code</th>
              <th className="py-3 px-6">Customer</th>
              <th className="py-3 px-6">Event</th>
              <th className="py-3 px-6">Confirmation #</th>
            </tr>
          </thead>
          <tbody>
            {dummyTickets.map((ticket, index) => (
              <tr
                key={`${ticket.id}-${index}`} // ✅ Unique key now
                className="border-t border-slate-700 hover:bg-slate-600 transition"
              >
                <td className="py-4 px-6">
                  <QRCodeCanvas value={ticket.confirmation} size={64} />
                </td>
                <td className="py-4 px-6">{ticket.customer}</td>
                <td className="py-4 px-6">{ticket.event}</td>
                <td className="py-4 px-6">{ticket.confirmation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTickets;
