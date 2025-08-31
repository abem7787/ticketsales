// TicketsPage.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

const TicketsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tickets = location.state?.tickets || [];
  const subtotal = location.state?.subtotal || 0;
  const serviceFee = location.state?.serviceFee || 0;
  const total = location.state?.total || 0;

  if (!tickets.length) {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="border p-4 rounded-lg shadow flex flex-col items-center space-y-3 bg-white"
          >
            <QRCodeSVG value={ticket.qrData} size={128} />

            {ticket.image && (
              <img
                src={ticket.image}
                alt="Seat"
                className="w-32 h-32 object-cover rounded"
              />
            )}

            <div className="text-center">
              <p className="font-semibold text-lg">{ticket.seat}</p>
              <p className="text-gray-600">{ticket.type} Seat</p>
              <p className="text-green-700 font-bold">${ticket.price}</p>
              <p className="text-sm text-gray-500">{ticket.event}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 border rounded-lg shadow bg-gray-50 max-w-md mx-auto text-center space-y-2">
        <p><strong>Subtotal:</strong> ${subtotal}</p>
        <p><strong>Service Fee (5%):</strong> ${serviceFee.toFixed(2)}</p>
        <p className="text-xl font-bold"><strong>Total:</strong> ${total.toFixed(2)}</p>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() =>
            navigate("/paymentportal", { state: { tickets, subtotal, serviceFee, total } })
          }
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Continue to Checkout
        </button>
      </div>
    </div>
  );
};

export default TicketsPage;
