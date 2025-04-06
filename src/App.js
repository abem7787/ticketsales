import './App.css';
import {  Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp'; // or SignUpPage
import Footer from './components/footer'
import AdminLogin from './components/AdminLogin';  // Import the new AdminLogin component
import AdminDashboard from './components/AdminDash';
import SeatSelection from './components/SeatSelection'; // Add this import
import PaymentForm from "./components/PaymentForm"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Purchase from './components/Purchase';
import AdminTickets from './components/AdminTickets';
import QRCodeDisplay from './components/QRCodeDisplay'; // Import the new component for QR code display

const stripePromise = loadStripe('your-public-key');  // Replace with your actual Stripe public key


function App() {
  return (
    <Elements stripe={stripePromise}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/select-seats" element={<SeatSelection />} />
        <Route path="/payment" element={<PaymentForm />} />  {/* Add your PaymentForm route */}
        <Route path="/purchase/:eventId" element={<Purchase />} />
        <Route path="/admin/tickets" element={<AdminTickets />} />
        <Route path="/admin/QRCodeDisplay" element={< QRCodeDisplay/>} />
      </Routes>
    </Elements>
  
  );
}

export default App;