import Link from "next/link";

export default function DetailMovie({ movie }: { movie: any }) {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Latar belakang dasar */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      {/* === Backdrop full, tapi tepinya fade pakai mask === */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.backdrop})`,
          WebkitMaskImage:
            "radial-gradient(circle at center, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
          maskImage:
            "radial-gradient(circle at center, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          opacity: 0.9,
        }}
      />

      {/* Overlay gelap agar teks terbaca */}
      <div className="absolute inset-0 bg-black/60" />

      {/* === Konten Utama === */}
      <div className="relative z-10 flex flex-col md:flex-row max-w-7xl mx-auto px-6 py-20 gap-10 items-start">
        {/* KIRI: Poster */}
        <div className="w-full md:w-1/3 max-w-sm">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full rounded-2xl shadow-2xl"
          />

          <div className="mt-6 bg-[#101010cc] backdrop-blur-md p-4 rounded-xl border border-[#ffffff1a]">
            <h3 className="text-lg font-semibold mb-2">Where to Watch</h3>
            <ul className="text-sm text-gray-200 space-y-1">
              <li>Netflix</li>
              <li>Disney+</li>
              <li>Amazon Prime</li>
            </ul>
          </div>
        </div>

        {/* KANAN: Detail di atas backdrop */}
        <div className="flex-1 relative z-20 text-white md:pt-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            {movie.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-gray-300 mb-6">
            <span>{movie.year}</span>
            <span>•</span>
            <span>
              Directed by{" "}
              <span className="font-semibold text-white">
                {movie.director}
              </span>
            </span>
            <span>•</span>
            <span className="text-yellow-400 font-bold">{movie.rating}</span>
          </div>

          <p className="text-gray-200 leading-relaxed mb-8 max-w-2xl drop-shadow-md">
            {movie.description}
          </p>

          {/* Genre */}
          <div className="flex flex-wrap gap-2 mb-8">
            {movie.genre.map((g: string, i: number) => (
              <Link
                key={i}
                href={`/genre/${g.toLowerCase()}`}
                className="bg-white/20 text-white px-3 py-1 rounded-full text-xs hover:bg-white/40 transition no-underline"
              >
                {g}
              </Link>
            ))}
          </div>

          {/* Tombol */}
          <div className="flex gap-4">
            <button className="bg-[#ff3b3b] text-white px-5 py-2 rounded-lg hover:bg-[#ff6b6b] transition">
              Add to Watchlist
            </button>
            <button className="bg-white/20 text-white px-5 py-2 rounded-lg hover:bg-white/30 transition">
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
