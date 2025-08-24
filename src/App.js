// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import SellTickets from './components/SellTickets';
import SeatingChart from './components/SeatingChart';
import SignUp from './components/SignUp';
import DashboardPage from './components/CustomerDash';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sell-tickets" element={<SellTickets />} />
      <Route path="/chart-seating" element={<SeatingChart />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
