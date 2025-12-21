"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import AuthModal from "@/components/AuthModal";

export default function HomePage() {
  const [isModalOpen, setModalOpen] = useState(false);
  
  // --- STATE & REF UNTUK SLIDER 1 (POPULAR) ---
  const [showLeftArrowPop, setShowLeftArrowPop] = useState(false);
  const scrollRefPop = useRef<HTMLDivElement>(null);

  // --- STATE & REF UNTUK SLIDER 2 (RECOMMENDED) ---
  const [showLeftArrowRec, setShowLeftArrowRec] = useState(false);
  const scrollRefRec = useRef<HTMLDivElement>(null);

  // DATA DUMMY 1: POPULAR THIS WEEK
  const popularMovies = [
    { id: 101, title: "Oppenheimer", rating: "8.9", poster: "/oppenheimer.jpg", slug: "oppenheimer" },
    { id: 102, title: "Barbie", rating: "7.2", poster: "/barbie.jpg", slug: "barbie" },
    { id: 103, title: "Spider-Man: ATSV", rating: "8.7", poster: "/spiderman.jpg", slug: "spiderman-atsv" },
    { id: 104, title: "Dune: Part Two", rating: "8.8", poster: "/dune2.jpg", slug: "dune-2" },
    { id: 105, title: "The Batman", rating: "7.9", poster: "/batman.jpg", slug: "the-batman" },
    { id: 106, title: "Avatar 2", rating: "7.6", poster: "/avatar2.jpg", slug: "avatar-2" },
    { id: 107, title: "Guardians Vol. 3", rating: "8.0", poster: "/guardians3.jpg", slug: "guardians-3" },
    { id: 108, title: "Top Gun: Maverick", rating: "8.3", poster: "/topgun.jpg", slug: "top-gun" },
    { id: 109, title: "Everything Everywhere", rating: "8.9", poster: "/eeaao.jpg", slug: "eeaao" },
    { id: 110, title: "John Wick 4", rating: "7.8", poster: "/johnwick4.jpg", slug: "john-wick-4" },
  ];

  // DATA DUMMY 2: RECOMMENDED MOVIES
  const recommendedMovies = [
    { id: 1, title: "Wicked", rating: "9.3", poster: "/wicked.jpg", slug: "wicked" },
    { id: 2, title: "Wicked: For Good", rating: "0.0", poster: "/wicked_fg.jpg", slug: "wicked-for-good" },
    { id: 3, title: "Alice in Wonderland", rating: "9.0", poster: "/alice.jpg", slug: "alice-in-wonderland" },
    { id: 4, title: "The Nutcracker", rating: "9.2", poster: "/nutcracker.jpg", slug: "the-nutcracker" },
    { id: 5, title: "Interstellar", rating: "8.6", poster: "/interstellar.jpg", slug: "interstellar" },
    { id: 6, title: "Beauty & The Beast", rating: "9.8", poster: "/beautyandthebeast.jpg", slug: "beauty-and-the-beast" },
    { id: 7, title: "Inception", rating: "8.8", poster: "/inception.jpg", slug: "inception" },
    { id: 8, title: "The Dark Knight", rating: "9.0", poster: "/batman.jpg", slug: "the-dark-knight" },
    { id: 9, title: "Titanic", rating: "7.9", poster: "/titanic.jpg", slug: "titanic" },
    { id: 10, title: "Avengers: Endgame", rating: "8.4", poster: "/endgame.jpg", slug: "endgame" },
  ];

  const infoBoxes = [
    { title: "About Us", text: "We are undergraduate Data Science students at Universitas Sebelas Maret." },
    { title: "Our Mission", text: "To cultivate a global community for cinephiles by providing a seamless platform to discover the world of cinema and television." },
    { title: "Top Genres", text: "Action, Drama, Comedy, Sci-Fi, Romance, Thriller." },
    { title: "Community", text: "Join our community of movie lovers around the world." },
    { title: "Latest News", text: "Stay updated with the latest in entertainment." },
    { title: "Support", text: "Need help? Reach out to our support team anytime." },
  ];

  // --- LOGIC SCROLL ---
  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth / 1.5;
      if (direction === "left") {
        ref.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const handleScrollPop = () => {
    if (scrollRefPop.current) {
      setShowLeftArrowPop(scrollRefPop.current.scrollLeft > 0);
    }
  };

  const handleScrollRec = () => {
    if (scrollRefRec.current) {
      setShowLeftArrowRec(scrollRefRec.current.scrollLeft > 0);
    }
  };

  return (
    <main className="text-white min-h-screen bg-[#0a0a1a]">

      {/* HERO SECTION */}
      <section className="relative -mt-20 h-[95vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <Image
          src="/backdrop.jpg"
          alt="Hero backdrop"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">Welcome to CineLetter</h1>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">Discover. Watch. Share your favorite movies.</p>

          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#ff3b3b] px-6 py-3 rounded-lg text-white text-lg font-semibold hover:bg-[#ff6b6b] transition duration-300"
          >
            Sign In
          </button>
        </div>
      </section>


      {/* =========================================
          SECTION 1: POPULAR THIS WEEK
         ========================================= */}
      <section className="pt-16 pb-8 px-4 md:px-0 max-w-[1100px] mx-auto relative group">
        
        {/* HEADER + GARIS PEMBATAS */}
        <div className="px-4 mb-6">
            <h2 className="text-3xl font-bold mb-4">Popular this week</h2>
            {/* Garis Tipis */}
            <div className="h-[1px] bg-[#ffffff1a] w-full" />
        </div>
        
        <div className="relative px-4"> 
            {/* Navigasi */}
            {showLeftArrowPop && (
                <button 
                    onClick={() => scroll(scrollRefPop, "left")}
                    className="absolute -left-3 md:-left-12 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all border border-white/10"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
            )}
            <button 
                onClick={() => scroll(scrollRefPop, "right")}
                className="absolute -right-3 md:-right-12 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all border border-white/10"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slider */}
            <div 
                ref={scrollRefPop}
                onScroll={handleScrollPop}
                className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
            {popularMovies.map((movie) => (
                <Link
                key={movie.id}
                href={`/movies/${movie.slug}`}
                className="relative flex-shrink-0 snap-start rounded-xl overflow-hidden shadow-lg 
                            w-[150px] sm:w-[180px] lg:w-[calc(20%-13px)] 
                            aspect-[2/3] group/card transition-transform hover:scale-105"
                >
                <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover transition duration-300 group-hover/card:opacity-40"
                    sizes="(max-width: 768px) 150px, (max-width: 1200px) 200px, 20vw"
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


      {/* =========================================
          SECTION 2: RECOMMENDED MOVIES
         ========================================= */}
      <section className="py-8 px-4 md:px-0 max-w-[1100px] mx-auto relative group">
        
        {/* HEADER + GARIS PEMBATAS */}
        <div className="px-4 mb-6">
            <h2 className="text-3xl font-bold mb-4">Recommended Movies</h2>
            {/* Garis Tipis */}
            <div className="h-[1px] bg-[#ffffff1a] w-full" />
        </div>
        
        <div className="relative px-4"> 
            {/* Navigasi */}
            {showLeftArrowRec && (
                <button 
                    onClick={() => scroll(scrollRefRec, "left")}
                    className="absolute -left-3 md:-left-12 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all border border-white/10"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
            )}
            <button 
                onClick={() => scroll(scrollRefRec, "right")}
                className="absolute -right-3 md:-right-12 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all border border-white/10"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slider */}
            <div 
                ref={scrollRefRec}
                onScroll={handleScrollRec}
                className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
            {recommendedMovies.map((movie) => (
                <Link
                key={movie.id}
                href={`/movies/${movie.slug}`}
                className="relative flex-shrink-0 snap-start rounded-xl overflow-hidden shadow-lg 
                            w-[150px] sm:w-[180px] lg:w-[calc(20%-13px)] 
                            aspect-[2/3] group/card transition-transform hover:scale-105"
                >
                <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover transition duration-300 group-hover/card:opacity-40"
                    sizes="(max-width: 768px) 150px, (max-width: 1200px) 200px, 20vw"
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


      {/* INFO BOXES */}
      <section className="py-16 px-4 md:px-0 max-w-[1100px] mx-auto">
        <h2 className="text-3xl font-bold mb-10 px-4">Explore More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {infoBoxes.map((box, i) => (
            <div
              key={i}
              className="bg-[#101133] p-6 rounded-2xl border border-[#ffffff1a] hover:bg-[#1a1b4d] transition shadow-lg hover:-translate-y-1 duration-300"
            >
              <h3 className="text-xl font-semibold mb-3 text-[#ff3b3b]">{box.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{box.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      <AuthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

    </main>
  );
}