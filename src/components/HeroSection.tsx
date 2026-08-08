import React from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { EarthScene } from '../earth/EarthScene';
import { PlanetState } from '../types';

interface HeroSectionProps {
  planetState: PlanetState;
  onHealClick: () => void;
  onResetClick: () => void;
  onStartJourneyClick?: () => void;
  onExploreFeaturesClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  planetState,
  onHealClick,
  onResetClick,
  onStartJourneyClick,
  onExploreFeaturesClick
}) => {
  return (
    <section className="relative w-full min-h-[calc(100vh-70px)] flex items-center justify-center px-4 sm:px-8 py-8 lg:py-12 overflow-hidden bg-[#060907]">
      {/* Subtle ambient lighting glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-lime-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Hero Content */}
        <div className="lg:col-span-6 flex flex-col justify-center z-10 space-y-6 lg:space-y-8">
          
          {/* Badge: # Gamify. Track. Impact. */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-950/60 border border-lime-500/30 text-lime-400 font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_15px_rgba(132,204,22,0.15)]">
              <Sparkles className="w-4 h-4 text-lime-400 animate-pulse" />
              <span>Gamify. Track. Impact.</span>
            </div>
          </div>

          {/* Heading: Small Actions. Massive Impact. */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
              Small Actions.
              <br />
              <span className="text-lime-400 drop-shadow-[0_0_25px_rgba(132,204,22,0.3)]">
                Massive Impact.
              </span>
            </h1>
          </div>

          {/* Description Paragraph */}
          <p className="text-slate-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
            EcoLife+ turns your everyday choices into real impact. Track, improve and inspire with a community that cares for our planet.
          </p>

          {/* CTA Buttons Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onStartJourneyClick}
              className="px-7 py-3.5 rounded-2xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-sm sm:text-base flex items-center gap-2.5 shadow-[0_0_30px_rgba(132,204,22,0.35)] transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>

            <button
              onClick={onExploreFeaturesClick}
              className="px-6 py-3.5 rounded-2xl bg-slate-900/80 border border-white/15 hover:border-lime-500/40 text-white font-bold text-sm sm:text-base flex items-center gap-2.5 transition-all duration-200 hover:bg-white/5 active:scale-95 cursor-pointer"
            >
              <span>Explore Features</span>
              <Play className="w-3.5 h-3.5 fill-current text-white ml-0.5" />
            </button>
          </div>

          {/* Metrics Row at Bottom */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-10 border-t border-white/10">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {(planetState.activeUsersCount / 1000).toFixed(0)}K+
              </div>
              <div className="text-[10px] sm:text-xs font-mono text-slate-400 font-bold uppercase tracking-wider mt-1">
                ACTIVE USERS
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {planetState.totalCo2SavedTons.toFixed(1)}T
              </div>
              <div className="text-[10px] sm:text-xs font-mono text-slate-400 font-bold uppercase tracking-wider mt-1">
                KG CO2 SAVED
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {(planetState.treesEquivalentCount / 1000).toFixed(0)}K+
              </div>
              <div className="text-[10px] sm:text-xs font-mono text-slate-400 font-bold uppercase tracking-wider mt-1">
                TREES EQUIVALENT
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {planetState.challengesWonCount}+
              </div>
              <div className="text-[10px] sm:text-xs font-mono text-slate-400 font-bold uppercase tracking-wider mt-1">
                CHALLENGES WON
              </div>
            </div>
          </div>

        </div>

        {/* Right 3D Earth Column */}
        <div className="lg:col-span-6 relative w-full h-full min-h-[480px] lg:min-h-[560px] flex items-center justify-center">
          <div className="w-full h-full rounded-3xl overflow-hidden relative shadow-2xl">
            <EarthScene
              healthPercentage={planetState.healthPercentage}
              bioSyncStatus={planetState.bioSyncStatus}
              onHealClick={onHealClick}
              onResetClick={onResetClick}
              autoRotate={planetState.autoRotate}
              userPoints={planetState.userPoints}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

