import React from 'react';
import { Shield, Eye, Radio, Compass } from 'lucide-react';

export const SubmersibleSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-b border-slate-900">
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">
        <span>Deep Submergence Vehicles</span>
        <span aria-hidden="true">·</span>
        <span>Human & Robotic Oceanography</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Engineering for 1,000 Atmospheres
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            At the bottom of the Mariana Trench, the ocean exerts over 1,000 atmospheres of crushing pressure—enough to instantly flatten steel pipes like soda cans. Only a handful of human-occupied vehicles in history have ever touched the bottom of Challenger Deep.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 font-mono mb-1">
                <Shield className="w-4 h-4" />
                <span className="font-semibold text-slate-200">Titanium Spheres</span>
              </div>
              <p className="text-slate-400 leading-normal">
                Spheres distribute stress uniformly. A cylinder or square hull would buckle under asymmetrical bending moments.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 font-mono mb-1">
                <Compass className="w-4 h-4" />
                <span className="font-semibold text-slate-200">Syntactic Foam</span>
              </div>
              <p className="text-slate-400 leading-normal">
                Pure hollow glass microspheres embedded in epoxy resin provide buoyancy without compressing or taking on water.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 font-mono mb-1">
                <Radio className="w-4 h-4" />
                <span className="font-semibold text-slate-200">Acoustic Modems</span>
              </div>
              <p className="text-slate-400 leading-normal">
                Radio waves cannot travel through seawater. Submersibles communicate with surface ships using sound pulses.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 font-mono mb-1">
                <Eye className="w-4 h-4" />
                <span className="font-semibold text-slate-200">LED Flood Arrays</span>
              </div>
              <p className="text-slate-400 leading-normal">
                High-lumen underwater arrays cast focused beams across the seabed, piercing the eternal obsidian darkness.
              </p>
            </div>
          </div>
        </div>

        {/* Submersible Image Visual */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center min-h-[380px]">
          <img
            src="/src/assets/images/submersible_exploration_1791553645159.jpg"
            alt="Deep ocean research submersible Alvin illuminating the abyssal seafloor"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs font-mono text-slate-300">
            <span className="text-cyan-400 font-bold block mb-0.5">DSV ALVIN & THE ABYSSAL PLAIN</span>
            Operating depth: 6,500m · Over 5,000 successful dives conducted since 1964.
          </div>
        </div>
      </div>
    </section>
  );
};
