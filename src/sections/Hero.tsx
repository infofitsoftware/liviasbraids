import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Sparkle: React.FC<{ left: string; bottom: string; delay: string; dur: string; size?: string }> =
  ({ left, bottom, delay, dur, size = "7px" }) => (
    <div
      className="sparkle"
      style={{
        left,
        bottom,
        width: size,
        height: size,
        animation: `sparkle-move ${dur} ${delay} linear forwards`,
      }}
    />
  );

const Hero: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    void el.offsetWidth;
  }, []);

  return (
    <section
      ref={rootRef}
      className="min-h-[72vh] flex items-center bg-gradient-to-b from-pink-800/35 via-black to-black relative overflow-hidden pt-16"
    >
      {/* decorative fades */}
      <div className="absolute -left-20 -top-12 w-72 h-72 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />
      <div className="absolute right-8 bottom-8 w-56 h-56 rounded-full bg-fuchsia-400/8 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 grid gap-6 md:grid-cols-2 items-center relative z-10">
        {/* left */}
        <div className="space-y-3 animate-fade-up">
          <p className="text-xs uppercase tracking-[0.3em] text-pink-200">Braids · Twists · Cornrows</p>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight -tracking-[0.01em]">
            Livia’s Braids
            <span className="block text-pink-200 text-sm md:text-base mt-1 font-medium">Gentle hands. Clean parts. Cozy vibes.</span>
          </h1>

          <p className="text-sm text-pink-100 max-w-md">
            Premium braids and twists for all hair types — kids & adults, natural & relaxed hair. Styled with care so you leave feeling confident and beautiful.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link 
              to="/contact" 
              className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-500 text-white px-8 py-3 text-base font-bold hover:from-pink-600 hover:via-fuchsia-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:shadow-[0_0_35px_rgba(236,72,153,0.7)] relative overflow-hidden"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
              <span className="relative z-10 flex items-center gap-2">
                🎀 Book Appointment Now
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
            <Link 
              to="/gallery" 
              className="inline-flex items-center justify-center rounded-full border-2 border-pink-400/60 bg-pink-500/10 backdrop-blur px-6 py-3 text-sm font-semibold text-pink-100 hover:bg-pink-500/20 hover:border-pink-400 transition-all"
            >
              View styles
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 pt-3 text-[11px] text-pink-100/80">
            <span className="px-3 py-1 rounded-full bg-white/8 backdrop-blur">All hair textures</span>
            <span className="px-3 py-1 rounded-full bg-white/8 backdrop-blur">Kids braids</span>
            <span className="px-3 py-1 rounded-full bg-white/8 backdrop-blur">Open 8 AM – 8 PM</span>
          </div>
        </div>

        {/* right */}
        <div className="relative animate-float-soft -mt-4 md:mt-0">
          <div className="absolute -inset-5 rounded-2xl bg-pink-500/18 blur-3xl" />

          <div className="relative rounded-xl overflow-hidden border border-white/12 bg-slate-950/75 backdrop-blur-md shadow-2xl hero-card">
            <div className="h-64 md:h-72 w-full relative">
              <img src="/images/11.jpg" alt="Braids by Livia" className="h-full w-full object-cover block brand-grade" />
              <div className="hero-overlay" aria-hidden />
              <div className="hair-shine" aria-hidden />
            </div>

            <div className="p-3 border-t border-white/8 flex items-center justify-between gap-2 text-xs">
              <div>
                <p className="text-pink-200 font-semibold">Braids for every look.</p>
                <p className="text-slate-300 text-[12px]">Knotless • Box braids • Twists</p>
              </div>
              <div className="text-right text-[11px] text-pink-100">
                <p className="font-semibold">Hyattsville, MD</p>
                <p>Mon – Sun · 8 AM – 8 PM</p>
              </div>
            </div>
          </div>

          {/* sparkles */}
          <Sparkle left="8%" bottom="60%" delay="0s" dur="2.2s" />
          <Sparkle left="36%" bottom="72%" delay="0.3s" dur="2.6s" />
          <Sparkle left="64%" bottom="62%" delay="0.6s" dur="3.0s" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
