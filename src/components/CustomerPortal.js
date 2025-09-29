import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CustomerPortalPage = ({ events = [], setEvents }) => {
  const navigate = useNavigate();
  const location = useLocation();

<<<<<<< HEAD
  // ✅ Tickets come from payment page
  const tickets = location.state?.tickets || [];
=======
  const [flyer, setFlyer] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
>>>>>>> e7e99fcfd39a7632b3185783301aeff805c19d0d

  const [flyer, setFlyer] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");

<<<<<<< HEAD
=======
  // Generate confirmation number
  const confirmationNumber = useMemo(() => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    return `CONF-${date}-${random}`;
  }, []);

  // Handle flyer upload
>>>>>>> e7e99fcfd39a7632b3185783301aeff805c19d0d
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

  const handleConfirm = () => {
<<<<<<< HEAD
    if (!flyer) {
      alert("Please upload a flyer/logo first.");
      return;
    }

    // ✅ Attach flyer to ALL tickets
    const updatedTickets = tickets.map((t, idx) => ({
      ...t,
      flyer,
      eventIndex: idx, // for seat selection routing
    }));

    // ✅ Save new events
    const updatedEvents = [...events, ...updatedTickets];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    // ✅ Navigate straight to Event List
    navigate("/event-list", { state: { events: updatedEvents } });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex justify-center items-center">
      <div className="bg-slate-700 p-8 rounded-xl shadow-lg max-w-xl w-full text-center">
        <h2 className="text-2xl font-semibold mb-6">Upload Flyer / Logo</h2>
=======
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
>>>>>>> e7e99fcfd39a7632b3185783301aeff805c19d0d

        <input
          type="file"
          accept="image/*"
          onChange={handleFlyerUpload}
          className="mb-4"
        />
<<<<<<< HEAD

        {uploadedFileName && (
          <p className="mb-4 text-green-400">
            Uploaded: {uploadedFileName}
          </p>
        )}

        {flyer && (
          <div className="mb-6">
            <img
              src={flyer}
              alt="Flyer Preview"
              className="w-40 h-40 object-cover mx-auto rounded-lg shadow-md"
=======
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
>>>>>>> e7e99fcfd39a7632b3185783301aeff805c19d0d
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
<<<<<<< HEAD
=======

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
>>>>>>> e7e99fcfd39a7632b3185783301aeff805c19d0d
    </div>
  );
};

export default CustomerPortalPage;
