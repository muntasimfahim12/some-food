"use client";

import { useState } from "react";
import LoginForm from "./Login/page";
import RegisterForm from "./Register/page";


export default function AuthSection() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => setIsLogin((prev) => !prev);

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        {isLogin ? (
          <LoginForm onSwitch={handleSwitch}></LoginForm>
        ) : (
          <RegisterForm onSwitch={handleSwitch}></RegisterForm>
        )}
      </div>
    </section>
  );
}
