import React, { useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useLocation, useNavigate } from "react-router-dom";

const CustomerPortalPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tickets = [] } = location.state || {};

  const [flyer, setFlyer] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");

  // Group tickets by type
  const groupedTickets = tickets.reduce((acc, ticket) => {
    if (!acc[ticket.type]) acc[ticket.type] = { ...ticket, quantity: 0 };
    acc[ticket.type].quantity += 1;
    return acc;
  }, {});
  const ticketGroups = Object.values(groupedTickets);

  // Generate confirmation number
  const confirmationNumber = useMemo(() => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    return `CONF-${date}-${random}`;
  }, []);

  // Handle flyer upload
  const handleFlyerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFlyer(reader.result);
        setUploadedFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  // Confirm button sends flyer + tickets to EventList
  const handleConfirm = () => {
    navigate("/event-list", {
      state: {
        events: ticketGroups,
        flyer, // 👈 send flyer once as category-level image
      },
    });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            ✅ Your Purchased Tickets – Payment Confirmed
          </h2>
          <p className="text-gray-600 mt-1">
            Confirmation Number:{" "}
            <span className="font-mono">{confirmationNumber}</span>
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go to Dashboard
        </button>
      </div>

      {/* Flyer Upload */}
      <div className="mb-6 text-center">
        <label className="block mb-2 font-semibold">Upload Flyer / Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFlyerUpload}
          className="border p-2 rounded"
        />
        {uploadedFileName && (
          <p className="mt-2 text-gray-600">Selected file: {uploadedFileName}</p>
        )}

        {/* Show flyer preview above cards */}
        {flyer && (
          <div className="mt-4 flex justify-center">
            <img
              src={flyer}
              alt="Event Flyer"
              className="w-48 h-48 object-contain rounded-lg shadow-md"
            />
          </div>
        )}

        <button
          onClick={handleConfirm}
          disabled={!flyer}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          Confirm & Send to Event List
        </button>
      </div>

      {/* Ticket Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ticketGroups.map((ticket) => (
          <div
            key={ticket.type}
            className="border rounded-2xl shadow-md overflow-hidden bg-white flex flex-col items-center p-4"
          >
            {ticket.image && (
              <img
                src={ticket.image}
                alt={`${ticket.type} Seat`}
                className="w-32 h-32 object-cover rounded-lg mb-4"
              />
            )}

            <h3 className="font-bold text-lg mb-1">{ticket.type} Seat</h3>
            <p className="text-gray-600 mb-1">Price: ${ticket.price}</p>
            <p className="text-gray-600 mb-3">Quantity: {ticket.quantity}</p>

            <div className="p-2 bg-gray-100 rounded-lg">
              <QRCodeSVG
                value={`Ticket-${ticket.type}-Qty${ticket.quantity}-CONF${confirmationNumber}`}
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
