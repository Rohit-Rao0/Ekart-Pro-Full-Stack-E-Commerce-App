import React from "react";
import { Check } from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "Sleek Design",
      desc: "Minimal and elegant look with premium finish."
    },
    {
      title: "Powerful Performance",
      desc: "Smooth multitasking and lag-free experience."
    },
    {
      title: "Pro Camera",
      desc: "Capture stunning photos in any lighting."
    },
    {
      title: "Fast Charging",
      desc: "Get more power in less time."
    },
    {
      title: "Secure Shopping",
      desc: "Your transactions are always protected."
    },
    {
      title: "Quick Delivery",
      desc: "Fast and reliable shipping to your doorstep."
    }
  ];

  return (
    <section className="bg-[#0f172a] py-16 px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Why Choose Our Store?
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            We combine technology, design, and trust to give you the best shopping experience.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="bg-[#111827] p-6 rounded-xl border border-gray-800 hover:border-sky-400 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <Check className="text-sky-400" size={22} />
                <h3 className="text-white text-xl font-semibold">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-400 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
