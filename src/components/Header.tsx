"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isBooking = pathname === "/booking";
  const isLegal =
    pathname === "/terms-and-conditions" ||
    pathname === "/privacy-policy" ||
    pathname === "/refund-policy" ||
    pathname === "/cancellation-policy";

  const linkColorClass = "text-[#111111] hover:text-yellow-600 transition-colors duration-200 font-semibold";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Track if scrolled past a small threshold
      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide/Show logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and scrolled past 100px -> hide
        setIsVisible(false);
      } else {
        // Scrolling up or near the top -> show
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className="w-full fixed top-0 left-0 z-50 flex flex-col pointer-events-none transition-transform duration-300"
      style={{
        transform: !isVisible && !isBooking && !isOpen
          ? "translateY(-100%)"
          : "translateY(0)"
      }}
    >
      {/* 1. TOP SCROLLING ANNOUNCEMENT BAR */}
      {!isBooking && (
        <div className="w-full bg-black text-white border-b border-white/5 overflow-hidden h-[34px] flex items-center pointer-events-auto">
          <div className="flex whitespace-nowrap animate-marquee w-max">
            <div className="flex items-center gap-16 pr-16 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
              <span>HURRY UP !!! BOOK YOUR SLOTS IN ADVANCE AND ENJOY SPECIAL OFFERS. FOR DISCOUNTS, CALL US NOW! 928-928-9696</span>
              <span>✦</span>
              <span>DELHI NCR&apos;S PREMIUM PRIVATE THEATRE CELEBRATION CHANNELS</span>
              <span>✦</span>
            </div>
            <div className="flex items-center gap-16 pr-16 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
              <span>HURRY UP !!! BOOK YOUR SLOTS IN ADVANCE AND ENJOY SPECIAL OFFERS. FOR DISCOUNTS, CALL US NOW! 928-928-9696</span>
              <span>✦</span>
              <span>DELHI NCR&apos;S PREMIUM PRIVATE THEATRE CELEBRATION CHANNELS</span>
              <span>✦</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAIN NAVBAR */}
      <header
        className={`w-full transition-all duration-300 pointer-events-auto ${
          isBooking
            ? "bg-white border-b border-gray-300 py-2.5 shadow-sm text-gray-850"
            : isLegal
            ? "bg-white border-b border-gray-200 py-3 shadow-sm text-gray-850"
            : isScrolled
            ? "bg-white/95 border-b border-gray-200/80 backdrop-blur-md py-3 shadow-md text-gray-900"
            : "bg-white/45 border-b border-black/5 backdrop-blur-md py-3.5 text-gray-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Badge */}
          <Link href="/" className="flex items-center cursor-pointer">
            <img
              src="/assets/logo.png"
              alt="Dazzling Screens Logo"
              className="h-[60px] w-[60px] md:h-[70px] md:w-[70px] bg-[#FFD700] rounded-full object-contain p-1.5 shadow-lg transition-all hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          {!isBooking && (
            <nav className="relative hidden md:flex items-center gap-8 font-semibold text-xs sm:text-sm tracking-wide">
              {/* Yellow glow background behind navbar links */}
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[55px] bg-[radial-gradient(circle,rgba(255,223,0,0.5)_0%,rgba(255,223,0,0)_75%)] pointer-events-none -z-10 blur-sm"
              />
              <Link
                href="/"
                className={`transition-colors ${linkColorClass}`}
              >
                Home
              </Link>
              <Link
                href="/gallery"
                className={`transition-colors ${linkColorClass}`}
              >
                Gallery
              </Link>
              <Link
                href="/about"
                className={`transition-colors ${linkColorClass}`}
              >
                About
              </Link>
              <Link
                href="/waitlist"
                className={`transition-colors ${linkColorClass}`}
              >
                Join Waitlist
              </Link>
              <Link
                href="/contact"
                className={`transition-colors ${linkColorClass}`}
              >
                Contact
              </Link>
            </nav>
          )}

          {/* CTA "Book Now" */}
          <div>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-full bg-[#FFD700] hover:bg-[#E6C200] text-black font-extrabold px-6 py-2.5 text-xs sm:text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[#FFD700]/30 hover:-translate-y-0.5 uppercase tracking-wider"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          {!isBooking && (
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="p-2 rounded-lg transition text-gray-800 hover:bg-black/5"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Drawer */}
        {isOpen && !isBooking && (
          <div
            className="md:hidden absolute top-full left-0 w-full border-b py-6 px-5 flex flex-col gap-4 shadow-2xl animate-fadeIn pointer-events-auto transition-colors duration-300 bg-white/95 backdrop-blur-md border-gray-200 text-gray-900"
          >
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="font-semibold text-sm py-2 border-b border-gray-100 transition-colors text-gray-800 hover:text-yellow-600"
            >
              Home
            </Link>
            <Link
              href="/gallery"
              onClick={() => setIsOpen(false)}
              className="font-semibold text-sm py-2 border-b border-gray-100 transition-colors text-gray-800 hover:text-yellow-600"
            >
              Gallery
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="font-semibold text-sm py-2 border-b border-gray-100 transition-colors text-gray-800 hover:text-yellow-600"
            >
              About
            </Link>
            <Link
              href="/waitlist"
              onClick={() => setIsOpen(false)}
              className="font-semibold text-sm py-2 border-b border-gray-100 transition-colors text-gray-800 hover:text-yellow-600"
            >
              Join Waitlist
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="font-semibold text-sm py-2 border-b border-gray-100 transition-colors text-gray-800 hover:text-yellow-600"
            >
              Contact
            </Link>
            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="mt-3 w-full inline-flex items-center justify-center rounded-full bg-[#FFD700] hover:bg-[#E6C200] text-black font-extrabold py-3.5 text-sm transition uppercase tracking-wider"
            >
              Book Now
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}
