import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import logo from './img/logo.png';
import image1 from './img/image1.jpg';
import crpyto from "./img/crypto.png";
import image2 from './img/image2.jpg';
import image3 from './img/image3.jpg';
import stage from "./img/stage.png";
import { FaBars, FaTicketAlt, FaMusic, FaCalendarAlt, FaStar } from 'react-icons/fa';
import { GiTicket, GiMicrophone, GiTheaterCurtains } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import SellTickets from '../src/components/SellTickets';

const image4 = 'https://via.placeholder.com/600x400?text=Image+4';
const image5 = 'https://via.placeholder.com/600x400?text=Image+5';
const qrCode = 'https://api.qrserver.com/v1/create-qr-code/?data=Ticket123456&size=150x150';

const BulkyTextReveal = ({ text, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{
        duration: 3,
        delay: index * 0.8,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-tight md:leading-none relative z-10 px-2 text-center"
      style={{
        WebkitTextStroke: '2px white',
        color: 'transparent',
        textShadow: '0 0 20px rgba(255,255,255,0.5)',
        mixBlendMode: 'overlay',
        wordBreak: 'break-word'
      }}
    >
      {text}
    </motion.div>
  );
};

export default function Home() {
  const images = [stage, image2, image3, image4, image5];
  const [ticketCount, setTicketCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showGraphics, setShowGraphics] = useState(false);
  const { scrollYProgress } = useScroll();

  const bulkyTexts = [
    "EXPERIENCE",
    "THE",
    "ULTIMATE",
    "EVENT",
    "PLATFORM"
  ];

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
      const currentScrollY = window.scrollY;

      if (currentScrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY > 200) {
        setShowGraphics(true);
      } else {
        setShowGraphics(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavHidden(true);
        setMenuOpen(false);
      } else if (currentScrollY === 0) {
        setNavHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);


  return (

    <main className="bg-black text-white min-h-screen flex flex-col font-sans overflow-hidden">

      {/* Navigation */}
      <motion.nav
        className={`fixed w-full bg-black/90 backdrop-blur-sm text-white py-5 px-8 flex justify-between items-center z-50 transition-all duration-500 ${navHidden ? 'hidden' : 'block'}`}
        initial={{ y: 0 }}
        animate={{ y: navHidden ? -100 : 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <img
            src={logo}
            alt="Logo"
            className="h-35 sm:h-28 md:h-36 lg:h-40 w-auto mr-6 transition-transform duration-700 hover:scale-105"
          />
        </motion.div>

        <div className="md:hidden flex items-center">
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none p-2 flex items-center space-x-2"
            aria-label="Menu"
            whileHover={{ scale: 1.05, transition: { duration: 1 } }}
          >
            <span className="text-base font-medium tracking-wider">MENU</span>
            <FaBars size={20} className="text-gray-300" />
          </motion.button>
        </div>

       <motion.ul
  className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:static top-28 left-0 w-full md:w-auto bg-black/95 md:bg-transparent px-8 py-6 md:p-0 space-y-6 md:space-y-0 md:space-x-10`}
  initial={{ y: -20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 1 }}
>
  {["Home", "Events", "sell tickets", "contact us", "Login", "Sign up"].map((item) => {
    const lower = item.toLowerCase();

    return (
      <motion.li
        key={item}
        className="w-full md:w-auto"
        whileHover={{
          y: -2,
          transition: { type: "spring", stiffness: 100, damping: 10 },
        }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {lower === "sell tickets" ? (
          <Link
            to="/sell-tickets"
            className="text-base font-medium tracking-wider hover:text-yellow-400 transition-colors duration-700"
          >
            {item.toUpperCase()}
          </Link>
        ) : lower === "login" ? (
          <Link
            to="/login"
            className="text-base font-medium tracking-wider hover:text-yellow-400 transition-colors duration-700"
          >
            {item.toUpperCase()}
          </Link>
        ) : lower === "sign up" ? (
          <Link
            to="/signup"
            className="text-base font-medium tracking-wider hover:text-yellow-400 transition-colors duration-700"
          >
            {item.toUpperCase()}
          </Link>
        ) : (
          <a
            href={`#${lower.replace(" ", "-")}`}
            className="text-base font-medium tracking-wider hover:text-yellow-400 transition-colors duration-700"
          >
            {item.toUpperCase()}
          </a>
        )}
      </motion.li>
    );
  })}
