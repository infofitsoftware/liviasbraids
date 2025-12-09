import React from "react";
import { SALON_NAME, ADDRESS, OPENING_HOURS } from "../data/content";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-slate-950 via-black to-slate-950 text-white min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Outer card container */}
        <div className="relative rounded-3xl border border-white/10 bg-slate-950/80 shadow-[0_0_40px_rgba(236,72,153,0.25)] backdrop-blur-lg overflow-hidden">
          {/* thin top gradient line */}
          <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-fuchsia-400 to-pink-500" />

          <div className="grid gap-10 lg:grid-cols-[1.6fr,1fr] items-start p-6 md:p-8 lg:p-10">
            {/* LEFT: Story + values */}
            <section className="space-y-6 animate-fade-up">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-pink-300 mb-2">
                  About
                </p>
                <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
                  The heart behind {SALON_NAME}.
                </h1>
                <p className="text-sm md:text-base text-slate-200/90">
                  {SALON_NAME} is a cozy, private braiding studio in Hyattsville
                  where every appointment feels personal. The focus is simple:
                  healthy hair, clean work, and a calm space where you can relax
                  while your style comes together.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-4 text-sm hover:-translate-y-1 hover:border-pink-400/70 transition">
                  <p className="text-xs uppercase tracking-[0.2em] text-pink-300 mb-1">
                    The experience
                  </p>
                  <p className="text-slate-200">
                    From greeting to final photo, you’re never rushed. We talk
                    through the style, check tension as we braid, and make sure
                    you&apos;re comfortable the entire time.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-4 text-sm hover:-translate-y-1 hover:border-pink-400/70 transition">
                  <p className="text-xs uppercase tracking-[0.2em] text-pink-300 mb-1">
                    The work
                  </p>
                  <p className="text-slate-200">
                    Sharp parting, neat braids and polished ends — so your style
                    looks good from every angle, in person and in pictures.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-5">
                <h2 className="font-semibold text-white mb-2 text-sm md:text-base">
                  What {SALON_NAME} is known for:
                </h2>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li>• Gentle, low-tension braiding that respects your edges.</li>
                  <li>• Patience with tender scalps and first-time clients.</li>
                  <li>• Kid-friendly, relaxed environment for little ones.</li>
                  <li>• Styles that last, with proper prep and finishing.</li>
                  <li>• Honest conversations about what will work best for your hair.</li>
                </ul>
              </div>

              {/* How an appointment feels */}
              <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-5 text-xs md:text-sm text-slate-200 space-y-3">
                <h2 className="font-semibold text-white">
                  What your appointment feels like:
                </h2>
                <ol className="list-decimal list-inside space-y-1">
                  <li>You arrive, get settled and confirm the style + length.</li>
                  <li>We gently detangle (if needed) and section your hair.</li>
                  <li>Braids are done with low tension, checking in as we go.</li>
                  <li>
                    Ends are trimmed / dipped and styled so everything looks clean.
                  </li>
                  <li>
                    We show you the back, take photos (if you agree) and share care tips.
                  </li>
                </ol>
                <p className="text-[11px] text-slate-400">
                  If you’re nervous, say so — communication is always welcome.
                </p>
              </div>
            </section>

            {/* RIGHT: Studio info + first time block */}
            <aside className="space-y-4 animate-fade-up-delay">
              <div className="rounded-2xl bg-slate-900/90 border border-white/10 p-5 text-sm space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-pink-300">
                  Studio details
                </p>
                <div>
                  <p className="text-xs text-slate-400">Location</p>
                  <p className="font-medium text-white">{ADDRESS}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Hours</p>
                  <p className="font-medium text-white">{OPENING_HOURS}</p>
                </div>
                <p className="text-xs text-slate-400">
                  Exact entry instructions are shared after your appointment is
                  confirmed for safety and privacy.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900/90 border border-white/10 p-5 text-sm space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-pink-300">
                  First time here?
                </p>
                <p className="text-slate-200">
                  It&apos;s okay if you don&apos;t know braid names. Just share:
                </p>
                <ul className="space-y-1 text-xs text-slate-200">
                  <li>• A photo of your natural hair.</li>
                  <li>• A few screenshots from the Gallery you like.</li>
                  <li>• How long you want your braids (shoulder / back / waist).</li>
                </ul>
                <p className="text-[11px] text-slate-400">
                  From there, we can recommend a style that fits your hair,
                  lifestyle and how long you want to sit.
                </p>
              </div>

              <div className="rounded-2xl bg-pink-500/15 border border-pink-400/70 p-4 text-xs text-pink-100 space-y-2 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                <p className="font-semibold">Comfort promise 💕</p>
                <p>
                  If anything feels too tight at any point, say it. We&apos;ll
                  adjust immediately. Beautiful braids should look good AND feel
                  good.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
