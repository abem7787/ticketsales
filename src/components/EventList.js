import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EventList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { events: newEvents = [] } = location.state || {};

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (newEvents.length > 0) {
      setEvents(newEvents); // Always replace with latest array
    }
  }, [newEvents]);

  const handleBuyTickets = (event) => {
    navigate("/customer-portal", { state: { tickets: [event], existingEvents: events } });
  };

  const goToDashboard = () => {
    navigate("/dashboard", { state: { events } });
  };

  if (events.length === 0) {
    return <p className="text-center mt-8 text-gray-500">No events available.</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center">Events</h2>
        <button
          onClick={goToDashboard}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Dashboard
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {events.map((event, idx) => (
          <div
            key={event.eventIndex || idx}
            className="relative w-[200px] cursor-pointer group"
            onClick={() => handleBuyTickets(event)}
          >
            {event.flyer ? (
              <img
                src={event.flyer}
                alt={`${event.name} Poster`}
                className="rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-[200px] h-[300px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-600">
                No Poster
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-3 rounded-b-xl text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h4 className="font-semibold truncate">
                {idx + 1}. {event.name}
              </h4>
              <p>${event.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
