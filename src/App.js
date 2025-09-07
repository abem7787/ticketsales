import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import SellTickets from "./components/SellTickets";
import SeatingChart from "./components/SeatingChart";
import SignUp from "./components/SignUp";
import AdminDash from "./components/AdminDash";
import TicketsPage from "./components/TicketsPage";
import CustomerPortalPage from "./components/CustomerPortal";
import Login from "./components/Login";
import PaymentPage from "./components/PaymentPage";
import EventList from "./components/EventList";
import CustomerEventList from "./components/CustomerEventList"; 
import CustomerSeatSelection from "./components/CustomerSeatSelection;";


function App() {
  const [purchasedTickets, setPurchasedTickets] = useState([]); // updated state name
  const [events, setEvents] = useState([]); // Store events globally

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sell-tickets" element={<SellTickets />} />
      <Route path="/chart-seating" element={<SeatingChart />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<AdminDash setEvents={setEvents} />} />
     <Route path="/customer-seat-selection" element={<CustomerSeatSelection setEvents={setEvents} />} />
      <Route
        path="/tickets"
        element={<TicketsPage setPurchasedTickets={setPurchasedTickets} />}
      />
         <Route path="/customer-event-list" element={<CustomerEventList events={events} />} /> {/* customer view */}
    
      <Route path="/event-list" element={<EventList events={events} />} />
      <Route
        path="/customer-portal"
        element={<CustomerPortalPage purchasedTickets={purchasedTickets} />}
      />
      <Route path="/payment" element={<PaymentPage />} />
    </Routes>
  );
}

export default App;
