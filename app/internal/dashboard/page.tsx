"use client";

import { Suspense, useState, useEffect } from "react";
// Import Recharts
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, BarChart, Bar, ScatterChart, Scatter, ZAxis, 
  RadialBarChart, RadialBar, PolarAngleAxis
} from "recharts";
// Import Icons
import { 
  Star, Users, Film, Activity, Globe, AlertCircle, PieChart as PieIcon, 
  Filter, ChevronDown, Map as MapIcon
} from "lucide-react";

// --- HIGHCHARTS IMPORTS ---
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";

// --- KONSTANTA WARNA ---
const COLOR_PRIMARY = "#ff3b3b"; 

// ==========================================
// COMPONENT: CHOROPLETH MAP (HIGHCHARTS)
// ==========================================
const ChoroplethMap = () => {
  const [metric, setMetric] = useState<'rating' | 'votes'>('votes');
  const [isOpen, setIsOpen] = useState(false);

  // FIX: Load Map Module secara aman
  useEffect(() => {
    if (typeof window !== "undefined" && Highcharts) {
        try {
            const mapModule = require("highcharts/modules/map");
            mapModule(Highcharts);
        } catch (e) {
            console.warn("Highcharts map module already loaded");
        }
    }
  }, []);

  /* =======================
     DATA RAW 
  ======================= */
  const rawMapData = [
    { key: "us", name: "United States", rating: 7.5, votes: 12500000 },
    { key: "id", name: "Indonesia", rating: 8.2, votes: 8500000 },
    { key: "jp", name: "Japan", rating: 8.8, votes: 4200000 },
    { key: "fr", name: "France", rating: 7.2, votes: 3100000 },
    { key: "de", name: "Germany", rating: 7.4, votes: 2900000 },
    { key: "gb", name: "United Kingdom", rating: 7.6, votes: 5500000 },
    { key: "br", name: "Brazil", rating: 7.9, votes: 6200000 },
    { key: "in", name: "India", rating: 7.0, votes: 9100000 },
    { key: "cn", name: "China", rating: 6.8, votes: 8000000 },
    { key: "au", name: "Australia", rating: 7.3, votes: 1500000 },
    { key: "ru", name: "Russia", rating: 6.5, votes: 2100000 },
    { key: "ca", name: "Canada", rating: 7.7, votes: 1800000 },
    { key: "mx", name: "Mexico", rating: 7.8, votes: 3800000 },
    { key: "za", name: "South Africa", rating: 7.1, votes: 900000 },
  ];

  // Transform Data sesuai Metric
  const chartData = rawMapData.map(item => [item.key, metric === 'rating' ? item.rating : item.votes]);
  
  const values = chartData.map(d => d[1] as number);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  /* =======================
     OPTIONS
  ======================= */
  const options: Highcharts.Options = {
    chart: {
      map: worldMap as any,
      backgroundColor: "transparent",
      height: 420,
      style: { fontFamily: 'inherit' }
    },
    title: { text: undefined },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
      itemStyle: {
        color: "#9ca3af",
        fontWeight: "bold",
        fontSize: "10px",
        textTransform: "uppercase"
      },
      symbolWidth: 300,
    },
    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom',
            align: 'right',
            theme: {
                fill: '#1a1a1a',
                stroke: '#333',
                style: { color: 'white' },
                states: {
                    hover: { fill: '#333' },
                    select: { fill: '#ff3b3b' }
                }
            }
        }
    },
    colorAxis: {
      min: minVal,
      max: maxVal,
      stops: [
        [0, "#330000"],   
        [0.5, "#ff3b3b"], 
        [1, "#ff9999"],   
      ],
      labels: { style: { color: "#9ca3af" } }
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      borderColor: "#ff3b3b",
      borderRadius: 8,
      style: { color: "#fff" },
      headerFormat: "",
      pointFormat: metric === 'rating' 
        ? "<span style='font-size: 10px; text-transform:uppercase; color: #999'>{point.name}</span><br/><span style='font-size: 16px; font-weight: bold; color: #ff3b3b'><span style='color:yellow'>★</span> {point.value}</span> / 10"
        : "<span style='font-size: 10px; text-transform:uppercase; color: #999'>{point.name}</span><br/><span style='font-size: 16px; font-weight: bold; color: #ff3b3b'>{point.value:,.0f}</span> Votes",
    },
    series: [
      {
        type: "map",
        name: metric === 'rating' ? "Avg Rating" : "Total Votes",
        data: chartData,
        joinBy: ["hc-key", 0],
        borderColor: "#121212", 
        borderWidth: 1,
        nullColor: "#2a2a2a", 
        states: {
          hover: {
            color: "#ffffff", 
            brightness: 0.1
          },
        },
        dataLabels: { enabled: false }
      },
    ],
    credits: { enabled: false },
  };

  return (
    <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 h-[500px] relative overflow-hidden group flex flex-col">
       {/* HEADER DENGAN DROPDOWN */}
       <div className="flex justify-between items-start mb-2 z-10">
          <div>
             <h3 className="text-white font-bold text-lg flex items-center gap-2"><MapIcon size={18} className="text-[#ff3b3b]" /> Global Demand Map</h3>
             <p className="text-gray-500 text-xs mt-1">Intensity by {metric === 'rating' ? 'Quality Score' : 'Audience Volume'}</p>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 text-xs font-bold text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg hover:text-white transition-colors border border-white/5"
            >
              Metric: <span className="text-[#ff3b3b] uppercase">{metric}</span> <ChevronDown size={14} />
            </button>
            {isOpen && (
              <div className="absolute right-0 top-full mt-2 w-32 bg-[#1a1a1a] border border-white/20 rounded-lg shadow-2xl overflow-hidden z-[99] animate-in fade-in zoom-in-95 duration-200">
                  <button 
                    onClick={() => { setMetric('votes'); setIsOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-xs font-bold uppercase transition-colors ${metric === 'votes' ? 'text-white bg-[#ff3b3b]' : 'text-gray-300 hover:bg-white/10'}`}
                  >
                    Votes
                  </button>
                  <button 
                    onClick={() => { setMetric('rating'); setIsOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-xs font-bold uppercase transition-colors ${metric === 'rating' ? 'text-white bg-[#ff3b3b]' : 'text-gray-300 hover:bg-white/10'}`}
                  >
                    Rating
                  </button>
              </div>
            )}
          </div>
       </div>

       {/* MAP CONTAINER */}
       <div className="w-full flex-1 rounded-2xl overflow-hidden">
          <HighchartsReact
            highcharts={Highcharts}
            constructorType="mapChart"
            options={options}
          />
       </div>
    </div>
  );
};


