import React from 'react';
import type { Creature } from '../data/oceanZones';

interface CreatureVisualProps {
  creature: Creature;
  isGlowActive?: boolean;
  className?: string;
}

export const CreatureVisual: React.FC<CreatureVisualProps> = ({
  creature,
  isGlowActive = false,
  className = ''
}) => {
  // If an image override exists, show it with high-fidelity styled container & graceful SVG fallback
  if (creature.imageOverride) {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 group ${className}`}>
        <img
          src={creature.imageOverride}
          alt={creature.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
        {creature.bioluminescence && (
          <div
            className={`absolute top-3 right-3 text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded backdrop-blur-md border ${
              isGlowActive
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                : 'bg-slate-900/70 text-slate-400 border-slate-700/60'
            }`}
          >
            Bioluminescent
          </div>
        )}
      </div>
    );
  }

  // Vector SVG visual representation based on creature type
  return (
    <div
      className={`relative flex items-center justify-center rounded-xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/80 p-6 overflow-hidden ${className}`}
    >
      {/* Background ambient water glow */}
      {creature.bioluminescence && (
        <div
          className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${creature.glowColor || '#38bdf8'} 0%, transparent 70%)`,
            opacity: isGlowActive ? 0.45 : 0.15
          }}
        />
      )}

      {renderSvgByType(creature, isGlowActive)}

      {creature.bioluminescence && (
        <div
          className={`absolute top-3 right-3 text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded backdrop-blur-md border transition-all duration-300 ${
            isGlowActive
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.6)]'
              : 'bg-slate-900/80 text-slate-400 border-slate-700'
          }`}
        >
          Bioluminescent
        </div>
      )}
    </div>
  );
};

