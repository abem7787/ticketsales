import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import './App.css';
import logo from './img/logo.png';
import image1 from './img/stage.png';
import image2 from './img/image2.jpg';
import image3 from './img/image3.jpg';
import { FaBars } from 'react-icons/fa';

const image4 = 'https://via.placeholder.com/600x400?text=Image+4';
const image5 = 'https://via.placeholder.com/600x400?text=Image+5';
const qrCode = 'https://api.qrserver.com/v1/create-qr-code/?data=Ticket123456&size=150x150';

export default function Home() {
  const images = [image1, image2, image3, image4, image5];
  const [ticketCount, setTicketCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      counter += 137;
      if (counter >= 8421) {
        counter = 8421;
        clearInterval(interval);
      }
      setTicketCount(counter);
    }, 30);

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="bg-black text-white min-h-screen flex flex-col font-sans">
      {/* Navigation Bar with Large Logo */}
      <nav className={`fixed w-full bg-black/90 backdrop-blur-sm text-white py-5 px-8 flex justify-between items-center z-50 transition-all duration-300 ${scrolled ? 'shadow-xl' : ''}`}>
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={logo} 
            alt="Logo" 
            className="h-40 md:h-60 w-auto mr-6 transition-all duration-300"  // Increased logo size
          />
        </motion.div>

        <div className="md:hidden flex items-center">
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none p-2 flex items-center space-x-2"
            aria-label="Menu"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-base font-medium tracking-wider">MENU</span>
            <FaBars size={20} className="text-gray-300" />
          </motion.button>
        </div>

        <motion.ul
          className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:static top-28 left-0 w-full md:w-auto bg-black/95 md:bg-transparent px-8 py-6 md:p-0 space-y-6 md:space-y-0 md:space-x-10`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {['Home', 'Events', 'Sell Tickets', 'Rentals', 'Contact', 'Login'].map((item) => (
            <motion.li 
              key={item}
              className="w-full md:w-auto"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <a 
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className="text-base font-medium tracking-wider hover:text-yellow-400 transition-colors duration-300 block py-2 w-full"
              >
                {item.toUpperCase()}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </nav>

      {/* Main Content with adjusted padding for larger logo */}
      <div className="flex-grow pt-32 md:pt-40"> {/* Increased top padding */}
        {/* Hero Section */}
        <section id="home" className="h-screen flex flex-col justify-center items-center text-center px-6 pt-0">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-tight"
          >
            <span className="font-medium text-red-500">Tickets</span>ToMyShow
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl md:text-2xl mt-8 text-gray-300 font-light tracking-wider max-w-2xl"
          >
            Where every seat tells a story. Experience events reimagined.
          </motion.p>
        </section>

        {/* Events Section */}
        <section id="events" className="min-h-screen bg-gradient-to-b from-black to-gray-900/80 py-28 px-6 flex flex-col items-center">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
              <span className="font-medium">Discover</span> Events
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl leading-relaxed">
              Curated selection of concerts, festivals, and exclusive experiences
            </p>
          </motion.div>

          <motion.div 
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {['Concerts', 'Festivals', 'Theater'].map((category, index) => (
              <motion.div 
                key={category}
                className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-400 transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={images[index]} 
                    alt={category} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-medium mb-2">{category}</h3>
                  <p className="text-gray-400 font-light">Explore upcoming {category.toLowerCase()} events</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Sell Tickets Section */}
        <section id="sell-tickets" className="min-h-screen py-28 px-6 bg-black flex flex-col items-center">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
              <span className="font-medium">Sell Tickets</span> Effortlessly
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl leading-relaxed">
              Our platform makes event management simple and efficient
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto w-full">
            {[
              {
                title: "Event Setup",
                description: "Create and manage events with our intuitive dashboard",
                feature: "Drag-and-drop interface"
              },
              {
                title: "Ticketing Options",
                description: "Flexible pricing and ticket types for any event",
                feature: "Dynamic pricing controls"
              },
              {
                title: "Real Analytics",
                description: "Track sales and audience data in real-time",
                feature: "Comprehensive reporting"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col md:flex-row items-center mb-20 last:mb-0"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-10' : 'md:pl-10'} order-1 md:order-${index % 2 === 0 ? 1 : 2}`}>
                  <h3 className="text-3xl md:text-4xl font-light mb-4">
                    <span className="font-medium">{item.title}</span>
                  </h3>
                  <p className="text-xl text-gray-300 font-light mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <p className="text-yellow-400 font-medium">
                    {item.feature}
                  </p>
                </div>
                <div className={`w-full md:w-1/2 mt-8 md:mt-0 order-2 md:order-${index % 2 === 0 ? 2 : 1}`}>
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl overflow-hidden h-64 md:h-80 border border-gray-700">
                    <img 
                      src={images[index]} 
                      alt={item.title} 
                      className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300" 
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Rentals Section */}
        <section id="rentals" className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black text-center flex flex-col items-center">
          <motion.h2
            className="text-5xl md:text-7xl font-black text-yellow-400 mb-12 tracking-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            VENUE RENTALS MADE SIMPLE
          </motion.h2>
          <motion.div
            className="bg-white text-black p-8 rounded-2xl shadow-2xl max-w-md w-full relative border-4 border-yellow-400"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-yellow-400 px-4 py-2 rounded-full text-sm font-black text-black absolute -top-6 left-1/2 transform -translate-x-1/2 tracking-wide">
              FEATURED VENUE
            </div>
            <h3 className="text-3xl font-black mb-4 mt-6 tracking-tight">DOWNTOWN EVENT SPACE</h3>
            <p className="mb-6 text-gray-600 font-medium">CAPACITY: 500 PEOPLE</p>
            <img src={qrCode} alt="QR Code" className="mx-auto border-2 border-black rounded-lg" />
            <p className="text-center text-sm font-bold text-gray-400 mt-6 tracking-wide">SCAN TO VIEW MORE DETAILS</p>
          </motion.div>

          <motion.p
            className="mt-16 text-2xl md:text-3xl text-gray-300 max-w-4xl font-medium leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            FIND AND BOOK THE PERFECT VENUE FOR YOUR NEXT EVENT FROM OUR EXTENSIVE NETWORK OF PARTNERS.
          </motion.p>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <img src={logo} alt="Logo" className="h-24 w-auto mb-6 md:mb-0" /> {/* Larger footer logo */}
            <div className="flex space-x-8">
              {['About', 'Careers', 'Blog', 'Press'].map((item) => (
                <a key={item} href="#" className="text-gray-400 hover:text-white transition-colors duration-300 font-light">
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-800 pt-12 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 font-light mb-4 md:mb-0">
              © {new Date().getFullYear()} TicketsToMyShow. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {['Terms', 'Privacy', 'Cookies'].map((item) => (
                <a key={item} href="#" className="text-gray-500 hover:text-white transition-colors duration-300 font-light">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}