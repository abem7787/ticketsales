// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SellTickets from '../src/components/SellTickets';
import SeatingChart from '../src/components/SeatingChart';
import SignUp from "../src/components/SignUp"
import AdminDash from "../src/components/AdminDash"



function App() {
  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sell-tickets" element={<SellTickets />} />
        <Route path="/chart-seating" element={<SeatingChart />} />
          <Route path="/signup" element={<SignUp/>} />
             <Route path="/dashboard" element={<AdminDash/>} />
      </Routes>

  );
}

export default App;