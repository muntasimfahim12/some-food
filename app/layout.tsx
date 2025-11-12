import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NavbarDemo from "@/src/Components/shared/navbar-menu";
import { HeroSectionOne } from "@/src/Components/Hero/page";
import { Footer } from "@/src/Components/shared/footer";
import { FoodCard } from "@/src/Components/Pages/FoodCard/page";
import AboutPage from "@/src/Components/Pages/About/Page";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SomeFood Restaurant",
  description: "Delicious meals delivered with love – SomeFood",
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900`}
      >
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
          {/* Navbar */}
          <NavbarDemo />

          {/* Hero Section */}
          <section className="mt-20 px-4">
            <HeroSectionOne />
          </section>

          {/* Menu Section */}
          <section className="mt-20 max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-10">
              Our Delicious Menu
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <FoodCard />
              <FoodCard />
              <FoodCard />
              <FoodCard />
            </div>
          </section>

          {/* About Section */}
          <section className="mt-20 px-4">
            <AboutPage />
          </section>

          {/* Footer */}
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
