import React from "react";
import { SALON_NAME, ADDRESS, OPENING_HOURS } from "../data/content";
import PhoneCTA from "../components/PhoneCTA";

const VisitPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-slate-950 via-black to-slate-950 text-white min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Outer card */}
        <div className="relative rounded-3xl border border-white/10 bg-slate-950/80 shadow-[0_0_40px_rgba(236,72,153,0.25)] backdrop-blur-lg overflow-hidden">
          {/* top gradient line */}
          <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-fuchsia-400 to-pink-500" />

          <div className="grid gap-10 lg:grid-cols-[1.4fr,1.2fr] items-start p-6 md:p-8 lg:p-10">
            {/* LEFT: address + hours + tips */}
            <section className="space-y-6 animate-fade-up">
              <header>
                <p className="text-xs uppercase tracking-[0.3em] text-pink-300 mb-2">
                  Visit us
                </p>
                <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
                  Come see {SALON_NAME}.
                </h1>
                <p className="text-sm md:text-base text-slate-200/90 max-w-xl">
                  Located in Hyattsville, Maryland, the studio is easy to reach
                  for local clients. The space is private, calm and focused on
                  making your appointment feel relaxed from start to finish.
                </p>
              </header>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-900/85 border border-white/10 p-4 text-sm hover:-translate-y-1 hover:border-pink-400/70 transition">
                  <p className="text-xs uppercase tracking-[0.2em] text-pink-300 mb-1">
                    Address
                  </p>
                  <p className="font-medium text-white">{ADDRESS}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    Exact unit / entry details are shared after your
                    appointment is confirmed for safety and privacy.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900/85 border border-white/10 p-4 text-sm hover:-translate-y-1 hover:border-pink-400/70 transition">
                  <p className="text-xs uppercase tracking-[0.2em] text-pink-300 mb-1">
                    Opening hours
                  </p>
                  <p className="font-medium text-white">{OPENING_HOURS}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    Last appointment time may vary depending on the style and
                    length you choose.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-5 text-xs md:text-sm text-slate-200 space-y-2">
                <h2 className="font-semibold text-white mb-1">
                  Before you head out:
                </h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>Plan to arrive 5–10 minutes early to get settled.</li>
                  <li>Come with clean, dry and fully detangled hair.</li>
                  <li>
                    If you&apos;re bringing a child, pack headphones, snacks or
                    a small toy to keep them comfy.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-pink-500/15 border border-pink-400/70 p-4 text-xs text-pink-100 space-y-1 shadow-[0_0_20px_rgba(236,72,153,0.35)]">
                <p className="font-semibold">Parking & access</p>
                <p>
                  Parking and building entry instructions are sent with your
                  confirmation message so you know exactly where to go when you
                  arrive.
                </p>
              </div>

              {/* Phone CTA */}
              <PhoneCTA variant="inline" className="mt-6" />
            </section>

            {/* RIGHT */}
            <aside className="space-y-4 animate-fade-up-delay">
              <div className="rounded-2xl bg-slate-900/90 border border-white/10 p-5 text-xs md:text-sm text-slate-200 space-y-2">
                <h2 className="font-semibold text-white mb-1">
                  Travel tips:
                </h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Wear something comfortable — you&apos;ll be sitting for a
                    while.
                  </li>
                  <li>
                    Bring your bonnet or scarf so you can leave with your style
                    protected.
                  </li>
                  <li>
                    Feel free to bring headphones, a book, or your tablet to
                    watch shows during the appointment.
                  </li>
                </ul>
                <p className="text-[11px] text-slate-400">
                  If you have any accessibility needs, send a message when
                  booking so we can prepare the space for you.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitPage;
