import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CustomerPortalPage = ({ events = [], setEvents }) => {
  const navigate = useNavigate();

  const [flyer, setFlyer] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [eventName, setEventName] = useState("");
  const [seatCount, setSeatCount] = useState("");
  const [seatPrice, setSeatPrice] = useState("");

  const confirmationNumber = useMemo(() => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    return `CONF-${date}-${random}`;
  }, []);

  const handleFlyerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFileName(file.name);

      const reader = new FileReader();
      reader.onloadend = () => setFlyer(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (!flyer || !eventName || !seatCount || !seatPrice) {
      alert("Please enter all event details and upload a flyer.");
      return;
    }

    const seats = Array.from({ length: Number(seatCount) }, (_, i) => ({
      id: i + 1,
      type: "Standard",
      price: Number(seatPrice),
      available: true,
    }));

    const newEvent = {
      eventIndex: Date.now(),
      name: eventName,
      flyer,
      seats,
      confirmationNumber,
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    navigate("/event-list");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="bg-slate-700 p-8 rounded-xl shadow-lg max-w-xl mx-auto text-center mb-10">
        <h2 className="text-2xl font-semibold mb-6">Create Event</h2>

        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="mb-4 p-2 w-full rounded-md text-black"
        />

        <input
          type="number"
          placeholder="Number of Seats"
          value={seatCount}
          onChange={(e) => setSeatCount(e.target.value)}
          className="mb-4 p-2 w-full rounded-md text-black"
        />

        <input
          type="number"
          placeholder="Price per Seat"
          value={seatPrice}
          onChange={(e) => setSeatPrice(e.target.value)}
          className="mb-4 p-2 w-full rounded-md text-black"
        />

        <input type="file" accept="image/*" onChange={handleFlyerUpload} className="mb-4" />
        {uploadedFileName && <p className="text-green-400 mb-4">Uploaded: {uploadedFileName}</p>}
        {flyer && (
          <img
            src={flyer}
            alt="Flyer Preview"
            className="w-40 h-40 object-cover mx-auto rounded-lg mb-6"
          />
        )}

        <button
          onClick={handleConfirm}
          className="w-full py-2 text-xl bg-indigo-600 hover:bg-indigo-700 rounded-md"
        >
          Save Event & Continue
        </button>
      </div>
    </div>
  );
};

export default CustomerPortalPage;
