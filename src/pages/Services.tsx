import React from "react";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/content";
import VibrantButton from "../components/VibrantButton";

const ServicesPage: React.FC = () => {
  // Detailed pricing menu based on client notes
  const pricingMenu = [
    {
      title: "Boho braids",
      note: "Includes curly / boho pieces.",
      items: [
        { label: "Large", price: "$240" },
        { label: "Medium", price: "$260" },
        { label: "Small-medium", price: "$280" },
        { label: "Small", price: "$300" },
        { label: "Extra small", price: "$400" },
      ],
    },
    {
      title: "Twist braids",
      items: [
        { label: "Large", price: "$240" },
        { label: "Medium", price: "$260" },
        { label: "Small-medium", price: "$280" },
        { label: "Small", price: "$300" },
      ],
    },
    {
      title: "Knotless braids",
      items: [
        { label: "Large", price: "$200" },
        { label: "Medium", price: "$240" },
        { label: "Small-medium", price: "$260" },
        { label: "Small", price: "$280" },
      ],
    },
    {
      title: "Box braids",
      items: [
        { label: "Large", price: "$180" },
        { label: "Medium", price: "$200" },
        { label: "Small-medium", price: "$220" },
        { label: "Small", price: "$240" },
      ],
    },
    {
      title: "Passion twist braids",
      items: [
        { label: "Large", price: "$200" },
        { label: "Medium", price: "$240" },
        { label: "Small-medium", price: "$260" },
        { label: "Small", price: "$280" },
      ],
    },
    {
      title: "Twists with natural hair",
      note: "Using your own hair only.",
      items: [
        { label: "Large", price: "$75" },
        { label: "Medium", price: "$100" },
        { label: "Small-medium", price: "$120" },
        { label: "Small", price: "$140" },
      ],
    },
    {
      title: "Cornrows",
      items: [{ label: "Per cornrow", price: "$10" }],
    },
    {
      title: "Cornrows braids for kids",
      items: [{ label: "Price range", price: "$80 – $120" }],
    },
    {
      title: "Cornrows for kids with hair added",
      items: [{ label: "Full style", price: "$120" }],
    },
    {
      title: "Cornrows / knotless combo",
      items: [
        { label: "Medium", price: "$200" },
        { label: "Small", price: "$240" },
      ],
    },
    {
      title: "Crochet styles",
      items: [{ label: "Full head", price: "$120 – $140" }],
    },
    {
      title: "French braids",
      items: [{ label: "Per braid", price: "$20" }],
    },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-950 via-black to-slate-950 text-white min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Outer card */}
        <div className="relative rounded-3xl border border-white/10 bg-slate-950/80 shadow-[0_0_40px_rgba(236,72,153,0.25)] backdrop-blur-lg overflow-hidden">
          {/* top gradient line */}
          <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-fuchsia-400 to-pink-500" />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr),minmax(0,1.1fr)] items-start p-6 md:p-8 lg:p-10">
            {/* LEFT: services + detailed menu */}
            <section className="space-y-7 animate-fade-up">
              <header className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-pink-300">
                  Services
                </p>
                <h1 className="text-3xl md:text-4xl font-extrabold">
                  Braid styles for every mood.
                </h1>
                <p className="text-sm md:text-base text-slate-300 max-w-xl">
                  From classic box braids to boho looks, twists, cornrows and
                  kid styles — everything is customized to your length, size and
                  comfort level.
                </p>
              </header>

              {/* Section label for cards */}
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xs font-semibold tracking-[0.24em] uppercase text-slate-300">
                  Service categories
                </h2>
                <span className="h-px flex-1 bg-gradient-to-r from-pink-500/50 via-fuchsia-400/40 to-transparent" />
              </div>

              {/* high-level categories (using existing ServiceCard data) */}
              <div className="grid gap-4 sm:grid-cols-2">
                {services.map((service, index) => (
                  <div
                    key={service.name}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 0.06 + 0.1}s` }}
                  >
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>

              {/* Detailed style menu with pricing */}
              <section className="mt-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h2 className="text-xs font-semibold tracking-[0.24em] uppercase text-slate-300">
                    Detailed style menu &amp; pricing
                  </h2>
                  <p className="text-[11px] text-slate-400 max-w-md">
                    Prices are in USD and based on the style, size and length
                    listed. Final quote may vary slightly depending on hair
                    length, thickness and any add-ons.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {pricingMenu.map((block) => (
                    <div
                      key={block.title}
                      className="rounded-2xl bg-slate-900/80 border border-white/10 p-4 text-xs text-slate-200"
                    >
                      {/* 🔥 braids titles now pink */}
                      <h3 className="font-semibold text-pink-200 mb-1">
                        {block.title}
                      </h3>
                      {block.note && (
                        <p className="text-[11px] text-pink-100 mb-1">
                          {block.note}
                        </p>
                      )}
                      <ul className="divide-y divide-white/5">
                        {block.items.map((row, i) => (
                          <li
                            key={i}
                            className="flex items-center justify-between py-1.5"
                          >
                            <span>{row.label}</span>
                            <span className="font-semibold text-pink-200">
                              {row.price}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </section>

            {/* RIGHT: info / how it works panel */}
            <aside className="space-y-4 animate-fade-up-delay">
              <div className="rounded-2xl bg-slate-900/90 border border-white/10 p-5 text-sm hover:-translate-y-1 hover:border-pink-400/70 transition">
                <h2 className="font-semibold text-white mb-2">
                  How to choose your service
                </h2>
                <ul className="space-y-1 text-slate-200 text-xs">
                  <li>• Decide if you want braids, twists, boho or cornrows.</li>
                  <li>• Pick the length: shoulder, mid-back, waist, etc.</li>
                  <li>• Pick the size: large, medium, small-medium or small.</li>
                  <li>
                    • Check the price in the menu and send that description when
                    you book.
                  </li>
                </ul>
                <p className="mt-3 text-[11px] text-slate-400">
                  Example: “Knotless braids, medium size, mid-back length” or
                  “Boho braids, small-medium”. You can also send a gallery
                  screenshot + this description.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900/85 border border-white/10 p-5 text-sm space-y-2">
                <h2 className="font-semibold text-white mb-1">
                  Before your appointment
                </h2>
                <ul className="space-y-1 text-slate-200 text-xs">
                  <li>• Please arrive with clean, dry and detangled hair.</li>
                  <li>• Avoid heavy oils or greasy products on the day.</li>
                  <li>
                    • Bring headphones, a book or something to watch while we
                    braid.
                  </li>
                  <li>• Let us know if your scalp is very sensitive.</li>
                </ul>
                <p className="text-[11px] text-slate-400">
                  Not sure which service fits your hair? Just describe your hair
                  + send photos — we’ll guide you and confirm the best option.
                </p>
              </div>

              <div className="rounded-2xl bg-pink-500/15 border border-pink-400/70 p-4 text-xs text-pink-100 space-y-2 shadow-[0_0_18px_rgba(236,72,153,0.4)]">
                <p className="font-semibold">Make your braids last longer ✨</p>
                <p>
                  Sleep with a satin scarf or bonnet, moisturize your scalp, and
                  avoid super tight ponytails in the first few days. These small
                  steps keep your braids fresh and comfy for longer.
                </p>
              </div>

              {/* Call to Action */}
              <div className="rounded-2xl bg-gradient-to-r from-pink-500/20 via-fuchsia-500/20 to-pink-500/20 border-2 border-pink-400/50 p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-transparent to-fuchsia-500/10 animate-shimmer"></div>
                <div className="relative z-10">
                  <p className="text-lg font-bold text-pink-100 mb-2">Ready to Transform Your Look?</p>
                  <p className="text-sm text-pink-200/80 mb-4">Book now and get 20% off your first appointment!</p>
                  <VibrantButton to="/contact" variant="glow" size="lg">
                    Book Your Appointment
                  </VibrantButton>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