// ==========================================
// DATA MOCKUP (DUMMY)
// ==========================================

// EXECUTIVE DATA
const execKPIData = {
  totalFilms: "1,245",
  topGenre: "Action",
  topGenrePercent: "34%",
  topRatedGenre: "Animation",
  topRatedGenreVal: "8.9",
  avgRatingAll: "7.4"
};

const topCompaniesDataRaw = [
  { name: "Disney", rating: 8.5, vote_count: 12000 },
  { name: "Warner Bros", rating: 7.2, vote_count: 15000 },
  { name: "Universal", rating: 7.8, vote_count: 9000 },
  { name: "Paramount", rating: 6.9, vote_count: 8500 },
  { name: "Sony", rating: 7.0, vote_count: 11000 },
  { name: "Netflix", rating: 6.5, vote_count: 18000 },
];

const quantityQualityData = Array.from({ length: 15 }, (_, i) => ({
  x: Math.floor(Math.random() * 100) + 10,
  y: parseFloat(((Math.random() * 4) + 5).toFixed(1)),
  z: Math.floor(Math.random() * 50000) + 1000 
}));

// REVISI: DATA YEARLY TREND (RATING & VOTE, BUKAN REVENUE)
const yearlyTrendData = [
  { year: '2020', Rating: 7.2, Vote: 250000 },
  { year: '2021', Rating: 7.5, Vote: 320000 },
  { year: '2022', Rating: 7.1, Vote: 280000 },
  { year: '2023', Rating: 7.8, Vote: 410000 },
  { year: '2024', Rating: 8.2, Vote: 560000 },
];

const successRateData = [
  { name: 'Success', value: 85, fill: '#ff3b3b' },
];

// MARKETING DATA
const marketKPIData = {
  topCountryRating: { name: "Japan", val: "8.8" },
  topCountryVotes: { name: "USA", val: "12.5M" },
  lowCountryVotes: { name: "Timor Leste", val: "1.2K" }, 
  topCountryAKA: { name: "France", val: "450 Titles" },
  missingAKA: { count: "345", percent: "28%" }
};

