import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import SellTickets from "./components/SellTickets";
import SeatingChart from "./components/SeatingChart";
import SignUp from "./components/SignUp";
import AdminDash from "./components/AdminDash";
import TicketsPage from "./components/TicketsPage";
import CustomerPortalPage from "./components/CustomerPortal";
import Login from "./components/Login";
import PaymentPage from "./components/PaymentPage";
import SeatSelection from "./components/SeatSelection";

function App() {
  const [events, setEvents] = useState([
    {
      eventIndex: 1,
      name: "Concert A",
      price: 50,
      flyer: "",
      seats: [
        { id: "A1", price: 50, available: true, type: "Standard" },
        { id: "A2", price: 50, available: true, type: "Standard" },
        { id: "A3", price: 75, available: true, type: "VIP" },
      ],
    },
    {
      eventIndex: 2,
      name: "Concert B",
      price: 75,
      flyer: "",
      seats: [
        { id: "B1", price: 75, available: true, type: "Standard" },
        { id: "B2", price: 100, available: true, type: "VIP" },
      ],
    },
  ]);

  const [purchasedTickets, setPurchasedTickets] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sell-tickets" element={<SellTickets />} />
      <Route path="/chart-seating" element={<SeatingChart />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<AdminDash setEvents={setEvents} />} />

      {/* Seat selection route */}
      <Route
        path="/seat-selection/:id"
        element={<SeatSelection events={events} setEvents={setEvents} />}
      />

      <Route
        path="/customer-portal"
        element={
          <CustomerPortalPage
            events={events}
            setEvents={setEvents}
            purchasedTickets={purchasedTickets}
          />
        }
      />

      <Route
        path="/tickets"
        element={<TicketsPage setPurchasedTickets={setPurchasedTickets} />}
      />

      <Route path="/payment" element={<PaymentPage />} />

      {/* Redirect any unknown path to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
