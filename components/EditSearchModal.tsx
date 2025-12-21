"use client";

import { X, Search, Film, Tv } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface EditSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditSearchModal({ isOpen, onClose }: EditSearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const allDatabase = [
    { id: 1, title: "Wicked", type: "movie", year: "2024", poster: "/wicked.jpg", slug: "wicked" },
    { id: 2, title: "Stranger Things", type: "tv", year: "2016", poster: "/strangerthings.jpg", slug: "stranger-things" },
    { id: 3, title: "Oppenheimer", type: "movie", year: "2023", poster: "/oppenheimer.jpg", slug: "oppenheimer" },
    { id: 4, title: "Squid Game", type: "tv", year: "2021", poster: "/squidgame.jpg", slug: "squid-game" },
  ];

  useEffect(() => {
    if (query.length > 0) {
      setResults(
        allDatabase.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm">

      {/* overlay click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* MODAL */}
      <div className="relative w-full max-w-md rounded-2xl bg-[#14173a]/95 border border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">

        {/* SEARCH BAR */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-3 border-b border-white/15 pb-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search movie or TV show"
              className="bg-transparent text-sm text-black w-full focus:outline-none placeholder-gray-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-white transition"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* RESULTS */}
        {query.length > 0 && (
          <div className="px-3 pb-4 space-y-1 max-h-[320px] overflow-y-auto">

            {results.length === 0 && (
              <div className="text-center py-10 text-sm text-gray-500">
                No results found
              </div>
            )}

            {results.map((item) => (
              <Link
                key={`${item.type}-${item.id}`}
                href={`/internal/${item.type === "movie" ? "edit-movie" : "edit-tv"}/${item.slug}`}
                onClick={onClose}
                className="group flex items-center gap-4 px-4 py-3 rounded-xl 
                            no-underline text-white hover:text-gray-200 
                            hover:bg-white/8 transition"
                >

                {/* poster */}
                <div className="relative w-10 h-14 rounded-md overflow-hidden bg-gray-800 flex-shrink-0">
                  <Image
                    src={item.poster}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium truncate transition">

                      {item.title}
                    </h4>

                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full tracking-wide
                        ${item.type === "movie"
                          ? "bg-blue-500/15 text-blue-300"
                          : "bg-emerald-500/15 text-emerald-300"
                        }`}
                    >
                      {item.type.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {item.year}
                  </p>
                </div>

                {/* icon */}
                <div className="text-gray-600 group-hover:text-white transition">
                  {item.type === "movie" ? <Film size={15} /> : <Tv size={15} />}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* FOOTER */}
        <div className="px-6 py-3 text-[11px] text-center text-gray-500 border-t border-white/5">
          Select item to open editor
        </div>

      </div>
    </div>
  );
}
