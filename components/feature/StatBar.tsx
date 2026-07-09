import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  icon: string;
}

export function StatBar({ label, value, maxValue, color, icon }: StatBarProps) {
  const percentage = Math.max(0, Math.min(100, (value / maxValue) * 100));
  const isLow = percentage < 25;
  const isCritical = percentage < 10;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={[styles.label, isCritical && styles.criticalLabel]}>{label}</Text>
        <Text style={[styles.value, isCritical && styles.criticalValue]}>
          {Math.round(value)}
        </Text>
      </View>
      <View style={styles.barTrack}>
        <View
          style={[
            styles.barFill,
            {
              width: `${percentage}%`,
              backgroundColor: isCritical ? theme.error : isLow ? theme.warning : color,
            },
          ]}
        />
        {/* Pixel-art segmentation */}
        {[...Array(10)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.segment,
              { left: `${(i + 1) * 10}%` },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  icon: {
    fontSize: 12,
    marginRight: 4,
  },
  label: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 11,
    color: '#CCCCCC',
    textTransform: 'uppercase',
    letterSpacing: 1,
    flex: 1,
  },
  criticalLabel: {
    color: theme.error,
  },
  value: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  criticalValue: {
    color: theme.error,
  },
  barTrack: {
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    position: 'relative',
  },
  barFill: {
    height: '100%',
    borderRadius: 1,
  },
  segment: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
