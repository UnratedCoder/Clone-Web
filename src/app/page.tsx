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
    tag: "Premium Couples Space",
    capacity: "Up to 2 People",
    price: "1,399",
    description: "Ideal for couples seeking romantic date nights, anniversaries, or intimate marriage proposals.",
    img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800",
  },
  {
    id: 2,
    name: "Theatre 2",
    tag: "Celebration Lounge",
    capacity: "Up to 6 People",
    price: "1,599",
    description: "Perfect for family birthdays, small friend circles, baby showers, or double dates.",
    img: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800",
  },
  {
    id: 3,
    name: "Theatre 3",
    tag: "Mega Screening Hall",
    capacity: "Up to 10 People",
    price: "1,799",
    description: "Designed for grand birthday bashes, family reunions, and huge group celebrations.",
    img: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=800",
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

      {/* 4. CHOOSE YOUR PRIVATE SPACE */}
      <section className="bg-white py-16 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1115] mb-4 font-serif">
              Choose Your Private Space
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              Luxury private theatres designed for romantic dates, birthdays, anniversaries, and custom surprise events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
            {THEATRES.map((room) => (
              <div
                key={room.id}
                className="flex flex-col h-full overflow-hidden rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Card Top Image & Badge */}
                <div className="relative h-[200px] sm:h-[230px]">
                  <div className="absolute left-3 top-3 z-10 flex gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-semibold text-white">
                      📺 150&quot; HD Screen
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-semibold text-white">
                      🔊 600W Sony
                    </span>
                  </div>
                  <img
                    alt={room.name}
                    className="object-cover w-full h-full"
                    src={room.img}
                  />
                </div>

                {/* Card Content */}
                <div className="flex-grow p-5 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif font-bold text-xl text-gray-900">{room.name}</h3>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-[#FFD700]/15 text-yellow-800 rounded-full">
                        {room.tag}
                      </span>
                    </div>
                    
                    {/* Location and specifications */}
                    <div className="space-y-1.5 text-xs text-gray-650 my-4">
                      <p className="flex items-center gap-1.5">
                        📍 Pitampura & Noida
                      </p>
                      <p className="flex items-center gap-1.5">
                        👥 Capacity: <strong className="text-gray-900">{room.capacity}</strong>
                      </p>
                      <p className="flex items-center gap-1.5">
                        🎂 Decoration & Cakes available
                      </p>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed mt-2">{room.description}</p>
                  </div>

                  {/* Booking CTA & Pricing */}
                  <div className="border-t border-gray-100 pt-4 mt-5 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 block leading-none">Starting from</span>
                      <strong className="text-xl font-bold text-gray-900 font-sans">₹{room.price}</strong>
                      <span className="text-[10px] text-gray-500 block">per slot</span>
                    </div>

                    <Link
                      href={`/booking?theatre=${room.id}`}
                      className="bg-[#0f1115] hover:bg-[#FFD700] hover:text-black text-white px-5 py-2.5 rounded-full font-bold text-xs transition duration-200"
                    >
                      Book Slot
                    </Link>
                  </div>
                </div>

                {/* Sub-Card Menu & Map links */}
                <div className="border-t border-gray-100 bg-gray-50 px-5 py-2.5 flex items-center justify-between text-xs font-bold text-gray-600">
                  <button
                    onClick={() => setIsMenuOpen(true)}
                    className="flex items-center gap-1 hover:text-[#0F1115] transition cursor-pointer"
                  >
                    🍴 In-house Menu
                  </button>
                  <button
                    onClick={() => setIsMapOpen(true)}
                    className="flex items-center gap-1 hover:text-[#0F1115] transition cursor-pointer"
                  >
                    🗺️ Venue Map
                  </button>
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
