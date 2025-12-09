import React, { useState } from "react";
import { api } from "../utils/api";
import PhoneCTA from "../components/PhoneCTA";

const ContactPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    preferred_date: "",
    preferred_time: "",
    style_description: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await api.createBooking(formData);
      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        preferred_date: "",
        preferred_time: "",
        style_description: "",
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error: any) {
      alert(error.message || "Error submitting booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-pink-300">
            Contact
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">
            Book your braid appointment.
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
            Share your details and what style you&apos;re thinking of. 
          </p>
        </header>

        {/* Phone CTA */}
        <div className="mb-8">
          <PhoneCTA variant="inline" />
        </div>

        <div className="rounded-3xl bg-slate-900/90 border border-white/10 p-6 md:p-8">
          {success && (
            <div className="mb-6 bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-lg text-sm">
              Thank you! Your booking request has been submitted. We'll contact you soon to confirm your appointment.
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 md:grid-cols-2 md:gap-6 text-sm"
          >
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Name
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl bg-black border border-white/15 px-3 py-2 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Phone or WhatsApp
              </label>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-xl bg-black border border-white/15 px-3 py-2 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
                placeholder="Best number to reach you"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                value={formData.preferred_date}
                onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                className="w-full rounded-xl bg-black border border-white/15 px-3 py-2 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Preferred Time
              </label>
              <input
                type="time"
                value={formData.preferred_time}
                onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                className="w-full rounded-xl bg-black border border-white/15 px-3 py-2 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                What style do you want?
              </label>
              <textarea
                required
                rows={3}
                value={formData.style_description}
                onChange={(e) => setFormData({ ...formData, style_description: e.target.value })}
                className="w-full rounded-xl bg-black border border-white/15 px-3 py-2 outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
                placeholder="Example: waist-length knotless, medium box braids, kids braids with beads..."
              />
            </div>

            <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-2">
              <p className="text-xs text-slate-400 max-w-sm">
                After submitting, you&apos;ll get a reply with available times,
                estimated price and next steps to confirm your appointment.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="group rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-500 px-8 py-3 text-xs md:text-sm font-bold text-white shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:shadow-[0_0_35px_rgba(236,72,153,0.7)] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      ✨ Send Request & Save 20%
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
