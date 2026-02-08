import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="min-h-screen bg-[#0f172a] flex items-center">
      <div className="max-w-7xl mx-auto w-full px-8 py-16 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Smart Tech for <br />
            Smarter Living
          </h1>

          <p className="text-gray-300 text-lg max-w-lg">
            Explore beautifully crafted devices with powerful performance, sleek design, 
            and a seamless digital experience.
          </p>

          <div className="flex gap-4">
            <Link to="/products">
              <Button className="bg-sky-400 text-black hover:bg-sky-300">
                Shop Now
              </Button>
            </Link>

            <Link to="/cart">
              <Button className="bg-transparent text-sky-400 border border-sky-400 hover:bg-sky-400 hover:text-black">
                View Cart
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src="/hero1.jpg"
            alt="Premium Phone"
            className="w-3/4 rounded-xl shadow-xl"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
