// App.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import SellTickets from "./components/SellTickets";
import SeatingChart from "./components/SeatingChart";
import SignUp from "./components/SignUp";
import AdminDash from "./components/AdminDash";
import TicketsPage from "./components/TicketsPage";
import CustomerPortal from "./components/CustomerPortal";
import Login from "./components/Login";

function App() {
  const [purchaseTickets, setPurchasedTickets] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sell-tickets" element={<SellTickets />} />
      <Route path="/chart-seating" element={<SeatingChart />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<AdminDash />} />
      <Route
        path="/tickets"
        element={<TicketsPage setPurchasedTickets={setPurchasedTickets} />}
      />
      <Route
        path="/customer-portal"
        element={<CustomerPortal tickets={purchaseTickets} />}
      />
    </Routes>
  );
}

export default App;
