"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Calendar, Film } from "lucide-react";

export default function PersonDetailPage({ params }: { params: { id: string } }) {
  const person = {
    name: "Margot Robbie",
    fullName: "Margot Elise Robbie",
    role: "Actress, Producer",
    birthDate: "July 2, 1990",
    nationality: "Australian",
    famousCharacter: "Harley Quinn",
    topGenres: ["Drama", "Comedy", "Fantasy"],
    biography:
      "Margot Elise Robbie is an Australian actress and producer. Known for her roles in both blockbusters and independent films, she has received several accolades, including nominations for two Academy Awards, three Golden Globe Awards, and five British Academy Film Awards.",
    image: "/people/margot.jpg",
    movies: [
      { id: 1, title: "Barbie", year: "2023", poster: "/movies/barbie.jpg", rating: 8.9 },
      { id: 2, title: "The Wolf of Wall Street", year: "2013", poster: "/movies/wolf.jpg", rating: 8.2 },
      { id: 3, title: "Suicide Squad", year: "2016", poster: "/movies/ss.jpg", rating: 7.5 },
      { id: 4, title: "I, Tonya", year: "2017", poster: "/movies/tonya.jpg", rating: 8.0 },
      { id: 5, title: "Babylon", year: "2022", poster: "/movies/babylon.jpg", rating: 7.2 },
    ],
  };

  return (
    <main className="min-h-screen bg-[#0a0a1a] text-white -mt-20 pt-32 pb-20">
      <div className="max-w-[1100px] mx-auto px-6">

        {/* SECTION ATAS */}
        <div className="flex flex-col md:flex-row gap-10 items-start mb-16">

          {/* FOTO PERSON (KECIL + BADGE ROLE) */}
          <div className="relative w-56 aspect-[2/3] rounded-xl overflow-hidden shadow-xl border border-[#ffffff1a] flex-shrink-0 mx-auto md:mx-0">
            
            {/* BADGE ROLE */}
            <div className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-[#ffffff1a]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff3b3b]">
                {person.role}
              </span>
            </div>

            <Image
              src={person.image}
              alt={person.name}
              fill
              className="object-cover"
            />
          </div>

          {/* INFO DETAIL */}
          <div className="flex-1">
            <h1 className="text-5xl font-black mb-2 tracking-tight">{person.name}</h1>
            <p className="text-[#ff3b3b] font-bold text-lg mb-6 uppercase tracking-widest">
              {person.fullName}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-500 uppercase">Birth Date</p>
                  <p className="text-sm font-medium">{person.birthDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                    <p className="text-[10px] text-gray-500 uppercase">Nationality</p>
                    <p className="text-sm font-medium">{person.nationality}</p>
                </div>
                </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <div>
                  <p className="text-[10px] text-gray-500 uppercase">Famous Character</p>
                  <p className="text-sm font-bold text-yellow-500">
                    {person.famousCharacter}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Film className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-500 uppercase">Top Genres</p>
                  <div className="flex gap-2 mt-1">
                    {person.topGenres.map((genre) => (
                      <span
                        key={genre}
                        className="text-[10px] bg-[#ffffff14] px-2 py-0.5 rounded border border-[#ffffff1a]"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#ffffff1a] pt-6">
              <h2 className="text-lg font-bold mb-3 uppercase tracking-tighter">
                Biography
              </h2>
              <p className="text-gray-400 leading-relaxed text-sm font-light italic">
                "{person.biography}"
              </p>
            </div>
          </div>
        </div>

        {/* FILMOGRAPHY */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold uppercase tracking-tighter">
              Known For
            </h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#ffffff1a] to-transparent" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {person.movies.map((movie) => (
              <div key={movie.id} className="group cursor-pointer">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-[#ffffff1a] mb-2 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#ff3b3b1a]">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover transition-opacity duration-300 group-hover:opacity-80"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded flex items-center gap-1 border border-[#ffffff1a]">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-[10px] font-bold">{movie.rating}</span>
                  </div>
                </div>

                <h3 className="text-xs font-bold truncate group-hover:text-[#ff3b3b] transition-colors">
                  {movie.title}
                </h3>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  {movie.year}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
