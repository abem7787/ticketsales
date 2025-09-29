import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CustomerPortalPage = ({ events = [], setEvents }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Tickets come from payment page
  const tickets = location.state?.tickets || [];

  const [flyer, setFlyer] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");

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

        <input
          type="file"
          accept="image/*"
          onChange={handleFlyerUpload}
          className="mb-4"
        />

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
    </div>
  );
};

export default CustomerPortalPage;
