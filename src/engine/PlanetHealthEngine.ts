import { PlanetState, BioSyncStatus } from '../types';

export const INITIAL_PLANET_STATE: PlanetState = {
  healthPercentage: 10, // Matching the 10% from screenshot 1!
  bioSyncStatus: 'RECOVERING',
  totalCo2SavedTons: 26.1, // Matching 26.1T in screenshot 1!
  activeUsersCount: 13450, // Matching 13K+ in screenshot 1!
  treesEquivalentCount: 20120, // Matching 20K+ in screenshot 1!
  challengesWonCount: 560, // Matching 560+ in screenshot 1!
  userPoints: 450,
  userLevel: 2,
  autoRotate: true,
  rotationSpeed: 0.0025,
  showClouds: true,
  showAtmosphere: true,
  earthViewMode: 'satellite',
};

export function calculateBioSyncStatus(healthPercentage: number): BioSyncStatus {
  if (healthPercentage < 20) return 'CRITICAL';
  if (healthPercentage < 50) return 'RECOVERING';
  if (healthPercentage < 80) return 'STABLE';
  return 'THRIVING';
}

export function healPlanetAction(currentState: PlanetState, co2SavedKg: number, greenPoints: number): PlanetState {
  const newHealth = Math.min(100, currentState.healthPercentage + Math.max(2, (greenPoints / 50)));
  const newCo2Tons = Number((currentState.totalCo2SavedTons + co2SavedKg / 1000).toFixed(2));
  const newTrees = currentState.treesEquivalentCount + Math.floor(co2SavedKg / 15);
  const newChallenges = currentState.challengesWonCount + 1;
  const newPoints = currentState.userPoints + greenPoints;
  const newLevel = Math.floor(newPoints / 300) + 1;

  return {
    ...currentState,
    healthPercentage: newHealth,
    bioSyncStatus: calculateBioSyncStatus(newHealth),
    totalCo2SavedTons: newCo2Tons,
    treesEquivalentCount: newTrees,
    challengesWonCount: newChallenges,
    userPoints: newPoints,
    userLevel: newLevel,
  };
}
