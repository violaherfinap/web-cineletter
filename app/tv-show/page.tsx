"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MoviesPage() {
  const [genre, setGenre] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");
  const [year, setYear] = useState("All");

  // --- DATA BASE (Hamba tambahkan SLUG) ---
  const baseMovies = [
    {
      title: "Inception",
      slug: "inception", 
      rating: 8.8,
      year: 2010,
      poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", 
    },
    {
      title: "Interstellar",
      slug: "interstellar",
      rating: 8.6,
      year: 2014,
      poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    },
    {
      title: "The Dark Knight",
      slug: "the-dark-knight",
      rating: 9.0,
      year: 2008,
      poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
    {
      title: "Oppenheimer",
      slug: "oppenheimer",
      rating: 8.9,
      year: 2023,
      poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    },
    // --- WICKED (PENTING: Slug harus 'wicked' sesuai key di Detail Page) ---
    {
      title: "Wicked",
      slug: "wicked", 
      rating: 8.3, // Sesuaikan rating jika perlu
      year: 2024,
      poster: "https://image.tmdb.org/t/p/w500/c5Tqxeo1UpBvnAc3csUm7j3y8qT.jpg",
    }
  ];

  // --- GENERATE 50 DUMMY DATA ---
  const manyMovies = Array.from({ length: 50 }).map((_, i) => {
    const movie = baseMovies[i % baseMovies.length];
    return {
      ...movie,
      id: i,
      // Gunakan slug asli untuk 5 data pertama agar link Wicked valid.
      // Selebihnya tambahkan index agar unik.
      slug: i < 5 ? movie.slug : `${movie.slug}-${i}`, 
      title: i < 5 ? movie.title : `${movie.title} ${i + 1}`,
    };
  });

  return (
    <main className="min-h-screen bg-[#0a0a1a] text-white -mt-20 pt-24 pb-10">
      
      {/* CONTAINER TENGAH */}
      <div className="max-w-[1100px] mx-auto px-6">

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 border-b border-[#ffffff1a] pb-4">
          <h1 className="text-3xl font-extrabold mb-4 md:mb-0">Movies</h1>

          {/* Filter Bar */}
          <div className="relative z-50 bg-[#ffffff0d] border border-[#ffffff1a] p-2 rounded-lg backdrop-blur-xl flex flex-wrap gap-2">
            <FilterDropdown label="Sort" value={sortBy} setValue={setSortBy} options={["Popular", "Top", "New"]} />
            <FilterDropdown label="Genre" value={genre} setValue={setGenre} options={["All", "Action", "Drama", "Sci-Fi"]} />
            <FilterDropdown label="Year" value={year} setValue={setYear} options={["All", "2020s", "2010s"]} />
          </div>
        </div>

        {/* --- MOVIE GRID MINI --- */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 relative z-0">
          {manyMovies.map((movie) => (
            <Link
              key={movie.id}
              // PERBAIKAN: Mengarah ke folder /movies/ (PLURAL)
              href={`/movies/${movie.slug}`} 
              className="block group relative rounded-md overflow-hidden transition-transform hover:scale-105 aspect-[2/3]"
            >
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, (max-width: 1200px) 15vw, 10vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2">
                  <h3 className="text-xs font-bold text-white truncate">
                      {movie.title}
                  </h3>
                  <div className="flex justify-between items-center mt-0.5 text-[10px]">
                      <span className="text-gray-300">{movie.year}</span>
                      <span className="text-yellow-400 font-bold">★ {movie.rating}</span>
                  </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}

/* ======================
   FILTER DROPDOWN
   ====================== */
function FilterDropdown({ label, value, setValue, options }: { label: string; value: string; setValue: (v: string) => void; options: string[]; }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative"> 
      <button
        className="flex items-center gap-1 bg-[#ffffff14] px-3 py-1.5 rounded-md border border-[#ffffff1a] hover:bg-[#ffffff22] transition text-xs"
        onClick={() => setOpen(!open)}
      >
        <span className="text-white">{label}:</span> 
        <span className="font-semibold text-white">{value}</span>
        <ChevronDown className={`w-3 h-3 transition-transform text-white ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute mt-1 right-0 w-32 bg-[#0f0f3a] border border-[#ffffff1a] rounded-md shadow-xl p-1 z-50">
          {options.map((opt) => (
            <div
              key={opt}
              className="px-2 py-1.5 text-xs hover:bg-[#1b1b5a] cursor-pointer rounded text-white"
              onClick={() => { setValue(opt); setOpen(false); }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}