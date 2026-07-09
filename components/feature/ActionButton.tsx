import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';

interface ActionButtonProps {
  label: string;
  icon: string;
  color: string;
  onPress: () => void;
  disabled?: boolean;
}

// The sprite sheet is a 2x2 grid: Feed(0,0) Bathe(1,0) Play(0,1) Sleep(1,1)
// Each button occupies 50% of the image width and 50% of the image height
const BUTTON_SIZE = 74;
const SPRITE_SIZE = BUTTON_SIZE * 2; // Full sprite sheet rendered size

const SPRITE_POSITIONS: Record<string, { x: number; y: number }> = {
  Feed:  { x: 0, y: 0 },
  Bathe: { x: -BUTTON_SIZE, y: 0 },
  Play:  { x: 0, y: -BUTTON_SIZE },
  Sleep: { x: -BUTTON_SIZE, y: -BUTTON_SIZE },
};

export function ActionButton({ label, icon, color, onPress, disabled }: ActionButtonProps) {
  const handlePress = () => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  const pos = SPRITE_POSITIONS[label] || { x: 0, y: 0 };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <View style={styles.clipContainer}>
        <Image
          source={require('@/assets/images/action-buttons.png')}
          style={[
            styles.spriteSheet,
            {
              transform: [
                { translateX: pos.x },
                { translateY: pos.y },
              ],
            },
          ]}
          contentFit="cover"
          cachePolicy="memory-disk"
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.92 }],
  },
  disabled: {
    opacity: 0.4,
  },
  clipContainer: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    overflow: 'hidden',
    borderRadius: 4,
  },
  spriteSheet: {
    width: SPRITE_SIZE,
    height: SPRITE_SIZE,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
