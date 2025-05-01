// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SellTickets from '../src/components/SellTickets';
import SeatingChart from '../src/components/SeatingChart';



function App() {
  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sell-tickets" element={<SellTickets />} />
        <Route path="/chart-seating" element={<SeatingChart />} />
      </Routes>

  );
}

export default App;