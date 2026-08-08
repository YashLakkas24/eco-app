import React, { useState } from 'react';
import { RecyclingItem } from '../types';
import { Search, Recycle, CheckCircle2, AlertTriangle, Lightbulb, Trash2, ShieldAlert } from 'lucide-react';

const RECYCLING_DATA: RecyclingItem[] = [
  {
    id: 'rec-1',
    materialName: 'PET Plastic Water & Soda Bottles',
    category: 'Plastic',
    recycleCode: '#1 PETE',
    canRecycle: true,
    preparationSteps: [
      'Empty liquids completely and rinse thoroughly',
      'Remove cap if different material (or screw tight if local facility accepts)',
      'Do not crush bottle if optical sorting is used in your city'
    ],
    ecoTip: 'PET is widely recyclable into fleece jackets and new food containers.'
  },
  {
    id: 'rec-2',
    materialName: 'HDPE Milk Jugs & Detergent Containers',
    category: 'Plastic',
    recycleCode: '#2 HDPE',
    canRecycle: true,
    preparationSteps: [
      'Rinse out soap or milk residue',
      'Keep pumps separated if metal spring is inside'
    ],
    ecoTip: 'HDPE plastics are durable and turned into plastic lumber and park benches.'
  },
  {
    id: 'rec-3',
    materialName: 'E-Waste: Old Smartphones & Laptop Batteries',
    category: 'E-Waste',
    canRecycle: true,
    preparationSteps: [
      'Factory reset device and wipe personal data',
      'Tape lithium battery terminals with electrical tape',
      'Drop off at certified e-waste collection bin (Never throw in household garbage)'
    ],
    ecoTip: 'Recovering gold and cobalt from e-waste reduces mining pollution by up to 90%.'
  },
  {
    id: 'rec-4',
    materialName: 'Styrofoam & Polystyrene Cups',
    category: 'Plastic',
    recycleCode: '#6 PS',
    canRecycle: false,
    preparationSteps: [
      'Avoid curbside recycling bins (causes sorting clogging)',
      'Look for specialized EPS drop-off locations or avoid single-use foam'
    ],
    ecoTip: 'Polystyrene takes over 500 years to break down and contaminates marine life.'
  },
  {
    id: 'rec-5',
    materialName: 'Cardboard & Shipping Boxes',
    category: 'Paper/Cardboard',
    canRecycle: true,
    preparationSteps: [
      'Remove plastic packing tape and bubble wrap',
      'Flatten boxes completely to save bin space',
      'Keep dry — wet cardboard cannot be processed'
    ],
    ecoTip: 'Recycling 1 ton of cardboard saves 17 trees and 7,000 gallons of water.'
  },
  {
    id: 'rec-6',
    materialName: 'Glass Food Jars & Bottles',
    category: 'Glass',
    canRecycle: true,
    preparationSteps: [
      'Rinse clean of food oils and sauces',
      'Metal caps can be recycled separately in metal bin'
    ],
    ecoTip: 'Glass can be recycled infinitely without loss in quality or purity.'
  }
];

export const RecyclingGuide: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filtered = RECYCLING_DATA.filter(item => {
    const matchesSearch = item.materialName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.ecoTip.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/80 border border-lime-500/30 text-lime-400 font-mono-tech text-xs uppercase mb-3">
          <Recycle className="w-3.5 h-3.5" />
          <span>Circular Economy Assistant</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Smart Recycling Guide
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Learn how to recycle right, prevent contamination, and properly handle e-waste and plastics.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search material (e.g. plastic bottle, battery, glass)..."
            className="w-full bg-slate-900 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {['All', 'Plastic', 'E-Waste', 'Paper/Cardboard', 'Glass'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-lime-400 text-black shadow-md'
                  : 'bg-slate-900/60 text-slate-400 border border-white/5 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Material Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl glass-panel-dark border border-white/10 flex flex-col justify-between space-y-4 hover:border-lime-500/30 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono-tech uppercase text-slate-400 font-bold">
                  {item.category} {item.recycleCode ? `• ${item.recycleCode}` : ''}
                </span>

                {item.canRecycle ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> RECYCLABLE
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-rose-950 text-rose-400 border border-rose-500/30 text-[10px] font-bold flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" /> SPECIAL DISPOSAL
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white mb-3">{item.materialName}</h3>

              <div className="space-y-2 mb-4">
                <span className="text-xs font-mono-tech text-lime-400 font-bold uppercase block">
                  Disposal Steps:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {item.preparationSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-lime-400 font-bold">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/5 text-xs text-slate-300 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{item.ecoTip}</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
