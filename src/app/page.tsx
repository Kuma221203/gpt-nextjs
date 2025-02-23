"use client";
import Image from "next/image";
import Link from "next/link";
import logout from "./auth/logout";
import { useContext } from "react";
import { AuthContext } from "./auth/auth-context";

export default function Home() {
  const isAuthenticated = useContext(AuthContext) as boolean;
  return (
    <section className="bg-black text-white h-screen flex justify-center relative">
      <div className="absolute top-4 right-4">
        <div className="flex gap-2">
          {
            isAuthenticated ?
              <span
                onClick={
                  async () => {
                    await logout();
                  }
                }
                className="bg-transparent text-yellow-300 hover:text-yellow-700 rounded shadow hover:shadow-lg py-2 px-4 border border-transparent hover:border-transparent transition duration-300"
              >
                Logout
              </span>
              :
              (<>
                <Link
                  href="/auth/login"
                  className="bg-transparent text-yellow-300 hover:text-yellow-700 rounded shadow hover:shadow-lg py-2 px-2 border border-transparent hover:border-transparent transition duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-transparent text-yellow-300 hover:text-yellow-700 rounded shadow hover:shadow-lg py-2 px-4 border border-transparent hover:border-transparent transition duration-300"
                >
                  Sign Up
                </Link>
              </>)
          }
        </div>
      </div>
      <div className="container flex flex-col sm:flex-row items-center justify-center px-5">
        {/* Left Column: Text Content */}
        <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-10 sm:p-2">
          <h1 className="text-3xl md:text-5xl text-yellow-300 tracking-loose">
            SpaceGPT
          </h1>
          <h2 className="text-2xl md:text-4xl leading-relaxed md:leading-snug mb-2">
            The Infinity 🚀
          </h2>
          <p className="text-sm md:text-base text-gray-50 mb-4">
            Explore the universe of knowledge with SpaceGPT, ask anything, and get instant, intelligent answers to fuel your curiosity.
          </p>
          <Link
            href="/dashboard"
            className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent transition duration-300"
          >
            Chat Now!
          </Link>
        </div>
        {/* Right Column: Images */}
        <div className="w-3/5 sm:w-1/2 lg:w-2/3 flex justify-center">
          <div className="h-0 flex items-center sm:h-48">
            <Image
              src="/img1.png"
              alt="TechFest Image 1"
              width={200}
              height={200}
              className="hidden lg:block"
            />
            <Image
              src="/img2.png"
              alt="TechFest Image 2"
              width={300}
              height={300}
              className="p-8 md:p-0 hidden sm:block"
            />
            <Image
              src="/img3.png"
              alt="TechFest Image 3"
              width={200}
              height={200}
              className="hidden lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}