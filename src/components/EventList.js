import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching events from API (mocked as an array of events here)
    const fetchEvents = () => {
      const eventsData = [
        {
          id: 1,
          artist: 'John Doe',
          photo: 'https://via.placeholder.com/150',
          eventName: 'Art Exhibition',
          price: 50.00,
        },
        {
          id: 2,
          artist: 'Jane Smith',
          photo: 'https://via.placeholder.com/150',
          eventName: 'Painting Show',
          price: 75.00,
        },
        {
          id: 3,
          artist: 'Bob Johnson',
          photo: 'https://via.placeholder.com/150',
          eventName: 'Sculpture Display',
          price: 60.00,
        }
      ];
      setEvents(eventsData);
    };

    fetchEvents();
  }, []);

  const handleEventSelection = (eventId) => {
    // Navigate to the purchase page with eventId
    navigate(`/purchase/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 flex justify-center items-center">
      <div className="bg-slate-700 p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6">Available Events</h2>
        <div className="space-y-6">
          {events.map((event) => (
            <div key={event.id} className="bg-slate-600 p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <img src={event.photo} alt={event.artist} className="w-24 h-24 object-cover rounded-md" />
                <div className="ml-4">
                  <h3 className="text-xl">{event.eventName}</h3>
                  <p className="text-sm text-gray-300">Artist: {event.artist}</p>
                  <p className="text-lg text-indigo-500">${event.price}</p>
                </div>
              </div>
              <button 
                onClick={() => handleEventSelection(event.id)}
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
              >
                Select Event
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventList;
