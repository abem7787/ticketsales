import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import './App.css';
import logo from './img/logo.png';
import image1 from './img/image1.jpg';
import crpyto from "./img/crypto.png";
import image2 from './img/image2.jpg';
import image3 from './img/image3.jpg';
import stage from "./img/stage.png";
import { FaBars, FaTicketAlt, FaMusic, FaCalendarAlt, FaStar } from 'react-icons/fa';
import { GiTicket, GiMicrophone, GiTheaterCurtains } from 'react-icons/gi';

const image4 = 'https://via.placeholder.com/600x400?text=Image+4';
const image5 = 'https://via.placeholder.com/600x400?text=Image+5';
const qrCode = 'https://api.qrserver.com/v1/create-qr-code/?data=Ticket123456&size=150x150';

// Extremely slow floating components
const FloatingTicket = ({ scrollYProgress }) => {
  const x = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  
  return (
    <motion.div 
      className="absolute text-yellow-400 text-4xl md:text-6xl opacity-70"
      style={{ 
        x, 
        y, 
        rotate, 
        left: '10%', 
        top: '20%',
        transition: { duration: 40, ease: "linear" }
      }}
    >
      <FaTicketAlt />
    </motion.div>
  );
};

const BouncingMusicNote = ({ scrollYProgress }) => {
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -25, 12], {
    duration: 48
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1], {
    duration: 48
  });
  
  return (
    <motion.div 
      className="absolute text-red-500 text-3xl md:text-5xl"
      style={{ 
        y, 
        scale, 
        right: '15%', 
        top: '40%',
        transition: { duration: 48, ease: "linear" }
      }}
    >
      <FaMusic />
    </motion.div>
  );
};

const RotatingStage = ({ scrollYProgress }) => {
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90], {
    duration: 120
  });
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.5, 1.05, 0.95, 1], {
    duration: 60
  });
  
  return (
    <motion.div 
      className="absolute text-white text-5xl md:text-7xl opacity-60"
      style={{ 
        rotate, 
        scale, 
        left: '30%', 
        bottom: '10%',
        transition: { duration: 60, ease: "linear" }
      }}
    >
      <GiMicrophone />
    </motion.div>
  );
};

