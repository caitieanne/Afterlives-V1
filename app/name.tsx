import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { theme } from '@/constants/theme';
import { getPetById } from '@/services/petData';
import { useGame } from '@/contexts/GameContext';
import { useAudio } from '@/contexts/AudioContext';

const MAX_NAME_LENGTH = 16;

export default function NameScreen() {
  const { gameState, namePet } = useGame();
  const { playSelect } = useAudio();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<TextInput>(null);

  const fadeIn = useSharedValue(0);
  const spriteScale = useSharedValue(0.6);
  const spriteBob = useSharedValue(0);

  useEffect(() => {
    fadeIn.value = withTiming(1, { duration: 600 });
    spriteScale.value = withSpring(1, { damping: 8, stiffness: 120 });
    spriteBob.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(5, { duration: 1200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
  }));

  const spriteStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: spriteScale.value },
      { translateY: spriteBob.value },
    ],
  }));

  if (!gameState?.petId) {
    router.replace('/');
    return null;
  }

  const pet = getPetById(gameState.petId);
  if (!pet) return null;

  // Get the first neutral sprite frame for preview
  const previewFrame =
    pet.sprites?.neutral?.idle?.[0] ??
    pet.sprites?.happy?.idle?.[0] ??
    null;

  const handleConfirm = () => {
    const trimmed = name.trim();
    if (trimmed.length === 0) {
      setError('Your cryptid needs a name!');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }
    if (trimmed.length < 2) {
      setError('Name must be at least 2 characters.');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    playSelect();
    namePet(trimmed);
    router.replace('/game');
  };

  const handleChangeName = (text: string) => {
    if (text.length <= MAX_NAME_LENGTH) {
      setName(text);
      if (error) setError('');
    }
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <Animated.View style={[styles.content, containerStyle]}>
          {/* Back button */}
          <Pressable
            onPress={() => {
              Haptics.selectionAsync();
              router.back();
            }}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={20} color="#FFF" />
          </Pressable>

          {/* Pet preview */}
          <Animated.View style={[styles.spriteContainer, spriteStyle]}>
            {previewFrame ? (
              <Image
                source={{ uri: previewFrame }}
                style={styles.spriteImage}
                contentFit="contain"
                cachePolicy="memory-disk"
              />
            ) : (
              <View style={styles.emojiFallback}>
                <Text style={styles.emojiText}>
                  {pet.id === 'ghost' ? '👻' : pet.id === 'sasquatch' ? '🦶' : pet.id === 'swampMonster' ? '🐸' : pet.id === 'chupacabra' ? '🐺' : '🦇'}
                </Text>
              </View>
            )}
          </Animated.View>

          {/* Species label */}
          <View style={styles.speciesBadge}>
            <View style={[styles.speciesDot, { backgroundColor: pet.color }]} />
            <Text style={styles.speciesText}>{pet.name}</Text>
          </View>

          {/* Name prompt */}
          <Text style={styles.promptTitle}>NAME YOUR</Text>
          <Text style={styles.promptSubtitle}>CRYPTID</Text>

          {/* Input */}
          <View style={styles.inputWrapper}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={name}
              onChangeText={handleChangeName}
              placeholder="Enter a name..."
              placeholderTextColor="rgba(255,255,255,0.25)"
              maxLength={MAX_NAME_LENGTH}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleConfirm}
              selectionColor={theme.primary}
            />
            <Text style={styles.charCount}>
              {name.length}/{MAX_NAME_LENGTH}
            </Text>
          </View>

          {/* Error */}
          {error ? (
            <View style={styles.errorRow}>
              <MaterialIcons name="warning" size={14} color={theme.error} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Confirm button */}
          <Pressable
            onPress={handleConfirm}
            style={({ pressed }) => [
              styles.confirmButton,
              { backgroundColor: name.trim().length >= 2 ? theme.primary : 'rgba(255,255,255,0.1)' },
              pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] },
            ]}
          >
            <MaterialIcons
              name="pets"
              size={18}
              color={name.trim().length >= 2 ? '#000' : 'rgba(255,255,255,0.3)'}
            />
            <Text
              style={[
                styles.confirmText,
                { color: name.trim().length >= 2 ? '#000' : 'rgba(255,255,255,0.3)' },
              ]}
            >
              START CARING
            </Text>
          </Pressable>

          {/* Hint */}
          <Text style={styles.hint}>You can always change your mind later.</Text>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  backButton: {
    position: 'absolute',
    top: 12,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  spriteContainer: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  spriteImage: {
    width: 140,
    height: 140,
  },
  emojiFallback: {
    width: 120,
    height: 120,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  emojiText: {
    fontSize: 56,
  },
  speciesBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  speciesDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  speciesText: {
    fontFamily: 'IBMPlexMono_600SemiBold',
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  promptTitle: {
    fontFamily: 'IBMPlexMono_600SemiBold',
    fontSize: 14,
    color: theme.primary,
    letterSpacing: 4,
    marginBottom: 2,
  },
  promptSubtitle: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 36,
    color: theme.textPrimary,
    letterSpacing: 2,
    marginBottom: 28,
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'IBMPlexMono_600SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  charCount: {
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize: 11,
    color: 'rgba(255,255,255,0.25)',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  errorText: {
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize: 12,
    color: theme.error,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 54,
    borderRadius: 14,
    marginTop: 16,
    gap: 10,
  },
  confirmText: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 15,
    letterSpacing: 2,
  },
  hint: {
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize: 11,
    color: 'rgba(255,255,255,0.2)',
    marginTop: 14,
  },
});
