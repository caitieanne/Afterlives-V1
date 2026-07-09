import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';
import { useAudio } from '@/contexts/AudioContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

const SPLASH_FRAMES = [
  'https://cdn-ai.onspace.ai/onspace/files/2mVTa7jSYFGDEx78FPbx77/Create_a_splash_2k_202602122039.jpeg',
  'https://cdn-ai.onspace.ai/onspace/files/HVFhsCsniweSkwEZGCkcCV/Animate_2k_202602122040.jpeg',
  'https://cdn-ai.onspace.ai/onspace/files/nsGHs7ghbaBdyPEPVHXtUw/Animate_202602122041.jpeg',
];
const SPLASH_FPS = 3;

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const { playCoinInsert, playBootUp, isMuted, toggleMute } = useAudio();
  const [frameIndex, setFrameIndex] = useState(0);
  const bgOpacity = useRef(new Animated.Value(0)).current;
  const scanlineY = useRef(new Animated.Value(-SCREEN_HEIGHT)).current;
  const flickerOpacity = useRef(new Animated.Value(1)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;
  const pressStartOpacity = useRef(new Animated.Value(0)).current;
  const vignetteOpacity = useRef(new Animated.Value(0.8)).current;

  // Floating pixel particles
  const particles = useRef(
    Array.from({ length: 8 }, () => ({
      x: new Animated.Value(Math.random() * SCREEN_WIDTH),
      y: new Animated.Value(SCREEN_HEIGHT + Math.random() * 100),
      opacity: new Animated.Value(0),
    }))
  ).current;

  // Frame animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % SPLASH_FRAMES.length);
    }, 1000 / SPLASH_FPS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Phase 1: CRT boot flicker
    const bootFlicker = Animated.sequence([
      Animated.timing(bgOpacity, { toValue: 0.2, duration: 80, useNativeDriver: true }),
      Animated.timing(bgOpacity, { toValue: 0, duration: 60, useNativeDriver: true }),
      Animated.timing(bgOpacity, { toValue: 0.5, duration: 100, useNativeDriver: true }),
      Animated.timing(bgOpacity, { toValue: 0.1, duration: 50, useNativeDriver: true }),
      Animated.timing(bgOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]);

    // Phase 2: Scanline sweep
    const scanlineSweep = Animated.timing(scanlineY, {
      toValue: SCREEN_HEIGHT + 20,
      duration: 600,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    // Phase 3: Vignette eases in
    const vignetteIn = Animated.timing(vignetteOpacity, {
      toValue: 0.3,
      duration: 800,
      useNativeDriver: true,
    });

    // Phase 4: "PRESS START" blink
    const pressStartBlink = Animated.loop(
      Animated.sequence([
        Animated.timing(pressStartOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(pressStartOpacity, { toValue: 0, duration: 500, useNativeDriver: true }),
      ])
    );

    // Floating pixel particles
    const particleAnimations = particles.map((p) =>
      Animated.parallel([
        Animated.timing(p.y, {
          toValue: -50,
          duration: 3000 + Math.random() * 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(p.opacity, { toValue: 0.6 + Math.random() * 0.4, duration: 400, useNativeDriver: true }),
          Animated.delay(2000 + Math.random() * 1000),
          Animated.timing(p.opacity, { toValue: 0, duration: 500, useNativeDriver: true }),
        ]),
      ])
    );

    // CRT flicker
    const crtFlicker = Animated.loop(
      Animated.sequence([
        Animated.timing(flickerOpacity, { toValue: 0.96, duration: 40, useNativeDriver: true }),
        Animated.timing(flickerOpacity, { toValue: 1, duration: 40, useNativeDriver: true }),
        Animated.delay(1500 + Math.random() * 2000),
        Animated.timing(flickerOpacity, { toValue: 0.93, duration: 30, useNativeDriver: true }),
        Animated.timing(flickerOpacity, { toValue: 1, duration: 60, useNativeDriver: true }),
      ]),
      { iterations: 5 }
    );

    // Play boot-up sound at start of CRT flicker
    playBootUp();

    // Run boot sequence, then start looping effects
    Animated.sequence([
      bootFlicker,
      Animated.parallel([scanlineSweep, vignetteIn]),
    ]).start(() => {
      // Play coin-insert sound when boot completes and "TAP TO START" appears
      playCoinInsert();
      // Start looping effects after boot
      Animated.parallel([
        pressStartBlink,
        Animated.stagger(200, particleAnimations),
        crtFlicker,
      ]).start();
    });
  }, []);

  const handlePress = () => {
    playCoinInsert();
    Animated.timing(fadeOut, {
      toValue: 0,
      duration: 400,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      onFinish();
    });
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeOut }]}>
      <Pressable style={StyleSheet.absoluteFill} onPress={handlePress}>
        {/* Background image with CRT boot */}
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: Animated.multiply(bgOpacity, flickerOpacity) }]}>
          {SPLASH_FRAMES.map((uri, i) => (
            <Image
              key={uri}
              source={{ uri }}
              style={[StyleSheet.absoluteFill, { opacity: i === frameIndex ? 1 : 0 }]}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
          ))}
        </Animated.View>

        {/* Vignette overlay */}
        <Animated.View style={[styles.vignette, { opacity: vignetteOpacity }]} />

        {/* CRT scanline texture overlay */}
        <View style={styles.scanlineTexture}>
          {Array.from({ length: Math.ceil(SCREEN_HEIGHT / 4) }, (_, i) => (
            <View key={i} style={styles.scanlineRow} />
          ))}
        </View>

        {/* Moving scanline bar */}
        <Animated.View
          style={[
            styles.scanlineBar,
            { transform: [{ translateY: scanlineY }] },
          ]}
        />

        {/* Floating pixel particles */}
        {particles.map((p, i) => (
          <Animated.View
            key={i}
            style={[
              styles.particle,
              {
                backgroundColor: i % 3 === 0 ? theme.primary : i % 3 === 1 ? '#FF6B6B' : '#4AEADC',
                width: 2 + (i % 3) * 2,
                height: 2 + (i % 3) * 2,
                opacity: p.opacity,
                transform: [
                  { translateX: p.x },
                  { translateY: p.y },
                ],
              },
            ]}
          />
        ))}

        {/* Blinking "TAP TO START" text at bottom */}
        <View style={styles.bottomArea}>
          <Animated.Text style={[styles.tapText, { opacity: pressStartOpacity }]}>
            TAP TO START
          </Animated.Text>
        </View>
      </Pressable>

      {/* Mute/Unmute toggle */}
      <Pressable
        onPress={toggleMute}
        hitSlop={12}
        style={({ pressed }) => [
          styles.muteButton,
          pressed && { opacity: 0.6 },
        ]}
      >
        <MaterialIcons
          name={isMuted ? 'volume-off' : 'volume-up'}
          size={20}
          color="rgba(255,255,255,0.8)"
        />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    backgroundColor: '#000000',
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: SCREEN_WIDTH * 0.12,
    borderColor: 'rgba(0,0,0,0.7)',
    borderRadius: 1,
  },
  scanlineTexture: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  scanlineRow: {
    height: 2,
    marginBottom: 2,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  scanlineBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  particle: {
    position: 'absolute',
    borderRadius: 1,
  },
  bottomArea: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  muteButton: {
    position: 'absolute',
    top: 48,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    zIndex: 110,
  },
  tapText: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 6,
    textShadowColor: 'rgba(255,215,0,0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});
