export const gameConfig = {
  // Stat decay rate per minute (real-time)
  decayPerMinute: {
    hunger: 1.5,
    cleanliness: 1.0,
    happiness: 1.2,
    energy: 0.8,
  },
  // Stat boost per action
  actionBoost: {
    feed: { hunger: 25, cleanliness: -5, happiness: 5, energy: 5 },
    bathe: { hunger: -5, cleanliness: 30, happiness: -5, energy: -10 },
    play: { hunger: -10, cleanliness: -10, happiness: 30, energy: -15 },
    playLeft: { hunger: -10, cleanliness: -10, happiness: 30, energy: -15 },
    playRight: { hunger: -10, cleanliness: -10, happiness: 30, energy: -15 },
    sleep: { hunger: -5, cleanliness: 0, happiness: 5, energy: 35 },
  },
  // Max stat value
  maxStat: 100,
  // Starting stats
  startingStats: {
    hunger: 80,
    cleanliness: 80,
    happiness: 80,
    energy: 80,
  },
  // Background animation FPS
  backgroundFps: 2,
  // Death threshold: pet dies if ANY stat reaches 0
  deathThreshold: 0,
  // Evolution thresholds (total care actions performed)
  evolution: {
    teen: 50,
    adult: 150,
  },
};
