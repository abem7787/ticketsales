import React, { useState } from 'react';

const SearchBar = ({ events, onSearch }) => {
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');

  const handleSearch = () => {
    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      const searchDate = new Date(date);
      const isDateMatch = date ? eventDate.toDateString() === searchDate.toDateString() : true;
      const isCityMatch = city ? event.city.toLowerCase().includes(city.toLowerCase()) : true;
      const isZipcodeMatch = zipcode ? event.zipcode.includes(zipcode) : true;

      return isDateMatch && isCityMatch && isZipcodeMatch;
    });

    onSearch(filteredEvents);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4 bg-slate-800  shadow-lg rounded-lg flex items-center justify-between">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Event Date"
        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#yourAppColor] focus:border-transparent w-1/3 text-black"
      />
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search by Artist, Event, or Venue"
        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#yourAppColor] focus:border-transparent w-1/3 text-black"
      />
      <input
        type="text"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
        placeholder="Coty or Zipcode"
        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#yourAppColor] focus:border-transparent w-1/3 text-black"
      />
      <button
        onClick={handleSearch}
        className="bg-[#yourAppColor] text-white py-2 px-6 rounded-md hover:bg-opacity-80 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#yourAppColor]"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
