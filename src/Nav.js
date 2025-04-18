import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import logo from './assets/logo.png'; // Make sure to adjust this path if needed

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white py-4 px-6 flex justify-between items-center relative">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-20 md:h-24 w-auto mr-4" />
      </div>

      {/* Hamburger Icon - Aligned to the right */}
      <div className="absolute right-6 md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
          <FaBars size={24} />
        </button>
      </div>

      {/* Menu Items */}
      <ul
        className={`absolute top-full right-0 bg-black text-white w-full md:static md:flex md:space-x-8 md:w-auto transition-all duration-300 ease-in-out ${
          menuOpen ? 'block' : 'hidden'
        }`}
      >
        <li className="py-2 px-4 hover:text-yellow-500">
          <a href="#home">Home</a>
        </li>
        <li className="py-2 px-4 hover:text-yellow-500">
          <a href="#features">Features</a>
        </li>
        <li className="py-2 px-4 hover:text-yellow-500">
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
