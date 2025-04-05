import './App.css';
import {  Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp'; // or SignUpPage
import Footer from './components/footer'
import AdminLogin from './components/AdminLogin';  // Import the new AdminLogin component
import AdminDashboard from './components/AdminDash';
import SeatSelection from './components/SeatSelection'; // Add this import

function App() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/select-seats" element={<SeatSelection />} /> {/* Add route for SeatSelection */}
      </Routes>
  
  );
}

export default App;