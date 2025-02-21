"use client";

import { useActionState } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import login from "./login";

export default function Login() {
  const [state, formAction] = useActionState(login, { error: "" });
  const [redirectTo, setRedirectTo] = useState("/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setRedirectTo(searchParams.get("redirect") || "/");
    }
  }, []);

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

        {/* Login Form */}
        <form
          action={formAction}
          className="absolute w-3/4 h-[520px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/10 rounded-lg backdrop-blur-lg border-2 border-white/10 shadow-[0_0_40px_rgba(8,7,16,0.6)] p-[50px_35px]"
        >
          <h3 className="text-[32px] font-medium leading-[42px] text-center">
            Login Here
          </h3>
          <input type="hidden" name="redirect" value={redirectTo || "/"} />

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
          {state.error && (
            <div className="text-red-500 mt-2 text-center">{state.error}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-[50px] w-full bg-white text-[#080710] py-[15px] text-lg font-semibold rounded-md cursor-pointer border-none"
          >
            Log In
          </button>

          {/* Signup Link */}
          <div className="mt-[30px] text-center">
            <Link href="/auth/signup" className="text-white hover:underline">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}