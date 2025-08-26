import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaTicketAlt, FaGift, FaUserShield } from 'react-icons/fa';
import AdminTickets from '../components/AdminTickets'; // ✅ Import the component

const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-slate-800 w-64 min-h-screen text-white p-6">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <ul>
          <li className="mb-6">
            <Link to="/admin/dashboard" className="flex items-center space-x-3">
              <FaTachometerAlt className="text-xl" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="mb-6">
            <Link to="/admin/reward-points" className="flex items-center space-x-3">
              <FaGift className="text-xl" />
              <span>Reward Points</span>
            </Link>
          </li>
          <li className="mb-6">
            <Link to="/admin/promo-codes" className="flex items-center space-x-3">
              <FaTicketAlt className="text-xl" />
              <span>Promo Codes</span>
            </Link>
          </li>
          <li className="mb-6">
            <Link to="/admin/refunds" className="flex items-center space-x-3">
              <FaUserShield className="text-xl" />
              <span>Refunds</span>
            </Link>
          </li>
            <li className="mb-6">
            <Link to="/chart-seating" className="flex items-center space-x-3">
              <FaUserShield className="text-xl" />
              <span>Create Event</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-slate-700 p-8">
        <h2 className="text-2xl text-white mb-6">Welcome to the Admin Dashboard</h2>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-2">Total Tickets Sold</h3>
            <p className="text-lg text-white">1234</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-2">Revenue</h3>
            <p className="text-lg text-white">$12,345.67</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-2">Active Promo Codes</h3>
            <p className="text-lg text-white">5</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-8">
          <h3 className="text-xl text-white mb-4">Recent Activities</h3>
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
          <h3 className="text-xl text-white mb-4">Ticket List</h3>
          <AdminTickets /> {/* ✅ Inject the table component here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