// Fully responsive BulkyTextReveal
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
      {/* Background elements with extremely slow animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {showGraphics && (
            <>
              <FloatingTicket scrollYProgress={scrollYProgress} />
              <BouncingMusicNote scrollYProgress={scrollYProgress} />
              <RotatingStage scrollYProgress={scrollYProgress} />
            </>
          )}
        </AnimatePresence>
        
        <motion.div 
          className="absolute inset-0 bg-gradient-radial from-yellow-400/10 to-transparent"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

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
          {["Home", "Events", "sell tickets", "contact us", "Rentals", "Login"].map((item) => (
            <motion.li 
              key={item}
              className="w-full md:w-auto"
              whileHover={{ 
                y: -2,
                transition: { type: 'spring', stiffness: 100, damping: 10 }
              }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <a 
                href={`#${item.toLowerCase()}`} 
                className="text-base font-medium tracking-wider hover:text-yellow-400 transition-colors duration-700"
              >
                {item.toUpperCase()}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.nav>

      <div className="flex-grow pt-32 md:pt-40 relative z-10">
        {/* Hero Section */}
        <section id="home" className="h-screen flex flex-col justify-center items-center text-center px-6 pt-0 relative">
          <AnimatePresence>
            {showGraphics && (
              <motion.div 
                className="absolute inset-0 overflow-hidden pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3 }}
              >
                {[...Array(5)].map((_, i) => {
                  const x = Math.random() * 100;
                  const y = Math.random() * 100 - 50;
                  const delay = Math.random() * 3;
                  const duration = 30 + Math.random() * 20;
                  const icon = [FaTicketAlt, FaMusic, GiTicket, GiTheaterCurtains][Math.floor(Math.random() * 4)];
                  const IconComponent = icon;
                  const colors = ['text-yellow-400', 'text-red-500', 'text-white', 'text-purple-400'];
                  const color = colors[Math.floor(Math.random() * colors.length)];
                  
                  return (
                    <motion.div
                      key={i}
                      className={`absolute ${color} text-xl md:text-2xl`}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ 
                        y: [y, y + 50],
                        opacity: [0, 0.6, 0],
                        rotate: [0, 45]
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
        <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden py-12 md:py-20">
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
          
          <motion.div 
            className="absolute inset-0 overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: showGraphics ? 0.6 : 0 }}
            transition={{ duration: 3 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-radial from-yellow-400/10 to-transparent"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{
                duration: 120,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-400 text-2xl md:text-4xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.4, 0.5, 0.4],
                  rotate: [0, 45, 90]
                }}
                transition={{
                  duration: 80 + Math.random() * 40,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <GiTicket />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="h-[120vh] bg-gradient-to-b from-black to-gray-900/80 py-28 px-6 flex flex-col items-center relative">
          <AnimatePresence>
            {showGraphics && (
              <motion.div 
                className="absolute inset-0 overflow-hidden pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 3 }}
              >
                {['concerts', 'festivals', 'theater'].map((type, i) => {
                  const icons = {
                    concerts: <GiMicrophone className="text-red-500" />,
                    festivals: <FaMusic className="text-yellow-400" />,
                    theater: <GiTheaterCurtains className="text-purple-400" />
                  };
                  const x = 10 + (i * 30);
                  const delay = i * 1;
                  
                  return (
                    <motion.div
                      key={type}
                      className="absolute text-4xl md:text-5xl"
                      style={{ left: `${x}%`, top: '30%' }}
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ 
                        y: [0, -5, 0],
                        opacity: [0.6, 0.7, 0.6]
                      }}
                      transition={{ 
                        delay,
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      {icons[type]}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

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

        {/* Feature Cards */}
        <section className="py-24 px-6 bg-black flex flex-col gap-20">
          {[
            {
              title: "Interactive Seating Charts",
              description: "Customize interactive seating charts for maximum control.",
              image: stage
            },
            {
              title: "Flexible Payments",
              description: "Accept crypto & traditional payments with fast payout.",
              image: image2
            },
            {
              title: "Powerful Dashboard",
              description: "Manage events, prices, and sales with our dashboard.",
              image: image3
            }
          ].map((item, index) => (
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
          ))}
        </section>

        {/* Crypto Section */}
        <section className="min-h-screen flex flex-col justify-center items-center py-20 px-6 relative">
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
                <motion.div
                  className="absolute -inset-4 border-2 border-purple-400/30 rounded-lg pointer-events-none"
                  animate={{
                    scale: [1, 1.01, 1],
                    opacity: [0.5, 0.55, 0.5]
                  }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Ticket Graphic Section */}
        <section id="contact" className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black text-center flex flex-col items-center relative">
          <AnimatePresence>
            {showGraphics && (
              <motion.div 
                className="absolute inset-0 overflow-hidden pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              >
                {[...Array(1)].map((_, i) => {
                  const x = Math.random() * 100;
                  const y = Math.random() * 100;
                  const delay = i * 1;
                  const size = 3 + Math.random() * 1;
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute text-yellow-400"
                      style={{ left: `${x}%`, top: `${y}%`, fontSize: `${size}rem` }}
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ 
                        scale: [0, 0.6, 0.4, 0.6],
                        rotate: [-45, 0, 5, 0]
                      }}
                      transition={{ 
                        delay,
                        duration: 20,
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
            animate={{ 
              scale: [1, 1.01, 1],
              opacity: [0.8, 0.85, 0.8]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 20
            }}
          >
            Tickets Generated: {ticketCount.toLocaleString()}
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="bg-gray-900 py-32 text-center px-6">
          <AnimatePresence>
            {showGraphics && (
              <motion.div 
                className="absolute inset-0 overflow-hidden pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 2 }}
              >
                {[...Array(1)].map((_, i) => {
                  const x = Math.random() * 100;
                  const y = Math.random() * 100;
                  const delay = i * 1;
                  const size = 2 + Math.random() * 1;
                  const colors = ['text-red-500', 'text-yellow-400', 'text-white', 'text-purple-400'];
                  const color = colors[Math.floor(Math.random() * colors.length)];
                  
                  return (
                    <motion.div
                      key={i}
                      className={`absolute ${color}`}
                      style={{ left: `${x}%`, top: `${y}%`, fontSize: `${size}rem` }}
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: [0, 0.6, 0.4, 0.6],
                        opacity: [0, 0.5, 0.3, 0.4]
                      }}
                      transition={{ 
                        delay,
                        duration: 40,
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