import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { PetSpecies, PetStage, ActionType, getPetById } from '@/services/petData';

interface PetSpriteProps {
  species: PetSpecies;
  size?: number;
  mood?: 'happy' | 'neutral' | 'sad' | 'hungry' | 'sick' | 'tired' | 'excited' | 'dead';
  action?: ActionType | null;
  stage?: PetStage;
}

const petEmojis: Record<PetSpecies, { body: string; face: Record<string, string> }> = {
  ghost: {
    body: '👻',
    face: { happy: '(◕‿◕)', neutral: '(◕_◕)', sad: '(◕︵◕)', dead: '(✕_✕)' },
  },
  sasquatch: {
    body: '🦶',
    face: { happy: '(ᵔᴥᵔ)', neutral: '(•ᴥ•)', sad: '(•︵•)', dead: '(✕_✕)' },
  },
  swampMonster: {
    body: '🐸',
    face: { happy: '(◉‿◉)', neutral: '(◉_◉)', sad: '(◉︵◉)', dead: '(✕_✕)' },
  },
  chupacabra: {
    body: '🐺',
    face: { happy: '(ↀᴥↀ)', neutral: '(ↀ_ↀ)', sad: '(ↀ︵ↀ)', dead: '(✕_✕)' },
  },
  mothman: {
    body: '🦇',
    face: { happy: '(◕ω◕)', neutral: '(◕_◕)', sad: '(◕︵◕)', dead: '(✕_✕)' },
  },
};

export function PetSprite({ species, size = 120, mood = 'neutral', action = null, stage = 'baby' }: PetSpriteProps) {
  const pet = getPetById(species);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Resolve stage-specific sprites, falling back to base (baby) sprites
  const stageData = pet?.stageSprites?.[stage];

  // Resolve the active sprite set
  const resolvedSprite = useMemo(() => {
    // Action sprite resolution
    const resolveAction = (a: ActionType | null) => {
      if (!a) return null;
      // Direct lookup
      const fromStage = stageData?.actionSprites?.[a];
      if (fromStage) return fromStage;
      const fromBase = pet?.actionSprites?.[a];
      if (fromBase) return fromBase;
      // Fall back: playLeft/playRight -> play
      if (a === 'playLeft' || a === 'playRight') {
        return stageData?.actionSprites?.['play'] ?? pet?.actionSprites?.['play'] ?? null;
      }
      return null;
    };
    const actionSpriteSet = resolveAction(action);
    const moodSpriteSet =
      stageData?.sprites?.[mood] ?? stageData?.sprites?.['neutral'] ??
      pet?.sprites?.[mood] ?? pet?.sprites?.['neutral'] ?? null;
    return actionSpriteSet ?? moodSpriteSet;
  }, [species, mood, action, stage, pet, stageData]);

  const frames = resolvedSprite?.idle ?? [];
  const fps = resolvedSprite?.fps ?? 3;
  const loop = resolvedSprite?.loop !== false;

  // Create a stable identity key for the current frame set
  const frameKey = frames.length > 0 ? frames[0] : '';

  // Reset frame index when the sprite set changes
  useEffect(() => {
    setCurrentFrame(0);
  }, [frameKey]);

  // Animation interval — restart whenever the frame set identity changes
  useEffect(() => {
    if (frames.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentFrame(prev => {
        const next = prev + 1;
        if (next >= frames.length && !loop) {
          clearInterval(interval);
          return frames.length - 1;
        }
        return next % frames.length;
      });
    }, 1000 / fps);
    return () => clearInterval(interval);
  }, [frameKey, frames.length, fps, loop]);

  // Clamp frame index to valid range
  const safeFrame = Math.min(currentFrame, Math.max(0, frames.length - 1));

  // If we have sprite frames, render single active image
  if (frames.length > 0) {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <Image
          key={frames[safeFrame]}
          source={{ uri: frames[safeFrame] }}
          style={[styles.spriteImage, { width: size, height: size }]}
          contentFit="contain"
          cachePolicy="memory-disk"
          transition={0}
        />
      </View>
    );
  }

  // Fallback: emoji placeholder
  const emojiData = petEmojis[species];
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.spriteBox, { width: size, height: size, borderRadius: size * 0.15 }]}>
        <Text style={[styles.emoji, { fontSize: size * 0.4 }]}>{emojiData.body}</Text>
        <Text style={[styles.face, { fontSize: size * 0.13 }]}>{emojiData.face[mood]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spriteImage: {
    position: 'absolute',
  },
  spriteBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  emoji: {
    textAlign: 'center',
  },
  face: {
    fontFamily: 'IBMPlexMono_400Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 2,
  },
});
