import React, { useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useLocation, useNavigate } from "react-router-dom";

const CustomerPortalPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tickets = [] } = location.state || {};

  const [flyer, setFlyer] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load existing events from localStorage
  const [events, setEvents] = useState(() => {
    return JSON.parse(localStorage.getItem("events") || "[]");
  });

  // Group tickets by type for display
  const groupedTickets = tickets.reduce((acc, ticket) => {
    if (!acc[ticket.type]) acc[ticket.type] = { ...ticket, quantity: 0 };
    acc[ticket.type].quantity += 1;
    return acc;
  }, {});
  const ticketGroups = Object.values(groupedTickets);

  // Generate unique confirmation number
  const confirmationNumber = useMemo(() => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    return `CONF-${date}-${random}`;
  }, []);

  // Flyer upload handler
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

  // Confirm tickets and save flyer to localStorage
  const handleConfirm = () => {
    if (!flyer || currentIndex >= tickets.length) return;

    const currentTicket = {
      ...tickets[currentIndex],
      flyer,
      eventIndex: currentIndex,
    };

    const updatedEvents = [...events, currentTicket];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    // Move to next ticket or navigate to Event List
    if (currentIndex + 1 < tickets.length) {
      setCurrentIndex((prev) => prev + 1);
      setFlyer(null);
      setUploadedFileName("");
    } else {
      navigate("/event-list", { state: { events: updatedEvents } });
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {flyer && (
        <div className="mb-6 flex justify-center">
          <img
            src={flyer}
            alt="Uploaded Flyer"
            className="w-full max-h-72 object-contain rounded-xl shadow-md"
          />
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            ✅ Your Purchased Tickets – Payment Confirmed
          </h2>
          <p className="text-gray-600 mt-1">
            Confirmation Number: <span className="font-mono">{confirmationNumber}</span>
          </p>
          {currentIndex < tickets.length && (
            <p className="text-gray-600 mt-1">
              Upload flyer for ticket: <strong>{tickets[currentIndex].type}</strong>
            </p>
          )}
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go to Dashboard
        </button>
      </div>

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
        <button
          onClick={handleConfirm}
          disabled={!flyer || currentIndex >= tickets.length}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          Confirm & Send to Event List
        </button>
      </div>

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
