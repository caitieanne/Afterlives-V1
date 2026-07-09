import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { theme } from '@/constants/theme';
import { gameConfig } from '@/constants/config';
import { ActionType, getPetById } from '@/services/petData';
import { useGame } from '@/contexts/GameContext';
import { useAudio } from '@/contexts/AudioContext';
import { Image } from 'expo-image';
import { AnimatedBackground } from '@/components/feature/AnimatedBackground';
import { HeartMeter } from '@/components/feature/HeartMeter';
import { ActionButton } from '@/components/feature/ActionButton';
import { PetSprite } from '@/components/feature/PetSprite';
import { StatWarningIcon } from '@/components/feature/StatWarningIcon';
import { WarningToast } from '@/components/feature/WarningToast';
import { EvolutionEffect } from '@/components/feature/EvolutionEffect';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const STAT_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  hunger: { label: 'Hunger', icon: '🍖', color: '#EF4444' },
  cleanliness: { label: 'Cleanliness', icon: '🛁', color: '#3B82F6' },
  happiness: { label: 'Happiness', icon: '🎾', color: '#F59E0B' },
  energy: { label: 'Energy', icon: '💤', color: '#8B5CF6' },
};

function getMood(stats: { hunger: number; cleanliness: number; happiness: number; energy: number }) {
  const avg = (stats.hunger + stats.cleanliness + stats.happiness + stats.energy) / 4;
  if (stats.hunger < gameConfig.maxStat * 0.3 && stats.hunger <= Math.min(stats.cleanliness, stats.happiness, stats.energy)) {
    return 'hungry' as const;
  }
  if (stats.cleanliness < gameConfig.maxStat * 0.3 && stats.cleanliness <= Math.min(stats.hunger, stats.happiness, stats.energy)) {
    return 'sick' as const;
  }
  if (stats.energy < gameConfig.maxStat * 0.3 && stats.energy <= Math.min(stats.hunger, stats.cleanliness, stats.happiness)) {
    return 'tired' as const;
  }
  if (stats.happiness > gameConfig.maxStat * 0.7 && stats.happiness >= Math.max(stats.hunger, stats.cleanliness, stats.energy)) {
    return 'excited' as const;
  }
  if (avg > 60) return 'happy' as const;
  if (avg > 30) return 'neutral' as const;
  return 'sad' as const;
}

function DeathOverlay({ petName, onRestart }: { petName: string; onRestart: () => void }) {
  const insets = useSafeAreaInsets();
  const { playDeath } = useAudio();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    playDeath();
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.deathOverlay, animStyle]}>
      <View style={[styles.deathContent, { paddingBottom: insets.bottom + 32 }]}>
        <Text style={styles.deathEmoji}>💀</Text>
        <Text style={styles.deathTitle}>R.I.P.</Text>
        <Text style={styles.deathSubtitle}>Your {petName} has passed away...</Text>
        <Text style={styles.deathHint}>Neglected too long. Better luck next time.</Text>

        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            onRestart();
          }}
          style={({ pressed }) => [
            styles.restartButton,
            pressed && { opacity: 0.8, transform: [{ scale: 0.96 }] },
          ]}
        >
          <MaterialIcons name="replay" size={20} color="#000" />
          <Text style={styles.restartText}>TRY AGAIN</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

