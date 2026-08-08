import React, { useState } from 'react';
import { Recycle, Droplets, Zap, Trees, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';
import confetti from 'canvas-confetti';

interface FeatureActionsSectionProps {
  onLogAction?: (title: string, co2Kg: number, points: number) => void;
}

export const FeatureActionsSection: React.FC<FeatureActionsSectionProps> = ({
  onLogAction
}) => {
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const actions = [
    {
      id: 'waste',
      name: 'WASTE',
      subtitle: 'Heal Land & Oceans',
      description: 'Recycle plastic, compost food scraps & reduce landfill waste.',
      co2Kg: 10,
      points: 100,
      icon: Recycle,
      color: 'emerald',
      bg: 'bg-emerald-950/40 hover:bg-emerald-950/70',
      border: 'border-emerald-500/30 hover:border-emerald-400',
      text: 'text-emerald-400',
      btnBg: 'bg-emerald-500 hover:bg-emerald-400 text-black',
      chimeType: 'waste' as const
    },
    {
      id: 'water',
      name: 'WATER',
      subtitle: 'Heal Marine Life',
      description: 'Shorten showers, harvest rainwater & prevent water runoff.',
      co2Kg: 15,
      points: 120,
      icon: Droplets,
      color: 'cyan',
      bg: 'bg-cyan-950/40 hover:bg-cyan-950/70',
      border: 'border-cyan-500/30 hover:border-cyan-400',
      text: 'text-cyan-400',
      btnBg: 'bg-cyan-500 hover:bg-cyan-400 text-black',
      chimeType: 'water' as const
    },
    {
      id: 'energy',
      name: 'ENERGY',
      subtitle: 'Save Clean Power',
      description: 'Switch to LEDs, unplug idle devices & use clean renewables.',
      co2Kg: 20,
      points: 150,
      icon: Zap,
      color: 'amber',
      bg: 'bg-amber-950/40 hover:bg-amber-950/70',
      border: 'border-amber-500/30 hover:border-amber-400',
      text: 'text-amber-400',
      btnBg: 'bg-amber-500 hover:bg-amber-400 text-black',
      chimeType: 'energy' as const
    },
    {
      id: 'nature',
      name: 'NATURE',
      subtitle: 'Plant & Restore',
      description: 'Plant native saplings, protect forests & support biodiversity.',
      co2Kg: 25,
      points: 200,
      icon: Trees,
      color: 'lime',
      bg: 'bg-lime-950/40 hover:bg-lime-950/70',
      border: 'border-lime-500/30 hover:border-lime-400',
      text: 'text-lime-400',
      btnBg: 'bg-lime-400 hover:bg-lime-300 text-black',
      chimeType: 'nature' as const
    },
    {
      id: 'community',
      name: 'COMMUNITY',
      subtitle: 'Mobilize Action',
      description: 'Organize local cleanups, share tips & inspire eco squads.',
      co2Kg: 30,
      points: 250,
      icon: Users,
      color: 'purple',
      bg: 'bg-purple-950/40 hover:bg-purple-950/70',
      border: 'border-purple-500/30 hover:border-purple-400',
      text: 'text-purple-400',
      btnBg: 'bg-purple-500 hover:bg-purple-400 text-white',
      chimeType: 'community' as const
    }
  ];

  const handleAction = (act: typeof actions[0]) => {
    soundEngine.playChime(act.chimeType);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#84cc16', '#10b981', '#38bdf8', '#f59e0b']
    });

    if (onLogAction) {
      onLogAction(`${act.name} Action Logged`, act.co2Kg, act.points);
    }

    setActiveToast(`Logged ${act.name}! +${act.co2Kg}kg CO₂ Saved, +${act.points} pts`);
    setTimeout(() => {
      setActiveToast(null);
    }, 3500);
  };

  return (
    <section className="w-full py-12 px-4 sm:px-8 bg-[#060907] border-t border-white/10 relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Toast notification */}
      {activeToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 border border-lime-400/50 text-white px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-lime-400 shrink-0" />
          <span className="text-sm font-extrabold">{activeToast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/30 text-lime-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Planetary Healing</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Take Action to Heal Earth
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Choose an eco category below to log your real-world sustainable actions. Watch the 3D globe heal in real time.
            </p>
          </div>
        </div>

        {/* 5 Action Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {actions.map(act => {
            const Icon = act.icon;
            return (
              <div
                key={act.id}
                className={`p-5 rounded-3xl backdrop-blur-xl border ${act.border} ${act.bg} transition-all duration-300 transform hover:-translate-y-1 shadow-xl flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl border border-white/10 bg-black/40 ${act.text} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      +{act.co2Kg}kg CO₂
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white tracking-wide">
                    {act.name}
                  </h3>
                  <div className={`text-xs font-bold ${act.text} mb-2`}>
                    {act.subtitle}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {act.description}
                  </p>
                </div>

                <button
                  onClick={() => handleAction(act)}
                  className={`w-full py-2.5 px-4 rounded-xl font-extrabold text-xs transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 ${act.btnBg}`}
                >
                  <span>Log {act.name}</span>
                  <span className="text-[10px] opacity-80">(+{act.points} pts)</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
