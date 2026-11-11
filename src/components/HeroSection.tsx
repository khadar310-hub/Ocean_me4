import React from 'react';
import { ArrowDown, Radio, Shield, Waves } from 'lucide-react';

interface HeroSectionProps {
  onStartDescent: () => void;
  onOpenPressureLab: () => void;
  onTriggerSonar: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartDescent,
  onOpenPressureLab,
  onTriggerSonar,
}) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-8 text-center pt-24 pb-16 overflow-hidden">
      {/* Background Hero Image with measured contrast scrim */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/src/assets/images/hero_deep_ocean_1791553604719.jpg"
          alt="Ocean sunlight rays penetrating into deep waters"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top opacity-40 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />
      </div>

      <div className="max-w-4xl mx-auto z-10 flex flex-col items-center">
        {/* Unboxed Metadata Kicker */}
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4">
          <span>Oceanic Bathymetry Expedition</span>
          <span aria-hidden="true">·</span>
          <span>0m to 11,034m+</span>
          <span aria-hidden="true">·</span>
          <span>Earth's Final Frontier</span>
        </div>

        {/* Display Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white leading-tight max-w-3xl text-balance">
          The Secret World <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
            Under the Ocean
          </span>
        </h1>

        {/* Author & School Credit Badge */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-mono text-cyan-300 bg-cyan-950/50 border border-cyan-800/70 px-4 py-2 rounded-xl backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <span>By <strong className="text-white font-semibold">Mehmood Fawzan</strong></span>
          <span aria-hidden="true" className="text-cyan-600">·</span>
          <span className="text-slate-200 font-medium">New Middle East International School</span>
        </div>

        <p className="mt-5 text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed text-balance">
          More than eighty percent of our planet’s oceans remains unmapped and unexplored. Dive vertically through perpetual twilight, crushing midnight depths, and tectonic hadal chasms into the living crust beneath the seafloor.
        </p>

        {/* Primary Interactive CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onStartDescent}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] cursor-pointer"
          >
            <span>Begin Vertical Dive</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenPressureLab}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-slate-200 bg-slate-900/90 border border-slate-700/80 hover:bg-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer"
          >
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>Pressure Simulator</span>
          </button>

          <button
            onClick={onTriggerSonar}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-slate-300 bg-slate-900/60 border border-slate-800 hover:bg-slate-800 hover:text-cyan-300 transition-all cursor-pointer"
          >
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>Test Sonar Ping</span>
          </button>
        </div>

        {/* Scientific Quick Facts Strip */}
        <div className="mt-14 w-full grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl text-left font-mono">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-sm">
            <span className="text-[11px] text-slate-400 uppercase block">Max Ocean Depth</span>
            <span className="text-xl sm:text-2xl font-bold text-white tabular-nums mt-1 block">
              11,034 m
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Mariana Challenger Deep</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-sm">
            <span className="text-[11px] text-slate-400 uppercase block">Peak Hydrostatic Force</span>
            <span className="text-xl sm:text-2xl font-bold text-white tabular-nums mt-1 block">
              1,086 atm
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">16,000 lbs per sq. inch</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-sm">
            <span className="text-[11px] text-slate-400 uppercase block">Deep Bioluminescence</span>
            <span className="text-xl sm:text-2xl font-bold text-cyan-400 tabular-nums mt-1 block">
              &gt; 90%
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Of twilight fauna emit light</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-sm">
            <span className="text-[11px] text-slate-400 uppercase block">Sub-Seafloor Mass</span>
            <span className="text-xl sm:text-2xl font-bold text-cyan-400 tabular-nums mt-1 block">
              ~30%
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Of Earth's total microbial life</span>
          </div>
        </div>

        {/* Scroll indicator prompt */}
        <div className="mt-12 flex flex-col items-center gap-2 text-xs font-mono text-slate-500 animate-bounce">
          <span>Scroll down to descend into the abyss</span>
          <ArrowDown className="w-4 h-4 text-cyan-400" />
        </div>
      </div>
    </section>
  );
};
