"use client";

import React, { useState } from "react";
import { useSignUp, useClerk } from "@clerk/nextjs";
import type { SignUpResource, ClerkAPIResponseError } from "@clerk/types";

interface RegisterFormProps {
  onSwitch: () => void;
  onSuccess?: () => void;
}

export default function RegisterForm({ onSwitch, onSuccess }: RegisterFormProps) {
  const { setActive } = useClerk();
  const { isLoaded, signUp } = useSignUp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  // ✅ Handle registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLoaded) return;

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      // ✅ Create user
      await signUp.create({
        emailAddress: email,
        password,
        firstName: name,
      });

      // ✅ Prepare email verification
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      } else if (
        typeof err === "object" &&
        err !== null &&
        "errors" in err
      ) {
        const clerkErr = err as ClerkAPIResponseError;
        setError(clerkErr.errors?.[0]?.longMessage || "Sign-up failed");
      } else {
        setError("Something went wrong during sign-up");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle email verification
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!isLoaded) return;

    try {
      const completeSignUp: SignUpResource =
        await signUp.attemptEmailAddressVerification({
          code,
        });

      if (
        completeSignUp.status === "complete" &&
        completeSignUp.createdSessionId
      ) {
        await setActive({ session: completeSignUp.createdSessionId });
        alert(`🎉 Welcome ${name}! Your account has been created successfully.`);
        onSuccess?.();
      }
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      } else if (
        typeof err === "object" &&
        err !== null &&
        "errors" in err
      ) {
        const clerkErr = err as ClerkAPIResponseError;
        setError(clerkErr.errors?.[0]?.longMessage || "Invalid verification code");
      } else {
        setError("Something went wrong during verification");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Email verification form
  if (pendingVerification) {
    return (
      <form onSubmit={handleVerify} className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          Verify Your Email
        </h2>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-4">
          We’ve sent a 6-digit verification code to {email}
        </p>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500"
          placeholder="Enter verification code"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </form>
    );
  }

  // ✅ Registration form
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
        Create Account
      </h2>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-4">
        Join SomeFood today!
      </p>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Full Name
        </label>
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
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
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
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 pr-12"
          placeholder="Create a strong password"
        />
        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          className="absolute right-3 top-[55%] text-gray-500 hover:text-gray-700 dark:text-gray-400"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>

      <div id="clerk-captcha" className="my-2" />

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-red-500 hover:underline"
        >
          Login
        </button>
      </p>
    </form>
  );
}
