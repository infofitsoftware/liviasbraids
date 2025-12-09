import React, { useState } from "react";
import { Link } from "react-router-dom";

const DiscountBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-pink-600 via-fuchsia-600 to-pink-600 text-white py-3 px-4 overflow-hidden animate-pulse-slow">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
          animation: 'slide 20s linear infinite'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-bounce">🎉</span>
          <span className="font-bold text-lg sm:text-xl">
            <span className="bg-white text-pink-600 px-2 py-1 rounded font-black">20% OFF</span>
            <span className="ml-2">ALL SERVICES</span>
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-sm sm:text-base">
          <span className="hidden sm:inline">Limited Time Offer!</span>
          <Link 
            to="/contact" 
            className="bg-white text-pink-600 px-4 py-1.5 rounded-full font-bold hover:bg-pink-100 transition-all transform hover:scale-105 shadow-lg animate-pulse"
          >
            Book Now →
          </Link>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition"
          aria-label="Close banner"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes slide {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default DiscountBanner;

