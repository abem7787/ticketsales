import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

const CustomerPortalPage = ({ events = [], setEvents }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Tickets from payment page
  const tickets = location.state?.tickets || [];

  const [flyer, setFlyer] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");

  // ✅ Generate confirmation number
  const confirmationNumber = useMemo(() => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    return `CONF-${date}-${random}`;
  }, []);

  // ✅ Handle flyer upload
  const handleFlyerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFileName(file.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFlyer(reader.result); // base64 flyer
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Confirm and save events
  const handleConfirm = () => {
    if (!flyer) {
      alert("Please upload a flyer/logo first.");
      return;
    }

    const updatedTickets = tickets.map((t, idx) => ({
      ...t,
      flyer,
      eventIndex: idx,
      confirmationNumber,
    }));

    const updatedEvents = [...events, ...updatedTickets];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    navigate("/event-list", { state: { events: updatedEvents } });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            ✅ Your Purchased Tickets – Payment Confirmed
          </h2>
          <p className="text-gray-300 mt-1">
            Confirmation Number:{" "}
            <span className="font-mono text-green-400">{confirmationNumber}</span>
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go to Dashboard
        </button>
      </div>

      {/* Flyer Upload Section */}
      <div className="bg-slate-700 p-8 rounded-xl shadow-lg max-w-xl mx-auto text-center mb-10">
        <h2 className="text-2xl font-semibold mb-6">Upload Flyer / Logo</h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleFlyerUpload}
          className="mb-4"
        />

        {uploadedFileName && (
          <p className="mb-4 text-green-400">Uploaded: {uploadedFileName}</p>
        )}

        {flyer && (
          <div className="mb-6">
            <img
              src={flyer}
              alt="Flyer Preview"
              className="w-40 h-40 object-cover mx-auto rounded-lg shadow-md"
            />
          </div>
        )}

        <button
          onClick={handleConfirm}
          className="w-full py-2 text-xl bg-indigo-600 hover:bg-indigo-700 rounded-md"
        >
          Confirm & Continue
        </button>
      </div>

      {/* Ticket Cards */}
      {tickets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tickets.map((ticket, index) => (
            <div
              key={index}
              className="border rounded-2xl shadow-md overflow-hidden bg-white text-black flex flex-col items-center p-4"
            >
              {flyer && (
                <img
                  src={flyer}
                  alt="Event Flyer"
                  className="w-32 h-32 object-cover rounded-lg mb-4"
                />
              )}

              <h3 className="font-bold text-lg mb-1">
                {ticket.type || "General Admission"}
              </h3>
              {ticket.price && (
                <p className="text-gray-600 mb-1">Price: ${ticket.price}</p>
              )}
              {ticket.quantity && (
                <p className="text-gray-600 mb-3">
                  Quantity: {ticket.quantity}
                </p>
              )}

              <div className="p-2 bg-gray-100 rounded-lg">
                <QRCodeSVG
                  value={`Ticket-${ticket.type}-Qty${ticket.quantity}-${confirmationNumber}`}
                  size={128}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerPortalPage;
