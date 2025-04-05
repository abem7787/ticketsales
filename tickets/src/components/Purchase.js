import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Purchase = () => {
  const { eventId } = useParams(); // Get eventId from URL params
  const [event, setEvent] = useState(null);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
  });

  useEffect(() => {
    // Simulate fetching event details based on eventId
    const fetchEventDetails = () => {
      const eventData = {
        1: {
          eventName: 'Art Exhibition',
          artist: 'John Doe',
          price: 50.00,
        },
        2: {
          eventName: 'Painting Show',
          artist: 'Jane Smith',
          price: 75.00,
        },
        3: {
          eventName: 'Sculpture Display',
          artist: 'Bob Johnson',
          price: 60.00,
        },
      };
      setEvent(eventData[eventId]);
    };

    fetchEventDetails();
  }, [eventId]);

  const handlePurchase = (event) => {
    // Here, you would handle the purchase logic, such as sending data to your API for processing
    alert(`Purchasing ticket for ${event.eventName} with ${billingInfo.name}`);
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 flex justify-center items-center">
      <div className="bg-slate-700 p-8 rounded-xl shadow-lg max-w-xl w-full">
        <h2 className="text-2xl font-semibold mb-6">Purchase Tickets</h2>
        <div className="space-y-6 mb-4">
          <h3 className="text-xl">{event.eventName}</h3>
          <p className="text-sm text-gray-300">Artist: {event.artist}</p>
          <p className="text-lg text-indigo-500">Price: ${event.price}</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handlePurchase(event); }}>
          {/* Card Info */}
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm mb-2">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              className="w-full p-2 bg-slate-600 text-white rounded-md"
              value={cardInfo.cardNumber}
              onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
              required
            />
          </div>
          <div className="mb-4 flex justify-between">
            <div className="w-1/2 pr-2">
              <label htmlFor="expiryDate" className="block text-sm mb-2">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                className="w-full p-2 bg-slate-600 text-white rounded-md"
                value={cardInfo.expiryDate}
                onChange={(e) => setCardInfo({ ...cardInfo, expiryDate: e.target.value })}
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label htmlFor="cvv" className="block text-sm mb-2">CVV</label>
              <input
                type="text"
                id="cvv"
                className="w-full p-2 bg-slate-600 text-white rounded-md"
                value={cardInfo.cvv}
                onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Billing Info */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 bg-slate-600 text-white rounded-md"
              value={billingInfo.name}
              onChange={(e) => setBillingInfo({ ...billingInfo, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm mb-2">Address</label>
            <input
              type="text"
              id="address"
              className="w-full p-2 bg-slate-600 text-white rounded-md"
              value={billingInfo.address}
              onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
              required
            />
          </div>
          <div className="mb-4 flex justify-between">
            <div className="w-1/2 pr-2">
              <label htmlFor="city" className="block text-sm mb-2">City</label>
              <input
                type="text"
                id="city"
                className="w-full p-2 bg-slate-600 text-white rounded-md"
                value={billingInfo.city}
                onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label htmlFor="zip" className="block text-sm mb-2">Zip Code</label>
              <input
                type="text"
                id="zip"
                className="w-full p-2 bg-slate-600 text-white rounded-md"
                value={billingInfo.zip}
                onChange={(e) => setBillingInfo({ ...billingInfo, zip: e.target.value })}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-xl bg-indigo-600 hover:bg-indigo-700 rounded-md"
          >
            Complete Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default Purchase;
