import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerSeatSelection = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  // Load events from localStorage
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    setEvents(storedEvents);
  }, []);

  const handleBuyTickets = (event) => {
    // Pass event data to SeatSelection
    navigate("/seat-selection", { state: { event } });
  };

  if (events.length === 0) {
    return (
      <p className="text-center mt-8 text-gray-500">
        No events available at the moment.
      </p>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Available Events</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {events.map((event, idx) => (
          <div
            key={event.id || idx}
            onClick={() => handleBuyTickets(event)}
            className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            {event.flyer ? (
              <img
                src={event.flyer}
                alt={`${event.name || "Event"} Poster`}
                className="w-full h-[300px] object-cover"
              />
            ) : (
              <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center text-gray-600">
                No Poster
              </div>
            )}

            {/* Overlay details on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h4 className="text-white font-bold text-lg truncate">
                {event.name || "Unnamed Event"}
              </h4>
              <p className="text-gray-300">${event.price || 0}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerSeatSelection;