function renderSvgByType(creature: Creature, isGlow: boolean) {
  const glowStyle = isGlow && creature.glowColor ? {
    filter: `drop-shadow(0 0 12px ${creature.glowColor})`
  } : {};

  switch (creature.svgIcon) {
    case 'turtle':
      return (
        <svg viewBox="0 0 100 100" className="w-28 h-28 text-emerald-400/90 transition-transform hover:scale-105 duration-300">
          <ellipse cx="50" cy="50" rx="24" ry="30" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M50 20 L50 80 M26 50 L74 50 M32 35 L68 65 M32 65 L68 35" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
          <circle cx="50" cy="14" r="6" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="2" />
          {/* Flippers */}
          <path d="M26 35 C10 20 6 30 18 45" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M74 35 C90 20 94 30 82 45" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M32 75 C20 85 24 92 34 82" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M68 75 C80 85 76 92 66 82" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      );

    case 'whale':
      return (
        <svg viewBox="0 0 120 70" className="w-32 h-20 text-cyan-400/90 transition-transform hover:scale-105 duration-300">
          <path
            d="M10 35 C30 15 70 15 95 30 C105 35 115 28 118 20 C116 35 116 45 118 55 C112 45 105 40 95 42 C70 48 40 50 25 45 C15 42 10 38 10 35 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M60 22 C64 12 72 16 68 25" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M40 40 C45 52 52 50 48 42" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="24" cy="30" r="2" fill="currentColor" />
        </svg>
      );

    case 'angler':
      return (
        <svg viewBox="0 0 100 90" className="w-28 h-24 text-teal-300 transition-transform hover:scale-105 duration-300" style={glowStyle}>
          {/* Angler body */}
          <path
            d="M30 45 C30 25 55 20 75 35 C85 42 85 55 70 65 C50 72 32 65 30 45 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          {/* Lure (Esca) */}
          <path d="M42 22 C40 8 52 6 58 12" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="60" cy="14" r="5" fill={isGlow ? '#34d399' : '#059669'} className={isGlow ? 'animate-pulse' : ''} />
          {/* Jaws and teeth */}
          <path d="M30 42 L22 48 L32 54 L20 60 L32 64" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M22 46 L14 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Fin */}
          <path d="M62 48 C72 45 74 55 64 54" fill="none" stroke="currentColor" strokeWidth="1.5" />
          {/* Tail */}
          <path d="M75 48 L90 35 L86 48 L92 60 Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />
        </svg>
      );

    case 'squid':
      return (
        <svg viewBox="0 0 90 110" className="w-24 h-28 text-indigo-400 transition-transform hover:scale-105 duration-300" style={glowStyle}>
          <path d="M45 10 C32 25 30 45 32 60 C38 62 52 62 58 60 C60 45 58 25 45 10 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
          {/* Fin wings */}
          <path d="M33 22 C18 15 20 35 34 32" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M57 22 C72 15 70 35 56 32" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="38" cy="52" r="3" fill="#60a5fa" />
          <circle cx="52" cy="52" r="3" fill="#60a5fa" />
          {/* Arms with webbing */}
          <path d="M34 60 C25 80 20 95 24 105" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M42 61 C38 82 36 96 38 106" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M48 61 C52 82 54 96 52 106" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M56 60 C65 80 70 95 66 105" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      );

    case 'eel':
      return (
        <svg viewBox="0 0 110 70" className="w-32 h-20 text-rose-400 transition-transform hover:scale-105 duration-300" style={glowStyle}>
          {/* Gigantic unhinged gulper eel jaw */}
          <path d="M12 28 C28 10 50 12 55 35" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M12 28 C18 52 45 54 55 35" fill="none" stroke="currentColor" strokeWidth="2.5" />
          {/* Whip tail */}
          <path d="M55 35 C70 32 80 40 92 36 C100 32 105 38 108 36" fill="none" stroke="currentColor" strokeWidth="2" />
          {/* Glowing lure at tail tip */}
          <circle cx="108" cy="36" r="3.5" fill="#f43f5e" className={isGlow ? 'animate-pulse' : ''} />
          {/* Tiny eye */}
          <circle cx="16" cy="27" r="1.5" fill="currentColor" />
        </svg>
      );

    case 'isopod':
      return (
        <svg viewBox="0 0 90 90" className="w-24 h-24 text-sky-400/90 transition-transform hover:scale-105 duration-300">
          <ellipse cx="45" cy="45" rx="26" ry="34" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <line x1="20" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="1.5" />
          <line x1="19" y1="42" x2="71" y2="42" stroke="currentColor" strokeWidth="1.5" />
          <line x1="20" y1="54" x2="70" y2="54" stroke="currentColor" strokeWidth="1.5" />
          <line x1="25" y1="66" x2="65" y2="66" stroke="currentColor" strokeWidth="1.5" />
          {/* Legs */}
          <path d="M19 32 L8 28 M18 44 L7 44 M19 56 L8 60 M71 32 L82 28 M72 44 L83 44 M71 56 L82 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="38" cy="18" r="2" fill="currentColor" />
          <circle cx="52" cy="18" r="2" fill="currentColor" />
        </svg>
      );

    case 'tripod':
      return (
        <svg viewBox="0 0 90 100" className="w-24 h-28 text-cyan-400 transition-transform hover:scale-105 duration-300">
          {/* Slender fish body */}
          <path d="M25 40 C35 32 60 32 75 40 C65 48 35 48 25 40 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
          {/* Extended stilt fins */}
          <path d="M38 46 L28 92" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M50 46 L50 94" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M72 42 L80 92" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          {/* Sensor fins pointing upwards */}
          <path d="M35 34 L25 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M42 34 L40 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'dumbo':
      return (
        <svg viewBox="0 0 90 80" className="w-24 h-20 text-indigo-300 transition-transform hover:scale-105 duration-300">
          <path d="M30 45 C30 25 60 25 60 45 C60 55 56 60 52 64 C48 60 42 60 38 64 C34 60 30 55 30 45 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
          {/* Flapping ear-fins */}
          <path d="M30 32 C16 24 16 38 28 38" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />
          <path d="M60 32 C74 24 74 38 62 38" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="38" cy="42" r="3" fill="currentColor" />
          <circle cx="52" cy="42" r="3" fill="currentColor" />
        </svg>
      );

    case 'snailfish':
      return (
        <svg viewBox="0 0 100 60" className="w-28 h-18 text-pink-300/90 transition-transform hover:scale-105 duration-300">
          {/* Translucent gelatinous tadpole body */}
          <path
            d="M15 30 C15 16 45 15 65 24 C80 30 92 32 96 30 C88 34 75 36 65 36 C45 44 15 42 15 30 Z"
            fill="currentColor"
            fillOpacity="0.2"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          {/* Pectoral wing fin */}
          <path d="M35 32 C42 42 50 40 45 32" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="26" cy="26" r="2.5" fill="currentColor" fillOpacity="0.5" />
        </svg>
      );

    case 'microbe':
      return (
        <svg viewBox="0 0 90 90" className="w-24 h-24 text-amber-400 transition-transform hover:scale-105 duration-300">
          <circle cx="45" cy="45" r="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 2" />
          <circle cx="45" cy="45" r="14" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
          {/* Flagella / pili */}
          <path d="M21 45 L10 40 M69 45 L80 48 M45 21 L40 10 M45 69 L50 80 M28 28 L18 20 M62 62 L72 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 80 80" className="w-20 h-20 text-cyan-400">
          <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
  }
}
