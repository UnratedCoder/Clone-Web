import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import FloatingActions from "@/components/FloatingActions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import PromoBanner from "@/components/PromoBanner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dazzling Screens - Private Theatre Experiences",
  description: "Book private cinema experiences for birthdays, anniversaries, date nights, proposals & more. Unforgettable moments in a dazzling setting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#0f1115] font-sans">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingActions />
        <CookieBanner />
        <PromoBanner />
      </body>
    </html>
  );
}
