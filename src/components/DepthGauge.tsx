import React from 'react';
import { Flashlight, Compass, ShieldAlert, Sparkles } from 'lucide-react';

interface DepthGaugeProps {
  currentDepth: number;
  maxDepth: number;
  activeZoneId: string;
  isHeadlightOn: boolean;
  onToggleHeadlight: () => void;
  onOpenPressureLab: () => void;
  onOpenBiolumLab: () => void;
  onScrubDepth: (targetMeters: number) => void;
}

export const DepthGauge: React.FC<DepthGaugeProps> = ({
  currentDepth,
  maxDepth,
  activeZoneId,
  isHeadlightOn,
  onToggleHeadlight,
  onOpenPressureLab,
  onOpenBiolumLab,
  onScrubDepth,
}) => {
  // Calculated oceanographic metrics
  const depthFeet = Math.round(currentDepth * 3.28084);
  const pressureAtm = (1 + currentDepth / 10).toFixed(1);
  const pressurePsi = Math.round(Number(pressureAtm) * 14.696);

  // Dynamic temperature model
  let tempC = '28.0';
  if (currentDepth <= 200) {
    tempC = (28 - (currentDepth / 200) * 12).toFixed(1);
  } else if (currentDepth <= 1000) {
    tempC = (16 - ((currentDepth - 200) / 800) * 12).toFixed(1);
  } else if (currentDepth <= 6000) {
    tempC = (4 - ((currentDepth - 1000) / 5000) * 2.5).toFixed(1);
  } else if (currentDepth <= 11000) {
    tempC = (1.5 + ((currentDepth - 6000) / 5000) * 1.0).toFixed(1);
  } else {
    // Sub-seafloor geothermal heat
    tempC = (60 + ((currentDepth - 11000) / 2000) * 55).toFixed(1);
  }

  // Sunlight penetration %
  const sunlightPct = currentDepth >= 1000 ? 0 : Math.max(0, Math.round(100 * Math.pow(1 - currentDepth / 1000, 2)));

  const progressFraction = Math.min(1, currentDepth / maxDepth);

  return (
    <aside
      aria-label="Submersible Depth and Oceanographic Telemetry"
      className="fixed right-4 sm:right-6 top-20 z-40 w-64 sm:w-72 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-slate-800/90 shadow-2xl p-4 text-slate-100 transition-all duration-300"
    >
      {/* Header telemetry badge */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '18s' }} />
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            DSV-2 TELEMETRY
          </span>
        </div>
        <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">
          {activeZoneId.toUpperCase()}
        </span>
      </div>

      {/* Main Depth Readout */}
      <div className="pt-3 pb-2">
        <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
          Current Ocean Depth
        </div>
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono tabular-nums text-white">
            {Math.round(currentDepth).toLocaleString()}
          </span>
          <span className="text-sm font-mono text-cyan-400 font-semibold">meters</span>
        </div>
        <div className="text-xs text-slate-400 font-mono tabular-nums mt-0.5">
          {depthFeet.toLocaleString()} feet below surface
        </div>
      </div>

      {/* Depth Vertical Scrub / Progress Bar */}
      <div className="my-2.5">
        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 transition-all duration-150"
            style={{ width: `${progressFraction * 100}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono mt-1">
          <span>0m</span>
          <span>1,000m</span>
          <span>4,000m</span>
          <span>11,034m</span>
        </div>
      </div>

      {/* Ocean Physics Matrix */}
      <div className="grid grid-cols-2 gap-2 my-3 text-xs font-mono">
        <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800/80">
          <div className="text-[10px] text-slate-400 uppercase">Pressure</div>
          <div className="text-cyan-300 font-semibold tabular-nums mt-0.5">
            {pressureAtm} <span className="text-[10px] font-normal text-slate-400">atm</span>
          </div>
          <div className="text-[10px] text-slate-400 tabular-nums">
            {pressurePsi.toLocaleString()} psi
          </div>
        </div>

        <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800/80">
          <div className="text-[10px] text-slate-400 uppercase">Water Temp</div>
          <div className="text-cyan-300 font-semibold tabular-nums mt-0.5">
            {tempC} <span className="text-[10px] font-normal text-slate-400">°C</span>
          </div>
          <div className="text-[10px] text-slate-400 tabular-nums">
            {((Number(tempC) * 9) / 5 + 32).toFixed(1)} °F
          </div>
        </div>

        <div className="col-span-2 p-2 rounded-lg bg-slate-900/90 border border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Sunlight Flux</div>
            <div className="text-xs font-medium text-slate-200 mt-0.5">
              {sunlightPct > 0 ? `${sunlightPct}% Photic Light` : '0% Total Obscurity'}
            </div>
          </div>
          <div
            className={`w-3.5 h-3.5 rounded-full border ${
              sunlightPct > 50
                ? 'bg-amber-300 border-amber-200 shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                : sunlightPct > 0
                ? 'bg-blue-400 border-blue-300 shadow-[0_0_8px_rgba(96,165,250,0.5)]'
                : 'bg-slate-900 border-slate-700'
            }`}
          />
        </div>
      </div>

      {/* Submersible Interactive Controls */}
      <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
        {/* Headlight Spotlight Button */}
        <button
          onClick={onToggleHeadlight}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
            isHeadlightOn
              ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
          }`}
        >
          <span className="flex items-center gap-2">
            <Flashlight className={`w-3.5 h-3.5 ${isHeadlightOn ? 'text-cyan-400' : 'text-slate-400'}`} />
            Submersible Headlight
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
            {isHeadlightOn ? 'Active' : 'Off'}
          </span>
        </button>

        {/* Quick Interactive Scientific Labs */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onOpenPressureLab}
            className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-slate-300 bg-slate-900/90 border border-slate-800 rounded-lg hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            Pressure Lab
          </button>
          <button
            onClick={onOpenBiolumLab}
            className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-slate-300 bg-slate-900/90 border border-slate-800 rounded-lg hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Optics Lab
          </button>
        </div>

        {/* Fast Dive Jump Points */}
        <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="text-[10px] uppercase text-slate-500">Jump:</span>
          <button
            onClick={() => onScrubDepth(0)}
            className="hover:text-cyan-400 transition-colors"
          >
            0m
          </button>
          <button
            onClick={() => onScrubDepth(200)}
            className="hover:text-cyan-400 transition-colors"
          >
            200m
          </button>
          <button
            onClick={() => onScrubDepth(1000)}
            className="hover:text-cyan-400 transition-colors"
          >
            1km
          </button>
          <button
            onClick={() => onScrubDepth(4000)}
            className="hover:text-cyan-400 transition-colors"
          >
            4km
          </button>
          <button
            onClick={() => onScrubDepth(10935)}
            className="hover:text-cyan-400 transition-colors text-cyan-300"
          >
            11km
          </button>
        </div>
      </div>
    </aside>
  );
};
