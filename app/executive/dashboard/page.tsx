"use client";

import { useState, useRef, useEffect } from "react";
import DashboardChart from "./DashboardChart";
import { SlidersHorizontal } from "lucide-react";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Menutup sidebar jika klik di luar
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="min-h-screen p-8 relative">

      {/* =======================
          FILTER HEADER SECTION
      ========================== */}
      <div className="flex items-center gap-4 mb-8">

        {/* Filter by Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl shadow hover:bg-gray-50 transition font-medium text-white"
        >
          <SlidersHorizontal className="w-4 h-4 text-white" />
          Filter by
        </button>

        {/* My Company */}
        <button className="bg-white/10 px-4 py-2 rounded-xl shadow hover:bg-gray-50 transition font-medium text-white">
          My Company
        </button>

        {/* Others Company */}
        <button className="bg-white/10 px-4 py-2 rounded-xl shadow hover:bg-gray-50 transition font-medium text-white">
          Others Company
        </button>
      </div>

      {/* =======================
               SIDEBAR
      ========================== */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"></div>
      )}

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 p-6 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-xl text-black font-semibold mb-6">Filter Options</h2>

        <div className="space-y-4 text-gray-700">
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition">
            Genre
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition">
            Votes
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition">
            Ratings
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition">
            Popularity
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition">
            Release Year
          </button>
        </div>
      </div>

      {/* =======================
           MAIN DASHBOARD CONTENT
      ========================== */}

      <h1 className="text-5xl font-bold mb-6 
                      bg-gradient-to-r from-purple-500 via-blue-700 
                      bg-clip-text text-transparent"
        >Executive Dashboard
      </h1>

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-md text-gray-500">Total Movie</h2>
          <p className="text-3xl font-bold text-gray-800">12.345.678</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-md text-gray-500">Total Tv-Shows</h2>
          <p className="text-3xl font-bold text-gray-800">123.456</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-md text-gray-500">Total Pendapatan</h2>
          <p className="text-3xl font-bold text-gray-800">Rp 452.000.000</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-8 pt-2 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Top 5 Film dengan Vote Terbanyak</h2>
        <DashboardChart />
      </div>
    </div>
  );
}
