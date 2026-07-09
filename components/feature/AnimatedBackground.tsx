import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { gameConfig } from '@/constants/config';

interface AnimatedBackgroundProps {
  frames: string[];
  children?: React.ReactNode;
}

export function AnimatedBackground({ frames, children }: AnimatedBackgroundProps) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (frames.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % frames.length);
    }, 1000 / gameConfig.backgroundFps);
    return () => clearInterval(interval);
  }, [frames]);

  return (
    <View style={styles.container}>
      {frames.map((frame, index) => (
        <Image
          key={frame}
          source={{ uri: frame }}
          style={[
            styles.backgroundImage,
            { opacity: index === currentFrame ? 1 : 0 },
          ]}
          contentFit="cover"
          cachePolicy="memory-disk"
        />
      ))}
      <View style={styles.overlay} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
});
