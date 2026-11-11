import React from 'react';
import { ArrowUp, Compass } from 'lucide-react';
import { DEEP_SEA_FACTS } from '../data/oceanZones';

interface FooterSectionProps {
  onAscendToTop: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onAscendToTop }) => {
  return (
    <footer className="relative py-16 px-4 sm:px-8 border-t border-slate-900 bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto">
        {/* Deep sea facts carousel / cards */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-4">
            <Compass className="w-4 h-4" />
            Oceanographic Archives & Discoveries
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEEP_SEA_FACTS.map((f, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
                <span className="text-[10px] font-mono text-cyan-400 uppercase block mb-1">
                  Depth Record: {f.depth}
                </span>
                <div className="text-sm font-semibold text-white mb-2">
                  {f.title}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {f.fact}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer split row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-900">
          <div>
            <div className="flex items-center gap-2 text-white font-bold font-display text-base">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              𝓞𝓬𝓮𝓪𝓷 𝓛𝓲𝓯𝓮
            </div>
            <p className="text-xs text-cyan-300 font-mono mt-1">
              Project by <strong className="text-white font-semibold">Mehmood Fawzan</strong> · New Middle East International School
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Grounded in bathymetric research from NOAA, WHOI, MBARI, and the International Ocean Discovery Program (IODP).
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onAscendToTop}
              className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium text-cyan-300 bg-slate-900 border border-slate-800 rounded-lg hover:border-cyan-500/50 hover:bg-slate-850 transition-colors"
            >
              <span>Ascend to Surface (0m)</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
