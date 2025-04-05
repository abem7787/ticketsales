import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp'; // or SignUpPage
import Footer from './components/footer'

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
  
  );
}

export default App;