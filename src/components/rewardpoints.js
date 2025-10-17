import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTicketAlt,
  FaGift,
  FaUserShield,
  FaBars,
  FaTimes,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import AdminTickets from "../components/AdminTickets";

const AdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Reward Points sample data
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", points: 150 },
    { id: 2, name: "Jane Smith", points: 300 },
    { id: 3, name: "Mike Johnson", points: 80 },
  ]);

  const handleAddPoints = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, points: u.points + 10 } : u))
    );
  };

  const handleDeductPoints = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id && u.points > 0 ? { ...u, points: u.points - 10 } : u
      )
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-700">
      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center bg-slate-800 text-white p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-slate-800 text-white w-64 p-6 absolute md:static md:translate-x-0 min-h-screen transform transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:block`}
      >
        <h1 className="hidden md:block text-3xl font-bold mb-8">Admin Dashboard</h1>
        <ul>
          <li className="mb-6">
            <Link
              to="/chart-seating"
              className="flex items-center space-x-3 hover:text-slate-300"
              onClick={() => setMenuOpen(false)}
            >
              <FaTachometerAlt className="text-xl" />
              <span>Chart Seating</span>
            </Link>
          </li>
          <li className="mb-6">
            <a
              href="#rewards"
              className="flex items-center space-x-3 hover:text-slate-300"
              onClick={() => setMenuOpen(false)}
            >
              <FaGift className="text-xl" />
              <span>Reward Points</span>
            </a>
          </li>
          <li className="mb-6">
            <Link
              to="/promo-codes"
              className="flex items-center space-x-3 hover:text-slate-300"
              onClick={() => setMenuOpen(false)}
            >
              <FaTicketAlt className="text-xl" />
              <span>Promo Codes</span>
            </Link>
          </li>
          <li className="mb-6">
            <Link
              to="/refunds"
              className="flex items-center space-x-3 hover:text-slate-300"
              onClick={() => setMenuOpen(false)}
            >
              <FaUserShield className="text-xl" />
              <span>Refunds</span>
            </Link>
          </li>
          <li className="mb-6">
            <Link
              to="/create-event"
              className="flex items-center space-x-3 hover:text-slate-300"
              onClick={() => setMenuOpen(false)}
            >
              <FaUserShield className="text-xl" />
              <span>Create Event</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <h2 className="text-2xl text-white mb-6 text-center md:text-left">
          Welcome to the Admin Dashboard
        </h2>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Total Tickets Sold</h3>
            <p className="text-lg text-white">1234</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Revenue</h3>
            <p className="text-lg text-white">$12,345.67</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Active Promo Codes</h3>
            <p className="text-lg text-white">5</p>
          </div>
        </div>

        {/* Reward Points Section */}
        <div id="rewards" className="mt-12">
          <h3 className="text-2xl text-white mb-4 text-center md:text-left">
            Reward Points System
          </h3>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div className="bg-slate-800 p-4 rounded-lg text-center shadow-md">
              <h4 className="text-white text-lg font-semibold">Total Points Issued</h4>
              <p className="text-xl text-green-400 font-bold mt-2">
                {users.reduce((sum, u) => sum + u.points, 0)}
              </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg text-center shadow-md">
              <h4 className="text-white text-lg font-semibold">Redeemed Points</h4>
              <p className="text-xl text-yellow-400 font-bold mt-2">120</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg text-center shadow-md">
              <h4 className="text-white text-lg font-semibold">Available Balance</h4>
              <p className="text-xl text-blue-400 font-bold mt-2">350</p>
            </div>
          </div>

          {/* Manage Users Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-slate-800 text-white rounded-lg">
              <thead>
                <tr className="bg-slate-700 text-left">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Current Points</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-slate-600 hover:bg-slate-700"
                  >
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.points}</td>
                    <td className="py-3 px-4 flex justify-center space-x-4">
                      <button
                        onClick={() => handleAddPoints(user.id)}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
                      >
                        <FaPlus />
                      </button>
                      <button
                        onClick={() => handleDeductPoints(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                      >
                        <FaMinus />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-12">
          <h3 className="text-xl text-white mb-4 text-center md:text-left">
            Recent Activities
          </h3>
          <ul className="space-y-4 text-white">
            <li className="bg-slate-800 p-4 rounded-lg shadow-md">
              <p className="font-semibold">User 123 purchased 2 tickets</p>
              <p className="text-sm">3 minutes ago</p>
            </li>
            <li className="bg-slate-800 p-4 rounded-lg shadow-md">
              <p className="font-semibold">Promo Code SUMMER21 applied</p>
              <p className="text-sm">15 minutes ago</p>
            </li>
            <li className="bg-slate-800 p-4 rounded-lg shadow-md">
              <p className="font-semibold">Refund request for order #123456</p>
              <p className="text-sm">30 minutes ago</p>
            </li>
          </ul>
        </div>

        {/* AdminTickets Table Section */}
        <div className="mt-12">
          <h3 className="text-xl text-white mb-4 text-center md:text-left">
            Ticket List
          </h3>
          <div className="overflow-x-auto">
            <AdminTickets />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
