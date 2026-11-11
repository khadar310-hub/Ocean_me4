import React from 'react';
import { Volume2, VolumeX, Radio } from 'lucide-react';

interface TopBarProps {
  onNavigateZone: (zoneId: string) => void;
  isAudioActive: boolean;
  onToggleAudio: () => void;
  onTriggerSonar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onNavigateZone,
  isAudioActive,
  onToggleAudio,
  onTriggerSonar,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-8 px-6 py-4 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300">
      {/* Zone 1: Single text element wordmark in display face */}
      <a
        href="#epipelagic"
        onClick={(e) => {
          e.preventDefault();
          onNavigateZone('epipelagic');
        }}
        className="text-lg font-bold tracking-wider text-slate-100 font-display whitespace-nowrap shrink-0 hover:text-cyan-400 transition-colors flex items-center gap-2"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
        𝓞𝓬𝓮𝓪𝓷 𝓛𝓲𝓯𝓮
      </a>

      {/* Zone 2: 4–5 concise single-line nav links */}
      <nav className="hidden lg:flex items-center gap-7 text-xs font-medium uppercase tracking-wider text-slate-400">
        <button
          onClick={() => onNavigateZone('epipelagic')}
          className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
        >
          Sunlit (0m)
        </button>
        <button
          onClick={() => onNavigateZone('mesopelagic')}
          className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
        >
          Twilight (200m)
        </button>
        <button
          onClick={() => onNavigateZone('bathypelagic')}
          className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
        >
          Midnight (1,000m)
        </button>
        <button
          onClick={() => onNavigateZone('abyssopelagic')}
          className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
        >
          Abyss (4,000m)
        </button>
        <button
          onClick={() => onNavigateZone('hadal')}
          className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
        >
          Hadal (6,000m+)
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onTriggerSonar}
          title="Send active acoustic sonar ping"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 rounded-lg hover:bg-cyan-900/60 transition-colors whitespace-nowrap shrink-0 active:scale-95"
        >
          <Radio className="w-3.5 h-3.5" />
          Sonar Ping
        </button>

        <button
          onClick={onToggleAudio}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap shrink-0 ${
            isAudioActive
              ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
              : 'bg-slate-900 text-slate-300 border-slate-700/80 hover:bg-slate-800'
          }`}
        >
          {isAudioActive ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Hydrophone On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              <span>Ambient Sound</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
