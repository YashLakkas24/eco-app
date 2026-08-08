import React, { useState } from 'react';
import { GreenMileTrip } from '../types';
import { Bike, Navigation, Footprints, Zap, CheckCircle2, Trophy, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GreenMilesTrackerProps {
  onAddMilesImpact: (co2SavedKg: number, greenPoints: number) => void;
}

const INITIAL_TRIPS: GreenMileTrip[] = [
  { id: 't-1', date: 'Today, 8:30 AM', mode: 'Bicycle', distanceKm: 8.5, co2SavedKg: 1.8, pointsEarned: 85 },
  { id: 't-2', date: 'Yesterday, 5:15 PM', mode: 'Walk', distanceKm: 3.2, co2SavedKg: 0.7, pointsEarned: 40 },
  { id: 't-3', date: 'Aug 6, 2026', mode: 'Public Transit', distanceKm: 14.0, co2SavedKg: 2.5, pointsEarned: 110 }
];

export const GreenMilesTracker: React.FC<GreenMilesTrackerProps> = ({ onAddMilesImpact }) => {
  const [trips, setTrips] = useState<GreenMileTrip[]>(INITIAL_TRIPS);
  const [mode, setMode] = useState<'Walk' | 'Bicycle' | 'E-Scooter' | 'Public Transit'>('Bicycle');
  const [distance, setDistance] = useState<number>(5.0);

  const totalMilesKm = trips.reduce((acc, curr) => acc + curr.distanceKm, 0);
  const totalCo2Saved = trips.reduce((acc, curr) => acc + curr.co2SavedKg, 0);

  const handleLogTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (distance <= 0) return;

    // CO2 factors per km avoided vs gas car
    const factors = { Walk: 0.21, Bicycle: 0.21, 'E-Scooter': 0.16, 'Public Transit': 0.12 };
    const saved = Number((distance * factors[mode]).toFixed(2));
    const pts = Math.round(distance * 12);

    const newTrip: GreenMileTrip = {
      id: `t-${Date.now()}`,
      date: 'Just now',
      mode,
      distanceKm: distance,
      co2SavedKg: saved,
      pointsEarned: pts
    };

    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#84cc16', '#38bdf8', '#a855f7']
    });

    setTrips([newTrip, ...trips]);
    onAddMilesImpact(saved, pts);
    setDistance(5.0);
  };

  return (
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/80 border border-lime-500/30 text-lime-400 font-mono-tech text-xs uppercase mb-3">
          <Navigation className="w-3.5 h-3.5" />
          <span>Zero-Emission Mobility</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Green Miles Tracker
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Track walking, cycling, and zero-emission commutes to earn Green Miles XP and reduce urban carbon footprint.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Log Trip Form */}
        <form onSubmit={handleLogTrip} className="lg:col-span-6 p-6 sm:p-8 rounded-3xl glass-panel-dark border border-white/10 space-y-6">
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Footprints className="w-5 h-5 text-lime-400" /> Log Green Trip
          </h3>

          {/* Mode Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono-tech text-slate-400 uppercase font-bold">Commute Mode</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Bicycle', 'Walk', 'E-Scooter', 'Public Transit'] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setMode(item)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    mode === item
                      ? 'bg-lime-400 text-black border-lime-400 shadow-md'
                      : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Distance Input */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono-tech">
              <span className="text-slate-300 font-bold uppercase">Distance Traveled</span>
              <span className="text-lime-400 font-bold">{distance} km</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="50"
              step="0.5"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full accent-lime-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block">Estimated Offset</span>
              <span className="text-lime-400 font-bold text-sm">{(distance * 0.21).toFixed(2)} kg CO₂</span>
            </div>
            <div>
              <span className="text-slate-400 block">Miles XP</span>
              <span className="text-cyan-400 font-bold text-sm">+{Math.round(distance * 12)} PTS</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-lime-950/50 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>SAVE GREEN MILE TRIP</span>
          </button>
        </form>

        {/* Trips History & Mileage Summary */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl glass-panel-dark border border-lime-500/20">
              <div className="text-xs font-mono-tech text-slate-400 uppercase">Total Green Miles</div>
              <div className="text-3xl font-extrabold text-white mt-1">{totalMilesKm.toFixed(1)} km</div>
            </div>

            <div className="p-5 rounded-2xl glass-panel-dark border border-emerald-500/20">
              <div className="text-xs font-mono-tech text-slate-400 uppercase">CO₂ Offsets</div>
              <div className="text-3xl font-extrabold text-lime-400 mt-1">{totalCo2Saved.toFixed(1)} kg</div>
            </div>
          </div>

          {/* Recent Trips Feed */}
          <div className="p-6 rounded-3xl glass-panel-dark border border-white/10 space-y-4">
            <h4 className="text-xs font-mono-tech text-slate-400 font-bold uppercase tracking-wider">
              Recent Activity History
            </h4>

            <div className="space-y-3">
              {trips.map((t) => (
                <div
                  key={t.id}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-lime-500/10 text-lime-400">
                      <Bike className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{t.mode} • {t.distanceKm} km</div>
                      <div className="text-[10px] text-slate-500">{t.date}</div>
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <div className="text-lime-400 font-bold">-{t.co2SavedKg} kg CO₂</div>
                    <div className="text-slate-400 text-[10px]">+{t.pointsEarned} PTS</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
