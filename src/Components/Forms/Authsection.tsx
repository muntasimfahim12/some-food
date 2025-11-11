"use client";

import LoginForm from "./Login/page";
import RegisterForm from "./Register/page";



export default function AuthSection() {
  return (
    <section className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 justify-center">
     <LoginForm></LoginForm>
     <RegisterForm></RegisterForm>
    </section>
  );
}
