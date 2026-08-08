import React from 'react';
import { PlanetState } from '../types';
import { Sparkles, Trophy, Award, Heart, Share2, X, Footprints, Trees } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EcoWrappedModalProps {
  isOpen: boolean;
  onClose: () => void;
  planetState: PlanetState;
}

export const EcoWrappedModal: React.FC<EcoWrappedModalProps> = ({ isOpen, onClose, planetState }) => {
  if (!isOpen) return null;

  const handleShare = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#84cc16', '#10b981', '#38bdf8', '#facc15']
    });
    alert('🎉 Your EcoLife+ Wrapped Report card copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-lg p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-lime-950/40 to-emerald-950 border border-lime-500/40 shadow-2xl text-center space-y-6 overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900/80 text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400 text-black font-extrabold text-[10px] uppercase font-mono-tech tracking-widest">
          <Sparkles className="w-3.5 h-3.5" /> ECOLIFE+ WRAPPED 2026
        </div>

        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Your Planetary Impact</h2>
          <p className="text-xs text-slate-300 mt-1">Here is how your green habits saved Planet Earth this month!</p>
        </div>

        {/* Wrapped Stats Grid */}
        <div className="grid grid-cols-2 gap-3 text-left">
          
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10">
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase block">Total CO₂ Saved</span>
            <span className="text-2xl font-black text-lime-400">{planetState.totalCo2SavedTons.toFixed(2)} Tons</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10">
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase block">Trees Saved Equivalent</span>
            <span className="text-2xl font-black text-emerald-400">{planetState.treesEquivalentCount} Trees</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10">
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase block">Green Points Earned</span>
            <span className="text-2xl font-black text-cyan-400">{planetState.userPoints} PTS</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10">
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase block">Quests Completed</span>
            <span className="text-2xl font-black text-amber-400">{planetState.challengesWonCount} Quests</span>
          </div>

        </div>

        {/* Planet Bio Sync Status */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-lime-500/30 flex items-center justify-between text-left">
          <div>
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase block">Planetary Bio-Sync</span>
            <span className="text-base font-extrabold text-white">{planetState.healthPercentage}% ({planetState.bioSyncStatus})</span>
          </div>
          <span className="text-2xl">🌍</span>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="w-full py-3.5 px-4 rounded-2xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-lime-950/50 transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>SHARE WRAPPED CARD TO COMMUNITY</span>
        </button>

      </div>

    </div>
  );
};
