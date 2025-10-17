import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EventList = ({ events: propEvents = [] }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(propEvents);

  // Load saved events from localStorage if propEvents is empty
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(propEvents.length ? propEvents : savedEvents);
  }, [propEvents]);

  // Handle event click
  const handleSelectEvent = (event) => {
    // Save selected event to localStorage for seat selection
    localStorage.setItem("eventConfig", JSON.stringify(event));
    navigate(`/seat-selection/${event.eventIndex}`);
  };

  if (!events.length) {
    return (
      <p className="text-center mt-8 text-gray-500">
        No events available.
      </p>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Events</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {events.map((event, idx) => {
          const seatCount = event.seats?.length || 0;
          const minPrice = seatCount
            ? Math.min(...event.seats.map((s) => s.price))
            : 0;

          return (
            <div
              key={event.eventIndex || idx}
              className="relative w-[200px] cursor-pointer group"
              onClick={() => handleSelectEvent(event)}
            >
              {event.flyer ? (
                <img
                  src={event.flyer}
                  alt={`${event.name || "Event"} Poster`}
                  className="rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-[200px] h-[300px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-600">
                  No Poster
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-3 rounded-b-xl text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="font-semibold truncate">
                  {idx + 1}. {event.name || "Untitled Event"}
                </h4>
                <p>{seatCount} Seats Available</p>
                <p>From ${minPrice}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventList;
