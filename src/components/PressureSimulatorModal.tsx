import React, { useState } from 'react';
import { X, ShieldAlert, Info } from 'lucide-react';

interface PressureSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Specimen {
  id: string;
  name: string;
  type: string;
  description: string;
  maxToleranceAtm: number;
  effectFormula: (atm: number) => {
    visualScale: number;
    status: 'Intact' | 'Compressed' | 'Imploded' | 'Protected';
    statusText: string;
    details: string;
  };
}

const SPECIMENS: Specimen[] = [
  {
    id: 'styrofoam',
    name: 'Expanded Polystyrene Cup',
    type: 'Inanimate Object',
    description: 'A standard coffee cup made of expanded polystyrene containing microscopic trapped air pockets.',
    maxToleranceAtm: 15,
    effectFormula: (atm: number) => {
      // Compresses down to ~0.2 of original size as air voids implode
      const scale = Math.max(0.22, 1 - Math.min(1, atm / 120) * 0.78);
      let status: 'Intact' | 'Compressed' | 'Imploded' = 'Intact';
      let statusText = 'Normal Volume (100%)';
      let details = 'Air pockets inside the polystyrene foam are at 1 atm equilibrium with surrounding room air.';

      if (atm > 50) {
        status = 'Compressed';
        statusText = `Shrunk to ${(scale * 100).toFixed(0)}% volume`;
        details = 'Microscopic air beads have collapsed entirely under hydrostatic pressure, turning the soft cup into a dense, rock-hard miniature thimble.';
      } else if (atm > 10) {
        status = 'Compressed';
        statusText = `Compressing (${(scale * 100).toFixed(0)}%)`;
        details = 'External hydrostatic pressure is overcoming the internal gas cell walls.';
      }

      return { visualScale: scale, status, statusText, details };
    }
  },
  {
    id: 'titanium-sphere',
    name: 'DSV-2 Titanium Personnel Sphere',
    type: 'Engineered Vessel',
    description: 'A 60mm-thick forged grade-5 titanium spherical hull designed for deep ocean expeditions.',
    maxToleranceAtm: 1400,
    effectFormula: (atm: number) => {
      let status: 'Intact' | 'Protected' = 'Intact';
      let statusText = 'Structurally Nominal';
      let details = 'The perfect sphere distributes hydrostatic stress uniformly across its titanium matrix, resisting up to 1,400 atm.';

      if (atm > 1000) {
        statusText = 'Max Operational Load (Mariana Trench)';
        details = 'Hull experiences over 110,000 metric tons of uniform force; micro-compression within 0.1% elastic tolerance.';
      }

      return { visualScale: 1.0, status, statusText, details };
    }
  },
  {
    id: 'snailfish',
    name: 'Mariana Snailfish (Biological)',
    type: 'Deep Sea Vertebrate',
    description: 'The deepest living fish on Earth, thriving at depths over 8,000 meters in the hadal trench.',
    maxToleranceAtm: 900,
    effectFormula: (atm: number) => {
      let status: 'Protected' = 'Protected';
      let statusText = 'TMAO Stabilized (Zero Damage)';
      let details = 'High concentrations of Trimethylamine N-oxide (TMAO) piezolyte stabilize cell enzymes against compression. Lacks swim bladder or rigid bones.';

      if (atm < 50) {
        details = 'Dangerously low pressure! Hadal snailfish cell membranes become unstable and dissolve if brought to the surface.';
      }

      return { visualScale: 1.0, status, statusText, details };
    }
  },
  {
    id: 'glass-bottle',
    name: 'Air-Filled Glass Bottle',
    type: 'Rigid Gas Cavity',
    description: 'A sealed glass bottle containing 1 atmosphere of trapped air inside.',
    maxToleranceAtm: 45,
    effectFormula: (atm: number) => {
      const isImploded = atm > 45;
      return {
        visualScale: isImploded ? 0.3 : 1.0,
        status: isImploded ? 'Imploded' : 'Intact',
        statusText: isImploded ? 'Catastrophic Implosion' : 'Intact (Air Cavity Holding)',
        details: isImploded
          ? 'Differential pressure exceeded the tensile strength of the glass wall, causing a violent inward implosion.'
          : 'Glass wall withstands the pressure differential for now.'
      };
    }
  }
];

