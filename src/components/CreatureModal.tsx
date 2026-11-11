import React, { useState } from 'react';
import { X, Sparkles, Scale, Compass, ChevronRight } from 'lucide-react';
import type { Creature } from '../data/oceanZones';
import { CreatureVisual } from './CreatureVisual';

interface CreatureModalProps {
  creature: Creature | null;
  onClose: () => void;
}

export const CreatureModal: React.FC<CreatureModalProps> = ({ creature, onClose }) => {
  const [isBiolumSimActive, setIsBiolumSimActive] = useState<boolean>(true);

  if (!creature) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="creature-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Zone */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pr-12 pb-4 border-b border-slate-800">
          <div>
            <h2 id="creature-title" className="text-2xl font-bold font-display text-white">
              {creature.name}
            </h2>
            <p className="text-sm italic text-cyan-400 font-mono mt-0.5">
              {creature.scientificName}
            </p>
          </div>
          {/* Metadata unboxed with typographic separator */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>{creature.depthRange}</span>
            <span aria-hidden="true">·</span>
            <span>{creature.length}</span>
          </div>
        </div>

        {/* Visual Showcase Stage */}
        <div className="my-6">
          <div
            className={`relative rounded-xl border transition-all duration-500 overflow-hidden ${
              isBiolumSimActive && creature.bioluminescence
                ? 'bg-black border-cyan-900/60 shadow-[inset_0_0_40px_rgba(6,182,212,0.15)]'
                : 'bg-slate-950 border-slate-800'
            }`}
          >
            <div className="h-64 sm:h-72 flex items-center justify-center p-4">
              <CreatureVisual
                creature={creature}
                isGlowActive={isBiolumSimActive}
                className="w-full h-full max-w-md mx-auto"
              />
            </div>

            {/* Bioluminescence Interactive Simulator Toggle */}
            {creature.bioluminescence && (
              <div className="absolute bottom-3 right-3 left-3 sm:left-auto flex items-center justify-between sm:justify-end gap-3 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs">
                <span className="flex items-center gap-1.5 text-cyan-300 font-mono text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Bioluminescence Glow
                </span>
                <button
                  onClick={() => setIsBiolumSimActive(!isBiolumSimActive)}
                  className={`px-2.5 py-0.5 text-xs font-medium rounded transition-colors ${
                    isBiolumSimActive
                      ? 'bg-cyan-500 text-slate-950 font-semibold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {isBiolumSimActive ? 'Simulating' : 'Turn On'}
                </button>
              </div>
            )}
          </div>

          {creature.bioluminescenceDetail && (
            <div className="mt-3 p-3 rounded-lg bg-cyan-950/30 border border-cyan-900/50 text-xs text-cyan-200/90 leading-relaxed">
              <strong className="text-cyan-400 font-semibold">Light Mechanism: </strong>
              {creature.bioluminescenceDetail}
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs">
            <div className="flex items-center gap-1.5 text-slate-400 font-mono mb-1">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Depth & Range</span>
            </div>
            <div className="font-semibold text-slate-200">{creature.depthRange}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs">
            <div className="flex items-center gap-1.5 text-slate-400 font-mono mb-1">
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              <span>Pressure Tolerance</span>
            </div>
            <div className="font-semibold text-slate-200">{creature.pressureTolerance}</div>
          </div>
        </div>

        {/* Overview summary */}
        <div className="my-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
            Ecological Profile
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {creature.summary}
          </p>
        </div>

        {/* Key Evolutionary Adaptations */}
        <div className="my-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Key Evolutionary Adaptations
          </h3>
          <ul className="space-y-2">
            {creature.adaptations.map((adaptation, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{adaptation}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Fun fact callout */}
        <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 mb-1">
            Marine Fact
          </div>
          <p className="text-xs text-slate-300 italic">
            "{creature.funFact}"
          </p>
        </div>

        {/* Modal Action Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
