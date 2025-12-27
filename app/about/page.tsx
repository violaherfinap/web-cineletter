"use client";

import Link from "next/link";
import Image from "next/image"; 
import { ArrowLeft, Github, Instagram, Linkedin } from "lucide-react";

export default function AboutPage() {

  const teamMembers = [
    {
      name: "Satria Manggala",
      nim: "L0224024",
      role: "Co-Founder / Data Scientist",
      image: "/backdrop.jpg",
      desc: "Sains Data UNS '24",
    },
    {
      name: "Viola Herfina Putri",
      nim: "L0224026",
      role: "Co-Founder / Data Scientist",
      image: "/backdrop.jpg",
      desc: "Sains Data UNS '24",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white pt-10 pb-16">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ff3b3b] mb-6 transition-colors no-underline"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Meet Our Team
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Dua mahasiswa Sains Data yang berdedikasi membangun CineLetter.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-[#16183c] rounded-2xl overflow-hidden border border-white/5 hover:border-[#ff3b3b]/50 transition-all duration-300 group hover:-translate-y-2 shadow-lg"
            >

              {/* Foto */}
              <div className="relative h-80 overflow-hidden bg-gray-900">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#ff3b3b]/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Github className="w-8 h-8 cursor-pointer hover:scale-110 transition" />
                  <Linkedin className="w-8 h-8 cursor-pointer hover:scale-110 transition" />
                  <Instagram className="w-8 h-8 cursor-pointer hover:scale-110 transition" />
                </div>
              </div>

              {/* Deskripsi */}
              <div className="p-8 text-center bg-[#16183c]">
                <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                <p className="text-[#ff3b3b] font-mono text-sm mb-2">
                  NIM: {member.nim}
                </p>
                <p className="text-gray-400 text-xs font-semibold mb-4 uppercase tracking-wider">
                  {member.role}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {member.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
