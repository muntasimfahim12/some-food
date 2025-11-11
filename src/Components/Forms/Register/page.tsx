"use client";

import React, { useState } from "react";

export default function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(`Registered as: ${name}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">Create Account</h2>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-4">Join SomeFood today!</p>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500"
          placeholder="you@example.com"
        />
      </div>

      <div className="relative">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 pr-12"
          placeholder="Create password"
        />
        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          className="absolute right-3 top-[55%] text-gray-500 hover:text-gray-700 dark:text-gray-400"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>

      <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium">
        Register
      </button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <button type="button" onClick={onSwitch} className="text-red-500 hover:underline">
          Login
        </button>
      </p>
    </form>
  );
}
