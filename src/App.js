import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import './App.css';
import logo from './img/logo.png';
import image1 from './img/stage.png';
import image2 from './img/image2.jpg';
import image3 from './img/image3.jpg';
import { FaBars, FaTicketAlt, FaMusic, FaCalendarAlt, FaStar } from 'react-icons/fa';
import { GiTicket, GiMicrophone, GiTheaterCurtains } from 'react-icons/gi';

const image4 = 'https://via.placeholder.com/600x400?text=Image+4';
const image5 = 'https://via.placeholder.com/600x400?text=Image+5';
const qrCode = 'https://api.qrserver.com/v1/create-qr-code/?data=Ticket123456&size=150x150';

// Floating graphic components
const FloatingTicket = ({ scrollYProgress }) => {
  const x = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  
  return (
    <motion.div 
      className="absolute text-yellow-400 text-6xl opacity-70"
      style={{ x, y, rotate, left: '10%', top: '20%' }}
    >
      <FaTicketAlt />
    </motion.div>
  );
};

const BouncingMusicNote = ({ scrollYProgress }) => {
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -100, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);
  
  return (
    <motion.div 
      className="absolute text-red-500 text-5xl"
      style={{ y, scale, right: '15%', top: '40%' }}
    >
      <FaMusic />
    </motion.div>
  );
};

const RotatingStage = ({ scrollYProgress }) => {
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.5, 1.2, 0.8, 1]);
  
  return (
    <motion.div 
      className="absolute text-white text-7xl opacity-60"
      style={{ rotate, scale, left: '30%', bottom: '10%' }}
    >
      <GiMicrophone />
    </motion.div>
  );
};

const Sparkle = ({ scrollYProgress }) => {
  const x = useTransform(scrollYProgress, [0, 1], [0, Math.random() * 200 - 100]);
  const y = useTransform(scrollYProgress, [0, 1], [0, Math.random() * 200 - 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  
  return (
    <motion.div 
      className="absolute text-yellow-300"
      style={{ x, y, scale, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
    >
      <FaStar />
    </motion.div>
  );
};

export default function Home() {
  const images = [image1, image2, image3, image4, image5];
  const [ticketCount, setTicketCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showGraphics, setShowGraphics] = useState(false);
  const { scrollYProgress } = useScroll();

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
      if (window.scrollY > 200) {
        setShowGraphics(true);
      } else {
        setShowGraphics(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="bg-black text-white min-h-screen flex flex-col font-sans overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {showGraphics && (
            <>
              <FloatingTicket scrollYProgress={scrollYProgress} />
              <BouncingMusicNote scrollYProgress={scrollYProgress} />
              <RotatingStage scrollYProgress={scrollYProgress} />
              {[...Array(20)].map((_, i) => (
                <Sparkle key={i} scrollYProgress={scrollYProgress} />
              ))}
            </>
          )}
        </AnimatePresence>
        
        {/* Pulse effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-radial from-yellow-400/10 to-transparent"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Navigation Bar */}
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
            className="h-40 md:h-60 w-auto mr-6 transition-all duration-300"
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

      {/* Main Content */}
      <div className="flex-grow pt-32 md:pt-40 relative z-10">
        {/* Hero Section */}
        <section id="home" className="h-screen flex flex-col justify-center items-center text-center px-6 pt-0 relative">
          {/* Confetti effect on scroll */}
          <AnimatePresence>
            {showGraphics && (
              <motion.div 
                className="absolute inset-0 overflow-hidden pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(30)].map((_, i) => {
                  const x = Math.random() * 100;
                  const y = Math.random() * 100 - 50;
                  const delay = Math.random() * 0.5;
                  const duration = 1 + Math.random() * 2;
                  const icon = [FaTicketAlt, FaMusic, GiTicket, GiTheaterCurtains][Math.floor(Math.random() * 4)];
                  const IconComponent = icon;
                  const colors = ['text-yellow-400', 'text-red-500', 'text-white', 'text-purple-400'];
                  const color = colors[Math.floor(Math.random() * colors.length)];
                  
                  return (
                    <motion.div
                      key={i}
                      className={`absolute ${color} text-2xl`}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ 
                        y: [y, y + 200],
                        opacity: [0, 1, 0],
                        rotate: [0, 360]
                      }}
                      transition={{ 
                        delay,
                        duration,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <IconComponent />
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

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
        <section id="events" className="min-h-screen bg-gradient-to-b from-black to-gray-900/80 py-28 px-6 flex flex-col items-center relative">
          {/* Floating event icons */}
          <AnimatePresence>
            {showGraphics && (
              <motion.div 
                className="absolute inset-0 overflow-hidden pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1 }}
              >
                {['concerts', 'festivals', 'theater'].map((type, i) => {
                  const icons = {
                    concerts: <GiMicrophone className="text-red-500" />,
                    festivals: <FaMusic className="text-yellow-400" />,
                    theater: <GiTheaterCurtains className="text-purple-400" />
                  };
                  const x = 10 + (i * 30);
                  const delay = i * 0.2;
                  
                  return (
                    <motion.div
                      key={type}
                      className="absolute text-5xl"
                      style={{ left: `${x}%`, top: '30%' }}
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ 
                        y: [0, -30, 0],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{ 
                        delay,
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {icons[type]}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

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
        <section id="sell-tickets" className="min-h-screen py-28 px-6 bg-black flex flex-col items-center relative">
          {/* Animated ticket graphics */}
          <AnimatePresence>
            {showGraphics && (
              <motion.div 
                className="absolute inset-0 overflow-hidden pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {[...Array(5)].map((_, i) => {
                  const x = Math.random() * 100;
                  const y = Math.random() * 100;
                  const delay = i * 0.3;
                  const size = 3 + Math.random() * 4;
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute text-yellow-400"
                      style={{ left: `${x}%`, top: `${y}%`, fontSize: `${size}rem` }}
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ 
                        scale: [0, 1, 0.8, 1],
                        rotate: [-45, 0, 15, 0]
                      }}
                      transition={{ 
                        delay,
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <GiTicket />
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

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
        <section id="rentals" className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black text-center flex flex-col items-center relative">
          {/* Pulsing venue graphics */}
          <AnimatePresence>
            {showGraphics && (
              <motion.div 
                className="absolute inset-0 overflow-hidden pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 1 }}
              >
                {[...Array(8)].map((_, i) => {
                  const x = Math.random() * 100;
                  const y = Math.random() * 100;
                  const delay = i * 0.2;
                  const size = 2 + Math.random() * 3;
                  const colors = ['text-red-500', 'text-yellow-400', 'text-white', 'text-purple-400'];
                  const color = colors[Math.floor(Math.random() * colors.length)];
                  
                  return (
                    <motion.div
                      key={i}
                      className={`absolute ${color}`}
                      style={{ left: `${x}%`, top: `${y}%`, fontSize: `${size}rem` }}
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: [0, 1.2, 0.8, 1],
                        opacity: [0, 0.8, 0.6, 0.7]
                      }}
                      transition={{ 
                        delay,
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <FaCalendarAlt />
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

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
      <footer className="bg-black border-t border-gray-800 py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <img src={logo} alt="Logo" className="h-24 w-auto mb-6 md:mb-0" />
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