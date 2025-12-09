import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const linkBase =
    "text-sm tracking-tight text-slate-200 transition duration-200";
  const activeClass = "text-white";

  const hoverEffect =
    "hover:text-pink-300 hover:drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* ------------------------ LOGO ------------------------ */}
        <Link to="/" className="flex items-center">
          <div
            className="
              bg-white
              rounded-full
              p-1
              border border-white
              shadow-[0_0_22px_rgba(255,255,255,0.25)]
              flex items-center justify-center
            "
          >
            <img
              src="/images/logo.png"
              alt="Logo"
              className="
                h-16 w-16
                object-cover
                rounded-full
                brightness-125 contrast-125 saturate-150
              "
              style={{ objectPosition: "center" }}
            />
          </div>
        </Link>

        {/* ------------------------ DESKTOP MENU ------------------------ */}
        <div className="hidden md:flex items-center gap-6">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeClass : ""} ${hoverEffect}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeClass : ""} ${hoverEffect}`
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeClass : ""} ${hoverEffect}`
            }
          >
            Gallery
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeClass : ""} ${hoverEffect}`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/visit"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeClass : ""} ${hoverEffect}`
            }
          >
            Visit
          </NavLink>

          {/* BOOK NOW Button */}
          <Link
            to="/contact"
            className="ml-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-500 text-white px-6 py-2.5 text-sm font-bold shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all transform hover:scale-105 relative overflow-hidden group"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
            <span className="relative z-10 flex items-center gap-1.5">
              ✨ Book Now
            </span>
          </Link>
        </div>

        {/* ------------------------ MOBILE MENU BUTTON ------------------------ */}
        <button
          className="md:hidden p-2 rounded-md bg-white/10 border border-white/20"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.6}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* ------------------------ MOBILE MENU ------------------------ */}
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 py-4 px-4 space-y-3">

          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${linkBase} block ${isActive ? activeClass : ""} ${hoverEffect}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/services"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${linkBase} block ${isActive ? activeClass : ""} ${hoverEffect}`
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/gallery"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${linkBase} block ${isActive ? activeClass : ""} ${hoverEffect}`
            }
          >
            Gallery
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${linkBase} block ${isActive ? activeClass : ""} ${hoverEffect}`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/visit"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `${linkBase} block ${isActive ? activeClass : ""} ${hoverEffect}`
            }
          >
            Visit
          </NavLink>

          {/* MOBILE BOOK NOW */}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="block w-full text-center bg-white text-black rounded-full py-2 font-semibold shadow hover:bg-pink-100"
          >
            Book now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
