import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './button'; // Reusable Button component

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // React Router navigation

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can add logic to validate username/password if needed
    // For now, it directly navigates after submitting
    navigate('/admin-dashboard'); // Navigate to admin dashboard
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 flex justify-center items-center">
      <div className="bg-slate-700 p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-2 bg-slate-600 text-white rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 bg-slate-600 text-white rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" size="md" className="w-full py-2 text-xl bg-indigo-600 hover:bg-indigo-700">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