const topCountryVotesData = [
  { name: 'USA', votes: 125000 },
  { name: 'UK', votes: 98000 },
  { name: 'France', votes: 85000 },
  { name: 'Germany', votes: 72000 },
  { name: 'Japan', votes: 69000 },
];

const penetrationData = [
  { name: 'US', interest: 4000, supply: 2400 },
  { name: 'ID', interest: 3000, supply: 1398 },
  { name: 'JP', interest: 2000, supply: 9800 },
  { name: 'BR', interest: 2780, supply: 1200 },
  { name: 'FR', interest: 1890, supply: 1500 },
];

const akaDonutData = [
  { name: 'Localized', value: 72 }, 
  { name: 'Missing', value: 28 }
];

const ratingDistributionData = [
  { range: '< 5', count: 45 },
  { range: '5-6', count: 120 },
  { range: '6-7', count: 350 },
  { range: '7-8', count: 580 },
  { range: '8-9', count: 210 },
  { range: '9-10', count: 85 },
];


// --- COMPONENT: KPI CARD ---
const KPICard = ({ title, value, subtext, icon: Icon, color = "text-white" }: any) => (
  <div className="bg-[#121212] p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-[#ff3b3b]/30 transition-all">
    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-[#ff3b3b]/10" />
    <div className="relative z-10 flex items-start justify-between">
      <div>
        <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-2">{title}</p>
        <h3 className={`text-3xl font-black ${color} mb-1`}>{value}</h3>
        <p className="text-xs text-gray-500">{subtext}</p>
      </div>
      {Icon && <div className="p-3 bg-white/5 rounded-xl text-[#ff3b3b]"><Icon size={24} /></div>}
    </div>
  </div>
);

// --- COMPONENT: DYNAMIC CHART CONTAINER ---
const ChartContainer = ({ title, subtitle, children, filterOptions, currentFilter, onFilterChange, height = "h-[450px]" }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-[#121212] p-6 rounded-2xl border border-white/5 flex flex-col ${height} relative`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        
        {filterOptions && (
          <div className="relative">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 text-xs font-bold text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg hover:text-white transition-colors border border-white/5"
            >
              Metric: <span className="text-[#ff3b3b] uppercase">{currentFilter.replace('_', ' ')}</span> <ChevronDown size={14} />
            </button>
            {isOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-[#1a1a1a] border border-white/20 rounded-lg shadow-2xl overflow-hidden z-[99] animate-in fade-in zoom-in-95 duration-200">
                {filterOptions.map((opt: string) => (
                  <button 
                    key={opt} 
                    onClick={() => { onFilterChange(opt); setIsOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-xs font-bold uppercase transition-colors 
                      ${currentFilter === opt ? 'text-white bg-[#ff3b3b]' : 'text-gray-300 hover:bg-white/10 hover:text-white'}
                    `}
                  >
                    {opt.replace('_', ' ')}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex-1 w-full min-h-0 relative z-0">
        {children}
      </div>
    </div>
  );
};

// --- GLOBAL GRADIENTS DEFS ---
const ChartGradients = () => (
  <svg style={{ height: 0, width: 0, position: 'absolute' }}>
    <defs>
      <linearGradient id="barGradientRed" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ff3b3b" />
        <stop offset="100%" stopColor="#991b1b" />
      </linearGradient>
      
      <linearGradient id="areaGradientRed" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#ff3b3b" stopOpacity={0.4}/>
        <stop offset="95%" stopColor="#ff3b3b" stopOpacity={0}/>
      </linearGradient>
    </defs>
  </svg>
);


// ==========================================
// VIEW: EXECUTIVE DASHBOARD
// ==========================================
const ExecutiveView = () => {
  const [compMetric, setCompMetric] = useState("rating"); 
  const [trendMetric, setTrendMetric] = useState("Rating"); 

  const sortedCompanies = [...topCompaniesDataRaw]
    .sort((a: any, b: any) => b[compMetric] - a[compMetric])
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      <ChartGradients />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Production" value={execKPIData.totalFilms} subtext="Films produced all time" icon={Film} />
        <KPICard title="Top Genre Volume" value={execKPIData.topGenre} subtext={`${execKPIData.topGenrePercent} of total library`} icon={PieIcon} color="text-[#ff3b3b]" />
        <KPICard title="Highest Quality" value={execKPIData.topRatedGenre} subtext={`Avg Rating: ${execKPIData.topRatedGenreVal}`} icon={Star} color="text-yellow-400" />
        <KPICard title="Global Avg Rating" value={execKPIData.avgRatingAll} subtext="Across all productions" icon={Activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartContainer 
            title="Top 5 Production Companies" 
            subtitle={`Ranked by ${compMetric.replace('_', ' ')} (Descending)`}
            filterOptions={["rating", "vote_count"]}
            currentFilter={compMetric}
            onFilterChange={setCompMetric}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedCompanies} layout="vertical" margin={{ left: 10, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                <XAxis type="number" stroke="#666" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#fff" width={100} tick={{fontSize: 12}} />
                <RechartsTooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333', color: '#fff' }}
                />
                <Bar 
                  dataKey={compMetric} 
                  fill="url(#barGradientRed)" 
                  radius={[0, 4, 4, 0]} 
                  barSize={30} 
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center relative">
           <h3 className="absolute top-6 left-6 text-white font-bold text-lg">Success Rate</h3>
           <p className="absolute top-12 left-6 text-xs text-gray-500">Films rated &gt; 8.0</p>
           <ResponsiveContainer width="100%" height={280}>
             <RadialBarChart 
                innerRadius="70%" 
                outerRadius="100%" 
                barSize={20} 
                data={successRateData} 
                startAngle={180} 
                endAngle={0} 
                cy="60%"
             >
               <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
               <RadialBar
                 background={{ fill: '#333' }}
                 clockWise
                 dataKey="value"
                 cornerRadius={10}
               />
               <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" className="fill-white text-5xl font-black">85%</text>
               <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" className="fill-gray-500 text-sm font-bold tracking-widest">SUCCESS</text>
             </RadialBarChart>
           </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Quantity vs Quality Matrix" subtitle="X: Quantity, Y: Rating, Size: Votes">
           <ResponsiveContainer width="100%" height="100%">
             <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
               <CartesianGrid strokeDasharray="3 3" stroke="#333" />
               <XAxis type="number" dataKey="x" name="Quantity" stroke="#666" label={{ value: 'Quantity', position: 'insideBottomRight', offset: -5, fill: '#666' }} />
               <YAxis type="number" dataKey="y" name="Quality" stroke="#666" domain={[0, 10]} label={{ value: 'Rating', angle: -90, position: 'insideLeft', fill: '#666' }} />
               <ZAxis type="number" dataKey="z" range={[100, 800]} name="Votes" />
               <RechartsTooltip 
                  cursor={{ strokeDasharray: '3 3' }} 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-black border border-white/20 p-3 rounded-lg shadow-xl text-white">
                          <p className="font-bold text-sm mb-1 text-[#ff3b3b]">Point Data</p>
                          <p className="text-xs text-gray-300">Quantity: {data.x}</p>
                          <p className="text-xs text-gray-300">Rating: {data.y}</p>
                          <p className="text-xs text-gray-300">Votes: {data.z.toLocaleString()}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
               />
               <Scatter name="Films" data={quantityQualityData} fill="#ff3b3b" fillOpacity={0.6} shape="circle" />
             </ScatterChart>
           </ResponsiveContainer>
        </ChartContainer>

        {/* REVISI: METRIC GANTI JADI RATING & VOTE */}
        <ChartContainer 
          title="Yearly Performance Trend" 
          subtitle={`Trend of ${trendMetric} over time`}
          filterOptions={["Rating", "Vote"]} // <-- GANTI REVENUE JADI VOTE
          currentFilter={trendMetric}
          onFilterChange={setTrendMetric}
        >
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={yearlyTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
               <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
               <XAxis dataKey="year" stroke="#666" fontSize={12} />
               <YAxis stroke="#666" fontSize={12} domain={trendMetric === 'Rating' ? [5, 10] : [0, 'auto']} />
               <RechartsTooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', color: '#fff' }} />
               <Area 
                 type="monotone" 
                 dataKey={trendMetric} 
                 stroke="#ff3b3b" 
                 fill="url(#areaGradientRed)" 
                 strokeWidth={3} 
                 animationDuration={1000}
               />
             </AreaChart>
           </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};


// ==========================================
// VIEW: MARKETING DASHBOARD
// ==========================================
const MarketingView = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      <ChartGradients />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Top Avg Rating" value={marketKPIData.topCountryRating.name} subtext={`Score: ${marketKPIData.topCountryRating.val}`} icon={Star} color="text-yellow-400" />
        
        <div className="bg-[#121212] p-6 rounded-2xl border border-white/5 relative group hover:border-[#ff3b3b]/30 transition-all flex flex-col justify-between">
           <div>
              <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-2">Audience Extremes</p>
              <div className="flex justify-between items-center mb-2">
                 <span className="text-2xl font-black text-white">{marketKPIData.topCountryVotes.name}</span>
                 <span className="text-[10px] font-bold text-green-400 bg-green-900/20 px-2 py-1 rounded uppercase tracking-wider">High</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-lg font-bold text-gray-400">{marketKPIData.lowCountryVotes.name}</span>
                 <span className="text-[10px] font-bold text-red-400 bg-red-900/20 px-2 py-1 rounded uppercase tracking-wider">Low</span>
              </div>
           </div>
           <div className="absolute top-4 right-4 p-2 bg-white/5 rounded-xl text-[#0ea5e9]">
              <Users size={20} />
           </div>
        </div>

        <KPICard title="Most Localized" value={marketKPIData.topCountryAKA.name} subtext={marketKPIData.topCountryAKA.val} icon={Globe} color="text-green-400" />
        <KPICard title="Localization Gap" value={marketKPIData.missingAKA.count} subtext={`${marketKPIData.missingAKA.percent} Unlocalized`} icon={AlertCircle} color="text-[#ff3b3b]" />
      </div>

      {/* Row 1: Choropleth Map with Metric Switcher */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
           <ChoroplethMap />
        </div>

        {/* PENETRATION CHART */}
        <ChartContainer title="Disney Penetration" subtitle="Demand vs Supply" height="h-[500px]">
           <ResponsiveContainer width="100%" height="100%">
              <BarChart data={penetrationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', color: '#fff' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="interest" fill="#333" name="Market Demand" radius={[4, 4, 0, 0]} />
                <Bar dataKey="supply" fill="url(#barGradientRed)" name="Disney Supply" radius={[4, 4, 0, 0]} />
              </BarChart>
           </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Row 2: Votes, AKA, Rating Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <ChartContainer title="Top 5 Countries by Votes" subtitle="Audience Volume">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={topCountryVotesData} layout="vertical" margin={{left:10, right: 30}}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#fff" width={60} fontSize={11} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                  <Bar 
                    dataKey="votes" 
                    fill="url(#barGradientRed)" 
                    radius={[0, 4, 4, 0]} 
                    barSize={35} 
                  />
               </BarChart>
            </ResponsiveContainer>
         </ChartContainer>

         <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 h-[450px]">
            <h3 className="text-white font-bold text-lg mb-1">Localization Status</h3>
            <p className="text-xs text-gray-500 mb-4">AKA Availability</p>
            <ResponsiveContainer width="100%" height="80%">
               <PieChart>
                  <Pie 
                    data={akaDonutData} 
                    cx="50%" cy="50%" 
                    innerRadius={60} 
                    outerRadius={80} 
                    paddingAngle={5} 
                    dataKey="value"
                  >
                    <Cell key="localized" fill="url(#barGradientRed)" />
                    <Cell key="missing" fill="#333" />
                  </Pie>
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-white text-3xl font-black">72%</text>
                  <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" className="fill-gray-500 text-sm font-bold uppercase">Localized</text>
                  <Legend verticalAlign="bottom" />
               </PieChart>
            </ResponsiveContainer>
         </div>

         {/* RATING DISTRIBUTION CHART */}
         <ChartContainer title="Rating Distribution" subtitle="Audience score breakdown">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={ratingDistributionData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                 <XAxis 
                    dataKey="range" 
                    stroke="#666" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                 />
                 <YAxis 
                    stroke="#666" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                 />
                 <RechartsTooltip 
                    cursor={{fill: 'transparent'}} 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333', color: '#fff' }} 
                 />
                 <Bar 
                    dataKey="count" 
                    name="Titles" 
                    fill="url(#barGradientRed)" 
                    radius={[4, 4, 0, 0]} 
                    barSize={40} 
                    animationDuration={1000}
                 />
               </BarChart>
            </ResponsiveContainer>
         </ChartContainer>
      </div>
    </div>
  );
};


// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
function DashboardContent() {
  const [mounted, setMounted] = useState(false);
  const [role, setRole] = useState<'executive' | 'marketing'>('executive');
  
  const [filters, setFilters] = useState({
    genre: 'All',
    year: '2024',
    country: 'Global'
  });

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="p-10 text-center text-white bg-[#0a0a0a] min-h-screen flex items-center justify-center">Loading Empire Data...</div>;

  return (
    <div className="relative min-h-screen font-sans text-white bg-[#0a0a0a]">
      {/* MANTRA HITAM MUTLAK */}
      <style jsx global>{`
        html, body {
          background-color: #0a0a0a !important;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        /* FIX SPACE KOSONG DI ATAS PAGE */
        body::before {
          content: "";
          position: fixed;
          inset: 0;
          background: #0a0a0a;
          z-index: -1;
        }
      `}</style>

      <div className="relative z-10 pt-15 px-6 pb-20 max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
           <div>
             <h1 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase mb-2 flex items-center gap-3">
               Walt Disney <span className="text-[#ff3b3b]">Studios</span>
             </h1>
             <p className="text-gray-400 text-sm max-w-md">
               Real-time performance analytics for <span className="text-white font-bold">{role === 'executive' ? 'Strategic Decisions' : 'Market Expansion'}</span>.
             </p>
           </div>

           {/* ROLE SWITCHER TOGGLE */}
           <div className="bg-[#1a1a1a] p-1.5 rounded-xl border border-white/10 flex">
              <button 
                onClick={() => setRole('executive')}
                className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${role === 'executive' ? 'bg-[#ff3b3b] text-white shadow-lg shadow-red-900/20' : 'text-gray-500 hover:text-white'}`}
              >
                Executive
              </button>
              <button 
                onClick={() => setRole('marketing')}
                className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${role === 'marketing' ? 'bg-[#0ea5e9] text-white shadow-lg shadow-blue-900/20' : 'text-gray-500 hover:text-white'}`}
              >
                Marketing
              </button>
           </div>
        </div>

        {/* GLOBAL FILTERS TOOLBAR */}
        <div className="bg-[#121212] border border-white/5 p-4 rounded-xl mb-10 flex flex-wrap gap-4 items-center shadow-2xl relative z-40">
           <div className="flex items-center gap-2 text-[#ff3b3b] font-bold uppercase text-xs tracking-widest mr-4 border-r border-white/10 pr-6 h-8">
              <Filter size={16} /> Filters
           </div>
           
           <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-white/10">
              <span className="text-xs text-gray-500 uppercase font-bold">Genre</span>
              <select 
                className="bg-transparent text-sm font-bold text-white outline-none cursor-pointer"
                value={filters.genre}
                onChange={(e) => setFilters({...filters, genre: e.target.value})}
              >
                <option value="All" className="text-black">All Genres</option>
                <option value="Fantasy" className="text-black">Fantasy</option>
                <option value="Action" className="text-black">Action</option>
              </select>
           </div>

           <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-white/10">
              <span className="text-xs text-gray-500 uppercase font-bold">Year</span>
              <select 
                className="bg-transparent text-sm font-bold text-white outline-none cursor-pointer"
                value={filters.year}
                onChange={(e) => setFilters({...filters, year: e.target.value})}
              >
                <option value="All" className="text-black">All Time</option>
                <option value="2024" className="text-black">2024</option>
              </select>
           </div>

           <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-white/10">
              <span className="text-xs text-gray-500 uppercase font-bold">Region</span>
              <select 
                className="bg-transparent text-sm font-bold text-white outline-none cursor-pointer"
                value={filters.country}
                onChange={(e) => setFilters({...filters, country: e.target.value})}
              >
                <option value="Global" className="text-black">Global</option>
                <option value="USA" className="text-black">USA</option>
              </select>
           </div>
        </div>

        {/* DYNAMIC CONTENT */}
        {role === 'executive' ? (
           <ExecutiveView />
        ) : (
           <MarketingView />
        )}

      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center font-bold">Loading Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}