export type BioSyncStatus = 'CRITICAL' | 'RECOVERING' | 'STABLE' | 'THRIVING';
export type EarthViewMode = 'satellite' | 'night' | 'health' | 'aqi';
export type DayNightMode = 'realtime' | 'cycle' | 'manual';

export interface EcoChallenge {
  id: string;
  title: string;
  description: string;
  category: 'energy' | 'waste' | 'transport' | 'nature' | 'food';
  co2SavedKg: number;
  greenPoints: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
  streakDays?: number;
  iconName: string;
  isBounty?: boolean; // Dynamic Eco-Bounty flag from PixxelHack presentation
  bountyMultiplier?: number;
}

export interface CommunityPost {
  id: string;
  userName: string;
  userAvatar: string;
  actionTitle: string;
  co2Impact: string;
  timeAgo: string;
  likes: number;
  hasLiked?: boolean;
  location: string;
}

export interface PlanetState {
  healthPercentage: number; // 0 to 100
  bioSyncStatus: BioSyncStatus;
  totalCo2SavedTons: number;
  activeUsersCount: number;
  treesEquivalentCount: number;
  challengesWonCount: number;
  userPoints: number;
  userLevel: number;
  autoRotate: boolean;
  rotationSpeed: number;
  showClouds: boolean;
  showAtmosphere: boolean;
  earthViewMode: EarthViewMode;
}

export interface EarthMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'project' | 'cleanup' | 'forest' | 'solar';
  co2ImpactKg: number;
  activeUsers: number;
  description: string;
}

export interface AQICityData {
  city: string;
  country: string;
  aqi: number;
  status: 'Good' | 'Moderate' | 'Unhealthy for Sensitive' | 'Unhealthy' | 'Very Unhealthy';
  pm25: number;
  pm10: number;
  recommendation: string;
  color: string;
}

export interface RecyclingItem {
  id: string;
  materialName: string;
  category: 'Plastic' | 'E-Waste' | 'Paper/Cardboard' | 'Glass' | 'Metal' | 'Organic';
  recycleCode?: string;
  canRecycle: boolean;
  preparationSteps: string[];
  ecoTip: string;
}

export interface GreenMileTrip {
  id: string;
  date: string;
  mode: 'Walk' | 'Bicycle' | 'E-Scooter' | 'Public Transit' | 'Electric Car';
  distanceKm: number;
  co2SavedKg: number;
  pointsEarned: number;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number; // 0 to 100
  category: string;
}

export interface CommunitySquad {
  id: string;
  name: string;
  membersCount: number;
  totalCo2Tons: number;
  location: string;
  motto: string;
  joined?: boolean;
}
