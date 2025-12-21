import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#050511] text-gray-300 border-t border-white/10 py-10">
      <div className="max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        
        {/* === BAGIAN KIRI: BRANDING === */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-3xl font-black text-white tracking-tighter">
            CINE<span className="text-[#ff3b3b]">LETTER</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Platform ulasan film terbaik kerajaan.
          </p>
        </div>

        {/* === BAGIAN KANAN: ABOUT US & COPYRIGHT === */}
        <div className="flex flex-col items-center md:items-end gap-2">
          
          {/* 1. Link About Us */}
          <Link 
            href="/about" 
            className="text-white font-bold hover:text-[#ff3b3b] transition-colors duration-300 no-underline"
          >
            About Us
          </Link>

          {/* 2. Copyright (Tepat di bawahnya) */}
          <p className="text-xs text-gray-500">
            © 2025 CineLetter. All rights reserved.
          </p>
          
        </div>

      </div>
    </footer>
  );
}