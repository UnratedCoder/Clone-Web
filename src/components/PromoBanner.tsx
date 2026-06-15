"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PromoBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem("promo-banner-dismissed");
    if (!isDismissed) {
      setIsOpen(true);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("promo-banner-dismissed", "true");
    setIsOpen(false);
  };

  // Don't show on booking page
  if (pathname === "/booking" || !isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-45 bg-[#0a0c10] border-t border-white/10 text-white shadow-[0_-8px_30px_rgba(0,0,0,0.6)] animate-slideUp">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between gap-4">
        {/* Empty left spacer for desktop centering */}
        <div className="hidden md:block w-8 shrink-0"></div>

        {/* Center content */}
        <div className="flex flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-4 w-full text-center">
          <p className="text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-1.5 flex-wrap justify-center font-sans">
            <span>Get free cake. Use code</span>
            <code className="bg-white/10 border border-white/20 text-white font-mono font-extrabold px-2 py-0.5 rounded tracking-widest text-xs uppercase">
              FREECAKE
            </code>
          </p>

          <Link
            href="/booking"
            className="inline-flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-black font-extrabold px-5 py-1.5 text-xs transition-transform duration-200 active:scale-95 whitespace-nowrap shadow font-sans"
          >
            Book Now
          </Link>
        </div>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          type="button"
          aria-label="Dismiss banner"
          className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition border border-white/5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
