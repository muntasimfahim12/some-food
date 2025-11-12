"use client";

import React, { useState } from "react";
import { motion, Transition } from "framer-motion";
import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";
import LoginForm from "@/src/Components/Forms/Login/page";
import RegisterForm from "@/src/Components/Forms/Register/page";

const transition: Transition = {
  type: "spring",
  mass: 2,
  damping: 14,
  stiffness: 120,
  restDelta: 0.001,
  restSpeed: 0.001,
};

type MenuItemProps = {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  link?: string;
};

export default function NavbarDemo() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [active, setActive] = useState<string | null>(null);

  // Mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);

  // Modal state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Smooth scroll
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false); // close mobile menu
  };

  const menuItems = [
    { item: "Home", id: "hero" },
    { item: "About", id: "about" },
    { item: "Menu", id: "menu" },
    { item: "Contact", id: "contact" },
  ];

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-4 bg-white dark:bg-black shadow-md rounded-full">
      <nav className="w-full max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-red-500 dark:text-red-400">
          <Link href="/">SomeFood</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {menuItems.map(({ item, id }) => (
            <button
              key={id}
              onClick={() => handleScroll(id)}
              className="text-black dark:text-white hover:text-red-500 font-medium"
            >
              {item}
            </button>
          ))}

          {!isSignedIn ? (
            <>
              <button
                onClick={() => { setShowAuthModal(true); setIsRegistering(false); }}
                className="px-4 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium"
              >
                Login
              </button>
              <button
                onClick={() => { setShowAuthModal(true); setIsRegistering(true); }}
                className="px-4 py-1 rounded-lg border border-red-600 hover:bg-red-600 hover:text-white text-red-600 font-medium"
              >
                Register
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-black dark:text-white font-semibold">
                {user?.firstName?.[0] || "U"}
              </div>
              <button
                onClick={() => signOut()}
                className="px-3 py-1 rounded-lg border border-red-600 hover:bg-red-600 hover:text-white text-red-600 font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            <span className="text-2xl">{mobileOpen ? "✖" : "☰"}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-black px-6 py-4 flex flex-col space-y-3">
          {menuItems.map(({ item, id }) => (
            <button
              key={id}
              onClick={() => handleScroll(id)}
              className="text-black dark:text-white hover:text-red-500 font-medium text-left"
            >
              {item}
            </button>
          ))}

          {!isSignedIn ? (
            <>
              <button
                onClick={() => { setShowAuthModal(true); setIsRegistering(false); setMobileOpen(false); }}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium"
              >
                Login
              </button>
              <button
                onClick={() => { setShowAuthModal(true); setIsRegistering(true); setMobileOpen(false); }}
                className="px-4 py-2 rounded-lg border border-red-600 hover:bg-red-600 hover:text-white text-red-600 font-medium"
              >
                Register
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-black dark:text-white font-semibold">
                {user?.firstName?.[0] || "U"}
              </div>
              <button
                onClick={() => { signOut(); setMobileOpen(false); }}
                className="px-3 py-1 rounded-lg border border-red-600 hover:bg-red-600 hover:text-white text-red-600 font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400"
            >
              ✖
            </button>
            {isRegistering ? (
              <RegisterForm onSwitch={() => setIsRegistering(false)} />
            ) : (
              <LoginForm onSwitch={() => setIsRegistering(true)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
