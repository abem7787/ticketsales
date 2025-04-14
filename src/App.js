import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import './App.css';
import logo from './img/logo.png';
import image1 from './img/image1.jpg';
import image2 from './img/image2.jpg';
import image3 from './img/image3.jpg';

const image4 = 'https://via.placeholder.com/600x400?text=Image+4';
const image5 = 'https://via.placeholder.com/600x400?text=Image+5';
const qrCode = 'https://api.qrserver.com/v1/create-qr-code/?data=Ticket123456&size=150x150';

export default function Home() {
  const images = [image1, image2, image3, image4, image5];
  const [ticketCount, setTicketCount] = useState(0);

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
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-black text-white py-4 px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="dflex items-center mb-4 md:mb-0">
          <img src={logo} alt="Logo" className="h-20 md:h-24 w-auto mr-4" />
        </div>
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-center md:text-left">
          <li><a href="#home" className="text-lg font-semibold hover:text-yellow-500">Home</a></li>
          <li><a href="#features" className="text-lg font-semibold hover:text-yellow-500">Features</a></li>
          <li><a href="#contact" className="text-lg font-semibold hover:text-yellow-500">Contact</a></li>
        </ul>
      </nav>

      {/* Page Content */}
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="h-screen flex flex-col justify-center items-center text-center p-6">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-red-500"
          >
            TicketsToMyShow.com
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl mt-4 text-gray-300"
          >
            Where Every Seat Has a Story.
          </motion.p>
        </section>

        {/* Features Section */}
        <section className="h-[120vh] bg-gradient-to-b from-black to-gray-900 py-20 px-6 flex flex-col items-center" id="features">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-extrabold mb-6"
          >
            Wanna Sell Tickets for Your Own Event?
          </motion.h2>
          <motion.p
            className="text-lg md:text-2xl max-w-3xl text-center text-gray-400"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Our easy-to-use platform lets you customize seating charts for warehouse events, stadiums, and outdoor spaces. Accept crypto, get fast payouts, and design your show your way!
          </motion.p>
          <motion.div
            className="mt-12 text-2xl md:text-4xl text-yellow-400"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            <p className="uppercase font-black animate-pulse">
              Customize • Create • Control • Crypto • Concerts
            </p>
          </motion.div>
        </section>

        {/* Feature Cards */}
        <section className="py-24 px-6 bg-black flex flex-col gap-20">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.3 }}
              className="flex flex-col md:flex-row items-center justify-center gap-8"
            >
              <div className="w-full md:w-1/2">
                <h3 className="text-3xl md:text-5xl font-bold text-red-500 mb-4">
                  Feature #{index + 1}
                </h3>
                <p className="text-gray-300 text-lg md:text-2xl">
                  {index === 0 && "Customize interactive seating charts for maximum control."}
                  {index === 1 && "Accept crypto & traditional payments with fast payout."}
                  {index === 2 && "Powerful dashboard to manage events, prices, and sales."}
                </p>
              </div>
              <div className="w-full md:w-1/2 bg-gray-800 rounded-xl h-[300px] md:h-[400px] shadow-lg">
                <img src={images[index]} alt={`Feature #${index + 1}`} className="w-full h-full object-cover rounded-xl" />
              </div>
            </motion.div>
          ))}
        </section>

        {/* Ticket Graphic Section */}
        <section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black text-center flex flex-col items-center">
          <motion.h2
            className="text-4xl md:text-6xl font-extrabold text-yellow-400 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Ticket Preview & Client Count
          </motion.h2>

          <motion.div
            className="bg-white text-black p-8 rounded-2xl shadow-2xl max-w-md w-full relative border-4 border-yellow-400"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-yellow-400 px-4 py-2 rounded-full text-sm font-bold text-black absolute -top-6 left-1/2 transform -translate-x-1/2">
              Official Ticket
            </div>
            <h3 className="text-2xl font-bold mb-2 mt-6">Event: Warehouse Vibes</h3>
            <p className="mb-4 text-gray-600">Admit One - Row A, Seat 12</p>
            <img src={qrCode} alt="QR Code" className="mx-auto border-2 border-black rounded-lg" />
            <p className="text-center text-xs text-gray-400 mt-4">Scan this ticket at the gate</p>
          </motion.div>

          <motion.div
            className="mt-12 text-4xl text-green-400 font-black animate-pulse"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Tickets Generated: {ticketCount.toLocaleString()}
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="bg-gray-900 py-32 text-center px-6" id="contact">
          <motion.h2
            className="text-5xl md:text-7xl font-extrabold text-yellow-500 mb-12"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1 }}
          >
            Let’s Build Your Vision
          </motion.h2>
          <motion.div
            className="max-w-4xl mx-auto text-gray-300 text-lg md:text-2xl"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Need help launching your next outdoor festival or warehouse rave? We’ve got the tech, team, and tools to make it happen. Contact us today.
          </motion.div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-10 px-6 text-center border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg font-bold mb-2">TicketsToMyShow.com</p>
          <p className="text-sm">Empowering creators, producers, and dreamers to deliver the best event experiences.</p>
          <p className="text-sm mt-4">Email: support@ticketstomyshow.com | Phone: (800) 123-4567</p>
          <p className="text-sm mt-2">123 Event Way, Los Angeles, CA 90001</p>
          <p className="text-xs mt-6">© {new Date().getFullYear()} TicketsToMyShow.com — All rights reserved</p>
        </div>
      </footer>
    </main>
  );
}
