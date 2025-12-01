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
  };

  const movie = movies[slug];
  if (!movie)
    return <p className="text-white text-center py-20">Movie not found!</p>;

  return <DetailMovie movie={movie} />;
}
