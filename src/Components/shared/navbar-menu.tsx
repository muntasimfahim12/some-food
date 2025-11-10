"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// ========================
// Utility function
// ========================
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// ========================
// Navbar Component
// ========================
export default function NavbarDemo() {
  return (
    <div className="relative w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex flex-col items-center justify-center mt-40 text-center px-4">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
          Welcome to SomeFood
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
          Hover over items to see dropdowns. Click items to navigate instantly.
        </p>
      </main>
    </div>
  );
}

function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setUserEmail("");
    } else {
      setIsLoggedIn(true);
      setUserEmail("user@example.com");
    }
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-4 py-4">
      <nav className="w-full max-w-7xl mx-auto flex justify-between items-center bg-white dark:bg-black shadow-lg rounded-full px-8 py-4">
        {/* Branding */}
        <div className="text-2xl font-extrabold text-red-500 dark:text-red-400">
          <Link href="/">SomeFood</Link>
        </div>

        {/* Menu */}
        <div className="flex items-center space-x-8">
          <Menu setActive={setActive}>
            <MenuItem
              setActive={setActive}
              active={active}
              item="Home"
              link="/"
            />
            <MenuItem
              setActive={setActive}
              active={active}
              item="Profile"
              link="/profile"
            />
            <MenuItem setActive={setActive} active={active} item="Services">
              <div className="flex flex-col space-y-2 text-sm">
                <Link href="/web-dev" className="hover:text-red-500">
                  Web Development
                </Link>
                <Link href="/interface-design" className="hover:text-red-500">
                  Interface Design
                </Link>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Products">
              <div className="grid grid-cols-2 gap-6 p-4 text-sm">
                <ProductItem
                  title="Algochurn"
                  href="https://algochurn.com"
                  src="https://assets.aceternity.com/demos/algochurn.webp"
                  description="Prepare for tech interviews"
                />
                <ProductItem
                  title="Tailwind Kit"
                  href="https://tailwindmasterkit.com"
                  src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                  description="Ready Tailwind components"
                />
              </div>
            </MenuItem>
          </Menu>
        </div>

        {/* Login/Logout */}
        <button
          onClick={handleLoginLogout}
          className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-black dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          {isLoggedIn ? userEmail + " (Logout)" : "Login"}
        </button>
      </nav>
    </div>
  );
}

// ========================
// Motion & Menu Components
// ========================
const transition = {
  type: "spring",
  mass: 2,
  damping: 14,
  stiffness: 120,
  restDelta: 0.001,
  restSpeed: 0.001,
};

type MenuItemProps = {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  link?: string;
};

const MenuItem = ({ setActive, active, item, children, link }: MenuItemProps) => {
  return (
    <div
      onMouseEnter={() => setActive(item)}
      className="relative cursor-pointer"
    >
      {link ? (
        <Link href={link} className="text-black dark:text-white hover:text-red-500 font-medium">
          {item}
        </Link>
      ) : (
        <motion.p
          transition={{ duration: 0.25 }}
          className="text-black dark:text-white hover:text-red-500 font-medium"
        >
          {item}
        </motion.p>
      )}

      {active === item && children && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
          className="absolute top-[calc(100%+0.5rem)] left-1/2 transform -translate-x-1/2 z-50"
        >
          <motion.div
            layoutId="active"
            className="bg-white dark:bg-black backdrop-blur-md rounded-2xl border border-black/20 dark:border-white/20 shadow-xl"
          >
            <motion.div layout className="w-max h-full p-4">{children}</motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-center space-x-6" onMouseLeave={() => setActive(null)}>
      {children}
    </div>
  );
};

const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <a
      href={href}
      className="flex space-x-2 hover:opacity-90 rounded-md p-2 transition-all duration-200"
    >
      <img src={src} width={90} height={45} alt={title} className="rounded-md" />
      <div>
        <h4 className="font-semibold text-black dark:text-white">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </a>
  );
};
