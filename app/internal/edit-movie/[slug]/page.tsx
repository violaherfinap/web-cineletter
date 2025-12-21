"use client";

import { PlayCircle, Star, Pencil, Upload, Check, X } from "lucide-react";
import { useState } from "react";
import { useParams } from "next/navigation";

// --- KOMPONEN PINTAR: TEKS YANG BISA DIEDIT ---
// Komponen ini yang membuat tulisan bisa berubah jadi kotak input saat pensil diklik
const EditableText = ({ 
  value, 
  onSave, 
  className = "", 
  type = "input", // 'input' atau 'textarea'
  label = "Edit" 
}: { 
  value: string | number; 
  onSave: (val: string) => void; 
  className?: string;
  type?: "input" | "textarea";
  label?: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  // Jika sedang mode edit, tampilkan kotak input
  if (isEditing) {
    return (
      <div className="flex items-start gap-2 z-50 relative animate-in fade-in zoom-in duration-200">
        {type === "textarea" ? (
           <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className={`bg-[#000] border border-[#ff3b3b] text-white p-2 rounded-lg focus:outline-none w-full min-w-[300px] min-h-[150px] ${className}`}
          />
        ) : (
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className={`bg-[#000] border border-[#ff3b3b] text-white px-2 py-1 rounded-lg focus:outline-none min-w-[200px] ${className}`}
            autoFocus
          />
        )}
        
        {/* Tombol Save & Cancel */}
        <div className="flex gap-1">
          <button 
            onClick={() => { onSave(String(tempValue)); setIsEditing(false); }}
            className="p-2 bg-green-600 hover:bg-green-500 rounded text-white transition shadow-lg"
          >
            <Check size={16} />
          </button>
          <button 
            onClick={() => { setTempValue(value); setIsEditing(false); }}
            className="p-2 bg-red-600 hover:bg-red-500 rounded text-white transition shadow-lg"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  // Jika TIDAK mode edit, tampilkan teks biasa + Tombol Pensil
  return (
    <div className="relative group inline-block pr-8 border border-transparent hover:border-white/10 rounded-lg transition-all p-1 -ml-1">
      <span className={className}>{value}</span>
      
      {/* Tombol Pensil (Sekarang Bisa Diklik!) */}
      <button 
        onClick={() => setIsEditing(true)}
        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 p-1.5 bg-[#ff3b3b] text-white rounded-md shadow-lg hover:scale-110 transition-all cursor-pointer z-10"
        title={label}
      >
        <Pencil size={14} />
      </button>
    </div>
  );
};


export default function EditMoviePage() {
  const params = useParams();
  
  const [activeTab, setActiveTab] = useState("cast");

  // --- STATE DATA MOVIE (Bisa Diedit) ---
  const [movie, setMovie] = useState({
    title: "Wicked",
    rating: "9.3",
    year: "2024",
    director: "Jon M. Chu",
    description: "Elphaba, seorang wanita muda yang disalahpahami karena kulit hijaunya, menjalin persahabatan yang tidak mungkin namun mendalam dengan Glinda, seorang gadis populer yang haus akan kekuasaan.",
    poster: "/wicked.jpg", // Pastikan gambar ada di public
    backdrop: "/backdrop.jpg", // Pastikan gambar ada di public
    genre: ["Fantasy", "Musical", "Drama"],
  });

  // Fungsi pura-pura upload gambar
  const handleImageClick = (type: string) => {
    alert(`Tuan Putri, fitur upload ${type} akan membuka file manager di sini.`);
  };

  // --- DATA TAB (Static untuk contoh) ---
  const tabContent = {
    cast: ["Cynthia Erivo", "Ariana Grande", "Michelle Yeoh", "Jonathan Bailey", "Jeff Goldblum"],
    crew: [{ name: "Jon M. Chu", role: "Director" }, { name: "Winnie Holzman", role: "Writer" }],
    details: [{ label: "Runtime", value: "2h 43m" }, { label: "Release", value: "Nov 2024" }],
    genres: [{ name: "Fantasy", count: "245" }, { name: "Musical", count: "189" }],
    akas: ["France", "Japan", "Indonesia"]
  };

  const tabs = [
    { id: "cast", label: "CAST" },
    { id: "crew", label: "CREW" },
    { id: "details", label: "DETAILS" },
    { id: "genres", label: "GENRES" },
    { id: "akas", label: "AKAS" },
  ];

  return (
    <div className="relative min-h-screen text-white overflow-hidden font-sans -mt-20 group/page">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      
      {/* --- BACKDROP IMAGE --- */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat transition-transform group-hover/page:scale-105 duration-700"
        style={{
          backgroundImage: `url(${movie.backdrop})`, 
          backgroundPosition: 'center top',
          opacity: 0.5,
          maskImage: "linear-gradient(to bottom, transparent 0%, transparent 10%, black 50%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, transparent 10%, black 50%, black 90%, transparent 100%)",
        }}
      />
      {/* Tombol Ganti Backdrop */}
       <button 
          onClick={() => handleImageClick('Backdrop')}
          className="absolute top-32 right-6 z-30 flex items-center gap-2 p-3 bg-black/60 hover:bg-[#ff3b3b] backdrop-blur-md rounded-full text-white transition-all opacity-0 group-hover/page:opacity-100 shadow-2xl border border-white/10 cursor-pointer"
        >
          <Upload size={18} />
          <span className="text-xs font-bold uppercase tracking-wider pr-2">Change Backdrop</span>
       </button>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />

      <div className="relative z-10 flex flex-col lg:flex-row max-w-7xl mx-auto px-6 pt-48 pb-10 gap-10 items-start">
        
        {/* KOLOM KIRI: POSTER */}
        <div className="flex flex-col gap-6 flex-shrink-0 w-64 mx-auto lg:mx-0">
          <div 
            className="relative group rounded-xl shadow-lg overflow-hidden border border-white/5 cursor-pointer"
            onClick={() => handleImageClick('Poster')}
          >
              <img src={movie.poster} alt={movie.title} className="w-full object-cover transition-transform group-hover:scale-105 duration-500" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <div className="flex flex-col items-center gap-2 text-white bg-black/60 p-4 rounded-xl border border-white/10 hover:bg-[#ff3b3b] hover:border-transparent transition-colors">
                  <Upload size={32} />
                  <span className="text-xs font-bold uppercase tracking-widest">Change Poster</span>
                </div>
              </div>
          </div>
          
          <div className="relative w-56 bg-[#1a1a1a]/80 backdrop-blur-md p-4 rounded-xl border border-white/10 opacity-70">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Available on</h3>
            <div className="space-y-2">
              {["Netflix", "Disney+", "Amazon Prime"].map((provider, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/5">
                  <PlayCircle className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-200">{provider}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KOLOM TENGAH: INFO UTAMA (BISA DIEDIT) */}
        <div className="flex-1 text-white lg:pt-2">
          
          {/* JUDUL (Editable) */}
          <div className="mb-4">
             <EditableText 
                value={movie.title} 
                onSave={(val) => setMovie({...movie, title: val})} 
                className="text-5xl lg:text-6xl font-black tracking-tight drop-shadow-lg leading-tight"
                label="Edit Title"
             />
          </div>
          
          {/* METADATA (Year & Director Editable) */}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-gray-300 text-lg">
             <EditableText 
                value={movie.year} 
                onSave={(val) => setMovie({...movie, year: val})} 
                className="text-gray-300"
                label="Edit Year"
             />
             <span>•</span>
             <span>Directed by</span>
             <EditableText 
                value={movie.director} 
                onSave={(val) => setMovie({...movie, director: val})} 
                className="font-semibold text-white"
                label="Edit Director"
             />
          </div>

          {/* DESKRIPSI (Editable Textarea) */}
          <div className="mb-8">
             <EditableText 
                type="textarea"
                value={movie.description} 
                onSave={(val) => setMovie({...movie, description: val})} 
                className="text-gray-300 leading-relaxed text-base font-light"
                label="Edit Synopsis"
             />
          </div>

          {/* GENRE (Editable per item) */}
          <div className="mb-8 flex flex-wrap gap-2">
            {movie.genre.map((g, i) => (
               <EditableText
                  key={i}
                  value={g}
                  onSave={(val) => {
                      const newGenres = [...movie.genre];
                      newGenres[i] = val;
                      setMovie({...movie, genre: newGenres});
                  }}
                  className="bg-[#2a2a2a] text-gray-200 px-4 py-1.5 rounded-full text-sm border border-white/10 inline-block"
               />
            ))}
          </div>

          {/* TABS (Static Content) */}
          <div className="mb-8 opacity-80 hover:opacity-100 transition-opacity">
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

            <div className="mt-4 min-h-[100px] p-4 border border-dashed border-white/10 rounded-xl">
                  {/* Isi Tab disederhanakan untuk demo */}
                  {activeTab === "cast" && (
                    <div className="flex flex-wrap gap-2">
                      {tabContent.cast.map((name, index) => (
                        <span key={index} className="px-3 py-1.5 bg-[#2a2a2a] border border-white/10 rounded-md text-[13px] text-gray-300">{name}</span>
                      ))}
                    </div>
                  )}
                  {activeTab === "crew" && (
                     <div className="flex flex-wrap gap-2">
                        {tabContent.crew.map((p, i) => <span key={i} className="px-3 py-1.5 bg-[#2a2a2a] rounded-md text-[13px] text-gray-300">{p.role}: {p.name}</span>)}
                     </div>
                  )}
                  {activeTab === "details" && (
                     <div className="flex flex-wrap gap-4">
                        {tabContent.details.map((d, i) => <div key={i} className="text-sm bg-white/5 px-3 py-1 rounded-md"><span className="text-gray-500 uppercase">{d.label}: </span>{d.value}</div>)}
                     </div>
                  )}
                   {activeTab === "genres" && (
                     <div className="flex flex-wrap gap-4 text-sm text-gray-400">Displaying Genre Analytics...</div>
                  )}
                   {activeTab === "akas" && (
                     <div className="flex flex-wrap gap-2">{tabContent.akas.map((a,i)=><span key={i} className="px-2 py-1 bg-white/5 rounded">{a}</span>)}</div>
                  )}
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: RATING (Editable Angka) */}
        <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4">
          <div className="bg-[#1a1a1a]/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 relative">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">CineLetter Rating</h3>
            <div className="flex items-center gap-4">
              <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />
              <div className="flex items-end gap-1">
                 {/* Rating Bisa Diedit */}
                 <EditableText 
                    value={movie.rating} 
                    onSave={(val) => setMovie({...movie, rating: val})} 
                    className="text-4xl font-bold"
                    label="Edit Rating"
                 />
                 <span className="text-gray-400 text-sm mb-1">/10</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}