export default function GameScreen() {
  const insets = useSafeAreaInsets();
  const { gameState, performAction, resetGame } = useGame();
  const { isMuted, toggleMute, playActionSound, playWarning, playEvolve, startMusic, stopMusic } = useAudio();
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<ActionType | null>(null);
  const actionTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const [toast, setToast] = useState<{ message: string; icon: string; color: string } | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const warnedStatsRef = React.useRef<Set<string>>(new Set());
  const prevStageRef = React.useRef<string | null>(null);
  const [evolveStage, setEvolveStage] = useState<'teen' | 'adult' | null>(null);

  // Animation values
  const petScale = useSharedValue(1);
  const actionFeedbackOpacity = useSharedValue(0);
  const actionFeedbackY = useSharedValue(0);
  const petBob = useSharedValue(0);

  // Start background music when game screen loads
  useEffect(() => {
    startMusic();
    return () => {
      stopMusic();
    };
  }, []);

  // Track stage evolution for evolve sound + sparkle effect
  useEffect(() => {
    if (gameState?.stage && prevStageRef.current && prevStageRef.current !== gameState.stage) {
      playEvolve();
      setEvolveStage(gameState.stage as 'teen' | 'adult');
    }
    if (gameState?.stage) {
      prevStageRef.current = gameState.stage;
    }
  }, [gameState?.stage]);

  // Check for low stats and show toast + play warning sound
  useEffect(() => {
    if (!gameState?.isAlive || !gameState?.stats) return;
    const { stats } = gameState;
    const threshold = gameConfig.maxStat * 0.25;
    const statKeys = ['hunger', 'cleanliness', 'happiness', 'energy'] as const;

    for (const key of statKeys) {
      const val = stats[key];
      if (val < threshold && !warnedStatsRef.current.has(key)) {
        warnedStatsRef.current.add(key);
        const info = STAT_LABELS[key];
        setToast({
          message: `${info.label} is critically low!`,
          icon: info.icon,
          color: info.color,
        });
        setToastVisible(true);
        playWarning();
        break;
      } else if (val >= threshold && warnedStatsRef.current.has(key)) {
        warnedStatsRef.current.delete(key);
      }
    }
  }, [gameState?.stats, gameState?.isAlive]);

  // Idle bobbing animation
  useEffect(() => {
    petBob.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(6, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const petAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: petScale.value },
      { translateY: petBob.value },
    ],
  }));

  const feedbackStyle = useAnimatedStyle(() => ({
    opacity: actionFeedbackOpacity.value,
    transform: [{ translateY: actionFeedbackY.value }],
  }));

  if (!gameState?.petId) {
    router.replace('/');
    return null;
  }

  const pet = getPetById(gameState.petId);
  if (!pet) return null;

  const stage = gameState.stage || 'baby';
  const mood = gameState.isAlive ? getMood(gameState.stats) : 'dead';

  const handleAction = (action: ActionType) => {
    const isMovement = action === 'playLeft' || action === 'playRight';

    // Show action sprite
    if (actionTimerRef.current) clearTimeout(actionTimerRef.current);
    setActiveAction(action);
    actionTimerRef.current = setTimeout(() => {
      setActiveAction(null);
    }, 2000);

    if (isMovement) {
      // Movement: no sound, no feedback text, no stats, no bounce
      return;
    }

    const labels: Record<string, string> = { feed: '🍖 Fed!', bathe: '🛁 Clean!', play: '🎾 Fun!', sleep: '💤 Zzz...' };
    setLastAction(labels[action] || '');

    playActionSound(action as 'feed' | 'bathe' | 'play' | 'sleep');

    // Bounce animation
    petScale.value = withSequence(
      withSpring(1.15, { damping: 6, stiffness: 200 }),
      withSpring(1, { damping: 8, stiffness: 150 })
    );

    // Feedback text float up
    actionFeedbackOpacity.value = 1;
    actionFeedbackY.value = 0;
    actionFeedbackOpacity.value = withSequence(
      withTiming(1, { duration: 100 }),
      withTiming(0, { duration: 1200 })
    );
    actionFeedbackY.value = withTiming(-60, { duration: 1300 });

    performAction(action);
  };

  const handleRestart = () => {
    stopMusic();
    resetGame();
    router.replace('/');
  };

  const timeSinceCreated = gameState.createdAt
    ? Math.floor((Date.now() - gameState.createdAt) / 3600000)
    : 0;

  return (
    <View style={styles.screen}>
      <AnimatedBackground frames={pet.backgroundFrames}>
        {/* Top HUD */}
        <View style={[styles.topHud, { top: insets.top + 8 }]}>
          <Pressable
            onPress={() => {
              Haptics.selectionAsync();
              stopMusic();
              resetGame();
              router.replace('/');
            }}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={20} color="#FFF" />
          </Pressable>
          <View style={styles.petInfo}>
            <Text style={styles.petNameHud}>{gameState.petName || pet.name}</Text>
            <Text style={styles.petHabitatHud}>{pet.habitat}</Text>
          </View>
          <View style={styles.stageBadge}>
            <Text style={styles.stageText}>{stage.toUpperCase()}</Text>
          </View>
          <StatWarningIcon stats={gameState.stats} maxStat={gameConfig.maxStat} />
          {/* Mute/Unmute Button */}
          <Pressable
            onPress={() => {
              Haptics.selectionAsync();
              toggleMute();
            }}
            style={styles.muteButton}
          >
            <MaterialIcons
              name={isMuted ? 'volume-off' : 'volume-up'}
              size={18}
              color={isMuted ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.8)'}
            />
          </Pressable>
          <View style={styles.ageTag}>
            <MaterialIcons name="schedule" size={12} color={theme.primary} />
            <Text style={styles.ageText}>{timeSinceCreated}h</Text>
          </View>
        </View>

        {/* Pet Sprite Center */}
        <View style={styles.petContainer}>
          <Animated.View style={petAnimatedStyle}>
            <PetSprite species={gameState.petId} size={140} mood={mood} action={activeAction} stage={stage} />
          </Animated.View>

          {/* Action feedback text */}
          <Animated.View style={[styles.feedbackContainer, feedbackStyle]}>
            <Text style={styles.feedbackText}>{lastAction}</Text>
          </Animated.View>
        </View>

        {/* Bottom Panel */}
        <View style={[styles.bottomPanel, { paddingBottom: insets.bottom + 12 }]}>
          {/* Heart Meter */}
          <HeartMeter
            value={
              (gameState.stats.hunger +
                gameState.stats.cleanliness +
                gameState.stats.happiness +
                gameState.stats.energy) /
              4
            }
            maxValue={gameConfig.maxStat}
          />

          {/* Action Buttons with Arrow Navigation */}
          <View style={styles.actionsContainer}>
            <Pressable
              onPress={() => {
                if (!gameState.isAlive) return;
                handleAction('playLeft');
              }}
              disabled={!gameState.isAlive}
              style={({ pressed }) => [
                styles.arrowButton,
                pressed && { opacity: 0.6, transform: [{ scale: 0.9 }] },
                !gameState.isAlive && { opacity: 0.4 },
              ]}
            >
              <View style={styles.arrowClipLeft}>
                <Image
                  source={require('@/assets/images/arrow-buttons.png')}
                  style={styles.arrowSpriteLeft}
                  contentFit="cover"
                  cachePolicy="memory-disk"
                />
              </View>
            </Pressable>

            <View style={styles.actionsRow}>
              <ActionButton
                label="Feed"
                icon="restaurant"
                color={theme.hunger}
                onPress={() => handleAction('feed')}
                disabled={!gameState.isAlive}
              />
              <ActionButton
                label="Bathe"
                icon="water-drop"
                color={theme.clean}
                onPress={() => handleAction('bathe')}
                disabled={!gameState.isAlive}
              />
              <ActionButton
                label="Play"
                icon="sports-tennis"
                color={theme.happy}
                onPress={() => handleAction('play')}
                disabled={!gameState.isAlive}
              />
              <ActionButton
                label="Sleep"
                icon="bedtime"
                color={theme.energy}
                onPress={() => handleAction('sleep')}
                disabled={!gameState.isAlive}
              />
            </View>

            <Pressable
              onPress={() => {
                if (!gameState.isAlive) return;
                handleAction('playRight');
              }}
              disabled={!gameState.isAlive}
              style={({ pressed }) => [
                styles.arrowButton,
                pressed && { opacity: 0.6, transform: [{ scale: 0.9 }] },
                !gameState.isAlive && { opacity: 0.4 },
              ]}
            >
              <View style={styles.arrowClipRight}>
                <Image
                  source={require('@/assets/images/arrow-buttons.png')}
                  style={styles.arrowSpriteRight}
                  contentFit="cover"
                  cachePolicy="memory-disk"
                />
              </View>
            </Pressable>
          </View>
        </View>

        {/* Warning Toast */}
        <View style={{ position: 'absolute', top: insets.top + 52, left: 0, right: 0, zIndex: 50 }}>
          {toast ? (
            <WarningToast
              message={toast.message}
              icon={toast.icon}
              color={toast.color}
              visible={toastVisible}
              onDismiss={() => setToastVisible(false)}
            />
          ) : null}
        </View>

        {/* Evolution Sparkle Effect */}
        {evolveStage ? (
          <EvolutionEffect
            newStage={evolveStage}
            onComplete={() => setEvolveStage(null)}
          />
        ) : null}

        {/* Death Overlay */}
        {!gameState.isAlive ? (
          <DeathOverlay petName={pet.name} onRestart={handleRestart} />
        ) : null}
      </AnimatedBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000',
  },
  topHud: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  petInfo: {
    flex: 1,
    marginLeft: 12,
  },
  petNameHud: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  petHabitatHud: {
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  ageTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    gap: 4,
  },
  ageText: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 12,
    color: theme.primary,
  },
  stageBadge: {
    backgroundColor: 'rgba(255,215,0,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.3)',
    marginRight: 6,
  },
  stageText: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 10,
    color: theme.primary,
    letterSpacing: 1,
  },
  muteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    marginRight: 6,
  },
  petContainer: {
    position: 'absolute',
    top: '28%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
  },
  feedbackContainer: {
    position: 'absolute',
    top: -30,
    alignItems: 'center',
  },
  feedbackText: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 18,
    color: theme.primary,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingTop: 16,
    paddingHorizontal: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  arrowButton: {
    width: 38,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowClipLeft: {
    width: 38,
    height: 28,
    overflow: 'hidden',
  },
  arrowClipRight: {
    width: 38,
    height: 28,
    overflow: 'hidden',
  },
  arrowSpriteLeft: {
    width: 76,
    height: 28,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  arrowSpriteRight: {
    width: 76,
    height: 28,
    position: 'absolute',
    top: 0,
    left: -38,
  },
  // Death overlay
  deathOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.85)',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deathContent: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  deathEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  deathTitle: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 48,
    color: theme.error,
    letterSpacing: 6,
  },
  deathSubtitle: {
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize: 16,
    color: '#CCCCCC',
    marginTop: 12,
    textAlign: 'center',
  },
  deathHint: {
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize: 12,
    color: '#777',
    marginTop: 8,
    textAlign: 'center',
  },
  restartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 32,
    gap: 8,
  },
  restartText: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 14,
    color: '#000',
    letterSpacing: 2,
  },
});
