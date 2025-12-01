"use client";

import ReusableBarChart from "@/components/charts/BarChart";

export default function DashboardChart() {
  // contoh data (nanti bisa diganti API)
  const movieVotes = [
    { title: "Inception", votes: 2100000 },
    { title: "Interstellar", votes: 1900000 },
    { title: "The Dark Knight", votes: 2500000 },
    { title: "Avatar", votes: 1700000 },
    { title: "Avengers: Endgame", votes: 2300000 },
    { title: "Joker", votes: 1600000 }
  ];

  // Ambil top 5 votes
  const topFive = movieVotes
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5);

  return (
    <ReusableBarChart
      data={topFive}
      xKey="title"
      yKey="votes"
    />
  );
}