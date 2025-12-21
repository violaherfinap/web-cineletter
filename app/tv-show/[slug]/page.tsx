"use client";

import { useParams } from "next/navigation";
import DetailMovie from "@/components/DetailMovie";

export default function MovieDetailPage() {
  const { slug } = useParams();

  const movies: Record<string, any> = {
    wicked: {
      title: "Wicked",
      genre: ["Musical", "Fantasy", "Drama"],
      year: "2024",
      director: "Jon M Chu",
      description:
        "In the land of Oz, ostracized and misunderstood green-skinned Elphaba is forced to share a room with the popular aristocrat Glinda at Shiz University, and the two's unlikely friendship is tested as they begin to fulfill their respective destinies.",
      poster: "/wicked.jpg",
      backdrop: "/wicked_bd.jpg",
      rating: "8.3",
      whereToWatch: ["Netflix", "Apple TV", "Amazon Prime"],
    },
    // Hamba tambahkan The Dark Knight di sini, Princess:
    "the-dark-knight": {
      title: "The Dark Knight",
      genre: ["Action", "Crime", "Drama"],
      year: "2008",
      director: "Christopher Nolan",
      description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      poster: "/dark_knight.jpg", // Pastikan file gambar ini ada di folder public
      backdrop: "/dark_knight_bd.jpg", // Pastikan file gambar ini ada di folder public
      rating: "9.0",
      whereToWatch: ["HBO Max", "Netflix"],
    },
  };

  // Pastikan slug berupa string agar aman saat dicocokkan
  const movieSlug = Array.isArray(slug) ? slug[0] : slug;
  const movie = movies[movieSlug];

  if (!movie)
    return <p className="text-white text-center py-20">Movie not found!</p>;

  return <DetailMovie movie={movie} />;
}