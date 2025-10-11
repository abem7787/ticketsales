import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTicketAlt,
  FaGift,
  FaUserShield,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import AdminTickets from "../components/AdminTickets";

const AdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-700 relative">
      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center bg-slate-800 text-white p-4 sticky top-0 z-50 shadow-md">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Background Overlay for Mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-slate-800 text-white w-64 p-6 fixed md:static inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <h1 className="hidden md:block text-2xl font-bold mb-8">
          Admin Dashboard
        </h1>
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
            <Link
              to="/reward-points"
              className="flex items-center space-x-3 hover:text-slate-300"
              onClick={() => setMenuOpen(false)}
            >
              <FaGift className="text-xl" />
              <span>Reward Points</span>
            </Link>
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
            <h3 className="text-lg font-semibold text-white mb-2">
              Total Tickets Sold
            </h3>
            <p className="text-lg text-white">1234</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Revenue</h3>
            <p className="text-lg text-white">$12,345.67</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold text-white mb-2">
              Active Promo Codes
            </h3>
            <p className="text-lg text-white">5</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-8">
          <h3 className="text-xl text-white mb-4 text-center md:text-left">
            Recent Activities
          </h3>
          <ul className="space-y-4 text-white">
            <li className="bg-slate-800 p-4 rounded-lg shadow-md">
              <p className="font-semibold">User 123 purchased 2 tickets</p>
              <p className="text-sm text-slate-400">3 minutes ago</p>
            </li>
            <li className="bg-slate-800 p-4 rounded-lg shadow-md">
              <p className="font-semibold">Promo Code SUMMER21 applied</p>
              <p className="text-sm text-slate-400">15 minutes ago</p>
            </li>
            <li className="bg-slate-800 p-4 rounded-lg shadow-md">
              <p className="font-semibold">Refund request for order #123456</p>
              <p className="text-sm text-slate-400">30 minutes ago</p>
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
