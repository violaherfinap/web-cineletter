"use client";

import { useState, useEffect, useRef } from "react";
import { Search, User, ChevronDown, Edit, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AuthModal from "@/components/AuthModal";
import EditSearchModal from "@/components/EditSearchModal"; // Pastikan sudah import ini

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // State untuk Modal Edit Cerdas
  const [showEditSearchModal, setShowEditSearchModal] = useState(false);

  // --- SIMULASI ROLE ---
  const userRole = "executive"; 

  const dropdownRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
          <Link href="/" className="flex items-center space-x-2 no-underline group cursor-pointer">
            <div className="bg-[#ffffff] text-[#0d0d0d] rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold group-hover:scale-110 transition">
              C
            </div>
            <span
              className={`font-bold text-lg tracking-wide transition-all duration-300 text-white group-hover:text-[#ff3b3b] ${
                isScrolled ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
              }`}
            >
              CineLetter
            </span>
          </Link>

          {/* CENTER: Menu */}
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

            {/* Role Access Dropdown */}
            <div className="relative select-none" ref={dropdownRef}>
              <div
                onClick={() => setShowDropdown((prev) => !prev)}
                className={`flex items-center gap-1 text-sm cursor-pointer transition ${
                  showDropdown ? "text-[#ff1212]" : "text-white hover:text-[#ffffffb3]"
                }`}
              >
                Role Access
                <ChevronDown
                  className={`w-4 h-4 transform transition-transform ${
                    showDropdown ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>

              {showDropdown && (
                <div className="absolute mt-2 right-0 bg-[#0f0f3a] border border-[#ffffff1a] rounded-lg shadow-lg w-40 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  
                  {/* Menu 1: Dashboard */}
                  <Link
                    href="/portal/select" 
                    className="flex items-center no-underline gap-2 px-4 py-2 text-sm text-white hover:bg-[#1b1b5a] transition"
                    onClick={() => setShowDropdown(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>

                  {/* Menu 2: Edit Data (MUNCUL KARENA ROLE = EXECUTIVE) */}
                  {userRole !== "marketing" && (
                    <div
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-[#1b1b5a] transition cursor-pointer"
                      onClick={() => {
                        // BUKA MODAL PINTAR KITA
                        setShowEditSearchModal(true);
                        setShowDropdown(false);
                      }}
                    >
                      <Edit className="w-4 h-4" /> Edit Data
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Search Global (Navigasi ke Halaman Search Biasa) */}
            <div className="relative hidden sm:block ml-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa]" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === "Enter" && search.trim() !== "") {
                  router.push(`/movies/search/${encodeURIComponent(search.trim())}`);
                  setSearch("");
                }
              }}
                className="bg-[#ffffff0d] border border-[#ffffff1a] text-white placeholder-[#aaa] text-sm rounded-full pl-9 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#ffffff40] focus:border-[#ffffff40] transition-all w-44 hover:w-56"
              />
            </div>
          </div>

          {/* RIGHT: Auth Trigger */}
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

      {/* MODAL PENCARIAN CERDAS (Untuk Edit Data) */}
      <EditSearchModal 
        isOpen={showEditSearchModal} 
        onClose={() => setShowEditSearchModal(false)} 
      />

      {/* POPUP AUTH */}
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />

    </>
  );
}