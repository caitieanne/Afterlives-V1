import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, AppStateStatus } from 'react-native';
import { gameConfig } from '@/constants/config';
import { PetSpecies, PetStage, PetStats, ActionType } from '@/services/petData';

interface GameState {
  petId: PetSpecies | null;
  petName: string | null;
  stats: PetStats;
  isAlive: boolean;
  lastUpdated: number; // timestamp
  createdAt: number;
  totalActions: number;
  stage: PetStage;
}

function getStage(totalActions: number): PetStage {
  if (totalActions >= gameConfig.evolution.adult) return 'adult';
  if (totalActions >= gameConfig.evolution.teen) return 'teen';
  return 'baby';
}

interface GameContextType {
  gameState: GameState | null;
  isLoading: boolean;
  selectPet: (id: PetSpecies) => void;
  namePet: (name: string) => void;
  performAction: (action: ActionType) => void;
  resetGame: () => void;
}

const defaultState: GameState = {
  petId: null,
  petName: null,
  stats: { ...gameConfig.startingStats },
  isAlive: true,
  lastUpdated: Date.now(),
  createdAt: Date.now(),
  totalActions: 0,
  stage: 'baby',
};

const STORAGE_KEY = 'cryptidpets_game';

const GameContext = createContext<GameContextType>({
  gameState: null,
  isLoading: true,
  selectPet: () => {},
  namePet: () => {},
  performAction: () => {},
  resetGame: () => {},
});

export const useGame = () => useContext(GameContext);

function applyDecay(stats: PetStats, elapsedMinutes: number): PetStats {
  const decay = gameConfig.decayPerMinute;
  return {
    hunger: Math.max(0, stats.hunger - decay.hunger * elapsedMinutes),
    cleanliness: Math.max(0, stats.cleanliness - decay.cleanliness * elapsedMinutes),
    happiness: Math.max(0, stats.happiness - decay.happiness * elapsedMinutes),
    energy: Math.max(0, stats.energy - decay.energy * elapsedMinutes),
  };
}

function checkAlive(stats: PetStats): boolean {
  return (
    stats.hunger > gameConfig.deathThreshold &&
    stats.cleanliness > gameConfig.deathThreshold &&
    stats.happiness > gameConfig.deathThreshold &&
    stats.energy > gameConfig.deathThreshold
  );
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load saved state
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed: GameState = JSON.parse(saved);
          if (parsed.petId && parsed.isAlive) {
            const now = Date.now();
            const elapsedMinutes = (now - parsed.lastUpdated) / 60000;
            const newStats = applyDecay(parsed.stats, elapsedMinutes);
            const alive = checkAlive(newStats);
            setGameState({
              ...parsed,
              stats: newStats,
              isAlive: alive,
              lastUpdated: now,
            });
          } else {
            setGameState(parsed);
          }
        }
      } catch (e) {
        console.log('Failed to load game state');
      }
      setIsLoading(false);
    })();
  }, []);

  // Save state whenever it changes
  useEffect(() => {
    if (gameState) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    }
  }, [gameState]);

  // Real-time decay tick (every 10 seconds)
  useEffect(() => {
    if (gameState?.petId && gameState.isAlive) {
      intervalRef.current = setInterval(() => {
        setGameState(prev => {
          if (!prev || !prev.isAlive) return prev;
          const now = Date.now();
          const elapsedMinutes = (now - prev.lastUpdated) / 60000;
          const newStats = applyDecay(prev.stats, elapsedMinutes);
          const alive = checkAlive(newStats);
          return {
            ...prev,
            stats: newStats,
            isAlive: alive,
            lastUpdated: now,
          };
        });
      }, 10000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [gameState?.petId, gameState?.isAlive]);

  // Handle app state changes (background/foreground)
  useEffect(() => {
    const handleAppState = (nextState: AppStateStatus) => {
      if (nextState === 'active' && gameState?.petId && gameState.isAlive) {
        setGameState(prev => {
          if (!prev || !prev.isAlive) return prev;
          const now = Date.now();
          const elapsedMinutes = (now - prev.lastUpdated) / 60000;
          const newStats = applyDecay(prev.stats, elapsedMinutes);
          const alive = checkAlive(newStats);
          return {
            ...prev,
            stats: newStats,
            isAlive: alive,
            lastUpdated: now,
          };
        });
      }
    };

    const sub = AppState.addEventListener('change', handleAppState);
    return () => sub.remove();
  }, [gameState?.petId, gameState?.isAlive]);

  const selectPet = useCallback((id: PetSpecies) => {
    const now = Date.now();
    setGameState({
      petId: id,
      petName: null,
      stats: { ...gameConfig.startingStats },
      isAlive: true,
      lastUpdated: now,
      createdAt: now,
      totalActions: 0,
      stage: 'baby',
    });
  }, []);

  const namePet = useCallback((name: string) => {
    setGameState(prev => {
      if (!prev) return prev;
      return { ...prev, petName: name };
    });
  }, []);

  const performAction = useCallback((action: ActionType) => {
    setGameState(prev => {
      if (!prev || !prev.isAlive) return prev;
      const boost = gameConfig.actionBoost[action];
      const newStats: PetStats = {
        hunger: Math.min(gameConfig.maxStat, Math.max(0, prev.stats.hunger + boost.hunger)),
        cleanliness: Math.min(gameConfig.maxStat, Math.max(0, prev.stats.cleanliness + boost.cleanliness)),
        happiness: Math.min(gameConfig.maxStat, Math.max(0, prev.stats.happiness + boost.happiness)),
        energy: Math.min(gameConfig.maxStat, Math.max(0, prev.stats.energy + boost.energy)),
      };
      const alive = checkAlive(newStats);
      const newTotal = (prev.totalActions || 0) + 1;
      const newStage = getStage(newTotal);
      return {
        ...prev,
        stats: newStats,
        isAlive: alive,
        lastUpdated: Date.now(),
        totalActions: newTotal,
        stage: newStage,
      };
    });
  }, []);

  const resetGame = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setGameState(null);
  }, []);

  return (
    <GameContext.Provider value={{ gameState, isLoading, selectPet, namePet, performAction, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}
