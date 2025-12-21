import Link from "next/link";

interface MoviePosterProps {
  id: number | string;
  title: string;
  year: number;
  poster: string;
}

export default function MoviePoster({ id, title, year, poster }: MoviePosterProps) {
  // Slug sederhana untuk URL
  const slug = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="group relative w-full">
      <Link href={`/movies/${slug}`}>
        {/* Container Poster */}
        <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-800 relative cursor-pointer shadow-lg hover:shadow-green-500/20 transition-all duration-300">
          
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
          
          {/* Overlay Hover Effect (Opsional, biar makin manis) */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>

        {/* Info di bawah poster */}
        <div className="mt-3">
          <h3 className="text-white font-semibold text-sm truncate group-hover:text-green-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-500 text-xs">{year}</p>
        </div>
      </Link>
    </div>
  );
}