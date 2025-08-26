// App.js
import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Home from './Home';
import SellTickets from '../src/components/SellTickets';
import SeatingChart from '../src/components/SeatingChart';
import SignUp from "../src/components/SignUp"
import AdminDash from "../src/components/AdminDash"
import TicketsPage from "../src/components/TicketsPage";


function App() {
  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sell-tickets" element={<SellTickets />} />
        <Route path="/chart-seating" element={<SeatingChart />} />
          <Route path="/signup" element={<SignUp/>} />
             <Route path="/dashboard" element={<AdminDash/>} />
              <Route path="/tickets" element={<TicketsPage />} />
      </Routes>

  );
}

export default App;