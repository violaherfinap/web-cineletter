import Link from "next/link";
import { PlayCircle, Star, Heart } from "lucide-react";
import { useState } from "react";

export default function DetailMovie({ movie }: { movie: any }) {
  const [activeTab, setActiveTab] = useState("cast");
  // State untuk menyimpan rating yang dipilih Princess
  const [selectedRating, setSelectedRating] = useState(0);

  const tabContent = {
    cast: [
      "Cynthia Erivo", "Ariana Grande", "Michelle Yeoh", "Jonathan Bailey", 
      "Ethan Slater", "Marissa Bode", "Jeff Goldblum", "Peter Dinklage", 
      "Andy Nyman", "Courtney-Mae Briggs", "Bowen Yang", "Bronwyn James", 
      "Aaron Teoh", "Shaun Prendergast", "Keala Settle", "Sharon D. Clarke", 
      "Jenna Boyd", "Colin Michael Carmichael", "Lexi Lancaster", "Arlo Turner"
    ],
    crew: [
      { name: "Jon M. Chu", role: "Director" },
      { name: "Winnie Holzman", role: "Writer" },
      { name: "Stephen Schwartz", role: "Composer" },
      { name: "Alice Brooks", role: "Cinematography" }
    ],
    details: [
      { label: "Runtime", value: "2h 43m" },
      { label: "Release", value: "Nov 2024" },
      { label: "Studio", value: "Universal Studio" },
      { label: "Country", value: "USA" },
      { label: "Language", value: "English" }
    ],
    genres: [
      { name: "Fantasy", count: "245" },
      { name: "Musical", count: "189" },
      { name: "Drama", count: "1,234" },
      { name: "Romance", count: "876" },
    ],
    akas: [
      "France", "Japan", "Indonesia", "Korea", 
      "Philipine", "Vietnam"
    ]
  };

  const tabs = [
    { id: "cast", label: "CAST" },
    { id: "crew", label: "CREW" },
    { id: "details", label: "DETAILS" },
    { id: "genres", label: "GENRES" },
    { id: "akas", label: "AKAS" },
  ];

  const reviews = [
    { user: "muriloporfirio", stars: 5, comment: "hmm" },
    { user: "Cocpyday_", stars: 1, comment: "so cooooll" },
    { user: "Lim Lim", stars: 2, comment: "so so so good" },
  ];

  return (
    <div className="relative min-h-screen text-white overflow-hidden font-sans -mt-20">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${movie.backdrop})`,
          backgroundPosition: 'center top',
          maskImage: "linear-gradient(to bottom, transparent 0%, transparent 10%, black 50%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, transparent 10%, black 50%, black 90%, transparent 100%)",
          opacity: 0.5,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />

      <div className="relative z-10 flex flex-col lg:flex-row max-w-7xl mx-auto px-6 pt-40 pb-10 gap-10 items-start">
        
        {/* KOLOM 1: KIRI */}
        <div className="flex flex-col gap-6 flex-shrink-0 w-64 mx-auto lg:mx-0">
          <img src={movie.poster} alt={movie.title} className="w-full rounded-xl shadow-lg object-cover" />
          
          <div className="w-56 bg-[#1a1a1a]/80 backdrop-blur-md p-4 rounded-xl border border-white/10">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Available on</h3>
            <div className="space-y-2">
              {["Netflix", "Disney+", "Amazon Prime"].map((provider, i) => (
                <button key={i} className="w-full flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all group cursor-pointer">
                  <PlayCircle className="w-5 h-5 text-gray-400 group-hover:text-[#ff3b3b] transition-colors" />
                  <span className="text-sm font-medium text-gray-200 group-hover:text-white">{provider}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* KOLOM 2: TENGAH */}
        <div className="flex-1 text-white lg:pt-2">
          <h1 className="text-5xl lg:text-6xl font-black mb-4 tracking-tight drop-shadow-lg leading-tight">{movie.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-gray-300 mb-6 text-lg">
            <span>{movie.year}</span> • <span>Directed by <span className="font-semibold text-white">{movie.director}</span></span>
          </div>

          <p className="text-gray-300 leading-relaxed mb-8 text-base font-light">{movie.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {movie.genre.map((g: string, i: number) => (
              <Link
                key={i}
                href={`/genre/${g.toLowerCase()}`}
                className="bg-[#2a2a2a] text-gray-200 px-4 py-1.5 rounded-full text-sm border border-white/10 hover:bg-[#ff3b3b] hover:text-white transition-colors no-underline"
              >
                {g}
              </Link>
            ))}
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap gap-1 border-b border-white/20 pb-3 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-[11px] font-bold tracking-widest transition-all ${
                    activeTab === tab.id 
                      ? "text-black border-b-2 border-[#ff3b3b]" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-4">
              {activeTab === "cast" && (
                <div className="flex flex-wrap gap-2">
                  {tabContent.cast.map((name, index) => (
                    <span 
                      key={index} 
                      className="inline-block px-3 py-1.5 bg-[#2a2a2a] border border-white/10 rounded-md text-[13px] text-gray-300 hover:bg-[#3a3a3a] transition-all cursor-pointer whitespace-nowrap"
                    >
                      {name}
                    </span>
                  ))}
                  <button className="px-3 py-1.5 bg-[#1a1a1a] border border-white/10 rounded-md text-[13px] text-gray-500 hover:text-white transition-all">
                    Show All...
                  </button>
                </div>
              )}

              {activeTab === "crew" && (
                <div className="flex flex-wrap gap-2">
                  {tabContent.crew.map((person, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-3 py-1.5 bg-[#2a2a2a] border border-white/10 rounded-md text-[13px] text-gray-300"
                    >
                      <span className="text-gray-500 mr-3">{person.role}</span>
                      {"\u00A0\u00A0"}
                      <span className="text-white font-medium">{person.name}</span>
                    </span>
                  ))}
                </div>
              )}

              {activeTab === "details" && (
                <div className="flex flex-wrap gap-4">
                  {tabContent.details.map((detail, index) => (
                    <div key={index} className="flex gap-2 text-sm bg-white/5 px-3 py-1 rounded-md border border-white/5">
                      <span className="text-gray-500 uppercase tracking-tighter">{detail.label}</span>
                      <span className="text-white font-medium">{detail.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "genres" && (
                <div className="flex flex-wrap gap-2">
                  {tabContent.genres.map((genre, index) => (
                    <Link
                      key={index}
                      href={`/genre/${genre.name.toLowerCase()}`}
                      className="flex items-center gap-2 px-3 py-1.5 bg-[#2a2a2a] border border-white/10 rounded-md text-[13px] text-gray-300 hover:bg-[#ff3b3b] hover:text-white transition-all no-underline"
                    >
                      <span>{genre.name}</span>
                      <span className="text-[10px] text-gray-500 opacity-70 ml-1">• {genre.count}</span>
                    </Link>
                  ))}
                </div>
              )}

              {activeTab === "akas" && (
                <div className="flex flex-wrap gap-2">
                  {tabContent.akas.map((name, index) => (
                    <span 
                      key={index} 
                      className="inline-block px-3 py-1.5 bg-[#2a2a2a] border border-white/10 rounded-md text-[13px] text-gray-300 hover:bg-[#3a3a3a] transition-all cursor-pointer whitespace-nowrap"
                    >
                      {name}
                    </span>
                  ))}
                  <button className="px-3 py-1.5 bg-[#1a1a1a] border border-white/10 rounded-md text-[13px] text-gray-500 hover:text-white transition-all">
                    Show All...
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* KOLOM 3: KANAN */}
        <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4">
          <div className="bg-[#1a1a1a]/60 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">CineLetter Rating</h3>
            <div className="flex items-center gap-4">
              <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />
              <div>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold">{movie.rating}</span>
                  <span className="text-gray-400 text-sm mb-1">/5</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a]/60 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex flex-col gap-4">
            <div>
              <h3 className="text-xs font-bold text-[#ff3b3b] uppercase tracking-widest mb-3">Rate this movie</h3>
              
              {/* Interactive Star Rating */}
              <div className="flex justify-between mb-5 px-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    onClick={() => setSelectedRating(star)}
                    className={`w-7 h-7 cursor-pointer transition-all duration-200 ${
                      star <= selectedRating 
                      ? "text-yellow-400 fill-yellow-400 scale-110" 
                      : "text-gray-600 hover:text-yellow-400"
                    }`} 
                  />
                ))}
              </div>

              {/* Comment Input - Perbaikan utama ada di sini */}
              <textarea 
                placeholder="Write your review..."
                className="w-full box-border bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#ff3b3b]/50 transition-all mb-4 resize-none h-20"
              />

              {/* Button - Sekarang akan sejajar sempurna dengan textarea */}
              <button className="w-full bg-[#ff3b3b] hover:bg-[#ff3b3b]/80 text-white py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg active:scale-95">
                Add Review
              </button>

              {/* === SECTION REVIEWS === */}
              <div className="mt-6 border-t border-white/10 pt-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Reviews</h3>
                <div className="space-y-4">
                  {reviews.map((rev, index) => (
                    <div key={index} className="border-t border-white/5 pt-3 group">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-gray-400">
                            Review by <span className="text-white font-medium hover:text-[#ff3b3b] cursor-pointer transition-colors">{rev.user}</span>
                          </span>
                          <div className="flex items-center gap-0.5">
                            {[...Array(rev.stars)].map((_, i) => (
                              <Star key={i} className="w-2.5 h-2.5 text-[#00e054] fill-[#00e054]" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed line-clamp-3 group-hover:text-white transition-colors">
                          {rev.comment}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-white/10 pt-3">
                    <button className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors w-full text-center">
                      See All...
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}