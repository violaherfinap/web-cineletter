"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Music, Ghost, Video, Heart, Zap, ArrowRight } from "lucide-react";

// ==========================================
// KOMPONEN UTAMA HALAMAN
// ==========================================
export default function GenrePage() {
  
  // --- DATA DUMMY ---
  
  const popularGenres = [
    { id: 1, name: "Action", slug: "action", gradient: "from-red-600 to-orange-600", count: "1,200+ movies", icon: <Zap className="w-6 h-6 text-white/50" /> },
    { id: 2, name: "Romance", slug: "romance", gradient: "from-pink-500 to-rose-500", count: "850+ movies", icon: <Heart className="w-6 h-6 text-white/50" /> },
    { id: 3, name: "Sci-Fi", slug: "sci-fi", gradient: "from-blue-600 to-cyan-500", count: "600+ movies", icon: <Video className="w-6 h-6 text-white/50" /> },
    { id: 4, name: "Horror", slug: "horror", gradient: "from-purple-900 to-slate-900", count: "900+ movies", icon: <Ghost className="w-6 h-6 text-white/50" /> },
  ];

  const fantasyMovies = [
    { id: 1, title: "Wicked", rating: "9.3", poster: "/wicked.jpg", slug: "wicked" },
    { id: 2, title: "Alice in Wonderland", rating: "9.0", poster: "/alice.jpg", slug: "alice" },
    { id: 3, title: "Harry Potter", rating: "8.9", poster: "/harrypotter.jpg", slug: "harry-potter" }, 
    { id: 4, title: "Lord of the Rings", rating: "9.5", poster: "/lotr.jpg", slug: "lotr" },
    { id: 5, title: "The Hobbit", rating: "8.2", poster: "/hobbit.jpg", slug: "hobbit" },
    { id: 6, title: "Narnia", rating: "7.8", poster: "/narnia.jpg", slug: "narnia" },
  ];

  const musicalMovies = [
    { id: 1, title: "La La Land", rating: "8.8", poster: "/lalaland.jpg", slug: "lala-land" },
    { id: 2, title: "The Greatest Showman", rating: "8.6", poster: "/showman.jpg", slug: "greatest-showman" },
    { id: 3, title: "Barbie", rating: "7.2", poster: "/barbie.jpg", slug: "barbie" },
    { id: 4, title: "Mamma Mia!", rating: "7.5", poster: "/mammamia.jpg", slug: "mamma-mia" },
    { id: 5, title: "Hamilton", rating: "9.0", poster: "/hamilton.jpg", slug: "hamilton" },
    { id: 6, title: "Les Misérables", rating: "8.1", poster: "/lesmis.jpg", slug: "les-mis" },
  ];

  const docMovies = [
    { id: 1, title: "Planet Earth", rating: "9.9", poster: "/planetearth.jpg", slug: "planet-earth" },
    { id: 2, title: "The Last Dance", rating: "9.7", poster: "/lastdance.jpg", slug: "last-dance" },
    { id: 3, title: "My Octopus Teacher", rating: "8.5", poster: "/octopus.jpg", slug: "octopus" },
    { id: 4, title: "13th", rating: "8.8", poster: "/13th.jpg", slug: "13th" },
    { id: 5, title: "Blackfish", rating: "8.4", poster: "/blackfish.jpg", slug: "blackfish" },
    { id: 6, title: "Our Planet", rating: "9.3", poster: "/ourplanet.jpg", slug: "our-planet" },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a1a] text-white -mt-20 pt-28 pb-10">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* HEADER PAGE */}
        <div className="mb-10 text-center md:text-left border-b border-[#ffffff1a] pb-6">
            <h1 className="text-4xl font-extrabold mb-2">Browse by Genre</h1>
            <p className="text-gray-400">Explore movies based on your favorite categories.</p>
        </div>

        {/* --- BAGIAN 1: POPULAR GENRES --- */}
        <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Popular Genres</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {popularGenres.map((genre) => (
                    <Link 
                        href={`/genre/${genre.slug}`}
                        key={genre.id} 
                        className={`relative h-32 rounded-xl overflow-hidden cursor-pointer group hover:scale-105 transition-transform duration-300 bg-gradient-to-br ${genre.gradient} shadow-lg block`}
                    >
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        <div className="absolute top-3 right-3 opacity-50 group-hover:opacity-100 transition-opacity">
                            {genre.icon}
                        </div>
                        <div className="absolute bottom-4 left-4">
                            <h3 className="text-xl font-bold text-white drop-shadow-md">{genre.name}</h3>
                            <p className="text-xs text-white/90">{genre.count}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>

        {/* --- BAGIAN 2: SLIDER PER KATEGORI --- */}
        
        <GenreSlider 
            title="Fantasy Worlds" 
            genreSlug="fantasy"
            icon={<Ghost className="w-5 h-5 text-purple-400" />} 
            movies={fantasyMovies} 
        />

        <GenreSlider 
            title="Sing-Along Musicals" 
            genreSlug="musical" 
            icon={<Music className="w-5 h-5 text-pink-400" />} 
            movies={musicalMovies} 
        />

        <GenreSlider 
            title="Real Stories & Documentaries" 
            genreSlug="documentary"
            icon={<Video className="w-5 h-5 text-green-400" />} 
            movies={docMovies} 
        />

      </div>
    </main>
  );
}

// ==========================================================
// KOMPONEN SLIDER (FIXED: HOVER MERAH PASTI MENYALA)
// ==========================================================
function GenreSlider({ title, genreSlug, icon, movies }: { title: string, genreSlug: string, icon?: React.ReactNode, movies: any[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const amount = scrollRef.current.clientWidth / 1.5;
            scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            setShowLeft(scrollRef.current.scrollLeft > 0);
        }
    };

    return (
        <section className="mb-12 relative group">
            {/* Header + Link ke Page Khusus Genre */}
            <div className="mb-5 flex items-center justify-between">
                <Link 
                    href={`/genre/${genreSlug}`} 
                    // Kita pakai group/title pada Link pembungkus
                    className="flex items-center gap-2 group/title cursor-pointer no-underline"
                >
                    {icon}
                    {/* Di sini kuncinya Tuan Putri: */}
                    {/* text-white (Putih default) */}
                    {/* group-hover/title:text-[#ff3b3b] (Merah saat link di-hover) */}
                    <h2 className="text-2xl font-bold text-white transition-colors duration-300 group-hover/title:text-[#ff3b3b]">
                        {title}
                    </h2>
                    
                    {/* Panah ikut merah saat di hover */}
                    <ArrowRight className="w-5 h-5 text-[#ff3b3b] opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all duration-300" />
                </Link>
                
                {/* Tombol See All kecil di kanan (Tetap Abu -> Putih) */}
                <Link href={`/genre/${genreSlug}`} className="text-sm text-gray-400 hover:text-white transition-colors no-underline">
                    See all
                </Link>
            </div>
            
            <div className="h-[1px] bg-[#ffffff1a] w-full mb-5" />

            <div className="relative">
                {/* Tombol Kiri */}
                 {showLeft && (
                    <button 
                        onClick={() => scroll("left")}
                        className="absolute -left-3 md:-left-12 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full border border-white/10 transition-all"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                )}
                
                {/* Tombol Kanan */}
                <button 
                    onClick={() => scroll("right")}
                    className="absolute -right-3 md:-right-12 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full border border-white/10 transition-all"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Slider Container */}
                <div 
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-hide snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {movies.map((movie) => (
                        <Link
                            key={movie.id}
                            href={`/movies/${movie.slug}`}
                            className="relative flex-shrink-0 snap-start rounded-xl overflow-hidden shadow-lg 
                                     w-[150px] sm:w-[180px] lg:w-[calc(20%-13px)] 
                                     aspect-[2/3] group/card transition-transform hover:scale-105 no-underline"
                        >
                            <Image
                                src={movie.poster}
                                alt={movie.title}
                                fill
                                className="object-cover transition duration-300 group-hover/card:opacity-40 bg-gray-800"
                            />
                            
                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover/card:opacity-100 transition duration-300 p-2 text-center">
                                <h3 className="text-sm md:text-lg font-bold text-white drop-shadow-md">{movie.title}</h3>
                                <div className="flex items-center mt-2 text-yellow-400 font-bold bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm text-xs md:text-sm">
                                    <Star className="w-3 h-3 md:w-4 md:h-4 mr-1 fill-yellow-400" />
                                    <span>{movie.rating}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}