</motion.ul>


      </motion.nav>

      <div className="flex-grow pt-32 md:pt-40 relative z-10">
        {/* Hero Section */}
        <section id="home" className="h-screen flex flex-col justify-center items-center text-center px-6 pt-0 mb-0 relative">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-tight text-center"
          >
            <span className="font-medium text-red-500 whitespace-nowrap">
              TicketsToMyShow
            </span>
            <span className="whitespace-nowrap">.com</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl md:text-2xl mt-8 text-gray-300 font-light tracking-wider max-w-2xl"
          >
            Where Every Seat Has a Story.
          </motion.p>
        </section>

        {/* Bulky Text Section */}
        <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden py-4 md:py-8 mt-0">
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-70"
            >
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          <div className="w-full px-4 mx-auto text-center space-y-2 xs:space-y-4 sm:space-y-6 md:space-y-8 relative z-10">
            {bulkyTexts.map((text, index) => (
              <BulkyTextReveal key={index} text={text} index={index} />
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="h-[100vh] bg-gradient-to-b from-black to-gray-900/80 py-12 px-6 flex flex-col items-center relative mt-0">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 text-center px-4"
          >
            Wanna Sell Tickets for Your Own Event?
          </motion.h2>
          <motion.p
            className="text-lg md:text-2xl max-w-3xl text-center text-gray-400 px-4"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 2 }}
          >
            Our easy-to-use platform lets you customize seating charts for warehouse events, stadiums, and outdoor spaces. Accept crypto, get fast payouts, and design your show your way!
          </motion.p>
        </section>

        {/* Sell Tickets Section */}
        <section className="py-12 px-6 bg-black text-white text-center mt-0">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="text-4xl md:text-6xl font-extrabold mb-6"
          >
            Sell Tickets to Anything!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="text-lg md:text-2xl max-w-3xl mx-auto text-gray-300 mb-8"
          >
            From house parties to comedy shows and even your own festivals, Eventify makes selling tickets easy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <Link to="/sell-tickets">
              <button
                className="py-3 px-8 bg-yellow-400 text-black font-semibold text-lg rounded-full hover:bg-yellow-500 transition duration-300"
              >
                Start Selling
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="mt-6 text-gray-400"
          >
            <Link to="/learn-more" className="text-xl font-medium hover:text-yellow-400">
              Learn More
            </Link>
          </motion.div>
        </section>

        {/* Centered Cards Section */}
        <section className="py-16 px-6 bg-black">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-white"
          >
            Featured Events & Services
          </motion.h2>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
              {/* Festival Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="bg-gradient-to-br from-purple-900/80 to-blue-900/80 rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 w-full max-w-md mx-auto"
              >
                <div className="relative h-48 bg-purple-950/50">
                  <img
                    src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Music Festival"
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FaMusic className="text-white text-6xl opacity-50" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Electric Dreams Festival</h3>
                  <p className="text-gray-300 mb-4">June 15-17, 2023</p>
                  <p className="text-gray-300 mb-6">Downtown Arena</p>
                  <p className="text-gray-200 mb-6">
                    The biggest electronic music festival of the year featuring top DJs from around the world.
                    Three days of non-stop music, art installations, and unforgettable experiences.
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Starting at</p>
                      <p className="text-white font-bold text-xl">0.05 ETH</p>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
                      Get Tickets
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* How to Purchase Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="bg-gradient-to-br from-green-900/80 to-emerald-900/80 rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 w-full max-w-md mx-auto"
              >
                <div className="relative h-48 bg-emerald-950/50">
                  <img
                    src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                    alt="Crypto Purchase"
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GiTicket className="text-white text-6xl opacity-50" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-6">How to Purchase:</h3>
                  <ol className="space-y-4 text-gray-200 mb-8">
                    <li className="flex items-start">
                      <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                      Connect your crypto wallet
                    </li>
                    <li className="flex items-start">
                      <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                      Select your tickets and quantity
                    </li>
                    <li className="flex items-start">
                      <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                      Choose your preferred cryptocurrency
                    </li>
                    <li className="flex items-start">
                      <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                      Confirm the transaction in your wallet
                    </li>
                    <li className="flex items-start">
                      <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">5</span>
                      Receive your NFT ticket instantly
                    </li>
                  </ol>
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-bold transition-colors flex items-center justify-center">
                    <span className="mr-2">Connect Wallet</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </motion.div>

              {/* Service Rental Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 w-full max-w-md mx-auto"
              >
                <div className="relative h-48 bg-gray-950/50">
                  <img
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Event Production"
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GiTheaterCurtains className="text-white text-6xl opacity-50" />
                  </div>
                </div>
                <div className="p-6 h-full flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-4">Elevate Your Event</h3>
                  <p className="text-gray-300 mb-8">
                    Premium stage, sound, and lighting rentals for concerts, corporate
                    events, and special occasions.
                  </p>

                  <div className="mt-auto space-y-6">
                    <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-full font-bold transition-colors">
                      Get a Quote
                    </button>

                    <div className="border-t border-gray-700 pt-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Our Services</h4>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-center">
                          <GiMicrophone className="mr-3 text-yellow-400" /> Professional Audio
                        </li>
                        <li className="flex items-center">
                          <GiTheaterCurtains className="mr-3 text-yellow-400" /> Stage Design
                        </li>
                        <li className="flex items-center">
                          <FaStar className="mr-3 text-yellow-400" /> Lighting Solutions
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="py-24 px-6 bg-black flex flex-col gap-20">
          {[
            {
              title: "Interactive Seating Charts",
              description: "Customize interactive seating charts for maximum control.",
              image: stage
            },
            "crypto",
            {
              title: "Powerful Dashboard",
              description: "Manage events, prices, and sales with our dashboard.",
              image: image3
            }
          ].map((item, index) => {
            if (item === "crypto") {
              return (
                <section
                  key="crypto"
                  className="min-h-screen flex flex-col justify-center items-center py-20 px-6 relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-radial from-purple-500/10 to-transparent"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{
                      duration: 80,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  <motion.div
                    className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto px-4"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2 }}
                  >
                    <div className="w-full md:w-1/2">
                      <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 1.5 }}
                        className="text-4xl md:text-6xl font-bold text-purple-500 mb-6"
                      >
                        Accept Crypto Payments
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1.5 }}
                        className="text-lg md:text-xl text-gray-300 mb-8"
                      >
                        We support cryptocurrency payments for faster, more secure transactions with lower fees.
                        Get paid instantly without waiting for bank transfers.
                      </motion.p>
                      <motion.ul
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 1.5 }}
                        className="space-y-4 text-gray-400"
                      >
                        <li className="flex items-center">
                          <FaStar className="text-yellow-400 mr-3" /> Instant settlements
                        </li>
                        <li className="flex items-center">
                          <FaStar className="text-yellow-400 mr-3" /> Lower transaction fees
                        </li>
                        <li className="flex items-center">
                          <FaStar className="text-yellow-400 mr-3" /> Global payments
                        </li>
                      </motion.ul>
                    </div>

                    <div className="w-full md:w-1/2 flex justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 2 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative"
                      >
                        <img
                          src={crpyto}
                          alt="Crypto Payments"
                          className="max-w-full h-auto rounded-lg shadow-2xl border-2 border-purple-500/50"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </section>
              );
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: index * 0.7 }}
                className="flex flex-col md:flex-row items-center justify-center gap-8 px-4"
              >
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl md:text-5xl font-bold text-red-500 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-lg md:text-2xl">
                    {item.description}
                  </p>
                </div>
                <div className="w-full md:w-1/2 bg-gray-800 rounded-xl h-[300px] md:h-[400px] shadow-lg overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.5 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* Ticket Graphic Section */}
        <section id="contact" className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black text-center flex flex-col items-center relative">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="text-4xl md:text-6xl font-extrabold text-yellow-400 mb-10 px-4"
          >
            Ticket Preview & Client Count
          </motion.h2>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2 }}
            className="bg-white text-black p-8 rounded-2xl shadow-2xl max-w-md w-full relative border-4 border-yellow-400 mx-4"
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
            className="mt-12 text-4xl text-green-400 font-black px-4"
          >
            Tickets Generated: {ticketCount.toLocaleString()}
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="bg-gray-900 py-32 text-center px-6">
          <motion.h2
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2 }}
            className="text-5xl md:text-7xl font-extrabold text-yellow-500 mb-12 px-4"
          >
            Let's Build Your Vision
          </motion.h2>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 2 }}
            className="max-w-4xl mx-auto text-gray-300 text-lg md:text-2xl px-4"
          >
            Need help launching your next outdoor festival or warehouse rave? We've got the tech, team, and tools to make it happen. Contact us today.
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