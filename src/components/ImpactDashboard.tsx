import React from 'react';
import { PlanetState } from '../types';
import { calculateImpactEquivalent } from '../engine/greenScoreEngine';
import { BarChart2, ShieldCheck, Trees, Car, Smartphone, Zap, Flame } from 'lucide-react';

interface ImpactDashboardProps {
  planetState: PlanetState;
}

export const ImpactDashboard: React.FC<ImpactDashboardProps> = ({ planetState }) => {
  const impact = calculateImpactEquivalent(planetState.totalCo2SavedTons);

  return (
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/80 border border-lime-500/30 text-lime-400 font-mono-tech text-xs uppercase mb-3">
          <BarChart2 className="w-3.5 h-3.5" />
          <span>Real-time Analytics</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Global Impact Engine
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Visualizing real carbon offset equivalents generated through collective eco actions.
        </p>
      </div>

      {/* Main Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: CO2 Avoided */}
        <div className="p-6 rounded-3xl glass-panel-dark border border-lime-500/20 relative overflow-hidden">
          <div className="p-3 rounded-2xl bg-lime-500/10 text-lime-400 w-fit mb-4">
            <Flame className="w-6 h-6" />
          </div>
          <div className="text-xs font-mono-tech text-slate-400 uppercase">Total CO₂ Avoided</div>
          <div className="text-4xl font-black text-white mt-2">
            {planetState.totalCo2SavedTons.toFixed(1)} <span className="text-lg text-lime-400 font-bold">Tons</span>
          </div>
          <p className="text-slate-400 text-xs mt-3">
            Equivalent to removing {impact.milesNotDriven.toLocaleString()} miles driven by average gas passenger vehicles.
          </p>
        </div>

        {/* Card 2: Tree Absorption */}
        <div className="p-6 rounded-3xl glass-panel-dark border border-emerald-500/20 relative overflow-hidden">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 w-fit mb-4">
            <Trees className="w-6 h-6" />
          </div>
          <div className="text-xs font-mono-tech text-slate-400 uppercase">Tree Saplings Equivalent</div>
          <div className="text-4xl font-black text-white mt-2">
            {planetState.treesEquivalentCount.toLocaleString()} <span className="text-lg text-emerald-400 font-bold">Trees</span>
          </div>
          <p className="text-slate-400 text-xs mt-3">
            Grown for 10 years absorbing greenhouse gases continuously.
          </p>
        </div>

        {/* Card 3: Energy Saved */}
        <div className="p-6 rounded-3xl glass-panel-dark border border-cyan-500/20 relative overflow-hidden">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 w-fit mb-4">
            <Smartphone className="w-6 h-6" />
          </div>
          <div className="text-xs font-mono-tech text-slate-400 uppercase">Clean Energy Offsets</div>
          <div className="text-4xl font-black text-white mt-2">
            {(impact.smartphonesCharged / 1000).toFixed(0)}k <span className="text-lg text-cyan-400 font-bold">Charges</span>
          </div>
          <p className="text-slate-400 text-xs mt-3">
            Smartphone battery charge cycles powered by zero-emission grid reduction.
          </p>
        </div>

      </div>

      {/* Bio-Sync Engine Diagnostics */}
      <div className="p-8 rounded-3xl glass-panel-dark border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-lime-500/20 text-lime-400 border border-lime-500/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Bio-Sync Planet Diagnostics</h3>
              <p className="text-xs text-slate-400">Current Biosphere Health Index: {Math.round(planetState.healthPercentage)}%</p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono-tech text-lime-400">
            SYSTEM STATUS: {planetState.bioSyncStatus}
          </div>
        </div>

        {/* Health Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-400">
            <span>CRITICAL (0%)</span>
            <span>RECOVERING (30%)</span>
            <span>STABLE (70%)</span>
            <span>THRIVING (100%)</span>
          </div>
          <div className="w-full h-4 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5 relative">
            <div
              className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-lime-400 transition-all duration-700 shadow-[0_0_15px_#84cc16]"
              style={{ width: `${planetState.healthPercentage}%` }}
            />
          </div>
        </div>
      </div>

    </section>
  );
};
