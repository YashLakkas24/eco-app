import React, { useState } from 'react';
import { Calculator, Car, Zap, Utensils, Plane, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CarbonCalculatorProps {
  onAddOffset: (co2SavedKg: number, greenPoints: number) => void;
}

export const CarbonCalculator: React.FC<CarbonCalculatorProps> = ({ onAddOffset }) => {
  // Inputs
  const [commuteKm, setCommuteKm] = useState<number>(20);
  const [commuteType, setCommuteType] = useState<'gas' | 'hybrid' | 'electric' | 'transit'>('gas');
  const [dietType, setDietType] = useState<'meat' | 'pescatarian' | 'vegetarian' | 'vegan'>('meat');
  const [electricityKwh, setElectricityKwh] = useState<number>(250);
  const [flightsPerYear, setFlightsPerYear] = useState<number>(2);

  // Calculations (in Tons CO2 / year)
  const calculateTotal = () => {
    // Transport factor
    const transportFactors = { gas: 0.21, hybrid: 0.12, electric: 0.05, transit: 0.04 };
    const transportVal = (commuteKm * 365 * transportFactors[commuteType]) / 1000;

    // Diet factor
    const dietFactors = { meat: 2.5, pescatarian: 1.7, vegetarian: 1.4, vegan: 1.0 };
    const dietVal = dietFactors[dietType];

    // Energy factor
    const energyVal = (electricityKwh * 12 * 0.4) / 1000;

    // Flight factor
    const flightVal = flightsPerYear * 0.6;

    const total = transportVal + dietVal + energyVal + flightVal;
    return Number(total.toFixed(2));
  };

  const totalTons = calculateTotal();
  const globalAverage = 4.8;
  const ParisTarget = 2.0;

  const handleCommitPledge = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#84cc16', '#10b981', '#38bdf8']
    });

    // Pledging a 15% reduction -> 500 kg CO2 saved
    onAddOffset(500, 300);
  };

  return (
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Title Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/80 border border-lime-500/30 text-lime-400 font-mono-tech text-xs uppercase mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>Footprint Analytics</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Carbon Footprint Estimator
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Calculate your annual carbon emissions across transport, diet, household power, and air travel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Form Column */}
        <div className="lg:col-span-7 space-y-6 p-6 sm:p-8 rounded-3xl glass-panel-dark border border-white/10">
          
          {/* Transport Input */}
          <div className="space-y-3">
            <label className="flex items-center justify-between text-xs font-mono-tech text-slate-300 font-bold uppercase">
              <span className="flex items-center gap-2 text-lime-400">
                <Car className="w-4 h-4" /> Daily Commute Distance
              </span>
              <span>{commuteKm} km / day</span>
            </label>

            <input
              type="range"
              min="0"
              max="150"
              value={commuteKm}
              onChange={(e) => setCommuteKm(Number(e.target.value))}
              className="w-full accent-lime-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {[
                { id: 'gas', label: 'Gasoline Car' },
                { id: 'hybrid', label: 'Hybrid' },
                { id: 'electric', label: 'EV Electric' },
                { id: 'transit', label: 'Public Transit' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCommuteType(item.id as any)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    commuteType === item.id
                      ? 'bg-lime-400 text-black border-lime-400 shadow-md'
                      : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Household Electricity Input */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <label className="flex items-center justify-between text-xs font-mono-tech text-slate-300 font-bold uppercase">
              <span className="flex items-center gap-2 text-cyan-400">
                <Zap className="w-4 h-4" /> Monthly Household Electricity
              </span>
              <span>{electricityKwh} kWh / mo</span>
            </label>

            <input
              type="range"
              min="50"
              max="1000"
              step="10"
              value={electricityKwh}
              onChange={(e) => setElectricityKwh(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Diet Type Input */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <label className="block text-xs font-mono-tech text-slate-300 font-bold uppercase mb-2">
              <span className="flex items-center gap-2 text-amber-400">
                <Utensils className="w-4 h-4" /> Primary Diet Style
              </span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'meat', label: 'Regular Meat' },
                { id: 'pescatarian', label: 'Pescatarian' },
                { id: 'vegetarian', label: 'Vegetarian' },
                { id: 'vegan', label: 'Plant-based Vegan' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDietType(item.id as any)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    dietType === item.id
                      ? 'bg-amber-400 text-black border-amber-400 shadow-md'
                      : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Flights Input */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <label className="flex items-center justify-between text-xs font-mono-tech text-slate-300 font-bold uppercase">
              <span className="flex items-center gap-2 text-sky-400">
                <Plane className="w-4 h-4" /> Annual Roundtrip Flights
              </span>
              <span>{flightsPerYear} flights</span>
            </label>

            <input
              type="range"
              min="0"
              max="20"
              value={flightsPerYear}
              onChange={(e) => setFlightsPerYear(Number(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
          </div>

        </div>

        {/* Footprint Results Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl glass-panel-dark border border-lime-500/30 text-center relative overflow-hidden">
            <div className="text-xs font-mono-tech text-slate-400 uppercase tracking-widest font-bold">
              YOUR ANNUAL FOOTPRINT
            </div>
            
            <div className="text-5xl font-black text-white mt-3 flex items-baseline justify-center gap-2">
              {totalTons} <span className="text-xl text-lime-400 font-bold">Tons CO₂</span>
            </div>

            <p className="text-slate-300 text-xs mt-3">
              {totalTons <= ParisTarget ? (
                <span className="text-emerald-400 font-bold">🎉 Outstanding! You meet the Paris 2030 Climate Goal.</span>
              ) : (
                <span>Global average is <strong className="text-white">4.8 Tons</strong>. Paris goal is <strong className="text-lime-400">2.0 Tons</strong>.</span>
              )}
            </p>

            {/* Visual Bar Comparison */}
            <div className="mt-6 space-y-3 text-left text-xs font-mono-tech">
              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Your Estimate</span>
                  <span className="text-lime-400 font-bold">{totalTons} T</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className="h-full bg-lime-400 rounded-full"
                    style={{ width: `${Math.min(100, (totalTons / 10) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Global Average</span>
                  <span className="text-amber-400 font-bold">{globalAverage} T</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${(globalAverage / 10) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Paris Target</span>
                  <span className="text-emerald-400 font-bold">{ParisTarget} T</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full"
                    style={{ width: `${(ParisTarget / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Reduction Pledge Action */}
            <button
              onClick={handleCommitPledge}
              className="mt-8 w-full py-3.5 px-5 rounded-2xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-lime-950/50 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>PLEDGE 15% REDUCTION (+300 PTS)</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
