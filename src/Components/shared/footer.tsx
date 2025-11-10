"use client";

export function Footer() {
  return (
    <footer className="relative mx-auto mt-20 w-full max-w-7xl px-4 py-10 md:py-16 text-neutral-700 dark:text-neutral-300">
      {/* Top border */}
      <div className="absolute inset-x-0 top-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      </div>

      {/* Footer content */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-0">
        {/* Logo and description */}
        <div className="flex flex-col items-center md:items-start gap-4 md:w-1/3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-yellow-500" />
          <h1 className="text-2xl font-bold md:text-3xl">SomeFood</h1>
          <p className="text-center md:text-left text-sm md:text-base text-neutral-600 dark:text-neutral-400">
            Serving delicious meals made with love. Fresh ingredients, cozy ambiance, and flavors you’ll remember.
          </p>
        </div>

        {/* Navigation links */}
        <div className="flex flex-col gap-4 md:w-1/3 text-center md:text-left">
          <h2 className="font-semibold text-lg md:text-xl mb-2">Quick Links</h2>
          <ul className="flex flex-col gap-2">
            <li>
              <a href="#" className="hover:text-red-500 transition-colors">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 transition-colors">Menu</a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 transition-colors">About Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 transition-colors">Reservations</a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 transition-colors">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact & social */}
        <div className="flex flex-col gap-4 md:w-1/3 text-center md:text-left">
          <h2 className="font-semibold text-lg md:text-xl mb-2">Contact Us</h2>
          <p className="text-sm md:text-base">123 Flavor Street, Foodtown</p>
          <p className="text-sm md:text-base">+1 (555) 987-6543</p>
          <p className="text-sm md:text-base">support@somefood.com</p>

          <div className="flex justify-center md:justify-start gap-4 mt-2">
            <a href="#" className="hover:text-red-500 transition-colors">Instagram</a>
            <a href="#" className="hover:text-red-500 transition-colors">Facebook</a>
            <a href="#" className="hover:text-red-500 transition-colors">Twitter</a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 border-t border-neutral-200/80 dark:border-neutral-800/80 pt-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
        &copy; {new Date().getFullYear()} SomeFood. All rights reserved.
      </div>
    </footer>
  );
}
