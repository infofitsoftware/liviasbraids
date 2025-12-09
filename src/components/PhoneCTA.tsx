import React, { useState } from "react";

interface PhoneCTAProps {
  variant?: "banner" | "floating" | "inline";
  className?: string;
}

const PhoneCTA: React.FC<PhoneCTAProps> = ({ variant = "inline", className = "" }) => {
  const phoneNumber = "(240) 581-0055";
  const telLink = "tel:+12405810055";

  const [isHovered, setIsHovered] = useState(false);

  if (variant === "floating") {
    return (
      <a
        href={telLink}
        className="fixed bottom-6 right-6 z-50 group animate-bounce-slow"
        aria-label={`Call ${phoneNumber}`}
      >
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 rounded-full p-4 shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:shadow-[0_0_40px_rgba(34,197,94,0.8)] transition-all transform hover:scale-110 relative overflow-hidden">
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></div>
          
          {/* Icon */}
          <div className="relative z-10 flex items-center gap-3">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <div className="text-white font-bold text-sm hidden sm:block">
              Call Now
            </div>
          </div>
        </div>
      </a>
    );
  }

  if (variant === "banner") {
    return (
      <div className={`bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white py-4 px-4 relative overflow-hidden ${className}`}>
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
            animation: 'slide 20s linear infinite'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2 animate-pulse">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-white/90 font-medium">Prefer to call? We're here to help!</p>
              <p className="text-lg sm:text-2xl font-black tracking-tight">
                <a href={telLink} className="hover:underline decoration-2 underline-offset-2">
                  {phoneNumber}
                </a>
              </p>
            </div>
          </div>
          
          <a
            href={telLink}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group bg-white text-green-600 px-6 py-3 rounded-full font-bold hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <span className="relative z-10">Call Us Now</span>
            <span className={`group-hover:translate-x-1 transition-transform ${isHovered ? 'translate-x-1' : ''}`}>📞</span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-green-100/50 to-transparent rounded-full"></span>
          </a>
        </div>

        <style>{`
          @keyframes slide {
            0% { background-position: 0 0; }
            100% { background-position: 40px 40px; }
          }
        `}</style>
      </div>
    );
  }

  // Inline variant
  return (
    <div className={`bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 border-2 border-green-400/50 rounded-2xl p-6 text-center relative overflow-hidden ${className}`}>
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-emerald-500/10 animate-shimmer"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="bg-green-500 rounded-full p-2 animate-pulse">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <p className="text-lg font-bold text-green-100">Prefer to Call?</p>
        </div>
        
        <p className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">
          <a href={telLink} className="hover:text-green-200 transition-colors">
            {phoneNumber}
          </a>
        </p>
        
        <a
          href={telLink}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group inline-flex items-center justify-center bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:shadow-[0_0_40px_rgba(34,197,94,0.7)] transition-all transform hover:scale-105 relative overflow-hidden"
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
          <span className="relative z-10 flex items-center gap-2">
            📞 Call Us Now for Appointment
            <span className={`group-hover:translate-x-1 transition-transform ${isHovered ? 'translate-x-1' : ''}`}>→</span>
          </span>
        </a>
        
        <p className="text-sm text-green-200/80 mt-3">Available Mon-Sun, 8 AM - 8 PM</p>
      </div>
    </div>
  );
};

export default PhoneCTA;

