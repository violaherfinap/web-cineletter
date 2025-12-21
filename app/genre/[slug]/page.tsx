"use client";

import { use } from "react"; // Tambahan penting: import 'use'
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star } from "lucide-react";

// --- DATA DUMMY SEMENTARA ---
const allMovies = [
  { id: 1, title: "Wicked", genre: "fantasy", poster: "/wicked.jpg", rating: 9.3, slug: "wicked" },
  { id: 2, title: "Harry Potter", genre: "fantasy", poster: "/harrypotter.jpg", rating: 8.9, slug: "harry-potter" },
  { id: 3, title: "La La Land", genre: "musical", poster: "/lalaland.jpg", rating: 8.8, slug: "lala-land" },
  { id: 4, title: "Planet Earth", genre: "documentary", poster: "/planetearth.jpg", rating: 9.9, slug: "planet-earth" },
  { id: 5, title: "Alice in Wonderland", genre: "fantasy", poster: "/alice.jpg", rating: 9.0, slug: "alice" },
  { id: 6, title: "The Greatest Showman", genre: "musical", poster: "/showman.jpg", rating: 8.6, slug: "greatest-showman" },
  // ... Tambahkan data lain sesuai kebutuhan Tuan Putri
];

// Perhatikan tipe props 'params' sekarang dibungkus Promise
export default function SingleGenrePage({ params }: { params: Promise<{ slug: string }> }) {
  
  // MANTRA PERBAIKAN: Membuka bungkusan params dengan hook 'use'
  const { slug } = use(params);

  // Filter film sesuai slug yang sudah dibuka
  const filteredMovies = allMovies.filter(
      (m) => m.genre.toLowerCase() === slug.toLowerCase()
  );

  // Buat Judul Cantik (misal: fantasy -> Fantasy)
  // decodeURIComponent berguna jika slug ada spasi (misal: sci-fi)
  const readableSlug = decodeURIComponent(slug);
  const displayTitle = readableSlug.charAt(0).toUpperCase() + readableSlug.slice(1);

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-6 pt-28">
      
      {/* Tombol Back & Judul */}
      <div className="max-w-7xl mx-auto mb-10">
        <Link href="/genre" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition no-underline">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Genres</span>
        </Link>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tight capitalize">
            {displayTitle} Movies
        </h1>
        <p className="text-gray-400 mt-2">
            Menampilkan koleksi terbaik untuk kategori {displayTitle}
        </p>
      </div>

      {/* GRID LAYOUT */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Link 
                href={`/movies/${movie.slug}`} 
                key={movie.id} 
                className="group relative aspect-[2/3] rounded-xl overflow-hidden bg-gray-800 shadow-lg hover:scale-105 transition-all duration-300 no-underline"
            >
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="object-cover group-hover:opacity-40 transition-opacity"
              />
              
              {/* Info saat di-hover */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-4 text-center">
                 <h3 className="font-bold text-lg mb-2 text-white">{movie.title}</h3>
                 <div className="flex items-center gap-1 text-yellow-400 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <span className="font-semibold">{movie.rating}</span>
                 </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-500 bg-white/5 rounded-xl border border-white/5">
            <p>Maaf, belum ada film di kategori {displayTitle} ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}