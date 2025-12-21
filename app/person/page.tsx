"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function PersonPage() {
  const [roleFilter, setRoleFilter] = useState("All");

  // --- DATA BASE (12 ORANG) ---
  const basePersons = [
    { name: "Cillian Murphy", role: "Actor", image: "/people/cillian.jpg" },
    { name: "Margot Robbie", role: "Actress", image: "/people/margot.jpg" },
    { name: "Christopher Nolan", role: "Director", image: "/people/nolan.jpg" },
    { name: "Florence Pugh", role: "Actress", image: "/people/florence.jpg" },
    { name: "Robert Downey Jr.", role: "Actor", image: "/people/rdj.jpg" },
    { name: "Emma Stone", role: "Actress", image: "/people/emma.jpg" },
    { name: "Timothée Chalamet", role: "Actor", image: "/people/chalamet.jpg" },
    { name: "Zendaya", role: "Actress", image: "/people/zendaya.jpg" },
    { name: "Leonardo DiCaprio", role: "Actor", image: "/people/leo.jpg" },
    { name: "Greta Gerwig", role: "Director", image: "/people/greta.jpg" },
    { name: "Ryan Gosling", role: "Actor", image: "/people/ryan.jpg" },
    { name: "Anya Taylor-Joy", role: "Actress", image: "/people/anya.jpg" },
  ];

  // --- GENERATE 24 DATA (Supaya Grid Penuh & Tidak Ganjil) ---
  // Kita ulangi data di atas 2 kali
  const allPersons = [...basePersons, ...basePersons].map((person, index) => ({
    ...person,
    id: index + 1, // Buat ID unik
  }));

  const filteredPersons = roleFilter === "All" 
    ? allPersons 
    : allPersons.filter((person) => person.role === roleFilter);

  return (
    <main className="min-h-screen bg-[#0a0a1a] text-white -mt-20 pt-28 pb-10">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* HEADER & FILTER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-[#ffffff1a] pb-4 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold mb-2">Person</h1>
            <p className="text-gray-400 text-sm">Discover popular actors, directors, and crew.</p>
          </div>

          <div className="relative z-50 bg-[#ffffff0d] border border-[#ffffff1a] p-2 rounded-lg backdrop-blur-xl">
            <FilterDropdown 
                label="Role" 
                value={roleFilter} 
                setValue={setRoleFilter} 
                options={["All", "Actor", "Actress", "Director"]} 
            />
          </div>
        </div>

        {/* GRID PERSON MINI & PENUH */}
        {/* Grid 8 kolom (xl) dengan 24 item akan menghasilkan tampilan kotak yang rapi tanpa sisa */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 relative z-0">
          
          {filteredPersons.length > 0 ? (
            filteredPersons.map((person) => (
                <Link 
                    key={person.id} 
                    href={`/person/${person.id}`} 
                    className="group relative bg-[#1a1d26] rounded-lg overflow-hidden hover:-translate-y-1 transition-transform duration-300 shadow-md no-underline"
                >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                    src={person.image} 
                    alt={person.name}
                    fill
                    className="object-cover transition-opacity duration-300 group-hover:opacity-90 bg-gray-800"
                    />
                </div>

                <div className="p-2 text-center">
                    <h3 className="text-xs font-bold text-white truncate group-hover:text-[#ff3b3b] transition-colors">
                        {person.name}
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wide">
                        {person.role}
                    </p>
                </div>
                </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500">
                No people found for "{roleFilter}".
            </div>
          )}

        </div>

      </div>
    </main>
  );
}

// KOMPONEN DROPDOWN
function FilterDropdown({ label, value, setValue, options }: { label: string; value: string; setValue: (v: string) => void; options: string[]; }) {
    const [open, setOpen] = useState(false);
    return (
      <div className="relative"> 
        <button
          className="flex items-center gap-1 bg-[#ffffff14] px-3 py-1.5 rounded-md border border-[#ffffff1a] hover:bg-[#ffffff22] transition text-xs"
          onClick={() => setOpen(!open)}
        >
          <span className="text-white">{label}:</span> 
          <span className="font-semibold text-white">{value}</span>
          <ChevronDown className={`w-3 h-3 transition-transform text-white ${open ? "rotate-180" : ""}`} />
        </button>
  
        {open && (
          <div className="absolute mt-1 right-0 w-32 bg-[#0f0f3a] border border-[#ffffff1a] rounded-md shadow-xl p-1 z-50">
            {options.map((opt) => (
              <div
                key={opt}
                className="px-2 py-1.5 text-xs hover:bg-[#1b1b5a] cursor-pointer rounded text-white"
                onClick={() => { setValue(opt); setOpen(false); }}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }