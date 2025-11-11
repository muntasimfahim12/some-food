"use client";

import { motion } from "framer-motion";


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
    

      {/* Hero Section */}
      <section className="relative mx-auto mt-24 max-w-7xl px-4 py-16 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-red-600 dark:text-red-400 mb-6">
          About SomeFood
        </h1>
        <p className="max-w-3xl text-gray-700 dark:text-gray-300 text-lg md:text-xl mb-8">
          At SomeFood, we believe in delivering delicious meals prepared with the freshest ingredients. Our mission is to bring happiness to every customer through our carefully crafted dishes.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-8 mt-10"
        >
          <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-3xl p-6 max-w-sm">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              To provide quality, tasty meals quickly and efficiently while maintaining top-notch hygiene and service.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-3xl p-6 max-w-sm">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              To be the most loved restaurant, serving happiness and satisfaction to every customer.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-3xl p-6 max-w-sm">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Our Values
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Quality, Freshness, Customer Happiness, Transparency, and Sustainability.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 relative w-full max-w-4xl h-72 md:h-96 rounded-3xl overflow-hidden shadow-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Restaurant Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        </motion.div>
      </section>

    
    </div>
  );
}
