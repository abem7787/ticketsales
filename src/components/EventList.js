import React from "react";
import { useNavigate } from "react-router-dom";

const EventList = ({ events }) => {
  const navigate = useNavigate();

  const handleBuyTickets = (event) => {
    navigate("/customer-portal", { state: { tickets: [event] } });
  };

  if (!events || events.length === 0) {
    return <p className="text-center mt-8">No events available at the moment.</p>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Events</h2>
      {events.map((event) => (
        <div key={event.id} className="mb-8 p-4 border rounded-xl shadow-lg text-center">
          <h3 className="text-lg font-semibold mb-2">{event.name}</h3>

          {/* Display the uploaded flyer */}
          {event.flyer && (
            <img
              src={event.flyer}
              alt={`${event.name} Flyer`}
              className="w-32 h-32 object-contain rounded-md mx-auto mb-2"
            />
          )}

          <p className="mb-2 font-medium">{event.type} Ticket - ${event.price}</p>
          <button
            onClick={() => handleBuyTickets(event)}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Buy Ticket
          </button>
        </div>
      ))}
    </div>
  );
};

export default EventList;
