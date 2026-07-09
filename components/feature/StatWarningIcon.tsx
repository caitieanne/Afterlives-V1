import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { theme } from '@/constants/theme';

interface StatWarningIconProps {
  stats: {
    hunger: number;
    cleanliness: number;
    happiness: number;
    energy: number;
  };
  maxStat: number;
}

const STAT_INFO: {
  key: 'hunger' | 'cleanliness' | 'happiness' | 'energy';
  icon: string;
  color: string;
}[] = [
  { key: 'hunger', icon: '🍖', color: '#EF4444' },
  { key: 'cleanliness', icon: '🛁', color: '#3B82F6' },
  { key: 'happiness', icon: '🎾', color: '#F59E0B' },
  { key: 'energy', icon: '💤', color: '#8B5CF6' },
];

function FlashingWarning({ icon, color }: { icon: string; color: string }) {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.2, { duration: 400, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 400, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.warningBadge, { borderColor: color }, animStyle]}>
      <Text style={styles.warningIcon}>{icon}</Text>
      <Text style={[styles.exclamation, { color }]}>!</Text>
    </Animated.View>
  );
}

export function StatWarningIcon({ stats, maxStat }: StatWarningIconProps) {
  const lowStats = STAT_INFO.filter(
    (s) => (stats[s.key] / maxStat) * 100 < 25
  );

  if (lowStats.length === 0) return null;

  return (
    <View style={styles.container}>
      {lowStats.map((s) => (
        <FlashingWarning key={s.key} icon={s.icon} color={s.color} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    gap: 6,
    zIndex: 20,
  },
  warningBadge: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningIcon: {
    fontSize: 16,
  },
  exclamation: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 9,
    position: 'absolute',
    bottom: 1,
    right: 3,
  },
});