export const PressureSimulatorModal: React.FC<PressureSimulatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [testDepth, setTestDepth] = useState<number>(3810); // Titanic depth default
  const [selectedSpecimenId, setSelectedSpecimenId] = useState<string>('styrofoam');

  if (!isOpen) return null;

  const testAtm = Math.round(1 + testDepth / 10);
  const testPsi = Math.round(testAtm * 14.696);

  const specimen = SPECIMENS.find((s) => s.id === selectedSpecimenId) || SPECIMENS[0];
  const specimenResult = specimen.effectFormula(testAtm);

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
          aria-label="Close lab"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
          <ShieldAlert className="w-4 h-4" />
          Interactive Physics Lab
        </div>
        <h2 className="text-2xl font-bold font-display text-white">
          Deep Ocean Hydrostatic Pressure Simulator
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Simulate how materials, vessels, and living biological organisms respond to crushing hydrostatic forces as depth increases.
        </p>

        {/* Depth & Pressure Controller */}
        <div className="my-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-slate-400">Simulation Depth:</span>
            <div className="text-right">
              <span className="text-lg font-bold font-mono text-cyan-400 tabular-nums">
                {testDepth.toLocaleString()} m
              </span>
              <span className="text-xs font-mono text-slate-400 ml-2">
                ({testAtm} atm / {testPsi.toLocaleString()} psi)
              </span>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={11034}
            step={50}
            value={testDepth}
            onChange={(e) => setTestDepth(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />

          {/* Quick preset buttons */}
          <div className="flex flex-wrap gap-2 mt-3 text-xs font-mono">
            <button
              onClick={() => setTestDepth(0)}
              className={`px-2.5 py-1 rounded border transition-colors ${
                testDepth === 0 ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              Surface (0m)
            </button>
            <button
              onClick={() => setTestDepth(200)}
              className={`px-2.5 py-1 rounded border transition-colors ${
                testDepth === 200 ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              Twilight (200m)
            </button>
            <button
              onClick={() => setTestDepth(3810)}
              className={`px-2.5 py-1 rounded border transition-colors ${
                testDepth === 3810 ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              Titanic (3,810m)
            </button>
            <button
              onClick={() => setTestDepth(10935)}
              className={`px-2.5 py-1 rounded border transition-colors ${
                testDepth === 10935 ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              Challenger Deep (10,935m)
            </button>
          </div>
        </div>

        {/* Specimen Selector Tabs */}
        <div className="mb-4">
          <div className="text-xs font-mono uppercase text-slate-400 mb-2">
            Select Test Specimen:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SPECIMENS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSpecimenId(s.id)}
                className={`p-2.5 text-left rounded-xl border transition-all text-xs ${
                  selectedSpecimenId === s.id
                    ? 'bg-slate-800 border-cyan-400 text-white shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold truncate">{s.name}</div>
                <div className="text-[10px] text-slate-500 mt-0.5 truncate">{s.type}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Simulation Visual Chamber */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden">
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-4">
            HYPERBARIC TEST CHAMBER
          </div>

          {/* Visual animation of specimen deformation */}
          <div className="relative flex items-center justify-center w-36 h-36 border border-slate-800/80 rounded-full bg-slate-950/80">
            <div
              className="transition-transform duration-300 ease-out flex items-center justify-center"
              style={{
                transform: `scale(${specimenResult.visualScale})`,
              }}
            >
              {selectedSpecimenId === 'styrofoam' && (
                <div className="w-16 h-20 bg-slate-200 rounded-b-md border border-slate-400 shadow-lg flex items-center justify-center text-[10px] font-mono text-slate-800 font-bold">
                  CUP
                </div>
              )}
              {selectedSpecimenId === 'titanium-sphere' && (
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-slate-400 via-slate-200 to-white border-2 border-slate-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center text-[10px] font-mono text-slate-900 font-bold">
                  SPHERE
                </div>
              )}
              {selectedSpecimenId === 'snailfish' && (
                <div className="w-20 h-10 rounded-full bg-pink-300/80 border border-pink-200 shadow-md flex items-center justify-center text-[10px] font-mono text-pink-950 font-bold">
                  SNAILFISH
                </div>
              )}
              {selectedSpecimenId === 'glass-bottle' && (
                <div
                  className={`w-12 h-20 rounded-md border-2 ${
                    specimenResult.status === 'Imploded'
                      ? 'border-dashed border-red-500 bg-red-950/40'
                      : 'border-cyan-300 bg-cyan-900/30'
                  } flex items-center justify-center text-[10px] font-mono font-bold text-cyan-200`}
                >
                  {specimenResult.status === 'Imploded' ? 'CRUSHED' : 'BOTTLE'}
                </div>
              )}
            </div>
          </div>

          {/* Chamber Status Readout */}
          <div className="mt-4 text-center">
            <div
              className={`text-sm font-semibold font-mono ${
                specimenResult.status === 'Imploded'
                  ? 'text-red-400'
                  : specimenResult.status === 'Compressed'
                  ? 'text-amber-400'
                  : 'text-cyan-400'
              }`}
            >
              {specimenResult.statusText}
            </div>
            <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
              {specimenResult.details}
            </p>
          </div>
        </div>

        {/* Scientific principle note */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200">The Hydrostatic Pressure Rule: </strong>
            For every 10 meters you descend into seawater, the pressure increases by approximately 1 atmosphere (1.013 bar / 14.7 psi). At 11,000 meters, water exerts 1.1 metric tons per square centimeter.
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close Simulator
          </button>
        </div>
      </div>
    </div>
  );
};
