import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { theme } from '@/constants/theme';

interface WarningToastProps {
  message: string;
  icon: string;
  color: string;
  visible: boolean;
  onDismiss: () => void;
}

export function WarningToast({ message, icon, color, visible, onDismiss }: WarningToastProps) {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
      // Auto-dismiss after 3s
      translateY.value = withDelay(3000, withTiming(-100, { duration: 300 }));
      opacity.value = withDelay(
        3000,
        withTiming(0, { duration: 300 }, (finished) => {
          if (finished) {
            runOnJS(onDismiss)();
          }
        })
      );
    }
  }, [visible]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, animStyle]}>
      <Pressable
        onPress={onDismiss}
        style={[styles.toast, { borderLeftColor: color, borderLeftWidth: 4 }]}
      >
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color }]}>WARNING</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
        <View style={[styles.pulseIndicator, { backgroundColor: color }]} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    zIndex: 50,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20,20,20,0.95)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    gap: 10,
  },
  icon: {
    fontSize: 22,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 10,
    letterSpacing: 2,
  },
  message: {
    fontFamily: 'IBMPlexMono_600SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 2,
  },
  pulseIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
