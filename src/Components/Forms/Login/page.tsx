/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useSignIn, useClerk } from "@clerk/nextjs"; // ✅ Use from nextjs version (recommended)
import type { SignInResource } from "@clerk/types";

interface LoginFormProps {
  onSwitch: () => void;
  onSuccess?: () => void;
}

export default function LoginForm({ onSwitch, onSuccess }: LoginFormProps) {
  const { setActive } = useClerk();
  const { isLoaded, signIn } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Handle login submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLoaded) return;
    setLoading(true);

    try {
      // ✅ Create a sign-in attempt
      const attempt: SignInResource = await signIn.create({
        identifier: email,
        password,
      });

      if (attempt.status === "complete" && attempt.createdSessionId) {
        await setActive({ session: attempt.createdSessionId });
        alert(`✅ Welcome back, ${email}`);
        onSuccess?.();
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error(err);
      if (err && typeof err === "object") {
        const clerkError = err as { errors?: { longMessage?: string }[]; message?: string };
        setError(clerkError.errors?.[0]?.longMessage || clerkError.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // ------------------ UI --------------------
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
        Welcome Back
      </h2>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-4">
        Login to your SomeFood account
      </p>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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
          placeholder="Enter your password"
        />
        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          className="absolute right-3 top-[55%] text-gray-500 hover:text-gray-700 dark:text-gray-400"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Don’t have an account?{" "}
        <button type="button" onClick={onSwitch} className="text-red-500 hover:underline">
          Register
        </button>
      </p>
    </form>
  );
}
