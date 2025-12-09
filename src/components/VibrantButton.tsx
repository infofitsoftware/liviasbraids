import React from "react";
import { Link } from "react-router-dom";

interface VibrantButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "glow";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const VibrantButton: React.FC<VibrantButtonProps> = ({
  to,
  children,
  variant = "primary",
  size = "md",
  className = "",
}) => {
  const baseClasses = "inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl relative overflow-hidden group";

  const variantClasses = {
    primary: "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-500 text-white hover:from-pink-600 hover:via-fuchsia-600 hover:to-pink-600",
    secondary: "bg-white text-pink-600 hover:bg-pink-50 border-2 border-pink-500",
    glow: "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.6)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] animate-pulse-slow",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <Link
      to={to}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {/* Shine effect */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </span>
    </Link>
  );
};

export default VibrantButton;

