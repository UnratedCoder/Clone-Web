"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

// Asset Image URLs from Unsplash representing premium private theatres
const HERO_IMAGES = [
  "https://dazzlingscreens.com/media/site/home/hero/candel-pathANMC3778.avif",
  "https://dazzlingscreens.com/media/site/home/hero/happy-birthday-decor.avif",
  "https://dazzlingscreens.com/media/site/home/hero/hero-background-1.jpg",
];

const SERVICES = [
  { id: "001", title: "BOUQUET", label: "Floral Styling", img: "https://dazzlingscreens.com/media/site/home/sections/bouquet.jpg" },
  { id: "002", title: "BIRTHDAY", label: "Private Screening", img: "https://dazzlingscreens.com/media/site/home/sections/private-screening.webp" },
  { id: "003", title: "PHOTOSHOOT", label: "Captured Memories", img: "https://dazzlingscreens.com/media/site/home/sections/photoshoot.webp" },
  { id: "004", title: "DECOR", label: "Premium Styling", img: "https://dazzlingscreens.com/media/site/home/sections/decoration.webp" },
  { id: "005", title: "CAKE", label: "Sweet Celebrations", img: "https://dazzlingscreens.com/media/site/home/sections/cake.webp" },
  { id: "006", title: "GIFTS", label: "Thoughtful Moments", img: "https://dazzlingscreens.com/media/site/home/sections/gits.webp" },
];

const VIDEOS = [
  { id: "qzgmSsffle4", title: "Anniversary Surprise Details" },
  { id: "RPHpJHs2QnY", title: "Birthday Party Setup Vlog" },
  { id: "vFtryYj1IFU", title: "Marriage Proposal Grand Moment" },
  { id: "xGjATFfaJW0", title: "Date Night Cinema Reveal" },
  { id: "rO8TdoG0Fj8", title: "Inside Pitampura Theatre" },
  { id: "h0v8C1TvUdU", title: "Customer Celebration Highlights" },
];

const THEATRES = [
  {
    id: 1,
    name: "Theatre 1",
    capacity: "2",
    price: "1,399",
    img: "https://dazzlingscreens.com/media/booking/theatres/theatre-1/theatre-1-1.png",
  },
  {
    id: 2,
    name: "Theatre 2",
    capacity: "6",
    price: "1,599",
    img: "https://dazzlingscreens.com/media/booking/theatres/theatre-2/theatre-2-1.png",
  },
  {
    id: 3,
    name: "Theatre 3",
    capacity: "10",
    price: "1,799",
    img: "https://dazzlingscreens.com/media/booking/theatres/theatre-3/theatre-3-1.png",
  },
];

