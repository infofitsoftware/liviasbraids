import React from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/bookings", label: "Bookings" },
  { to: "/admin/payments", label: "Payments" },
  { to: "/admin/transactions", label: "Transactions" },
  { to: "/admin/gallery", label: "Gallery" },
];

const AdminNav: React.FC = () => {
  const location = useLocation();

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-3 shadow">
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                active
                  ? "bg-pink-500 text-black shadow-lg"
                  : "text-slate-200 hover:bg-slate-800"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminNav;

