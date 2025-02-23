"use client";

import { useActionState } from "react";
import Link from "next/link";
import Head from "next/head";
import signup from "./signup";

export default function Signup() {
  const [formState, formAction] = useActionState(signup, { error: "" });

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="relative w-screen h-screen bg-[#080710] overflow-hidden font-poppins text-white">
        {/* Background shapes */}
        <div className="absolute w-[430px] h-[520px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-b from-[#1845ad] to-[#23a2f6] -left-[80px] -top-[80px]"></div>
          <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-r from-[#ff512f] to-[#f09819] -right-[30px] -bottom-[80px]"></div>
        </div>

        {/* Signup Form */}
        <form
          action={formAction}
          className="absolute w-3/4 h-[600px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/10 rounded-lg backdrop-blur-lg border-2 border-white/10 shadow-[0_0_40px_rgba(8,7,16,0.6)] p-[50px_35px]"
        >
          <h3 className="text-3xl font-medium leading-[42px] text-center">
            Signup Here
          </h3>

          {/* Email Field */}
          <label htmlFor="email" className="block mt-[30px] text-base font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="block w-full h-[50px] bg-white/5 rounded-sm p-[0_10px] mt-2 text-sm font-light text-white placeholder-[#e5e5e5] border-none outline-none"
          />

          {/* Username Field */}
          <label htmlFor="username" className="block mt-[30px] text-base font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="block w-full h-[50px] bg-white/5 rounded-sm p-[0_10px] mt-2 text-sm font-light text-white placeholder-[#e5e5e5] border-none outline-none"
          />

          {/* Password Field */}
          <label
            htmlFor="password"
            className="block mt-[30px] text-base font-medium"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="block w-full h-[50px] bg-white/5 rounded-sm p-[0_10px] mt-2 text-sm font-light text-white placeholder-[#e5e5e5] border-none outline-none"
          />

          {/* Error Message */}
          {formState.error && (
            <div className="text-red-500 mt-2 text-center">{formState.error}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-8 w-full bg-white text-[#080710] py-[15px] text-lg font-semibold rounded-md cursor-pointer border-none"
          >
            Signup
          </button>

          {/* Login Link */}
          <div className="mt-[30px] text-center">
            <Link href="/auth/login" className="text-white hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}