import { useState, useEffect, useCallback } from 'react';
import { OCEAN_ZONES, type Creature } from './data/oceanZones';
import { soundEngine } from './utils/audioEngine';
import { OceanCanvas } from './components/OceanCanvas';
import { TopBar } from './components/TopBar';
import { DepthGauge } from './components/DepthGauge';
import { HeroSection } from './components/HeroSection';
import { ZoneSection } from './components/ZoneSection';
import { SubmersibleSection } from './components/SubmersibleSection';
import { FooterSection } from './components/FooterSection';
import { CreatureModal } from './components/CreatureModal';
import { PressureSimulatorModal } from './components/PressureSimulatorModal';
import { BioluminescenceLabModal } from './components/BioluminescenceLabModal';

export default function App() {
  const [currentDepth, setCurrentDepth] = useState<number>(0);
  const [activeZoneId, setActiveZoneId] = useState<string>('epipelagic');
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [isHeadlightOn, setIsHeadlightOn] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400
  });

  // Modal states
  const [selectedCreature, setSelectedCreature] = useState<Creature | null>(null);
  const [isPressureLabOpen, setIsPressureLabOpen] = useState<boolean>(false);
  const [isBiolumLabOpen, setIsBiolumLabOpen] = useState<boolean>(false);

  // Maximum simulated depth (Challenger Deep & Sub-seafloor lithosphere)
  const maxSimulatedDepth = 12000;

  // Scroll handler calculating accurate ocean depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollFraction = Math.max(0, Math.min(1, scrollY / docHeight));
      const depth = scrollFraction * maxSimulatedDepth;
      setCurrentDepth(depth);

      // Update soundscape filter according to depth
      soundEngine.updateDepth(depth);

      // Determine active zone
      const foundZone = OCEAN_ZONES.find(
        (z) => depth >= z.depthStart && depth <= z.depthEnd
      );
      if (foundZone) {
        setActiveZoneId(foundZone.id);
      } else if (depth > 11034) {
        setActiveZoneId('subseafloor');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [maxSimulatedDepth]);

  // Track mouse coordinates for the Submersible Headlight beam
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Audio toggles
  const handleToggleAudio = useCallback(() => {
    if (isAudioActive) {
      soundEngine.stop();
      setIsAudioActive(false);
    } else {
      soundEngine.start();
      soundEngine.playBubble();
      setIsAudioActive(true);
    }
  }, [isAudioActive]);

  const handleTriggerSonar = useCallback(() => {
    soundEngine.pingSonar();
  }, []);

  const handleSelectCreature = useCallback((creature: Creature) => {
    soundEngine.playBubble();
    setSelectedCreature(creature);
  }, []);

  // Jump to specific zone
  const handleNavigateZone = (zoneId: string) => {
    soundEngine.playBubble();
    const elem = document.getElementById(zoneId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Direct depth jump
  const handleScrubDepth = (targetMeters: number) => {
    soundEngine.playBubble();
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScrollY = (targetMeters / maxSimulatedDepth) * docHeight;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  const handleStartDescent = () => {
    soundEngine.playBubble();
    handleNavigateZone('epipelagic');
  };

  const handleAscendToTop = () => {
    soundEngine.playBubble();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compute background color tint based on depth
  const getDynamicBgStyle = () => {
    if (currentDepth < 200) {
      // 0-200m: Turquoise to ocean blue
      const f = currentDepth / 200;
      return {
        background: `linear-gradient(180deg, rgba(8, 51, 68, 0.95) 0%, rgba(3, 27, 44, 0.98) ${f * 100}%, rgba(3, 7, 18, 1) 100%)`
      };
    } else if (currentDepth < 1000) {
      // 200-1000m: Indigo twilight
      return {
        background: `linear-gradient(180deg, #031b2c 0%, #030718 60%, #020617 100%)`
      };
    } else if (currentDepth < 6000) {
      // 1000-6000m: Midnight abyss
      return {
        background: `linear-gradient(180deg, #020617 0%, #01040f 100%)`
      };
    } else if (currentDepth < 11034) {
      // Hadal Trench
      return {
        background: `linear-gradient(180deg, #01040f 0%, #000208 50%, #080308 100%)`
      };
    } else {
      // Sub-seafloor lithosphere geothermal
      return {
        background: `linear-gradient(180deg, #080308 0%, #170404 100%)`
      };
    }
  };

  return (
    <div
      className="relative min-h-screen text-slate-100 transition-colors duration-700 selection:bg-cyan-500/30 selection:text-cyan-200"
      style={getDynamicBgStyle()}
    >
      {/* Top Bar Navigation */}
      <TopBar
        onNavigateZone={handleNavigateZone}
        isAudioActive={isAudioActive}
        onToggleAudio={handleToggleAudio}
        onTriggerSonar={handleTriggerSonar}
      />

      {/* Fixed Telemetry Depth Gauge */}
      <DepthGauge
        currentDepth={currentDepth}
        maxDepth={maxSimulatedDepth}
        activeZoneId={activeZoneId}
        isHeadlightOn={isHeadlightOn}
        onToggleHeadlight={() => setIsHeadlightOn(!isHeadlightOn)}
        onOpenPressureLab={() => setIsPressureLabOpen(true)}
        onOpenBiolumLab={() => setIsBiolumLabOpen(true)}
        onScrubDepth={handleScrubDepth}
      />

      {/* Underwater Particle and Spotlight Canvas */}
      <OceanCanvas
        currentDepth={currentDepth}
        isHeadlightOn={isHeadlightOn}
        mousePos={mousePos}
      />

      {/* Main Expedition Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          onStartDescent={handleStartDescent}
          onOpenPressureLab={() => setIsPressureLabOpen(true)}
          onTriggerSonar={handleTriggerSonar}
        />

        {/* Ocean Zones (Vertical scroll dive) */}
        {OCEAN_ZONES.map((zone, idx) => {
          const nextZone = OCEAN_ZONES[idx + 1];
          return (
            <ZoneSection
              key={zone.id}
              zone={zone}
              index={idx}
              onSelectCreature={handleSelectCreature}
              onScrollToNextZone={
                nextZone ? () => handleNavigateZone(nextZone.id) : undefined
              }
              nextZoneName={nextZone?.name}
            />
          );
        })}

        {/* Deep Submersible Exploration Engineering Section */}
        <SubmersibleSection />
      </main>

      {/* Footer Section */}
      <FooterSection onAscendToTop={handleAscendToTop} />

      {/* Modals */}
      <CreatureModal
        creature={selectedCreature}
        onClose={() => setSelectedCreature(null)}
      />

      <PressureSimulatorModal
        isOpen={isPressureLabOpen}
        onClose={() => setIsPressureLabOpen(false)}
      />

      <BioluminescenceLabModal
        isOpen={isBiolumLabOpen}
        onClose={() => setIsBiolumLabOpen(false)}
      />
    </div>
  );
}
