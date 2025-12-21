"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Building2, UserCircle, ChevronDown, ShieldCheck, Search } from "lucide-react";

// --- TIPE DATA ---
type Role = {
  id: string;
  label: string;
  type: "Executive" | "Marketing";
};

type Company = {
  id: string;
  label: string;
};

export default function SelectContextPage() {
  const router = useRouter();
  
  // State Utama
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(""); 
  const [loading, setLoading] = useState(false);

  // State Searchable Dropdown
  const [companySearch, setCompanySearch] = useState(""); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]); 

  // Data Master
  const [roles, setRoles] = useState<Role[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // --- 1. INITIAL LOAD ---
  useEffect(() => {
    const dummyRoles: Role[] = [
      { id: "executive", label: "Executive", type: "Executive" },
      { id: "marketing", label: "Marketing", type: "Marketing" },
    ];

    const dummyCompanies: Company[] = [
      { id: "wb", label: "Warner Bros. Pictures" },
      { id: "disney", label: "Walt Disney Studios" },
      { id: "paramount", label: "Paramount Pictures" },
      { id: "netflix", label: "Netflix Originals" },
      { id: "sony", label: "Sony Pictures" },
      { id: "universal", label: "Universal Pictures" },
      { id: "lionsgate", label: "Lionsgate Films" },
    ];

    setRoles(dummyRoles);
    setCompanies(dummyCompanies);
    setFilteredCompanies(dummyCompanies); 
  }, []);

  // --- 2. LOGIC FILTER ---
  useEffect(() => {
    if (companySearch === "") {
        setFilteredCompanies(companies);
    } else {
        const filtered = companies.filter((c) => 
            c.label.toLowerCase().includes(companySearch.toLowerCase())
        );
        setFilteredCompanies(filtered);
    }
  }, [companySearch, companies]);

  // Handle Klik di Luar Dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company.id);
    setCompanySearch(company.label); 
    setIsDropdownOpen(false); 
  };

  const handleContinue = () => {
    if (!selectedRole || !selectedCompany) return;
    setLoading(true);
    
    setTimeout(() => {
      router.push(`/internal/dashboard?company=${selectedCompany}&role=${selectedRole}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#ff3b3b]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px]" />

      {/* CARD FORM */}
      <div className="relative z-10 w-full max-w-md bg-[#121212]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-lg">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Role Access</h1>
          <p className="text-sm text-gray-400">
            Select your role and workspace to proceed.
          </p>
        </div>

        <div className="space-y-6">
          
          {/* 1. SELECT ROLE */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <UserCircle className="w-3 h-3" /> Select Designation
            </label>
            {/* Wrapper Relative Biasa */}
            <div className="relative">
              <select 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                // PERBAIKAN: Tambah 'box-border' biar aman
                className="w-full box-border bg-[#0a0a0a] border border-white/10 text-white text-sm rounded-lg px-4 py-3 appearance-none focus:outline-none focus:border-[#ff3b3b] cursor-pointer"
              >
                <option value="" disabled>Select your role...</option>
                <optgroup label="Executive Level">
                  {roles.filter(r => r.type === "Executive").map((role) => (
                    <option key={role.id} value={role.id}>{role.label}</option>
                  ))}
                </optgroup>
                <optgroup label="Marketing Level">
                   {roles.filter(r => r.type === "Marketing").map((role) => (
                    <option key={role.id} value={role.id}>{role.label}</option>
                  ))}
                </optgroup>
              </select>
              
              <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* 2. SEARCHABLE COMPANY */}
          <div className="space-y-2" ref={dropdownRef}>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Building2 className="w-3 h-3" /> Target Workspace
            </label>
            
            {/* Wrapper Relative: Penjaga Posisi */}
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Type to search company..."
                    value={companySearch}
                    onChange={(e) => {
                        setCompanySearch(e.target.value);
                        setSelectedCompany(""); 
                        setIsDropdownOpen(true);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    // PERBAIKAN UTAMA:
                    // 1. box-border: Wajib ada agar padding masuk dalam hitungan lebar 100%.
                    // 2. w-full: Memenuhi wrapper.
                    className="w-full box-border bg-[#0a0a0a] border border-white/10 text-white text-sm rounded-lg pl-10 pr-10 py-3 focus:outline-none focus:border-[#ff3b3b] transition-colors"
                />
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
                
                <div className="absolute right-4 top-3.5 pointer-events-none">
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                </div>

                {/* DROPDOWN MENU */}
                {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 z-[9999] mt-2 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl max-h-60 overflow-y-auto custom-scrollbar">
                        {filteredCompanies.length > 0 ? (
                            filteredCompanies.map((comp) => (
                                <div
                                    key={comp.id}
                                    onClick={() => handleSelectCompany(comp)}
                                    className="px-4 py-3 text-sm text-gray-300 hover:bg-[#ff3b3b]/10 hover:text-white cursor-pointer transition-colors border-b border-white/5 last:border-0 flex items-center gap-2"
                                >
                                    <Building2 className="w-3 h-3 opacity-50" />
                                    {comp.label}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                No company found.
                            </div>
                        )}
                    </div>
                )}
            </div>
          </div>

          {/* BUTTON */}
          <div className="pt-2">
            <button
              onClick={handleContinue}
              disabled={!selectedRole || !selectedCompany || loading}
              className={`w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-lg transition-all duration-300 ${
                !selectedRole || !selectedCompany 
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
                  : "bg-white text-black hover:bg-gray-200 hover:scale-[1.02]"
              }`}
            >
              {loading ? (
                <span className="animate-pulse">Verifying Credentials...</span>
              ) : (
                <>
                  Enter Dashboard <ChevronDown className="w-4 h-4 -rotate-90" />
                </>
              )}
            </button>
          </div>

        </div>

        <p className="text-center text-[10px] text-gray-600 mt-6">
          System v1.0 • Ready for SQL Search
        </p>

      </div>
    </div>
  );
}