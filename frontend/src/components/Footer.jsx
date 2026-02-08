import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0b1220] text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">TechStore</h2>
          <p className="text-sm leading-relaxed">
            Your trusted destination for premium gadgets and accessories.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <div className="space-y-2 text-sm">
            <Link to="/home" className="block hover:text-sky-400">Home</Link>
            <Link to="/products" className="block hover:text-sky-400">Products</Link>
            <Link to="/cart" className="block hover:text-sky-400">Cart</Link>
            <Link to="/profile" className="block hover:text-sky-400">Profile</Link>
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <div className="space-y-2 text-sm">
            <Link to="/contact" className="block hover:text-sky-400">Contact Us</Link>
            <Link to="/faq" className="block hover:text-sky-400">FAQs</Link>
            <Link to="/returns" className="block hover:text-sky-400">Returns</Link>
            <Link to="/privacy" className="block hover:text-sky-400">Privacy Policy</Link>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm mb-3">
            Subscribe to get latest deals and updates.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-900 text-white px-3 py-2 rounded-l-md outline-none w-full"
            />
            <button className="bg-sky-400 text-black px-4 py-2 rounded-r-md hover:bg-sky-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm text-gray-500 border-t border-gray-800 py-4">
        © {new Date().getFullYear()} TechStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
