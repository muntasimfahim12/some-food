"use client";

import React, { useState } from "react";
import { motion, Transition } from "framer-motion";
import Link from "next/link";
import RegisterForm from "../Forms/Register/page";
import LoginForm from "../Forms/Login/page";


const transition: Transition = {
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

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setUserEmail("");
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 px-4 py-2">
        <nav className="w-full max-w-7xl mx-auto flex justify-between items-center bg-white dark:bg-black shadow-md rounded-full px-6 py-3">
          <div className="text-2xl font-extrabold text-red-500 dark:text-red-400">
            <Link href="/">SomeFood</Link>
          </div>

          <div className="flex items-center space-x-6">
            <Menu setActive={setActive}>
              <MenuItem setActive={setActive} active={active} item="Home" link="/" />
              <MenuItem setActive={setActive} active={active} item="Profile" link="/profile" />
              <MenuItem setActive={setActive} active={active} item="Services">
                <div className="flex flex-col space-y-2 text-sm p-2">
                  <Link href="/web-dev" className="hover:text-red-500">Web Development</Link>
                  <Link href="/interface-design" className="hover:text-red-500">Interface Design</Link>
                </div>
              </MenuItem>
            </Menu>
          </div>

          <button
            onClick={handleLoginLogout}
            className="ml-4 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-black dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {isLoggedIn ? `${userEmail} (Logout)` : "Login"}
          </button>
        </nav>
      </div>

      {/* Modal */}
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
             <RegisterForm onSwitch={() => setIsRegistering(false)}></RegisterForm>
            ) : (
              <LoginForm onSwitch={() => setIsRegistering(true)} ></LoginForm>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const MenuItem = ({ setActive, active, item, children, link }: MenuItemProps) => (
  <div onMouseEnter={() => setActive(item)} className="relative cursor-pointer">
    {link ? (
      <Link href={link} className="text-black dark:text-white hover:text-red-500 font-medium">
        {item}
      </Link>
    ) : (
      <motion.p transition={{ duration: 0.25 }} className="text-black dark:text-white hover:text-red-500 font-medium">
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
          className="bg-white dark:bg-black backdrop-blur-md rounded-2xl border border-black/20 dark:border-white/20 shadow-lg"
        >
          <motion.div layout className="w-max h-full p-3">{children}</motion.div>
        </motion.div>
      </motion.div>
    )}
  </div>
);

const Menu = ({ setActive, children }: { setActive: (item: string | null) => void; children: React.ReactNode }) => (
  <div className="flex items-center space-x-6" onMouseLeave={() => setActive(null)}>{children}</div>
);
