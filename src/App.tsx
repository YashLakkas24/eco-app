/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header, NavTab } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeatureActionsSection } from './components/FeatureActionsSection';
import { CarbonCalculator } from './components/CarbonCalculator';
import { GreenMilesTracker } from './components/GreenMilesTracker';
import { RecyclingGuide } from './components/RecyclingGuide';
import { AQIChecker } from './components/AQIChecker';
import { AchievementsLeaderboard } from './components/AchievementsLeaderboard';
import { AIEcoTips } from './components/AIEcoTips';
import { ChallengesSection } from './components/ChallengesSection';
import { ImpactDashboard } from './components/ImpactDashboard';
import { CommunitySection } from './components/CommunitySection';
import { GetStartedModal } from './components/GetStartedModal';
import { EcoWrappedModal } from './components/EcoWrappedModal';
import { PlanetState, EcoChallenge } from './types';
import { INITIAL_PLANET_STATE, healPlanetAction, calculateBioSyncStatus } from './engine/PlanetHealthEngine';
import { INITIAL_CHALLENGES } from './engine/greenScoreEngine';
import confetti from 'canvas-confetti';
import { Leaf, Globe, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('hero');
  const [planetState, setPlanetState] = useState<PlanetState>(INITIAL_PLANET_STATE);
  const [challenges, setChallenges] = useState<EcoChallenge[]>(INITIAL_CHALLENGES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWrappedOpen, setIsWrappedOpen] = useState(false);

  // Quick Heal action triggered from the Earth HUD card
  const handleHealClick = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#84cc16', '#10b981', '#38bdf8']
    });

    setPlanetState(prev => healPlanetAction(prev, 15, 100));
  };

  // Reset planet simulation
  const handleResetClick = () => {
    setPlanetState(INITIAL_PLANET_STATE);
    setChallenges(INITIAL_CHALLENGES);
  };

  // Complete a challenge item
  const handleCompleteChallenge = (id: string) => {
    let completedItem: EcoChallenge | undefined;

    setChallenges(prev =>
      prev.map(c => {
        if (c.id === id) {
          completedItem = c;
          return { ...c, completed: true };
        }
        return c;
      })
    );

    if (completedItem) {
      setPlanetState(prev => healPlanetAction(prev, completedItem!.co2SavedKg, completedItem!.greenPoints));
    }
  };

  // Manual Health Slider Update
  const handleUpdateHealth = (newHealth: number) => {
    setPlanetState(prev => ({
      ...prev,
      healthPercentage: newHealth,
      bioSyncStatus: calculateBioSyncStatus(newHealth)
    }));
  };

  // Log quick custom action
  const handleLogQuickAction = (title: string, co2Kg: number, pts: number) => {
    setPlanetState(prev => healPlanetAction(prev, co2Kg, pts));
  };

  return (
    <div className="min-h-screen bg-[#060907] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onGetStartedClick={() => setIsModalOpen(true)}
        onOpenWrapped={() => setIsWrappedOpen(true)}
        planetHealthPercentage={planetState.healthPercentage}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'hero' && (
          <>
            <HeroSection
              planetState={planetState}
              onHealClick={handleHealClick}
              onResetClick={handleResetClick}
              onStartJourneyClick={() => setActiveTab('challenges')}
              onExploreFeaturesClick={() => setActiveTab('calculator')}
            />

            {/* Direct Feature Action Cards directly below Hero */}
            <FeatureActionsSection
              onLogAction={handleLogQuickAction}
            />

            {/* Sub-sections on home page */}
            <div className="border-t border-white/5 bg-[#080d0a]">
              <CarbonCalculator
                onAddOffset={(co2, pts) => setPlanetState(prev => healPlanetAction(prev, co2, pts))}
              />
            </div>

            <div className="border-t border-white/5 bg-[#060907]">
              <AQIChecker />
            </div>

            <div className="border-t border-white/5 bg-[#080d0a]">
              <ChallengesSection
                challenges={challenges}
                onCompleteChallenge={handleCompleteChallenge}
                userPoints={planetState.userPoints}
              />
            </div>
          </>
        )}

        {activeTab === 'calculator' && (
          <CarbonCalculator
            onAddOffset={(co2, pts) => setPlanetState(prev => healPlanetAction(prev, co2, pts))}
          />
        )}

        {activeTab === 'miles' && (
          <GreenMilesTracker
            onAddMilesImpact={(co2, pts) => setPlanetState(prev => healPlanetAction(prev, co2, pts))}
          />
        )}

        {activeTab === 'recycling' && (
          <RecyclingGuide />
        )}

        {activeTab === 'aqi' && (
          <AQIChecker />
        )}

        {activeTab === 'achievements' && (
          <AchievementsLeaderboard />
        )}

        {activeTab === 'ai' && (
          <AIEcoTips />
        )}

        {activeTab === 'challenges' && (
          <ChallengesSection
            challenges={challenges}
            onCompleteChallenge={handleCompleteChallenge}
            userPoints={planetState.userPoints}
          />
        )}

        {activeTab === 'community' && (
          <CommunitySection />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#040605] py-8 px-4 sm:px-8 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-lime-500/20 flex items-center justify-center text-lime-400">
              <Leaf className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-bold text-white text-sm">EcoLife+</span>
            <span className="text-slate-500">• PixxelHack 2.0 Edition</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('hero')}
              className="hover:text-lime-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" /> 3D Globe
            </button>
            <button
              onClick={() => setIsWrappedOpen(true)}
              className="hover:text-lime-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" /> Eco Wrapped
            </button>
          </div>

          <div className="flex items-center gap-1 text-slate-500">
            <span>Powered by Krashh Coders & Google AI Studio</span>
          </div>
        </div>
      </footer>

      {/* Control Center Modal */}
      <GetStartedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        planetState={planetState}
        onUpdateHealth={handleUpdateHealth}
        onLogQuickAction={handleLogQuickAction}
      />

      {/* Eco Wrapped Summary Modal */}
      <EcoWrappedModal
        isOpen={isWrappedOpen}
        onClose={() => setIsWrappedOpen(false)}
        planetState={planetState}
      />

    </div>
  );
}
