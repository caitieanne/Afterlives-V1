import { Audio, AVPlaybackStatus } from 'expo-av';
import { ActionType } from '@/services/petData';

// Free CC0/public domain 8-bit retro sound effects from GitHub repos
const SOUND_URLS = {
  // Action SFX (distinct 8-bit wav/ogg files from CC0 repo)
  feed: 'https://raw.githubusercontent.com/JanTheLynx/free-game-sfx/master/8bit/8bit-beep1.wav',
  bathe: 'https://raw.githubusercontent.com/JanTheLynx/free-game-sfx/master/8bit/8bit-beep2.wav',
  play: 'https://raw.githubusercontent.com/JanTheLynx/free-game-sfx/master/8bit/8bit-beep3.ogg',
  sleep: 'https://raw.githubusercontent.com/JanTheLynx/free-game-sfx/master/8bit/8bit-beep4.ogg',

  // UI SFX
  select: 'https://raw.githubusercontent.com/JanTheLynx/free-game-sfx/master/8bit/8bit-beep5.ogg',
  warning: 'https://raw.githubusercontent.com/JanTheLynx/free-game-sfx/master/8bit/8bit-beep6.ogg',
  death: 'https://raw.githubusercontent.com/JanTheLynx/free-game-sfx/master/8bit/8bit-beep1.wav',
  evolve: 'https://raw.githubusercontent.com/JanTheLynx/free-game-sfx/master/8bit/8bit-beep5.ogg',

  // Splash / Arcade SFX
  coinInsert: 'https://cdn.pixabay.com/audio/2022/03/10/audio_d8ab6735e1.mp3',
  bootUp: 'https://cdn.pixabay.com/audio/2022/03/15/audio_8cb749bc64.mp3',

  // Background music - CC0 chiptune loop from public domain
  bgMusic: 'https://cdn.pixabay.com/audio/2022/03/15/audio_4e45b38b43.mp3',
};

class AudioService {
  private sounds: Map<string, Audio.Sound> = new Map();
  private bgMusic: Audio.Sound | null = null;
  private _isMuted: boolean = false;
  private _sfxVolume: number = 0.6;
  private _musicVolume: number = 0.3;
  private _isInitialized: boolean = false;
  private _isMusicPlaying: boolean = false;

  get isMuted(): boolean {
    return this._isMuted;
  }

  get isMusicPlaying(): boolean {
    return this._isMusicPlaying;
  }

  async initialize(): Promise<void> {
    if (this._isInitialized) return;
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });
      this._isInitialized = true;
    } catch (e) {
      console.log('Audio init failed:', e);
    }
  }

  async preloadSound(key: string, uri: string): Promise<void> {
    try {
      if (this.sounds.has(key)) return;
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: false, volume: this._sfxVolume }
      );
      this.sounds.set(key, sound);
    } catch (e) {
      console.log(`Failed to preload ${key}:`, e);
    }
  }

  async preloadAll(): Promise<void> {
    await this.initialize();
    const entries = Object.entries(SOUND_URLS).filter(([k]) => k !== 'bgMusic');
    await Promise.allSettled(entries.map(([key, uri]) => this.preloadSound(key, uri)));
  }

  async playSound(key: string): Promise<void> {
    if (this._isMuted) return;
    try {
      const existingSound = this.sounds.get(key);
      if (existingSound) {
        await existingSound.setVolumeAsync(this._sfxVolume);
        await existingSound.setPositionAsync(0);
        await existingSound.playAsync();
        return;
      }

      // Fallback: load and play on demand
      const uri = (SOUND_URLS as Record<string, string>)[key];
      if (!uri) return;
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true, volume: this._sfxVolume }
      );
      this.sounds.set(key, sound);
    } catch (e) {
      console.log(`Failed to play ${key}:`, e);
    }
  }

  async playActionSound(action: ActionType): Promise<void> {
    await this.playSound(action);
  }

  async playWarning(): Promise<void> {
    await this.playSound('warning');
  }

  async playDeath(): Promise<void> {
    await this.playSound('death');
  }

  async playEvolve(): Promise<void> {
    await this.playSound('evolve');
  }

  async playSelect(): Promise<void> {
    await this.playSound('select');
  }

  async playCoinInsert(): Promise<void> {
    await this.playSound('coinInsert');
  }

  async playBootUp(): Promise<void> {
    await this.playSound('bootUp');
  }

  async startBgMusic(): Promise<void> {
    if (this._isMuted || this._isMusicPlaying) return;
    try {
      await this.initialize();
      if (this.bgMusic) {
        await this.bgMusic.setVolumeAsync(this._musicVolume);
        await this.bgMusic.setPositionAsync(0);
        await this.bgMusic.setIsLoopingAsync(true);
        await this.bgMusic.playAsync();
        this._isMusicPlaying = true;
        return;
      }
      const { sound } = await Audio.Sound.createAsync(
        { uri: SOUND_URLS.bgMusic },
        {
          shouldPlay: true,
          volume: this._musicVolume,
          isLooping: true,
        }
      );
      this.bgMusic = sound;
      this._isMusicPlaying = true;

      sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
        if ('isPlaying' in status) {
          this._isMusicPlaying = status.isPlaying;
        }
      });
    } catch (e) {
      console.log('Failed to start bg music:', e);
    }
  }

  async stopBgMusic(): Promise<void> {
    try {
      if (this.bgMusic) {
        await this.bgMusic.stopAsync();
        this._isMusicPlaying = false;
      }
    } catch (e) {
      console.log('Failed to stop bg music:', e);
    }
  }

  async pauseBgMusic(): Promise<void> {
    try {
      if (this.bgMusic && this._isMusicPlaying) {
        await this.bgMusic.pauseAsync();
        this._isMusicPlaying = false;
      }
    } catch (e) {
      console.log('Failed to pause bg music:', e);
    }
  }

  async resumeBgMusic(): Promise<void> {
    if (this._isMuted) return;
    try {
      if (this.bgMusic && !this._isMusicPlaying) {
        await this.bgMusic.playAsync();
        this._isMusicPlaying = true;
      }
    } catch (e) {
      console.log('Failed to resume bg music:', e);
    }
  }

  async toggleMute(): Promise<boolean> {
    this._isMuted = !this._isMuted;
    if (this._isMuted) {
      await this.pauseBgMusic();
    } else {
      await this.resumeBgMusic();
    }
    return this._isMuted;
  }

  async setSfxVolume(vol: number): Promise<void> {
    this._sfxVolume = Math.max(0, Math.min(1, vol));
  }

  async setMusicVolume(vol: number): Promise<void> {
    this._musicVolume = Math.max(0, Math.min(1, vol));
    if (this.bgMusic) {
      await this.bgMusic.setVolumeAsync(this._musicVolume);
    }
  }

  async cleanup(): Promise<void> {
    for (const [, sound] of this.sounds) {
      try {
        await sound.unloadAsync();
      } catch (e) {
        // ignore
      }
    }
    this.sounds.clear();
    if (this.bgMusic) {
      try {
        await this.bgMusic.unloadAsync();
      } catch (e) {
        // ignore
      }
      this.bgMusic = null;
    }
    this._isMusicPlaying = false;
    this._isInitialized = false;
  }
}

// Singleton instance
export const audioService = new AudioService();
