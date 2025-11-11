"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import LoginForm from "../Forms/Login/page";
import RegisterForm from "../Forms/Register/page";

export function HeroSectionOne() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
      <Navbar onLoginClick={() => setShowAuthModal(true)} />

      {/* Decorative lines */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-red-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-red-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      </div>

      {/* Hero content */}
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Delicious Meals, Fresh Ingredients, Happy Customers"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1, ease: "easeInOut" }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Welcome to SomeFood! Enjoy freshly cooked meals with the finest ingredients. Reserve a table or order online for delivery right to your door.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="w-60 transform rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600">
            View Menu
          </button>
          <button className="w-60 transform rounded-lg border border-red-500 bg-white px-6 py-2 font-medium text-red-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-100 dark:border-red-500 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Book a Table
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTk5N3wwfDF8c2VhcmNofDF8fHJlc3RhdXJhbnQlMjBtZWFsfGVufDB8fHx8MTY5NDUyMTI4Mw&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Restaurant preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
      </div>

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

// Navbar with a Login button that triggers the modal
const Navbar = ({ onLoginClick }: { onLoginClick: () => void }) => {
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-yellow-500" />
        <h1 className="text-base font-bold md:text-2xl">SomeFood</h1>
      </div>
      <button
        onClick={onLoginClick}
        className="w-24 transform rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 md:w-32 dark:bg-red-500 dark:hover:bg-red-600"
      >
        Login
      </button>
    </nav>
  );
};
