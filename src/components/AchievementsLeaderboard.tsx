import React, { useState } from 'react';
import { AchievementBadge, CommunitySquad } from '../types';
import { Trophy, Award, Users, Shield, Sparkles, CheckCircle2, Lock, Flame } from 'lucide-react';

const BADGES_LIST: AchievementBadge[] = [
  {
    id: 'b-1',
    title: 'Eco Pioneer',
    description: 'Logged your first 5 sustainable actions on EcoLife+.',
    icon: '🌱',
    unlocked: true,
    progress: 100,
    category: 'Starter'
  },
  {
    id: 'b-2',
    title: 'Zero Plastic Champion',
    description: 'Saved over 10kg of single-use plastic waste.',
    icon: '♻️',
    unlocked: true,
    progress: 100,
    category: 'Waste'
  },
  {
    id: 'b-3',
    title: 'Green Miles Commuter',
    description: 'Walked or cycled 50 km on zero-emission commutes.',
    icon: '🚲',
    unlocked: true,
    progress: 100,
    category: 'Mobility'
  },
  {
    id: 'b-4',
    title: 'Forest Guardian',
    description: 'Planted or funded 10 native trees in community drives.',
    icon: '🌲',
    unlocked: false,
    progress: 60,
    category: 'Nature'
  },
  {
    id: 'b-5',
    title: 'Solar Energy Pioneer',
    description: 'Switched household power to clean renewable energy.',
    icon: '☀️',
    unlocked: false,
    progress: 35,
    category: 'Energy'
  },
  {
    id: 'b-6',
    title: 'Carbon Neutral Legend',
    description: 'Achieved 1.0 Ton cumulative CO₂ offset milestone.',
    icon: '👑',
    unlocked: false,
    progress: 25,
    category: 'Master'
  }
];

const COMMUNITY_SQUADS: CommunitySquad[] = [
  {
    id: 'sq-1',
    name: 'Krashh Coders Eco Squad',
    membersCount: 1420,
    totalCo2Tons: 182.4,
    location: 'Global Chapter',
    motto: 'PixxelHack 2.0 Sustainable Living Vanguard',
    joined: true
  },
  {
    id: 'sq-2',
    name: 'TCET Green Campus',
    membersCount: 890,
    totalCo2Tons: 112.0,
    location: 'Mumbai, India',
    motto: 'Zero Waste University Initiative'
  },
  {
    id: 'sq-3',
    name: 'Sydney Rainforest Restoration',
    membersCount: 640,
    totalCo2Tons: 94.2,
    location: 'Sydney, Australia',
    motto: 'Native Flora Reforesters'
  }
];

export const AchievementsLeaderboard: React.FC = () => {
  const [squads, setSquads] = useState<CommunitySquad[]>(COMMUNITY_SQUADS);

  const toggleJoinSquad = (id: string) => {
    setSquads(prev =>
      prev.map(s => {
        if (s.id === id) {
          const joined = !s.joined;
          return {
            ...s,
            joined,
            membersCount: joined ? s.membersCount + 1 : s.membersCount - 1
          };
        }
        return s;
      })
    );
  };

  return (
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/80 border border-lime-500/30 text-lime-400 font-mono-tech text-xs uppercase mb-3">
          <Trophy className="w-3.5 h-3.5" />
          <span>Gamification & Ranks</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Achievements & Community Squads
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Unlock prestigious sustainability badges, level up your profile, and join local Eco Squads.
        </p>
      </div>

      {/* Badges Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-lime-400" /> Sustainability Achievement Badges
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BADGES_LIST.map((b) => (
            <div
              key={b.id}
              className={`p-6 rounded-3xl glass-panel-dark border transition-all relative overflow-hidden ${
                b.unlocked
                  ? 'border-lime-500/40 bg-lime-950/10'
                  : 'border-white/10 opacity-75'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl p-3 rounded-2xl bg-slate-900 border border-white/10">
                  {b.icon}
                </span>

                {b.unlocked ? (
                  <span className="px-3 py-1 rounded-full bg-lime-400 text-black font-extrabold text-[10px] uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> UNLOCKED
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-700 text-[10px] font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" /> LOCKED ({b.progress}%)
                  </span>
                )}
              </div>

              <h4 className="text-base font-extrabold text-white mb-1">{b.title}</h4>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">{b.description}</p>

              {/* Progress Bar for Locked */}
              {!b.unlocked && (
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className="h-full bg-lime-400 rounded-full"
                    style={{ width: `${b.progress}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Community Squads Section */}
      <div className="space-y-4 pt-8 border-t border-white/10">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-cyan-400" /> Community Squad Leaderboard
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {squads.map((squad) => (
            <div
              key={squad.id}
              className="p-6 rounded-3xl glass-panel-dark border border-white/10 flex flex-col justify-between space-y-4 hover:border-cyan-500/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono-tech text-cyan-400 font-bold uppercase">
                    {squad.location}
                  </span>
                  <span className="text-xs text-slate-400 font-bold">{squad.membersCount} Members</span>
                </div>

                <h4 className="text-lg font-extrabold text-white mb-1">{squad.name}</h4>
                <p className="text-xs text-slate-300 italic mb-4">"{squad.motto}"</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Impact Offset</span>
                  <span className="text-sm font-extrabold text-lime-400">{squad.totalCo2Tons} Tons CO₂</span>
                </div>

                <button
                  onClick={() => toggleJoinSquad(squad.id)}
                  className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                    squad.joined
                      ? 'bg-slate-800 text-slate-300 border border-slate-700'
                      : 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-md'
                  }`}
                >
                  {squad.joined ? 'Joined' : 'Join Squad'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
