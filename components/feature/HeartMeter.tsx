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

interface HeartMeterProps {
  /** Average of all stats, 0–maxValue */
  value: number;
  maxValue: number;
}

const TOTAL_HEARTS = 5;

function PulsingHeart({ color, pulse }: { color: string; pulse: boolean }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (pulse) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.25, { duration: 350, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 350, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    } else {
      scale.value = withTiming(1, { duration: 200 });
    }
  }, [pulse]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animStyle}>
      <Text style={[styles.heart, { color }]}>♥</Text>
    </Animated.View>
  );
}

export function HeartMeter({ value, maxValue }: HeartMeterProps) {
  const pct = Math.max(0, Math.min(100, (value / maxValue) * 100));
  const filledHearts = Math.round((pct / 100) * TOTAL_HEARTS);
  const isCritical = pct < 25;
  const isLow = pct < 50;

  const filledColor = isCritical ? theme.error : isLow ? theme.warning : '#EF4444';
  const emptyColor = 'rgba(255,255,255,0.15)';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>HP</Text>
      <View style={styles.heartsRow}>
        {Array.from({ length: TOTAL_HEARTS }).map((_, i) => {
          const filled = i < filledHearts;
          return (
            <PulsingHeart
              key={i}
              color={filled ? filledColor : emptyColor}
              pulse={filled && isCritical}
            />
          );
        })}
      </View>
      <Text style={[styles.value, isCritical && { color: theme.error }]}>
        {Math.round(pct)}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  label: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 13,
    color: '#CCCCCC',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  heartsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heart: {
    fontSize: 26,
    lineHeight: 30,
  },
  value: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 14,
    color: '#FFFFFF',
    minWidth: 40,
    textAlign: 'right',
  },
});
