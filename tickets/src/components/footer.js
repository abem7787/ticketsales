import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-24 pt-12 pb-6 px-6 text-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">

        {/* Ticketmaster Branding */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Ticketmaster</h3>
          <p>Let’s connect</p>
          <div className="flex space-x-2 mt-2">
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">X</a>
            <a href="#" className="hover:text-white">Blog</a>
            <a href="#" className="hover:text-white">YouTube</a>
            <a href="#" className="hover:text-white">Instagram</a>
          </div>
        </div>

        {/* App Downloads */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Download Our Apps</h3>
          <ul>
            <li><a href="#" className="hover:text-white">Download on the App Store</a></li>
            <li><a href="#" className="hover:text-white">Get it on Google Play</a></li>
          </ul>
        </div>

        {/* Helpful Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Helpful Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-white">Help/FAQ</a></li>
            <li><a href="#" className="hover:text-white">Sell</a></li>
            <li><a href="#" className="hover:text-white">My Account</a></li>
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">Gift Cards</a></li>
            <li><a href="#" className="hover:text-white">Refunds and Exchanges</a></li>
            <li><a href="#" className="hover:text-white">Do Not Sell or Share My Info</a></li>
            <li><a href="#" className="hover:text-white">Admin Login</a></li>
          </ul>
        </div>

        {/* Our Network */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Our Network</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-white">Live Nation</a></li>
            <li><a href="#" className="hover:text-white">House of Blues</a></li>
            <li><a href="#" className="hover:text-white">Front Gate Tickets</a></li>
            <li><a href="#" className="hover:text-white">TicketWeb</a></li>
            <li><a href="#" className="hover:text-white">Universe</a></li>
            <li><a href="#" className="hover:text-white">NFL</a></li>
            <li><a href="#" className="hover:text-white">NBA</a></li>
            <li><a href="#" className="hover:text-white">NHL</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-10 text-xs text-slate-500">
        <p>By continuing past this page, you agree to our terms of use</p>
        <p className="mt-2">&copy; 2025 EventVerse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
