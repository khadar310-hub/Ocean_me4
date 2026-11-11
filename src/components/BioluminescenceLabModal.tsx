import React, { useState } from 'react';
import { X, Sparkles, Eye, Info } from 'lucide-react';

interface BioluminescenceLabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BioluminescenceLabModal: React.FC<BioluminescenceLabModalProps> = ({
  isOpen,
  onClose
}) => {
  const [depth, setDepth] = useState<number>(350);

  if (!isOpen) return null;

  // Wavelength extinction thresholds
  const redVisibility = Math.max(0, 1 - depth / 15);
  const orangeVisibility = Math.max(0, 1 - depth / 40);
  const yellowVisibility = Math.max(0, 1 - depth / 75);
  const greenVisibility = Math.max(0, 1 - depth / 130);
  const blueVisibility = Math.max(0, 1 - depth / 900);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close optics lab"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          Oceanic Optics & Bioluminescence Lab
        </div>
        <h2 className="text-2xl font-bold font-display text-white">
          Wavelength Extinction & The Invisibility Cloak
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Explore how water molecules selectively filter solar wavelengths and why deep creatures evolved blue-green light or jet-red cloaks.
        </p>

        {/* Depth Controller */}
        <div className="my-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-slate-400">Light Extinction Depth:</span>
            <span className="text-lg font-bold font-mono text-cyan-400 tabular-nums">
              {depth} meters
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={1000}
            step={10}
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>0m (Full Sunlight)</span>
            <span>200m (Twilight Boundary)</span>
            <span>1,000m (Total Darkness)</span>
          </div>
        </div>

        {/* Wavelength Extinction Matrix */}
        <div className="mb-6">
          <div className="text-xs font-mono uppercase text-slate-400 mb-2">
            Color Wavelength Penetration at {depth}m:
          </div>

          <div className="space-y-2.5">
            {/* Red */}
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-md border border-slate-700 transition-colors duration-300"
                  style={{
                    backgroundColor: redVisibility > 0.05 ? `rgba(239, 68, 68, ${redVisibility})` : '#020617'
                  }}
                />
                <div>
                  <div className="text-xs font-semibold text-slate-200">Red (700 nm)</div>
                  <div className="text-[10px] text-slate-400 font-mono">Absorbed in first 10 – 15m</div>
                </div>
              </div>
              <span className="text-xs font-mono tabular-nums text-slate-400">
                {redVisibility <= 0 ? 'Extinguished (Appears Black)' : `${Math.round(redVisibility * 100)}% visible`}
              </span>
            </div>

            {/* Orange */}
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-md border border-slate-700 transition-colors duration-300"
                  style={{
                    backgroundColor: orangeVisibility > 0.05 ? `rgba(249, 115, 22, ${orangeVisibility})` : '#020617'
                  }}
                />
                <div>
                  <div className="text-xs font-semibold text-slate-200">Orange (620 nm)</div>
                  <div className="text-[10px] text-slate-400 font-mono">Absorbed by 30 – 40m</div>
                </div>
              </div>
              <span className="text-xs font-mono tabular-nums text-slate-400">
                {orangeVisibility <= 0 ? 'Extinguished' : `${Math.round(orangeVisibility * 100)}% visible`}
              </span>
            </div>

            {/* Yellow */}
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-md border border-slate-700 transition-colors duration-300"
                  style={{
                    backgroundColor: yellowVisibility > 0.05 ? `rgba(234, 179, 8, ${yellowVisibility})` : '#020617'
                  }}
                />
                <div>
                  <div className="text-xs font-semibold text-slate-200">Yellow (580 nm)</div>
                  <div className="text-[10px] text-slate-400 font-mono">Absorbed by ~75m</div>
                </div>
              </div>
              <span className="text-xs font-mono tabular-nums text-slate-400">
                {yellowVisibility <= 0 ? 'Extinguished' : `${Math.round(yellowVisibility * 100)}% visible`}
              </span>
            </div>

            {/* Green */}
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-md border border-slate-700 transition-colors duration-300"
                  style={{
                    backgroundColor: greenVisibility > 0.05 ? `rgba(34, 197, 94, ${greenVisibility})` : '#020617'
                  }}
                />
                <div>
                  <div className="text-xs font-semibold text-slate-200">Green (530 nm)</div>
                  <div className="text-[10px] text-slate-400 font-mono">Penetrates to ~130m</div>
                </div>
              </div>
              <span className="text-xs font-mono tabular-nums text-slate-400">
                {greenVisibility <= 0 ? 'Extinguished' : `${Math.round(greenVisibility * 100)}% visible`}
              </span>
            </div>

            {/* Blue / Indigo */}
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-md border border-slate-700 transition-colors duration-300"
                  style={{
                    backgroundColor: blueVisibility > 0.05 ? `rgba(14, 165, 233, ${blueVisibility})` : '#020617'
                  }}
                />
                <div>
                  <div className="text-xs font-semibold text-slate-200">Blue-Indigo (470 nm)</div>
                  <div className="text-[10px] text-slate-400 font-mono">Maximum water penetration (~1,000m)</div>
                </div>
              </div>
              <span className="text-xs font-mono tabular-nums text-slate-400">
                {blueVisibility <= 0 ? 'Extinguished (Abyss)' : `${Math.round(blueVisibility * 100)}% visible`}
              </span>
            </div>
          </div>
        </div>

        {/* Why Scarlet Animals are Invisible in the Deep */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase mb-1">
            <Eye className="w-4 h-4" />
            The "Red-Cloak" Evolutionary Paradox
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            In bright laboratory lights, deep-sea creatures like the <strong className="text-white">Atolla jellyfish</strong>, <strong className="text-white">Vampire squid</strong>, and deep-sea shrimp appear intensely, brilliantly red. However, because red light is absorbed within the first 15 meters of the ocean, there is no red light to reflect off their bodies. Under only blue-green twilight, their bright red pigmentation appears <strong className="text-cyan-300">pitch black</strong>, providing the ultimate natural camouflage from predators.
          </p>
        </div>

        <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200">Bioluminescence Wavelength: </strong>
            Because blue-green light (470nm) travels furthest through water, over 90% of all deep-sea bioluminescence is produced in this exact frequency band so it can be seen across vast oceanic distances.
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close Optics Lab
          </button>
        </div>
      </div>
    </div>
  );
};
