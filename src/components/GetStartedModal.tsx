import React, { useState } from 'react';
import { X, Sparkles, Sliders, CheckCircle, Zap } from 'lucide-react';
import { PlanetState } from '../types';
import confetti from 'canvas-confetti';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  planetState: PlanetState;
  onUpdateHealth: (newHealth: number) => void;
  onLogQuickAction: (title: string, co2Kg: number, pts: number) => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  planetState,
  onUpdateHealth,
  onLogQuickAction,
}) => {
  const [quickTitle, setQuickTitle] = useState('');
  const [quickCo2, setQuickCo2] = useState('5.0');

  if (!isOpen) return null;

  const handleCustomLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#84cc16', '#10b981', '#38bdf8']
    });

    onLogQuickAction(quickTitle, parseFloat(quickCo2) || 5, 75);
    setQuickTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl glass-panel-dark border border-lime-500/30 p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-lime-500/20 text-lime-400 border border-lime-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">EcoLife+ Control Center</h3>
            <p className="text-xs text-slate-400">Manage 3D Earth simulation and log instant eco impact</p>
          </div>
        </div>

        {/* Interactive Earth Health Slider */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 mb-6 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono-tech text-slate-300">
            <span className="flex items-center gap-1.5 text-lime-400 font-bold">
              <Sliders className="w-4 h-4" /> 3D Earth Health State
            </span>
            <span className="text-white font-extrabold text-sm">{Math.round(planetState.healthPercentage)}%</span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={planetState.healthPercentage}
            onChange={(e) => onUpdateHealth(Number(e.target.value))}
            className="w-full accent-lime-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />

          <div className="flex justify-between text-[10px] text-slate-500 font-mono-tech">
            <span>0% (Degraded/Polluted)</span>
            <span>50% (Recovering)</span>
            <span>100% (Thriving Green)</span>
          </div>
        </div>

        {/* Log Quick Action Form */}
        <form onSubmit={handleCustomLog} className="space-y-4">
          <div>
            <label className="block text-xs font-mono-tech text-slate-300 mb-1.5 uppercase font-bold">
              Log Custom Eco Action
            </label>
            <input
              type="text"
              value={quickTitle}
              onChange={(e) => setQuickTitle(e.target.value)}
              placeholder="e.g. Rode electric scooter, used solar power..."
              className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono-tech text-slate-400 mb-1">Estimated CO₂ Saved (kg)</label>
              <input
                type="number"
                step="0.5"
                value={quickCo2}
                onChange={(e) => setQuickCo2(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-lime-400"
              />
            </div>
            <div>
              <label className="block text-xs font-mono-tech text-slate-400 mb-1">Earn Points</label>
              <div className="p-2.5 rounded-xl bg-lime-950/60 border border-lime-500/30 text-lime-400 text-sm font-bold flex items-center justify-center gap-1">
                <Zap className="w-4 h-4" /> +75 PTS
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-lime-950/50 transition-all cursor-pointer"
          >
            <CheckCircle className="w-4 h-4" />
            <span>HEAL EARTH & SAVE ACTION</span>
          </button>
        </form>

      </div>
    </div>
  );
};
