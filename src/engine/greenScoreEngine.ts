import { EcoChallenge } from '../types';

export const INITIAL_CHALLENGES: EcoChallenge[] = [
  {
    id: 'ch-1',
    title: 'Zero Single-Use Plastic Day',
    description: 'Avoid single-use water bottles, straws, and shopping bags for 24 hours.',
    category: 'waste',
    co2SavedKg: 2.5,
    greenPoints: 50,
    difficulty: 'Easy',
    completed: false,
    streakDays: 3,
    iconName: 'Recycle'
  },
  {
    id: 'ch-2',
    title: 'Green Commute (Bike / Walk)',
    description: 'Replace an engine vehicle ride with walking, cycling, or public transport.',
    category: 'transport',
    co2SavedKg: 8.2,
    greenPoints: 120,
    difficulty: 'Medium',
    completed: false,
    streakDays: 5,
    iconName: 'Bike'
  },
  {
    id: 'ch-3',
    title: 'Plant a Native Sapling',
    description: 'Plant or adopt a local plant or tree in your community or balcony garden.',
    category: 'nature',
    co2SavedKg: 22.0,
    greenPoints: 250,
    difficulty: 'Hard',
    completed: false,
    iconName: 'Trees'
  },
  {
    id: 'ch-4',
    title: 'Plant-Based Power Meal',
    description: 'Choose a 100% plant-based meal today to reduce agricultural emissions.',
    category: 'food',
    co2SavedKg: 4.1,
    greenPoints: 80,
    difficulty: 'Easy',
    completed: false,
    streakDays: 2,
    iconName: 'Utensils'
  },
  {
    id: 'ch-5',
    title: 'Solar & Unplugged Energy Saver',
    description: 'Unplug idle electronics and use daylight to cut household power usage by 15%.',
    category: 'energy',
    co2SavedKg: 6.5,
    greenPoints: 100,
    difficulty: 'Medium',
    completed: false,
    iconName: 'Sun'
  }
];

export function calculateImpactEquivalent(co2SavedTons: number) {
  return {
    milesNotDriven: Math.round(co2SavedTons * 2480),
    smartphonesCharged: Math.round(co2SavedTons * 121000),
    treesPlantedEquivalent: Math.round(co2SavedTons * 48),
  };
}
