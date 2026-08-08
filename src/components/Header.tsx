import React from 'react';
import { Leaf, Award, Globe, Users, BarChart2, Calculator, Navigation, Recycle, Wind, Sparkles } from 'lucide-react';

export type NavTab = 'hero' | 'calculator' | 'miles' | 'recycling' | 'aqi' | 'achievements' | 'ai' | 'challenges' | 'community';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onGetStartedClick: () => void;
  onOpenWrapped: () => void;
  planetHealthPercentage: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onGetStartedClick,
  onOpenWrapped,
  planetHealthPercentage
}) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#060907]/90 border-b border-white/10 py-3 px-4 sm:px-8 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('hero')}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 rounded-full bg-lime-500/20 border border-lime-500/40 flex items-center justify-center text-lime-400 group-hover:bg-lime-500 group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(132,204,22,0.2)]">
            <Leaf className="w-4 h-4 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-lime-400 transition-colors">
            EcoLife<span className="text-lime-400">+</span>
          </span>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 overflow-x-auto py-1 no-scrollbar">
          <button
            onClick={() => setActiveTab('hero')}
            className={`text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'hero' ? 'text-lime-400 font-bold border-b-2 border-lime-400 pb-1' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-lime-400" />
            <span>3D Earth</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'calculator' ? 'text-lime-400 font-bold border-b-2 border-lime-400 pb-1' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Footprint</span>
          </button>

          <button
            onClick={() => setActiveTab('miles')}
            className={`text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'miles' ? 'text-lime-400 font-bold border-b-2 border-lime-400 pb-1' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Green Miles</span>
          </button>

          <button
            onClick={() => setActiveTab('recycling')}
            className={`text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'recycling' ? 'text-lime-400 font-bold border-b-2 border-lime-400 pb-1' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Recycle className="w-3.5 h-3.5" />
            <span>Recycling</span>
          </button>

          <button
            onClick={() => setActiveTab('aqi')}
            className={`text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'aqi' ? 'text-lime-400 font-bold border-b-2 border-lime-400 pb-1' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>AQI Check</span>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'achievements' ? 'text-lime-400 font-bold border-b-2 border-lime-400 pb-1' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Badges & Squads</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'ai' ? 'text-lime-400 font-bold border-b-2 border-lime-400 pb-1' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Advisor</span>
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenWrapped}
            className="px-3 py-1.5 rounded-full bg-slate-900 border border-lime-500/40 text-lime-400 font-extrabold text-xs flex items-center gap-1.5 hover:bg-lime-950 transition-all cursor-pointer"
            title="View Monthly Eco Wrapped Report"
          >
            <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            <span className="hidden sm:inline">Eco Wrapped</span>
          </button>

          <button
            onClick={onGetStartedClick}
            className="px-4 py-2 rounded-full bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs shadow-[0_0_15px_rgba(132,204,22,0.4)] transition-all transform active:scale-95 cursor-pointer"
          >
            Get Started
          </button>
        </div>

      </div>
    </header>
  );
};
