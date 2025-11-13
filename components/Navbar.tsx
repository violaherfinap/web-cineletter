"use client";

import { useState, useEffect } from "react";
import { Search, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "TV-Show", path: "/tv-show" },
    { name: "Genre", path: "/genre" },
    { name: "Person", path: "/person" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed left-1/2 transform -translate-x-1/2 transition-all duration-500 z-50
        ${
          isScrolled
            ? "top-4 bg-[#08092e] backdrop-blur-md px-6 py-2 rounded-full shadow-lg w-[80%] max-w-5xl border border-[#ffffff1a]"
            : "top-0 bg-[#08092e] w-full rounded-none shadow-md border-b border-[#ffffff1a]"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 
          ${isScrolled ? "py-1" : "py-3"} max-w-7xl mx-auto`}
        >
          {/* LEFT: Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-[#ffffff] text-[#0d0d0d] rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              D
            </div>
            <span className="font-bold text-lg tracking-wide">DBMSATRIA</span>
          </div>

          {/* CENTER: Menu + Search */}
          <div className="flex items-center space-x-6 relative">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`no-underline transition text-sm ${
                  pathname === item.path
                    ? "text-[#ff1212]"
                    : "text-[#ffffff] hover:text-[#ffffffb3]"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* === Executive Only Dropdown === */}
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm transition ${
                  showDropdown ? "text-[#ff1212]" : "text-white hover:text-[#ffffffb3]"
                }`}
              >
                Executive Only
                <ChevronDown className="w-4 h-4" />
              </button>

              {showDropdown && (
                <div className="absolute mt-2 right-0 bg-[#0f0f3a] border border-[#ffffff1a] rounded-lg shadow-lg w-36 py-2 z-50">
                  <Link
                    href="/executive/dashboard"
                    className="block px-4 py-2 no-underline text-sm text-white hover:bg-[#1b1b5a]"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/executive/edit"
                    className="block px-4 py-2 no-underline text-sm text-white  hover:bg-[#1b1b5a]"
                  >
                    Edit
                  </Link>
                </div>
              )}
            </div>

            {/* Search bar */}
            <div className="relative hidden sm:block ml-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa]" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && search.trim() !== "") {
                    router.push(`/movies/${search.toLowerCase().replace(/\s+/g, "")}`);
                    setSearch("");
                  }
                }}
                className="bg-[#ffffff0d] border border-[#ffffff1a] text-white placeholder-[#aaa] text-sm rounded-full pl-9 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#ffffff40] focus:border-[#ffffff40] transition-all w-44 hover:w-56"
              />
            </div>
          </div>

          {/* RIGHT: Auth */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowAuth(true)}>
            <span className="hidden sm:inline text-white hover:text-[#ffffffb3] text-sm transition">
              Sign Up / Log In
            </span>
            <div className="w-9 h-9 rounded-full bg-[#ffffff1a] hover:bg-[#ffffff33] flex items-center justify-center transition">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </nav>

      {/* POPUP AUTH*/}
      {showAuth && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-8 w-80 relative animate-fadeIn">
            <button
              onClick={() => setShowAuth(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
            >
              ✕
            </button>

            {isLogin ? (
              <>
                <h2 className="text-2xl font-semibold mb-5 text-center">Log In</h2>
                <form className="flex flex-col space-y-4">
                  <input
                    type="text"
                    placeholder="Username / Email address"
                    className="bg-white/80 border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="bg-white/80 border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Log In
                  </button>
                </form>
                <p className="text-sm text-center mt-4 text-gray-600">
                  New to <span className="font-semibold">DBMSATRIA</span>?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    Sign up now.
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-5 text-center">Sign Up</h2>
                <form className="flex flex-col space-y-4">
                  <input
                    type="text"
                    placeholder="Username"
                    className="bg-white/80 border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="bg-white/80 border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="bg-white/80 border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="bg-white/80 border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Sign Up
                  </button>
                </form>
                <p className="text-sm text-center mt-4 text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    Log in now.
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}