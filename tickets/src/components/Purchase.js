import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react'; // or QRCodeSVG


const Purchase = () => {
  const { eventId } = useParams();
  const location = useLocation();

  const [event, setEvent] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [totalPaid, setTotalPaid] = useState(0);

  useEffect(() => {
    // Simulate fetching event details
    const fetchEventDetails = () => {
      const eventData = {
        1: { eventName: 'Art Exhibition', artist: 'John Doe', price: 50.00 },
        2: { eventName: 'Painting Show', artist: 'Jane Smith', price: 75.00 },
        3: { eventName: 'Sculpture Display', artist: 'Bob Johnson', price: 60.00 },
      };
      setEvent(eventData[eventId]);
    };

    fetchEventDetails();

    if (location.state) {
      setCustomerName(location.state.customerName || '');
      setTotalPaid(location.state.total || 0);
    }

    // Generate a unique confirmation code
    const generateConfirmationCode = () => {
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      setConfirmationCode(code);
    };

    generateConfirmationCode();
  }, [eventId, location.state]);

  if (!event) return <div>Loading...</div>;

  const qrData = {
    name: customerName,
    event: event.eventName,
    code: confirmationCode,
    total: totalPaid,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 flex justify-center items-center">
      <div className="bg-slate-700 p-8 rounded-xl shadow-lg max-w-xl w-full text-center">
        <h2 className="text-2xl font-bold mb-6">Purchase Confirmed!</h2>

        <p className="text-lg mb-2">Thank you, <strong>{customerName}</strong></p>
        <p className="mb-2">You have successfully purchased a ticket for:</p>
        <p className="text-xl font-semibold text-indigo-400">{event.eventName}</p>
        <p className="text-sm text-gray-300 mb-4">Artist: {event.artist}</p>

        <p className="text-lg mb-1">Total Paid: <strong>${totalPaid.toFixed(2)}</strong></p>
        <p className="text-sm text-green-300">Confirmation Code:</p>
        <p className="text-xl font-mono text-yellow-300 mb-4">{confirmationCode}</p>

        <div className="bg-white p-4 rounded-md inline-block">
        <QRCodeCanvas value="some text or URL" />

        </div>

        <p className="text-sm text-gray-400 mt-4">Present this QR code at the event entrance.</p>
      </div>
    </div>
  );
};

export default Purchase;
