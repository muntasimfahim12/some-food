"use client";

import React, { useState } from "react";
import { motion, Transition } from "framer-motion";
import Link from "next/link";

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

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-4">
      <nav className="w-full max-w-7xl mx-auto flex justify-between items-center bg-white dark:bg-black shadow-md rounded-full px-6 py-3">
        <div className="text-2xl font-extrabold text-red-500 dark:text-red-400">
          <Link href="/">SomeFood</Link>
        </div>

        <div className="flex items-center space-x-6">
          <Menu setActive={setActive}>
            <MenuItem setActive={setActive} active={active} item="Home" link="/" />
            <MenuItem setActive={setActive} active={active} item="About" link="/about" />
            <MenuItem setActive={setActive} active={active} item="Menu" link="/menu" />
            <MenuItem setActive={setActive} active={active} item="Contact" link="/contact" />
          </Menu>
        </div>
      </nav>
    </div>
  );
}

const MenuItem = ({ setActive, active, item, children, link }: MenuItemProps) => (
  <div onMouseEnter={() => setActive(item)} className="relative cursor-pointer">
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
          className="bg-white dark:bg-black backdrop-blur-md rounded-2xl border border-black/20 dark:border-white/20 shadow-lg"
        >
          <motion.div layout className="w-max h-full p-3">{children}</motion.div>
        </motion.div>
      </motion.div>
    )}
  </div>
);

const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => <div className="flex items-center space-x-6" onMouseLeave={() => setActive(null)}>{children}</div>;
