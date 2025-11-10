"use client";

export function FoodCard() {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-lg overflow-hidden max-w-xs mx-auto">
      {/* Image */}
      <div className="relative h-56 w-full">
        <img
          src="/banner/pexels-ella-olsson-572949-1640777.jpg" // Correct path
          alt="Margherita Pizza"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
          Margherita Pizza
        </h3>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Classic Italian pizza with fresh mozzarella and basil.
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-red-600 dark:text-red-500">
            $12
          </span>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium text-sm hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-all">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
