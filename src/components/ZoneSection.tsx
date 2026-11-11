import React from 'react';
import type { OceanZone, Creature } from '../data/oceanZones';
import { CreatureVisual } from './CreatureVisual';
import { ArrowDown, Flame, Waves } from 'lucide-react';

interface ZoneSectionProps {
  zone: OceanZone;
  index: number;
  onSelectCreature: (creature: Creature) => void;
  onScrollToNextZone?: () => void;
  nextZoneName?: string;
}

export const ZoneSection: React.FC<ZoneSectionProps> = ({
  zone,
  index,
  onSelectCreature,
  onScrollToNextZone,
  nextZoneName,
}) => {
  return (
    <section
      id={zone.id}
      className="relative min-h-screen py-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center border-b border-slate-900/60"
    >
      {/* Zone Header Block */}
      <div className="max-w-3xl">
        {/* Unboxed Metadata with typographic separators */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">
          <span>Depth: {zone.depthRangeLabel}</span>
          <span aria-hidden="true">·</span>
          <span>Layer 0{index + 1}</span>
          <span aria-hidden="true">·</span>
          <span>{zone.latinName}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
          {zone.name}
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal">
          {zone.overview}
        </p>

        {/* Physical Conditions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block uppercase">Hydrostatic Pressure</span>
            <span className="text-sm font-semibold text-cyan-300 mt-1 block">
              {zone.pressureRange}
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block uppercase">Temperature</span>
            <span className="text-sm font-semibold text-cyan-300 mt-1 block">
              {zone.temperatureRange}
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block uppercase">Photons / Solar Flux</span>
            <span className="text-sm font-semibold text-cyan-300 mt-1 block">
              {zone.ambientLight}
            </span>
          </div>
        </div>

        {/* Scientific Significance Editorial Box */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90 text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-3">
          <Waves className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white font-semibold">Oceanographic Impact: </strong>
            {zone.scientificSignificance}
          </div>
        </div>
      </div>

      {/* Historic Landmarks & Milestones Strip */}
      {zone.landmarks.length > 0 && (
        <div className="my-8">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
            Exploration Milestones & Bathymetric Markers:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {zone.landmarks.map((landmark, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="font-bold text-cyan-400 tabular-nums">
                    {landmark.depth.toLocaleString()} m
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase">
                    {landmark.type}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-200">
                  {landmark.title}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                  {landmark.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Creatures Showcase Section */}
      <div className="mt-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold font-display text-white">
              Notable Fauna & Organisms
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any organism to inspect physiological adaptations, feeding habits, and light emissions.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400 hidden sm:block">
            {zone.creatures.length} Species Documented
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {zone.creatures.map((creature) => (
            <div
              key={creature.id}
              onClick={() => onSelectCreature(creature)}
              className="group cursor-pointer rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all duration-300 p-4 flex flex-col justify-between shadow-lg hover:shadow-cyan-950/30"
            >
              <div>
                {/* Visual Icon / Thumbnail */}
                <div className="h-44 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center mb-3">
                  <CreatureVisual creature={creature} className="w-full h-full" />
                </div>

                {/* Unboxed Metadata */}
                <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 mb-1">
                  <span>{creature.depthRange}</span>
                  <span aria-hidden="true">·</span>
                  <span>{creature.length}</span>
                </div>

                <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {creature.name}
                </h4>
                <div className="text-xs italic font-mono text-slate-400 mb-2">
                  {creature.scientificName}
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {creature.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-mono">
                <span className="group-hover:underline">Inspect Adaptations</span>
                <span className="text-slate-400 text-[11px]">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next zone descent affordance */}
      {onScrollToNextZone && (
        <div className="flex justify-center mt-6">
          <button
            onClick={onScrollToNextZone}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-medium text-slate-300 bg-slate-900/90 border border-slate-800 hover:border-cyan-500 hover:text-cyan-200 transition-all shadow-md group"
          >
            <span>Dive deeper into {nextZoneName || 'next layer'}</span>
            <ArrowDown className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      )}
    </section>
  );
};
