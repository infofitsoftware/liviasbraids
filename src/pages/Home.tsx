import React from "react";
import Hero from "../sections/Hero";
import ImageCarousel from "../components/ImageCarousel";
import DiscountBanner from "../components/DiscountBanner";
import VibrantButton from "../components/VibrantButton";
import PhoneCTA from "../components/PhoneCTA";

const Home: React.FC = () => {
  return (
    <div className="bg-black text-white">
      <DiscountBanner />
      <Hero />

      {/* tighter divider */}
      <div className="h-12 bg-gradient-to-b from-pink-500/8 via-transparent to-black" />

      {/* WHY CLIENTS LOVE US */}
      <section className="py-12 bg-gradient-to-b from-black via-pink-900/06 to-black relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-8 h-36 w-36 bg-pink-500/16 blur-3xl rounded-full" />
          <div className="absolute bottom-8 right-8 h-40 w-40 bg-fuchsia-400/14 blur-3xl rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10 animate-fade-up">
            <p className="text-xs uppercase tracking-[0.35em] text-pink-300">Why clients love us</p>
            <h2 className="mt-3 text-2xl md:text-4xl font-extrabold">Not just braids — a whole vibe.</h2>
            <p className="mt-3 text-sm text-slate-300 max-w-2xl mx-auto">We focus on comfort, clean parting, smooth finishing, and a relaxing environment so you walk out looking AND feeling amazing.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { num: "01", title: "Gentle, low-tension braiding", desc: "Your scalp comfort comes first. We braid with soft hands and adjust tension based on your sensitivity." },
              { num: "02", title: "Picture-perfect finishing", desc: "Clean parts. Smooth ends. Neat lines. Your braids look great from every angle — even up close." },
              { num: "03", title: "All hair types welcome", desc: "Kids & adults, natural or relaxed, short or long — we customize your braid size and style to match YOU." },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl bg-slate-900/60 border border-white/8 backdrop-blur-md p-4 shadow-lg hover:border-pink-400/60 hover:-translate-y-0.5 transition">
                <p className="text-xs uppercase text-pink-300 tracking-[0.2em] mb-2">{item.num}</p>
                <h3 className="font-semibold text-md mb-1 text-white">{item.title}</h3>
                <p className="text-sm text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-lg bg-gradient-to-r from-pink-500/20 via-fuchsia-500/20 to-pink-500/20 backdrop-blur-md border-2 border-pink-400/50 p-6 text-center relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-transparent to-fuchsia-500/10 animate-shimmer"></div>
            
            <div className="relative z-10">
              <p className="text-lg text-pink-100 font-bold mb-1">Ready for a fresh new look?</p>
              <p className="text-sm text-pink-200/80 mb-4">Book now and save 20% on all services!</p>
              <VibrantButton to="/contact" variant="glow" size="lg">
                Book Your Appointment Now
              </VibrantButton>
              <p className="text-xs text-pink-200/60 mt-3">✨ Limited time offer - Don't miss out!</p>
            </div>
          </div>
        </div>
      </section>

      {/* smaller section break */}
      <div className="h-16 bg-gradient-to-b from-black via-fuchsia-500/06 to-black w-full" />

      {/* Phone Call CTA Section */}
      <section className="py-12 bg-gradient-to-b from-black via-green-900/10 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <PhoneCTA variant="inline" />
        </div>
      </section>

      {/* Gallery preview */}
      <section className="py-12 bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-700/8 to-transparent blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 text-center mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-pink-300">Popular styles</p>
          <h2 className="text-2xl md:text-3xl font-extrabold mt-2">A few client favorites 💕</h2>
          <p className="text-slate-300 text-sm mt-2 max-w-xl mx-auto">A quick look at some of the most loved braids. Clean parts • Healthy tension • Beautiful finishing.</p>
        </div>

        <div className="max-w-3xl mx-auto px-4">
          <ImageCarousel
            images={[
              "/images/1.jpg",
              "/images/2.jpg",
              "/images/3.jpg",
              "/images/4.jpg",
              "/images/5.jpg",
            ]}
            interval={3000}
            heightClass="h-52"
          />
        </div>

        <div className="text-center mt-8">
          <VibrantButton to="/gallery" variant="secondary" size="md">
            View Full Gallery
          </VibrantButton>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-12 bg-gradient-to-b from-black via-pink-900/10 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.1),transparent_50%)]"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-pink-300">Special Offers</p>
            <h2 className="text-2xl md:text-3xl font-extrabold mt-2">Limited Time Deals 💎</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            {[
              {
                title: "First-Time Client",
                discount: "20% OFF",
                desc: "New customers get 20% off their first appointment",
                icon: "🎁",
                highlight: true
              },
              {
                title: "Refer a Friend",
                discount: "$20 OFF",
                desc: "You and your friend both get $20 off when they book",
                icon: "👯",
                highlight: false
              },
              {
                title: "Kids Special",
                discount: "15% OFF",
                desc: "Kids braids get an extra 15% discount this month",
                icon: "👶",
                highlight: false
              },
            ].map((offer, i) => (
              <div 
                key={i} 
                className={`rounded-2xl border-2 p-6 text-center transform hover:scale-105 transition-all ${
                  offer.highlight 
                    ? 'bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 border-pink-400/50 shadow-[0_0_30px_rgba(236,72,153,0.3)]' 
                    : 'bg-slate-900/60 border-white/10'
                }`}
              >
                <div className="text-4xl mb-2">{offer.icon}</div>
                <h3 className="font-bold text-lg mb-1">{offer.title}</h3>
                <p className="text-2xl font-black text-pink-300 mb-2">{offer.discount}</p>
                <p className="text-sm text-slate-300">{offer.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <VibrantButton to="/contact" variant="glow" size="lg">
              Claim Your Discount Now
            </VibrantButton>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gradient-to-b from-black via-pink-900/06 to-black">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-pink-300">Testimonials</p>
            <h2 className="text-2xl md:text-3xl font-extrabold">Loved by clients ⭐</h2>
            <p className="text-sm text-slate-400 mt-2">See what our amazing clients are saying</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { review: "My daughter's hair looks SO neat and she was so gentle with her. Absolutely recommend!", name: "Sarah M.", rating: 5 },
              { review: "These are the cleanest braids I've ever had! Super comfortable and lasted long.", name: "Jessica T.", rating: 5 },
              { review: "She's patient, fast, and does exactly what you ask for. Amazing energy and environment!", name: "Maria L.", rating: 5 },
            ].map((testimonial, i) => (
              <div key={i} className="rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/60 border border-pink-500/20 p-5 text-sm text-slate-300 shadow-lg backdrop-blur hover:border-pink-400/50 transition">
                <div className="flex items-center gap-1 mb-3 text-pink-200">
                  {"★".repeat(testimonial.rating)}
                </div>
                <p className="mb-3 italic">"{testimonial.review}"</p>
                <p className="text-xs text-pink-200 font-semibold">— {testimonial.name}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <VibrantButton to="/services" variant="primary" size="md">
              Explore All Services
            </VibrantButton>
          </div>
        </div>
      </section>

      {/* Floating Phone Button */}
      <PhoneCTA variant="floating" />
    </div>
  );
};

export default Home;
