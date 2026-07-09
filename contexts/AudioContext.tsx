import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { audioService } from '@/services/audioService';
import { ActionType } from '@/services/petData';

interface AudioContextType {
  isMuted: boolean;
  isMusicPlaying: boolean;
  toggleMute: () => Promise<void>;
  playActionSound: (action: ActionType) => Promise<void>;
  playWarning: () => Promise<void>;
  playDeath: () => Promise<void>;
  playEvolve: () => Promise<void>;
  playSelect: () => Promise<void>;
  playCoinInsert: () => Promise<void>;
  playBootUp: () => Promise<void>;
  startMusic: () => Promise<void>;
  stopMusic: () => Promise<void>;
}

const AudioContext = createContext<AudioContextType>({
  isMuted: false,
  isMusicPlaying: false,
  toggleMute: async () => {},
  playActionSound: async () => {},
  playWarning: async () => {},
  playDeath: async () => {},
  playEvolve: async () => {},
  playSelect: async () => {},
  playCoinInsert: async () => {},
  playBootUp: async () => {},
  startMusic: async () => {},
  stopMusic: async () => {},
});

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Initialize audio on mount
  useEffect(() => {
    audioService.preloadAll();
    return () => {
      audioService.cleanup();
    };
  }, []);

  // Handle app going to background/foreground
  useEffect(() => {
    const handleAppState = (nextState: AppStateStatus) => {
      if (nextState === 'active' && !isMuted) {
        audioService.resumeBgMusic().then(() => {
          setIsMusicPlaying(audioService.isMusicPlaying);
        });
      } else if (nextState === 'background' || nextState === 'inactive') {
        audioService.pauseBgMusic().then(() => {
          setIsMusicPlaying(false);
        });
      }
    };
    const sub = AppState.addEventListener('change', handleAppState);
    return () => sub.remove();
  }, [isMuted]);

  const toggleMute = useCallback(async () => {
    const muted = await audioService.toggleMute();
    setIsMuted(muted);
    setIsMusicPlaying(audioService.isMusicPlaying);
  }, []);

  const playActionSound = useCallback(async (action: ActionType) => {
    await audioService.playActionSound(action);
  }, []);

  const playWarning = useCallback(async () => {
    await audioService.playWarning();
  }, []);

  const playDeath = useCallback(async () => {
    await audioService.playDeath();
  }, []);

  const playEvolve = useCallback(async () => {
    await audioService.playEvolve();
  }, []);

  const playSelect = useCallback(async () => {
    await audioService.playSelect();
  }, []);

  const playCoinInsert = useCallback(async () => {
    await audioService.playCoinInsert();
  }, []);

  const playBootUp = useCallback(async () => {
    await audioService.playBootUp();
  }, []);

  const startMusic = useCallback(async () => {
    await audioService.startBgMusic();
    setIsMusicPlaying(true);
  }, []);

  const stopMusic = useCallback(async () => {
    await audioService.stopBgMusic();
    setIsMusicPlaying(false);
  }, []);

  return (
    <AudioContext.Provider value={{
      isMuted,
      isMusicPlaying,
      toggleMute,
      playActionSound,
      playWarning,
      playDeath,
      playEvolve,
      playSelect,
      playCoinInsert,
      playBootUp,
      startMusic,
      stopMusic,
    }}>
      {children}
    </AudioContext.Provider>
  );
}
