import React from "react";
import GalleryGrid from "../components/GalleryGrid";

const GalleryPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-slate-950 via-black to-slate-950 text-white min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Outer card */}
        <div className="relative rounded-3xl border border-white/10 bg-slate-950/80 shadow-[0_0_40px_rgba(236,72,153,0.25)] backdrop-blur-lg overflow-hidden">
          {/* top gradient line */}
          <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-fuchsia-400 to-pink-500" />

          <div className="p-6 md:p-8 lg:p-10 space-y-8">
            {/* Heading */}
            <header className="text-center space-y-3 animate-fade-up">
              <p className="text-xs uppercase tracking-[0.3em] text-pink-300">
                Gallery
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                Real braids. Real clients.
              </h1>
              <p className="mt-1 text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
                Scroll through a mix of styles done at Livia&apos;s Braids.
                When you book, you can mention which style number you like or
                send screenshots as your inspo.
              </p>
            </header>

            {/* Info strip */}
            <div className="rounded-2xl bg-slate-900/85 border border-white/10 px-4 py-3 text-[11px] md:text-xs text-slate-300 flex flex-col md:flex-row md:items-center md:justify-between gap-2 animate-fade-up-delay">
              <span>
                Pro tip: Take screenshots of 2–3 favorite styles and send them
                with your booking message. You can mention “Style #01”, “Style
                #05”, etc.
              </span>
              <span className="text-pink-200">
                Works for all hair types – kids &amp; adults, natural &amp;
                relaxed.
              </span>
            </div>

            {/* Grid */}
            <div className="animate-fade-up-delay">
              <GalleryGrid />
            </div>

            {/* Extra content block */}
            <section className="mt-4 rounded-2xl bg-slate-900/90 border border-white/10 p-5 text-xs md:text-sm text-slate-200 space-y-3">
              <h2 className="font-semibold text-white">
                How to use this gallery:
              </h2>
              <p>
                Don&apos;t stress about knowing the exact braid name. Focus on
                the <span className="text-pink-200">size</span>,{" "}
                <span className="text-pink-200">length</span> and{" "}
                <span className="text-pink-200">overall vibe</span> of each
                style.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Shorter lengths are quicker and lighter to wear.</li>
                <li>Smaller braids usually last longer but take more time.</li>
                <li>
                  If your scalp is very sensitive, mention it so we can keep the
                  tension gentle.
                </li>
                <li>
                  Kids styles can be based on any of these looks with beads,
                  colors or accessories added.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
