import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  withSpring,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { theme } from '@/constants/theme';
import { PetStage } from '@/services/petData';

const { width: SW, height: SH } = Dimensions.get('window');

interface Props {
  newStage: PetStage;
  onComplete: () => void;
}

// Pre-computed sparkle positions (angle, distance, size, delay)
const SPARKLES = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
  const dist = 60 + Math.random() * 70;
  return {
    dx: Math.cos(angle) * dist,
    dy: Math.sin(angle) * dist,
    size: 4 + Math.random() * 6,
    delay: Math.random() * 300,
    rotation: Math.random() * 360,
  };
});

function Sparkle({ dx, dy, size, delay, rotation }: typeof SPARKLES[0]) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withSequence(
        withTiming(1, { duration: 200 }),
        withDelay(400, withTiming(0, { duration: 500 }))
      )
    );
    scale.value = withDelay(
      delay,
      withSequence(
        withSpring(1.3, { damping: 4, stiffness: 180 }),
        withDelay(300, withTiming(0.2, { duration: 500 }))
      )
    );
    translateX.value = withDelay(
      delay,
      withTiming(dx, { duration: 800, easing: Easing.out(Easing.cubic) })
    );
    translateY.value = withDelay(
      delay,
      withTiming(dy, { duration: 800, easing: Easing.out(Easing.cubic) })
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotation}deg` },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: size,
          height: size,
        },
        style,
      ]}
    >
      {/* 4-pointed star shape */}
      <View style={[starStyles.diamond, { width: size, height: size }]}>
        <View style={[starStyles.hLine, { width: size, height: size * 0.3, borderRadius: size * 0.15, top: size * 0.35 }]} />
        <View style={[starStyles.vLine, { width: size * 0.3, height: size, borderRadius: size * 0.15, left: size * 0.35 }]} />
      </View>
    </Animated.View>
  );
}

const starStyles = StyleSheet.create({
  diamond: {
    position: 'relative',
  },
  hLine: {
    position: 'absolute',
    left: 0,
    backgroundColor: '#FFF',
  },
  vLine: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#FFF',
  },
});

export function EvolutionEffect({ newStage, onComplete }: Props) {
  const overlayOpacity = useSharedValue(0);
  const glowScale = useSharedValue(0.3);
  const glowOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textScale = useSharedValue(0.5);
  const flashOpacity = useSharedValue(0);

  useEffect(() => {
    // White flash
    flashOpacity.value = withSequence(
      withTiming(0.7, { duration: 150 }),
      withTiming(0, { duration: 400 })
    );

    // Overlay fade in/out
    overlayOpacity.value = withSequence(
      withTiming(1, { duration: 200 }),
      withDelay(2000, withTiming(0, { duration: 500 }))
    );

    // Glow ring pulse
    glowOpacity.value = withSequence(
      withDelay(100, withTiming(0.9, { duration: 300 })),
      withDelay(800, withTiming(0, { duration: 800 }))
    );
    glowScale.value = withDelay(
      100,
      withSequence(
        withSpring(1.2, { damping: 5, stiffness: 100 }),
        withTiming(1.8, { duration: 1000, easing: Easing.out(Easing.cubic) })
      )
    );

    // "EVOLVED!" text
    textOpacity.value = withDelay(
      300,
      withSequence(
        withTiming(1, { duration: 300 }),
        withDelay(1200, withTiming(0, { duration: 400 }))
      )
    );
    textScale.value = withDelay(
      300,
      withSequence(
        withSpring(1, { damping: 6, stiffness: 150 }),
        withDelay(1200, withTiming(0.8, { duration: 400 }))
      )
    );

    // Fire onComplete after animation
    const timer = setTimeout(() => {
      onComplete();
    }, 2700);

    return () => clearTimeout(timer);
  }, []);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const flashStyle = useAnimatedStyle(() => ({
    opacity: flashOpacity.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: glowScale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ scale: textScale.value }],
  }));

  const stageLabel = newStage === 'teen' ? 'TEEN' : 'ADULT';
  const stageEmoji = newStage === 'teen' ? '⭐' : '🌟';

  return (
    <Animated.View style={[styles.overlay, overlayStyle]} pointerEvents="none">
      {/* White flash */}
      <Animated.View style={[styles.flash, flashStyle]} />

      {/* Glow ring */}
      <View style={styles.center}>
        <Animated.View style={[styles.glowRing, glowStyle]} />

        {/* Sparkle particles */}
        {SPARKLES.map((s, i) => (
          <Sparkle key={i} {...s} />
        ))}
      </View>

      {/* Stage text */}
      <Animated.View style={[styles.textContainer, textStyle]}>
        <Text style={styles.evolveEmoji}>{stageEmoji}</Text>
        <Text style={styles.evolveTitle}>EVOLVED!</Text>
        <View style={styles.stagePill}>
          <Text style={styles.stageLabel}>{stageLabel} STAGE</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
  },
  center: {
    position: 'absolute',
    top: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowRing: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: theme.primary,
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 10,
  },
  textContainer: {
    position: 'absolute',
    top: '55%',
    alignItems: 'center',
  },
  evolveEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  evolveTitle: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 32,
    color: theme.primary,
    letterSpacing: 6,
    textShadowColor: 'rgba(255, 215, 0, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  stagePill: {
    marginTop: 10,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.4)',
  },
  stageLabel: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 14,
    color: theme.primary,
    letterSpacing: 3,
  },
});
