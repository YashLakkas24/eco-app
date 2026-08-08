import React, { useState } from 'react';
import { EcoChallenge } from '../types';
import { Award, CheckCircle2, Zap, Bike, Recycle, Trees, Utensils, Sun, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChallengesSectionProps {
  challenges: EcoChallenge[];
  onCompleteChallenge: (challengeId: string) => void;
  userPoints: number;
}

export const ChallengesSection: React.FC<ChallengesSectionProps> = ({
  challenges,
  onCompleteChallenge,
  userPoints
}) => {
  const [filter, setFilter] = useState<string>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Recycle': return <Recycle className="w-5 h-5 text-emerald-400" />;
      case 'Bike': return <Bike className="w-5 h-5 text-cyan-400" />;
      case 'Trees': return <Trees className="w-5 h-5 text-lime-400" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-amber-400" />;
      case 'Sun': return <Sun className="w-5 h-5 text-yellow-400" />;
      default: return <Zap className="w-5 h-5 text-lime-400" />;
    }
  };

  const handleComplete = (id: string) => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#84cc16', '#10b981', '#06b6d4', '#eab308']
    });
    onCompleteChallenge(id);
  };

  const filtered = filter === 'all'
    ? challenges
    : challenges.filter(c => c.category === filter);

  return (
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/80 border border-lime-500/30 text-lime-400 font-mono-tech text-xs uppercase mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Gamified Quests</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Eco Action Challenges
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl">
            Complete daily quests to heal the 3D Earth, earn Green Points, and unlock planet evolution milestones.
          </p>
        </div>

        {/* User Points Badge */}
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl glass-panel-dark border border-lime-500/30">
          <Sparkles className="w-5 h-5 text-lime-400" />
          <div>
            <div className="text-[10px] font-mono-tech text-slate-400 uppercase">Your Green Points</div>
            <div className="text-xl font-bold text-lime-400">{userPoints} PTS</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
        {['all', 'waste', 'transport', 'nature', 'energy', 'food'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
              filter === cat
                ? 'bg-lime-400 text-black shadow-lg shadow-lime-950/50'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Challenge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-6 rounded-2xl glass-panel-dark border transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${
              item.completed
                ? 'border-emerald-500/40 bg-emerald-950/20'
                : 'border-white/10 hover:border-lime-500/40 hover:shadow-xl hover:shadow-lime-950/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-900 border border-white/10">
                  {getIcon(item.iconName)}
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                  item.difficulty === 'Easy' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                  item.difficulty === 'Medium' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' :
                  'bg-rose-950 text-rose-400 border border-rose-500/30'
                }`}>
                  {item.difficulty}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-lime-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs">
                <span className="text-lime-400 font-bold">+{item.greenPoints} PTS</span>
                <span className="text-slate-500 mx-1.5">•</span>
                <span className="text-slate-400">-{item.co2SavedKg} kg CO₂</span>
              </div>

              {item.completed ? (
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Done</span>
                </div>
              ) : (
                <button
                  onClick={() => handleComplete(item.id)}
                  className="px-4 py-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs transition-all active:scale-95 cursor-pointer"
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
