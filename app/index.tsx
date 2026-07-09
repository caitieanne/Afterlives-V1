import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { theme, shadows } from '@/constants/theme';
import { petSpecies, PetData } from '@/services/petData';
import { useGame } from '@/contexts/GameContext';
import { useAudio } from '@/contexts/AudioContext';
import SplashScreen from '@/components/feature/SplashScreen';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 48;

function PetCard({ pet, onSelect }: { pet: PetData; onSelect: () => void }) {
  return (
    <Pressable
      onPress={onSelect}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <Image
        source={{ uri: pet.backgroundFrames[0] }}
        style={styles.cardImage}
        contentFit="cover"
        cachePolicy="memory-disk"
      />
      <View style={styles.cardOverlay} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={[styles.speciesDot, { backgroundColor: pet.color }]} />
          <Text style={styles.habitatLabel}>{pet.habitat}</Text>
        </View>
        <View style={styles.cardBottom}>
          <Text style={styles.petName}>{pet.name}</Text>
          <Text style={styles.petDescription}>{pet.description}</Text>
          <View style={styles.adoptButton}>
            <Text style={styles.adoptText}>ADOPT</Text>
            <MaterialIcons name="arrow-forward" size={14} color={theme.primary} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default function SelectScreen() {
  const insets = useSafeAreaInsets();
  const { selectPet, gameState } = useGame();
  const { playSelect } = useAudio();
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  // If pet already selected and alive, go to game (or name screen if unnamed)
  React.useEffect(() => {
    if (gameState?.petId && gameState.isAlive) {
      if (!gameState.petName) {
        router.replace('/name');
      } else {
        router.replace('/game');
      }
    }
  }, [gameState?.petId, gameState?.isAlive, gameState?.petName]);

  const handleSelect = (pet: PetData) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    playSelect();
    selectPet(pet.id);
    router.replace('/name');
  };

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      {showSplash ? <SplashScreen onFinish={handleSplashFinish} /> : null}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: insets.bottom + 32,
          paddingTop: 8,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo & Title */}
        <View style={styles.logoSection}>
          <Image
            source={{ uri: 'https://cdn-ai.onspace.ai/onspace/files/hSYEJELT5jnA6BSrGtNS7g/6a032e7e9_logo.png' }}
            style={styles.logo}
            contentFit="contain"
            cachePolicy="memory-disk"
          />
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.titleSmall}>CHOOSE YOUR</Text>
          <Text style={styles.titleLarge}>CRYPTID</Text>
          <View style={styles.titleLine} />
          <Text style={styles.subtitle}>
            Each creature needs your care to survive. Choose wisely.
          </Text>
        </View>

        {/* Pet Cards */}
        {petSpecies.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            onSelect={() => handleSelect(pet)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  logo: {
    width: 180,
    height: 180,
  },
  titleSection: {
    marginBottom: 24,
    paddingTop: 0,
  },
  titleSmall: {
    fontFamily: 'IBMPlexMono_600SemiBold',
    fontSize: 13,
    color: theme.primary,
    letterSpacing: 4,
  },
  titleLarge: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 42,
    color: theme.textPrimary,
    letterSpacing: 2,
    marginTop: 2,
  },
  titleLine: {
    width: 60,
    height: 3,
    backgroundColor: theme.primary,
    marginTop: 12,
    borderRadius: 2,
  },
  subtitle: {
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize: 13,
    color: theme.textSecondary,
    marginTop: 12,
    lineHeight: 20,
  },
  card: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    ...shadows.card,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  speciesDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  habitatLabel: {
    fontFamily: 'IBMPlexMono_600SemiBold',
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  cardBottom: {},
  petName: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 28,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  petDescription: {
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    lineHeight: 18,
  },
  adoptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.primary,
  },
  adoptText: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 12,
    color: theme.primary,
    letterSpacing: 2,
    marginRight: 6,
  },
});
