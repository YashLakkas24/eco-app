import React, { useState } from 'react';
import { AQICityData } from '../types';
import { Wind, MapPin, AlertCircle, ShieldCheck, Sparkles, Activity } from 'lucide-react';

const CITIES_AQI: AQICityData[] = [
  {
    city: 'New Delhi',
    country: 'India',
    aqi: 182,
    status: 'Unhealthy',
    pm25: 112.5,
    pm10: 198.0,
    recommendation: 'Use N95 masks outdoors and activate indoor air filtration. Plant houseplants like Snake Plant.',
    color: 'text-rose-400 border-rose-500/40 bg-rose-950/20'
  },
  {
    city: 'Mumbai',
    country: 'India',
    aqi: 118,
    status: 'Unhealthy for Sensitive',
    pm25: 42.1,
    pm10: 89.2,
    recommendation: 'Sensitive groups should reduce prolonged outdoor exercise during peak morning traffic hours.',
    color: 'text-amber-400 border-amber-500/40 bg-amber-950/20'
  },
  {
    city: 'London',
    country: 'United Kingdom',
    aqi: 38,
    status: 'Good',
    pm25: 9.2,
    pm10: 18.0,
    recommendation: 'Air quality is satisfactory. Perfect weather for walking or bicycle commuting.',
    color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20'
  },
  {
    city: 'Sydney',
    country: 'Australia',
    aqi: 24,
    status: 'Good',
    pm25: 5.8,
    pm10: 12.1,
    recommendation: 'Pristine ocean breeze air quality. Ideal for outdoor athletics and community tree planting.',
    color: 'text-lime-400 border-lime-500/40 bg-lime-950/20'
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    aqi: 45,
    status: 'Good',
    pm25: 11.0,
    pm10: 22.4,
    recommendation: 'Clean air levels across metropolitan Tokyo. Enjoy urban parks and green spaces.',
    color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/20'
  },
  {
    city: 'New York',
    country: 'United States',
    aqi: 52,
    status: 'Moderate',
    pm25: 13.5,
    pm10: 28.0,
    recommendation: 'Acceptable air quality. Unusually sensitive people should consider limiting heavy outdoor exertion.',
    color: 'text-yellow-400 border-yellow-500/40 bg-yellow-950/20'
  }
];

export const AQIChecker: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<AQICityData>(CITIES_AQI[0]);

  return (
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/80 border border-lime-500/30 text-lime-400 font-mono-tech text-xs uppercase mb-3">
          <Wind className="w-3.5 h-3.5" />
          <span>AQICN Environmental Monitor</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Local Air Quality Index (AQI)
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Real-time PM2.5 & PM10 monitoring with tailored eco and health recommendations for major global cities.
        </p>
      </div>

      {/* City Selector Buttons */}
      <div className="flex flex-wrap gap-2">
        {CITIES_AQI.map((item) => (
          <button
            key={item.city}
            onClick={() => setSelectedCity(item)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              selectedCity.city === item.city
                ? 'bg-lime-400 text-black shadow-lg shadow-lime-950/50'
                : 'bg-slate-900 border border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{item.city}, {item.country}</span>
          </button>
        ))}
      </div>

      {/* AQI Detailed Monitor Card */}
      <div className={`p-8 rounded-3xl glass-panel-dark border ${selectedCity.color} space-y-6 relative overflow-hidden`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tech uppercase text-slate-400 font-bold mb-1">
              <Activity className="w-4 h-4 text-lime-400" /> Live Station Feed
            </div>
            <h3 className="text-2xl font-black text-white">{selectedCity.city}, {selectedCity.country}</h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-5xl font-black text-white tracking-tight">{selectedCity.aqi}</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mt-1">
                AQI INDEX ({selectedCity.status})
              </div>
            </div>
          </div>

        </div>

        {/* Pollutants Breakdown Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase block">PM2.5 Concentration</span>
            <span className="text-lg font-extrabold text-white">{selectedCity.pm25} µg/m³</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase block">PM10 Coarse Particles</span>
            <span className="text-lg font-extrabold text-white">{selectedCity.pm10} µg/m³</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase block">Health Risk Level</span>
            <span className="text-sm font-extrabold text-lime-400">{selectedCity.status}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
            <span className="text-[10px] font-mono-tech text-slate-400 uppercase block">Main Pollutant</span>
            <span className="text-sm font-extrabold text-white">PM2.5 (Fine Dust)</span>
          </div>
        </div>

        {/* Tailored Eco & Health Action */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 text-xs text-slate-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-lime-400 block mb-0.5">LOCAL ECO RECOMMENDATION:</span>
            <span>{selectedCity.recommendation}</span>
          </div>
        </div>

      </div>

    </section>
  );
};