const DECORS = [
  { name: "Rose Heart Setup", desc: "Romantic rose-heart floor styling for special moments.", img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=500" },
  { name: "LED Decoration", desc: "Ambient LED decor to elevate your theatre atmosphere.", img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=500" },
  { name: "Candle Pathway", desc: "A beautiful candle-entry path for grand arrival vibes.", img: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=500" },
  { name: "Fog Entry Effect", desc: "Dramatic fog effect to make your entry unforgettable.", img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=500" },
];

const REVIEWS = [
  { name: "Vaishnavi Puri", age: "5 months ago", rating: 5, comment: "I recently booked a proposal event with Dazzling Screens and it turned out to be the most magical experience ever. From the moment we arrived, every detail was handled with perfection and care. The decor, lighting, and overall ambiance felt straight out of a fairytale. The food quality was exceptional in both taste and presentation, and hygiene standards were top-notch. I’m beyond glad I chose them for such an important milestone and would highly recommend them." },
  { name: "Reema", age: "a year ago", rating: 5, comment: "Loved the entire concept of Dazzling Screens. It’s a perfect place to enjoy special moments with your loved ones in complete privacy. The decorations were beautiful and the screen setup was simple and user-friendly. Recliners were comfortable and the staff was very helpful throughout. Snacks were reasonably priced and we created some truly memorable moments here." },
  { name: "Veer Singh Dahiya", age: "7 months ago", rating: 5, comment: "This private theatre experience completely exceeded my expectations. From plush seating to excellent sound and projection quality, everything felt premium and luxurious. What truly stood out was the attention to detail and personalized service provided by the team. Having an entire cinema to ourselves made the birthday celebration feel intimate yet grand. Definitely worth every penny and highly recommended." },
  { name: "Yash B", age: "a year ago", rating: 5, comment: "The ambiance at dazzling screens is top-notch. Each screening room is meticulously designed, boasting comfortable seating, state-of-the-art projection systems, and excellent acoustics. The attention to detail in the decor adds an air of sophistication, making it a perfect setting for an immersive cinematic experience. You can change room interior as per your occasion." }
];

const FAQS = [
  { q: "What makes private theatres different?", a: "Unlike commercial cinemas, a private theatre offers absolute exclusivity. The entire room is booked only for you and your guests. You can watch your favourite content, play custom videos, cut cakes, and enjoy personalized decorations and setups tailored to your occasion." },
  { q: "Can I bring my own cake?", a: "Yes, you can bring your own cake. Alternatively, we offer premium cake add-ons (like Chocolate, Red Velvet, and Butterscotch) directly in the booking process which we will have decorated and ready inside the theatre." },
  { q: "How many people are allowed?", a: "Our rooms are designed for different group sizes: Theatre 1 is for up to 2 people, Theatre 2 accommodates up to 6 people, and Theatre 3 accommodates up to 10 people. The pricing varies slightly depending on the room capacity selected." },
  { q: "Can I choose decorations?", a: "Absolutely! We offer standard decorations as part of the booking, and you can upgrade to premium setups such as the Rose Heart floor arrangement, Candle Pathways, ambient LED decor, or dramatic Fog Entry effects." },
  { q: "Is cancellation free?", a: "Yes. The advance booking amount is fully refundable (except minor gateway transaction fees) if you request cancellation through WhatsApp at least 72 hours before your booked time slot. Cancellations under 72 hours are non-refundable." },
  { q: "Are outside food and drinks allowed?", a: "Outside food and beverages are strictly prohibited inside the theatre. We have an extensive in-house kitchen menu featuring delicious snacks, pizzas, mocktails, and desserts which you can order during your session." }
];

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
  
  // Modals state
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  
  // FAQ toggles
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Carousel scroll ref
  const servicesRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  // Hero slideshow auto-changer
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  const scrollServices = (direction: "left" | "right") => {
    if (servicesRef.current) {
      const { scrollLeft, clientWidth } = servicesRef.current;
      const offset = direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      servicesRef.current.scrollTo({ left: scrollLeft + offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[88vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-black text-white px-4">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          {HERO_IMAGES.map((imgUrl, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out ${
                idx === heroIndex ? "opacity-45" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${imgUrl})` }}
            />
          ))}
          {/* Gradients */}
          <div className="absolute inset-x-0 top-0 h-[280px] bg-gradient-to-b from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>

        {/* Hero Card */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex justify-center">
          <div className="relative w-full max-w-[500px] sm:max-w-[620px] lg:max-w-[780px] rounded-3xl border border-white/20 bg-white/10 text-center shadow-2xl backdrop-blur-md px-4 py-8 pb-10 sm:px-8 sm:py-12 md:py-16">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-black/60 via-black/45 to-black/35 -z-10" />
            <h1 className="hero-big-title text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight drop-shadow-md font-serif">
              Celebrate in Your <br />
              <span className="text-[#FFD700]">Private Theatre</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm sm:text-lg text-white/90 leading-relaxed font-sans">
              Luxury private cinema moments, crafted for celebrations.
              <span className="block mt-1 text-white/70">
                Birthdays, anniversaries, proposals, and date nights in a premium private screening room.
              </span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                className="group w-[260px] sm:w-auto inline-flex items-center justify-center rounded-full bg-[#FFD700] hover:bg-[#E6C200] text-black font-bold px-8 py-3.5 text-base transition-all duration-200 hover:shadow-lg hover:shadow-[#FFD700]/30 hover:-translate-y-0.5"
                href="/booking"
              >
                <span>Book Your Private Theatre</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1 transition-transform group-hover:translate-x-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 17" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Ticker Ribbon */}
        <div className="hero-bottom-strip z-20 pointer-events-none">
          <div className="hero-bottom-strip__track">
            {/* Group 1 */}
            <div className="hero-bottom-strip__group">
              {[
                "Food & Drink",
                "Photography",
                "Birthday",
                "Anniversary",
                "Date Night",
                "Proposal",
                "Bride To Be",
                "Farewell",
                "Decoration",
                "Celebration",
              ].map((item, idx) => (
                <div className="hero-bottom-strip__chunk" key={idx}>
                  <span className="hero-bottom-strip__item">{item}</span>
                  <span className="hero-bottom-strip__dot">✦</span>
                </div>
              ))}
            </div>
            {/* Group 2 (duplicate) */}
            <div className="hero-bottom-strip__group">
              {[
                "Food & Drink",
                "Photography",
                "Birthday",
                "Anniversary",
                "Date Night",
                "Proposal",
                "Bride To Be",
                "Farewell",
                "Decoration",
                "Celebration",
              ].map((item, idx) => (
                <div className="hero-bottom-strip__chunk" key={idx}>
                  <span className="hero-bottom-strip__item">{item}</span>
                  <span className="hero-bottom-strip__dot">✦</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. COUPON TOGGLE BUTTON & DRAWER */}
      <button
        onClick={() => setIsCouponOpen(true)}
        type="button"
        className="fixed top-1/2 right-0 z-40 -translate-y-1/2 inline-flex items-center gap-1 border border-emerald-200 bg-white px-2 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-700 shadow-xl rounded-l-2xl border-r-0 hover:bg-emerald-50 transition-colors"
      >
        <span className="rotate-180 [writing-mode:vertical-lr] [text-orientation:mixed] flex items-center gap-1">
          🎟️ View Coupons
        </span>
      </button>

      {isCouponOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-[380px] h-full bg-white p-6 shadow-2xl overflow-y-auto flex flex-col justify-between animate-slideInRight">
            <div>
              <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-1.5">
                    🎁 Available Coupons
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">Click a code to copy and save instantly</p>
                </div>
                <button
                  onClick={() => setIsCouponOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Coupon 1 */}
                <div className="border border-emerald-100 rounded-2xl p-4 bg-emerald-50/50 hover:bg-emerald-50 transition">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-mono text-base font-bold text-[#0f1115]">WELCOME400</p>
                      <p className="text-xs text-gray-600 mt-1">Get Rs.400 off on your first order.</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      FLAT 400 OFF
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4 border-t border-emerald-100/50 pt-3">
                    <span className="text-[10px] text-gray-500">Min. order ₹1,599</span>
                    <button
                      onClick={() => handleCopyCoupon("WELCOME400")}
                      className="text-xs font-bold bg-white border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition active:scale-95"
                    >
                      {copiedCoupon === "WELCOME400" ? "Copied! ✓" : "Copy Code"}
                    </button>
                  </div>
                </div>

                {/* Coupon 2 */}
                <div className="border border-emerald-100 rounded-2xl p-4 bg-emerald-50/50 hover:bg-emerald-50 transition">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-mono text-base font-bold text-[#0f1115]">FREECAKE</p>
                      <p className="text-xs text-gray-600 mt-1">Enjoy a free celebration cake worth ₹550.</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      FREE GIFT
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4 border-t border-emerald-100/50 pt-3">
                    <span className="text-[10px] text-gray-500">No minimum spending limit</span>
                    <button
                      onClick={() => handleCopyCoupon("FREECAKE")}
                      className="text-xs font-bold bg-white border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition active:scale-95"
                    >
                      {copiedCoupon === "FREECAKE" ? "Copied! ✓" : "Copy Code"}
                    </button>
                  </div>
                </div>

                {/* Coupon 3 */}
                <div className="border border-emerald-100 rounded-2xl p-4 bg-emerald-50/50 hover:bg-emerald-50 transition">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-mono text-base font-bold text-[#0f1115]">EXTRA25</p>
                      <p className="text-xs text-gray-600 mt-1">Get 25% off on premium decoration upgrades.</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      25% DECOR OFF
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4 border-t border-emerald-100/50 pt-3">
                    <span className="text-[10px] text-gray-500">Applicable only to decors</span>
                    <button
                      onClick={() => handleCopyCoupon("EXTRA25")}
                      className="text-xs font-bold bg-white border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition active:scale-95"
                    >
                      {copiedCoupon === "EXTRA25" ? "Copied! ✓" : "Copy Code"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsCouponOpen(false)}
              className="w-full mt-6 bg-[#0f1115] hover:bg-[#1e232d] text-white py-3 rounded-xl font-semibold text-sm transition"
            >
              Close Panel
            </button>
          </div>
        </div>
      )}

      {/* 3. OUR SERVICES */}
      <section className="bg-[#f8f5ef] px-4 py-16 sm:px-6 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="mb-8 text-center relative">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1115] font-serif inline-block">
              Our Services
            </h2>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex gap-2">
              <button
                onClick={() => scrollServices("left")}
                className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center hover:bg-gray-50 shadow-sm transition active:scale-95 text-gray-700"
                aria-label="Scroll left"
              >
                ←
              </button>
              <button
                onClick={() => scrollServices("right")}
                className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center hover:bg-gray-50 shadow-sm transition active:scale-95 text-gray-700"
                aria-label="Scroll right"
              >
                →
              </button>
            </div>
          </div>

          <div
            id="home-celebration-carousel"
            className="relative overflow-hidden rounded-2xl border border-black/15 bg-white px-6 py-8 sm:px-10 lg:px-12"
          >
            {/* Film perforations for aesthetic film-strip look */}
            <div className="home-celebration-carousel__perforation home-celebration-carousel__perforation--left" />
            <div className="home-celebration-carousel__perforation home-celebration-carousel__perforation--right" />

            <div
              ref={servicesRef}
              className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory"
            >
              {SERVICES.map((srv) => (
                <article
                  key={srv.id}
                  className="flex-shrink-0 w-[240px] sm:w-[280px] snap-start border border-black/5 rounded-xl p-3 bg-white"
                >
                  <header className="mb-2 flex items-center justify-between text-xs tracking-wider text-black/60 font-mono">
                    <span>[{srv.id}</span>
                    <span className="truncate">{srv.label}]</span>
                  </header>
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-black/5">
                    <img
                      alt={srv.title}
                      loading="lazy"
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                      src={srv.img}
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className="font-serif font-bold text-base sm:text-lg tracking-wide text-[#0f1115]">
                      {srv.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4.       {/* 4. CHOOSE YOUR PRIVATE SPACE */}
      <section className="bg-white py-14 sm:py-10 lg:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3 sm:mb-4">
              Choose your private space
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-655 max-w-2xl mx-auto">
              Luxury private theatres designed for birthdays, proposals, anniversaries and unforgettable moments.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-3 lg:grid-cols-3 lg:gap-10">
            {THEATRES.map((room) => (
              <div
                key={room.id}
                className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 shadow-lg sm:rounded-2xl sm:shadow-xl bg-white"
              >
                {/* Card Top Image & Badges */}
                <div className="booking-theatre-carousel relative h-[190px] sm:h-[210px] md:h-[220px] lg:h-[260px]">
                  <div className="pointer-events-none absolute left-2 top-2 z-10 flex gap-1">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-monitor" aria-hidden="true"><rect width="20" height="14" x="2" y="3" rx="2"></rect><line x1="8" x2="16" y1="21" y2="21"></line><line x1="12" x2="12" y1="17" y2="21"></line></svg>
                      150&quot; HD
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" aria-hidden="true"><path d="M8 9v6h3l4 3V6l-4 3H8z" fill="currentColor" opacity="0.95"></path><path d="M17.5 9.5a4 4 0 010 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M19 7a7 7 0 010 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>
                      600W Sony
                    </span>
                  </div>
                  <div className="relative h-full w-full">
                    <img
                      alt={`${room.name} image`}
                      className="object-cover w-full h-full absolute inset-0"
                      src={room.img}
                    />
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-2.5 sm:p-3.5 lg:p-4">
                  {/* Title and Top Actions */}
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <div className="min-w-0 flex items-center gap-2">
                      <h3 className="truncate text-lg font-bold text-black sm:text-xl md:text-[22px] lg:text-2xl font-sans">
                        {room.name}
                      </h3>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#FFD700]/25 bg-[#FFD700]/8 px-1.5 py-0.5 text-[9px] font-semibold text-[#9a6b00] sm:px-2 sm:text-[10px] font-sans">
                        Premium
                      </span>
                    </div>
                    <div className="flex gap-1.5 sm:gap-2">
                      {/* Map Link */}
                      <a
                        href="https://maps.google.com/?q=B-299, Outer Ring Rd, Block B, Saraswati Vihar, Pitampura, Delhi, 110034"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-0.5 text-gray-700 transition-colors hover:text-black font-sans"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm transition-all duration-200 group-hover:scale-105 group-hover:border-gray-300 group-hover:shadow sm:h-8 sm:w-8">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-map-pin" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        </div>
                        <span className="text-[9px] font-medium sm:text-[10px]">Map</span>
                      </a>
                      
                      {/* Menu Link */}
                      <a
                        href="/documents/menus/dazzling-screens-menu.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-0.5 text-gray-700 transition-colors hover:text-black font-sans"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm transition-all duration-200 group-hover:scale-105 group-hover:border-gray-300 group-hover:shadow sm:h-8 sm:w-8">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-utensils" aria-hidden="true"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>
                        </div>
                        <span className="text-[9px] font-medium sm:text-[10px]">Menu</span>
                      </a>
                    </div>
                  </div>

                  {/* Specifications List */}
                  <div className="mb-2 space-y-1 text-[10px] text-gray-600 sm:mb-1 sm:text-[12px] font-sans">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span className="inline-flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-map-pin text-gray-500" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        Pitampura, Delhi
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users text-gray-500" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
                        Up to {room.capacity} People
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-utensils text-gray-500" aria-hidden="true"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>
                        Food
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-balloon text-gray-500" aria-hidden="true"><path d="M12 16v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1"></path><path d="M12 6a2 2 0 0 1 2 2"></path><path d="M18 8c0 4-3.5 8-6 8s-6-4-6-8a6 6 0 0 1 12 0"></path></svg>
                        Decor ₹700 Only
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shield-check text-gray-500" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
                        Free Cancellation*
                      </span>
                      
                      {/* Ideal for (with heart and user icons and hover tooltip) */}
                      <div aria-label="Ideal for couples, family and friends" className="group relative inline-flex min-w-0 cursor-help items-center gap-1">
                        <span className="truncate">Ideal for</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart shrink-0 text-gray-500" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path></svg>
                        <span className="truncate">couple and</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users shrink-0 text-gray-500" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
                        <span className="truncate">family</span>
                        <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-0.5 text-[9px] text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 shadow-lg">
                          Ideal for couples, family and friends
                        </span>
                      </div>
                    </div>

                    {/* Progress Flow Steps */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-gray-500 pt-1.5 border-t border-gray-100/50 mt-1.5">
                      <span className="font-semibold text-gray-600">Next Step:</span>
                      <span className="inline-flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        Add Details
                      </span>
                      <span aria-hidden="true" className="text-gray-400">&gt;</span>
                      <span className="inline-flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-cake" aria-hidden="true"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"></path><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"></path><path d="M2 21h20"></path><path d="M7 8v3"></path><path d="M12 8v3"></path><path d="M17 8v3"></path><path d="M7 4h.01"></path><path d="M12 4h.01"></path><path d="M17 4h.01"></path></svg>
                        Add Cake
                      </span>
                      <span aria-hidden="true" className="text-gray-400">&gt;</span>
                      <span className="inline-flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-wand-sparkles" aria-hidden="true"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"></path><path d="m14 7 3 3"></path><path d="M5 6v4"></path><path d="M19 14v4"></path><path d="M10 2v2"></path><path d="M7 8H3"></path><path d="M21 16h-4"></path><path d="M11 3H9"></path></svg>
                        Fog Entry
                      </span>
                      <span aria-hidden="true" className="text-gray-400">&gt;</span>
                      <span className="inline-flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-gift" aria-hidden="true"><rect x="3" y="8" width="18" height="4" rx="1"></rect><path d="M12 8v13"></path><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path></svg>
                        Gifts
                      </span>
                    </div>
                  </div>

                  {/* Price and Check Availability Button */}
                  <div className="mt-auto flex items-end justify-between gap-2 border-t border-gray-150 pt-2 sm:pt-2.5">
                    <div className="min-w-0 flex-1">
                      <p className="text-xl font-bold leading-none text-black sm:text-2xl md:text-2xl lg:text-3xl font-sans">
                        ₹{room.price}
                      </p>
                      <p className="mt-0.5 line-clamp-1 text-[10px] leading-tight text-gray-550 sm:text-xs lg:text-sm font-sans">
                        For up to {room.capacity} Person
                      </p>
                    </div>

                    <Link
                      href={`/booking?theatre=${room.id}`}
                      className="group inline-flex items-center justify-center rounded-full border border-black bg-transparent font-bold text-black transition-all hover:bg-black hover:text-white min-w-[118px] shrink-0 px-3.5 py-2 text-xs sm:min-w-[132px] sm:px-4 sm:py-2.5 sm:text-sm lg:min-w-[150px] lg:px-6 lg:py-3 lg:text-base font-sans"
                    >
                      <span>Check Availability</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-0 w-0 opacity-0 overflow-hidden transition-all duration-200 group-hover:ml-2 group-hover:w-[18px] group-hover:opacity-100"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. A LOOK INSIDE DAZZLING SCREENS */}
      <section className="bg-[#f8f5ef] px-4 py-16 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-black font-serif">
              A Look Inside Dazzling Screens
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Watch quick highlights from real celebrations in our private theatres.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {VIDEOS.map((vid) => (
              <article
                key={vid.id}
                onClick={() => setActiveVideo(vid.id)}
                className="cursor-pointer group relative aspect-[9/16] rounded-xl overflow-hidden bg-slate-900 border-2 border-slate-700 shadow-md transition hover:scale-102 hover:border-[#FFD700]"
              >
                {/* Mock Video Cover */}
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300)` }} />
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-colors" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-between p-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFD700] text-black flex items-center justify-center font-bold text-xs mt-auto mb-2 shadow-lg scale-90 group-hover:scale-100 transition-transform">
                    ▶
                  </div>
                  <h4 className="text-[10px] font-semibold text-white text-center leading-tight truncate w-full">
                    {vid.title}
                  </h4>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EXTRA DECORATIONS */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f1115] font-serif">
              Premium Decoration Upgrades
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Transform your private theatre celebration with spectacular styled decors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DECORS.map((dec, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-md border border-gray-100"
              >
                <img
                  alt={dec.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  src={dec.img}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4 flex flex-col justify-end">
                  <h3 className="text-white font-serif font-bold text-base sm:text-lg">{dec.name}</h3>
                  <p className="text-white/75 text-xs mt-1">{dec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. REVIEWS & TESTIMONIALS */}
      <section className="bg-[#f8f5ef] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-black font-serif">Loved by Our Guests</h2>
            <p className="text-gray-500 text-sm mt-1">
              Thousands of premium private theatre celebrations hosted on Google Reviews.
            </p>
            <div className="flex items-center justify-center gap-1 mt-4">
              <span className="text-2xl font-bold text-gray-900">4.9</span>
              <span className="text-yellow-500 text-lg">★★★★★</span>
              <span className="text-xs text-gray-500">(394 reviews)</span>
            </div>
          </div>

          <div
            ref={reviewsRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
          >
            {REVIEWS.map((rev, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-full max-w-[340px] sm:max-w-[400px] snap-start bg-white border border-gray-100 p-6 rounded-2xl shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center font-bold text-white text-sm">
                    {rev.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{rev.name}</h4>
                    <span className="text-[10px] text-gray-400">{rev.age}</span>
                  </div>
                  <div className="ml-auto text-yellow-500 text-xs">★★★★★</div>
                </div>
                <p className="text-xs sm:text-sm text-gray-650 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f1115] font-serif">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-500 mt-2">Everything you need to know before booking.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  type="button"
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-gray-950 hover:bg-gray-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-gray-400 font-bold transition-transform duration-200">
                    {openFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL: YOUTUBE VIDEO */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 z-10 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black font-bold text-sm transition"
            >
              ✕
            </button>
            <iframe
              title="YouTube highlight video"
              className="w-full h-full border-0"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* MODAL: MOCK IN-HOUSE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl w-full max-w-[500px] max-h-[85vh] overflow-y-auto p-6 relative shadow-2xl animate-fadeIn">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition"
            >
              ✕
            </button>
            <h3 className="font-serif font-bold text-xl mb-4 border-b border-gray-100 pb-2 flex items-center gap-1.5">
              🍴 Private Theatre Menu
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-xs text-yellow-800 uppercase tracking-wider mb-2">Popular Snacks</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Super Loaded Garlic Bread</span>
                    <strong className="text-gray-900">₹199</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Cheese Melt French Fries</span>
                    <strong className="text-gray-900">₹149</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Crispy Paneer Nachos</span>
                    <strong className="text-gray-900">₹179</strong>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-3">
                <h4 className="font-bold text-xs text-yellow-800 uppercase tracking-wider mb-2">Pizzas & Burgers</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Spicy Margherita Pizza</span>
                    <strong className="text-gray-900">₹299</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Double Veg Cheese Burger</span>
                    <strong className="text-gray-900">₹159</strong>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <h4 className="font-bold text-xs text-yellow-800 uppercase tracking-wider mb-2">Mocktails & Drinks</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Virgin Mojito (Mint & Lemon)</span>
                    <strong className="text-gray-900">₹129</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Blue Lagoon mocktail</span>
                    <strong className="text-gray-900">₹129</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Cold Drink (Coke/Pepsi)</span>
                    <strong className="text-gray-900">₹69</strong>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-full mt-6 bg-[#0f1115] hover:bg-gray-800 text-white py-2.5 rounded-xl font-bold text-xs transition"
            >
              Close Menu
            </button>
          </div>
        </div>
      )}

      {/* MODAL: LOCATION MAP */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl w-full max-w-[500px] p-6 relative shadow-2xl animate-fadeIn">
            <button
              onClick={() => setIsMapOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition"
            >
              ✕
            </button>
            <h3 className="font-serif font-bold text-xl mb-4 border-b border-gray-100 pb-2 flex items-center gap-1.5">
              🗺️ Our Locations
            </h3>
            
            <div className="space-y-4 text-sm">
              <div className="border border-gray-100 rounded-xl p-3.5 bg-gray-50">
                <h4 className="font-bold text-sm text-gray-900 mb-1">📍 Pitampura Branch (Delhi)</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  B-299, Outer Ring Rd, Block B, Saraswati Vihar, Pitampura, Delhi, 110034
                </p>
                <div className="h-[120px] rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                  <iframe
                    src="https://maps.google.com/maps?q=Dazzling+Screens+-+Private+Theater+Celebration+Space,+Pitampura,+Delhi&t=h&z=17&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              <div className="border border-gray-100 rounded-xl p-3.5 bg-gray-50">
                <h4 className="font-bold text-sm text-gray-900 mb-1">📍 Noida Branch (Sector 51)</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  Sector 51 Metro Station Hub, Noida, Uttar Pradesh – 201301.
                </p>
                <div className="h-[120px] rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                  <iframe
                    src="https://maps.google.com/maps?q=Noida+Sector+51+Metro+Station&t=h&z=17&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsMapOpen(false)}
              className="w-full mt-6 bg-[#0f1115] hover:bg-gray-800 text-white py-2.5 rounded-xl font-bold text-xs transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
