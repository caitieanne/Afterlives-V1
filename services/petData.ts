export type PetSpecies = 'ghost' | 'sasquatch' | 'swampMonster' | 'chupacabra' | 'mothman';

export interface PetStats {
  hunger: number;
  cleanliness: number;
  happiness: number;
  energy: number;
}

export type ActionType = 'feed' | 'bathe' | 'play' | 'playLeft' | 'playRight' | 'sleep';

export type PetStage = 'baby' | 'teen' | 'adult';

export interface SpriteSet {
  idle: string[];
  fps: number;
  loop?: boolean;
}

export interface PetData {
  id: PetSpecies;
  name: string;
  habitat: string;
  description: string;
  color: string;
  accentColor: string;
  backgroundFrames: string[];
  sprites?: Partial<Record<'happy' | 'neutral' | 'sad' | 'hungry' | 'sick' | 'tired' | 'excited' | 'dead', SpriteSet>>;
  actionSprites?: Partial<Record<ActionType, SpriteSet>>;
  stageSprites?: Partial<Record<PetStage, {
    sprites?: Partial<Record<'happy' | 'neutral' | 'sad' | 'hungry' | 'sick' | 'tired' | 'excited' | 'dead', SpriteSet>>;
    actionSprites?: Partial<Record<ActionType, SpriteSet>>;
  }>>;
}

export const petSpecies: PetData[] = [
  {
    id: 'ghost',
    name: 'Ghost',
    habitat: 'Graveyard',
    description: 'A spooky specter haunting the moonlit cemetery.',
    color: '#C8D6E5',
    accentColor: '#576574',
    backgroundFrames: [
      'https://cdn-ai.onspace.ai/onspace/files/94z5oafEwdRPQzbLU9hhtX/Remove_the_ghosts_202602061949.jpeg',
      'https://cdn-ai.onspace.ai/onspace/files/ePNZ5MwwiqXBNWScGQogKs/Add_moonlight_highlights_202602071444.jpeg',
    ],
    stageSprites: {
      teen: {
        sprites: {
          happy: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/dxiC5CXAAUt2HAc73HyY8o/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/n8tHaaa94zRLDfDdTm2KPn/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/5qmSTiL5A4crspFCX5W6hj/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/H2bKLVwQLNhuky6W76Aeg8/frame_003.png',
            ],
            fps: 3,
          },
          neutral: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/VqZYKV4pr9SJzYYHxpr7wN/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/Lyoupn84GjtThEsY9yVueB/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/JmRqausLVG3cd293KrWoHW/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/hr3TqD5nxEuv6VMjZfZMub/frame_003.png',
            ],
            fps: 3,
          },
          sad: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/ZsceiKo3bnFYBXbrWUSeL6/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/ctfQctHibaq8b6NtekFqcP/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/HEibU3q7T6rAk3nwW7jdaz/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/jV4Vg5MzHjfZguLEUqyqBh/frame_003.png',
            ],
            fps: 3,
          },
          excited: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/Rsv3QvU9DLp4W3UsdLS4iJ/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/gZ5cnLs6GppCvvBosReZhC/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/FEQpJNoWM9UEgevHbR59r5/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/FTojhpaj5t7Nha23qm2me8/frame_003.png',
            ],
            fps: 3,
          },
          hungry: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/P9AJN7icYJJkQFc67GwebC/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/hasTfXTxWm7kEBt8NcJ7DM/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/fxtoJTu3sEz5WvFR3pcFEh/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/9YaQARgSYjEwUoqPSAjE6x/frame_003.png',
            ],
            fps: 3,
          },
          sick: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/6xgtySTFQEBWuFwj6tDb8T/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/GdjXxxmDfn4oBwrkvQjah8/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/MvSEYd8cn7ZH2aupirDEeh/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/PoKKJH3gZ65j4MKDCr3fCe/frame_003.png',
            ],
            fps: 3,
          },
          tired: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/jzujqf82eYQNNqxTVDV93h/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/UycEDTqpC9gtaL22k6kcGN/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/MeBJYs5eaGhmQrm7zPjD55/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/So38Vc85D4uyWZ82xBRLqQ/frame_003.png',
            ],
            fps: 3,
          },
          dead: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/fetFQx3qUnX3CYG5dgTaxm/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/dtmRLSJWZT6sb99om9Gc6y/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/23zJBKANTQryxSrhPDSgCq/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/AqWLWVfw6y6hHanaAHxPNH/frame_003.png',
            ],
            fps: 1,
            loop: false,
          },
        },
        actionSprites: {
          feed: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/oTh9PvAB4vvueFTUmNY6cy/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/dkp7GwsXNKG4XYuTkM7vcX/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/NP8q2Cuc6A9kxVCx8EVyM9/frame_003.png',
            ],
            fps: 3,
          },
          play: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/LQnhdaz6SRVHXEoC5tFSze/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/VoZq6uVCT2T34AV5szLDaw/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/SycK8RdCVyqYdarcd2QaBT/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/SSfBfEehvQpuwyzTJQSrHn/frame_003.png',
            ],
            fps: 3,
          },
          playLeft: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/Z6Bx2s5pFjWcUsQec2sc6M/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/7MtzrMKdyBvvmi4juMMmAq/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/9ojcou4HDaFDm9AKWYsXEE/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/mYxM5pzzs4JxiUdvLfKFhM/frame_003.png',
            ],
            fps: 3,
          },
          playRight: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/AsoEiSEZx6JCsqQofhCrEj/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/aaKPcs28sSArMHyirPNY6p/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/3qiCS7JTx9eUxoKscLKJqK/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/mPvT4So42t4ahRpQk8t8Vd/frame_003.png',
            ],
            fps: 3,
          },
          bathe: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/L8pVxPB74697Vf4skc7cD9/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/NVzGgzsZpPxvNaCPyjA9YJ/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/V8PMjh5L3HmwWc7qMPbmRC/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/WheCDQCnCu3iL9KgFzD442/frame_003.png',
            ],
            fps: 3,
          },
          sleep: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/f9ht3fcdURDAKE7hhfDLK5/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/izmshmPfahrSy59vqd5TtD/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/4Qb3Cj8rfBjaYGosFRzuG7/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/mW6yMXWBup6zdysw4qojdr/frame_003.png',
            ],
            fps: 3,
          },
        },
      },
      adult: {
        sprites: {
          neutral: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/QrEZvCJz9DTwBtYEhHexEr/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/7hJsBtL4spKDNQEK47u7D8/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/E3hK55BbJymW2qEVTrTJbE/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/7QC8HTWAyc3x23CyPacnrD/frame_003.png',
            ],
            fps: 3,
          },
          happy: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/ZJPuiQFXZT466bHq7RWNZ4/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/MSxauEUZgfNgfYXtGqaP3a/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/a5rNA9Fq5LkCA64635zwAg/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/HKaopN8CZDChFPU49jpoEw/frame_003.png',
            ],
            fps: 3,
          },
          sad: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/EV5NUokcPfjEHYYmM5VCqR/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/mYQnVeC3v5Su5odrpQj9gA/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/c2sPjraQekGU5vBEox2sDa/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/bGBaDbdcyNRjzRriwpjNiG/frame_003.png',
            ],
            fps: 3,
          },
          hungry: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/HPjQ4wNw6uWNXi67ThSU9S/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/99EYaDp6RcYHVavCaXdE7H/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/g2Gb2JnsEJLiXfBaHnLJXz/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/SPcFBtUv7oZNA62JafZBUL/frame_003.png',
            ],
            fps: 3,
          },
          sad: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/AVvVvgngNiViuFBq25tJcY/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/3StV8itQKjpUquW3Wimg4n/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/VqSLhVXPtBFsQ57XxQKTCk/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/QVy4vqoFbXoWSgDFtz8bPP/frame_003.png',
            ],
            fps: 3,
          },
          sick: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/hrRkT4DXSuhonMYXDuK4hZ/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/5wZaKiPC2WT9LhBNBCsBY7/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/gVxSysbRYBTkkHTQHnNAf3/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/fj6ZZFLAWDw6J5hLjEYRwe/frame_003.png',
            ],
            fps: 3,
          },
          tired: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/AYQeKrkMqLaFfzh9x4FmvT/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/o7Dg3KvdBoq6HxXrKw4Se8/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/8VzGiinzN3F8ktXWUgbke4/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/PmQEA2gQyNijsv5L7m2kPt/frame_003.png',
            ],
            fps: 3,
          },
          excited: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/jNcLjXpHiP7yn35PVvUuhz/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/ck68cDB3fw6rji5gMrLa5c/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/Kr8P8LnzJ4KdPbFNUfqWq4/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/XLkS7Heqsq3KqE2ej7Pb3W/frame_003.png',
            ],
            fps: 3,
          },
          dead: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/X6nor4dHdo3xjDDN3LokWV/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/konZfYoubcfPcCcB63KuKF/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/8rJXFsjWgVDnjfha8vZpjy/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/MGgNZdE7wJM5TFN26cfM74/frame_003.png',
            ],
            fps: 1,
            loop: false,
          },
        },
        actionSprites: {
          feed: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/dqkjx4jB6M7v7rLnQxPbwM/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/ndG7bEAEu6ShbTNpPMnt7y/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/ZVoGK3GsT2GwnAJTpDFuoJ/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/4mjeJJAuLJSbPRmZcbp8VK/frame_003.png',
            ],
            fps: 3,
          },
          play: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/NRvdL4f3WCjmJnNASdHKTR/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/CZuxHutXbM9AAUCg7P4Yop/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/D7NXErC5r2cqWKNq4oU7sH/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/Up3a2Awo4xDAvBmFUtn7n6/frame_003.png',
            ],
            fps: 3,
          },
          playLeft: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/7BkmnnLiddTDoq4GqqspJo/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/6YLsBXm8GSib3duDWzVW4t/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/YyjS7xGgfjuZrfHqdccBBJ/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/feiFQjNkQoZM2yr87kb7zp/frame_003.png',
            ],
            fps: 3,
          },
          playRight: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/dpoGqqcvhcAH9B4g7yZtmW/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/DHo2GxWEin5QzxutbtTDWE/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/3uQd578TyGmMFf5e9MRvCQ/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/RLEZjXzLb44aaB7k6rjqE4/frame_003.png',
            ],
            fps: 3,
          },
          bathe: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/RTH4Hh6mRoEezX7Cd5qGXR/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/5CkPcEBcJPRPRhhn83Shna/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/MeGtYL6uxsaH9qtiyiKn2s/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/8f6Qjtdrdjyp4TwHd3rYxf/frame_003.png',
            ],
            fps: 3,
          },
          sleep: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/FkyoJQkt5p7DRZLDDBdpEm/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/j2U5TrKCr8qJYSR8zUm2XG/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/KVjNZPfrqNCiPUavYnGcLZ/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/AA3JfEF35nfCttrbDEq72W/frame_003.png',
            ],
            fps: 3,
          },
        },
      },
    },
    sprites: {
      happy: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/Hzw8YtjaXNLmcSisLLLxzY/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/Sm7UZmHYacNjjpAuCFBk7n/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/RMTXyctcPczg4TzJCEbcu4/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/WCicKfQSJiYcNfN2ZYaZ5r/frame_003.png',
        ],
        fps: 3,
      },
      neutral: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/QHZKN9g599KNrdWcfWCjnZ/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/6GNME3XPvL4nCoxicxUk4r/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/AhJZ6Y334JTdEua9Qp4Fgp/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/CNm7SBNaQiZzJwaMBRoDws/frame_003.png',
        ],
        fps: 3,
      },
      sad: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/PnFbc6Wc5axT6t6jKVaStu/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/FjaxmmUXucBR2fBreUbBDt/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/GG6jsjgYhhmCf8aeicU8cb/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/ehE3gUXchWDA9nJ7YhAQup/frame_003.png',
        ],
        fps: 3,
      },
      hungry: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/2PeCr6DxFBopojcmbK6DLp/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/QztqizG78oDA2uoeXr7ChY/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/aZtFZeF5WpwMqSvxi6qYJM/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/cUPmSqqmtbToTRLAK8AQCX/frame_003.png',
        ],
        fps: 3,
      },
      sick: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/f3hy7AijQbyA9XkpN3NAKo/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/QuogfSGe2jK2APgNLgSSEG/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/MguhgV46xgZgvPGya77DWt/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/RqFFTDSGqPQ5YBmQyN4m2y/frame_003.png',
        ],
        fps: 3,
      },
      tired: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/TTTAApSygz4kaKomz4PCGm/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/cTUhMny6Xqh4TVez9kZkSB/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/3D5QmoavrShQvAf7iNevCe/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/bS3wbk7ENqApuRWok9HZzZ/frame_003.png',
        ],
        fps: 3,
      },
      excited: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/jUgz2nBwL9jcaCTLjjC9mC/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/h3VH6SinN4wgK29icGksnb/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/YktYAetnEQWdtUVhQ5pYWh/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/BjVC7MCZfWpASwhLxeCmEE/frame_003.png',
        ],
        fps: 3,
      },
      dead: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/V29CcrBcyaDBovWpyspcuC/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/Ri3DK9YYPdAMgC5dNNXrUi/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/NmyTNTAwH7P3Nz89gZYLht/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/aSrp2w58wGHPehnzDhPZxi/frame_003.png',
        ],
        fps: 1,
        loop: false,
      },
    },
    actionSprites: {
      feed: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/EVg9oDDGGarhP2uAX8UGKb/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/nZWD37x6RMtGH4i4ZjdGBf/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/RRvKXjEfHBjFjGHniWK8Mv/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/JhLEfEcHMB7V25Fn2Pfwat/frame_003.png',
        ],
        fps: 3,
      },
      play: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/MiuTcHbVvzhBLa4VdFnfiM/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/JMQ2ZgcUiDfJdUMcmQ6kZQ/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/Jx7rMDKsMSoteSPYuucLLj/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/Cc6HMaPNXsUHAXfmNZwnT5/frame_003.png',
        ],
        fps: 3,
      },
      playLeft: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/VQ2rJqhTGuxNPgX8WQrRM7/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/c8vYnrvuxnQtogj89zJt23/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/9eDu5ZLFDnbnytLteVmyyK/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/FEssZKUgrwrVDT8enADPf2/frame_003.png',
        ],
        fps: 3,
      },
      playRight: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/gdyXaxLNZc9oboyP5d26Jv/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/7R8gSazMoP3QjxJubMM2nj/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/Q5YiDNWMr8Qyd3wpEuGo3L/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/7ZHK6587mzWW4pB3cbhqZW/frame_003.png',
        ],
        fps: 3,
      },
      bathe: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/hd6V6sN7z88Li44ZPpfJe2/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/7JubijqNBN6B9F7tAu63Rn/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/V8gTE76uGP95xpz9LUGmY6/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/Qq7zYtizSX3iDJVyoDUZ7U/frame_003.png',
        ],
        fps: 3,
      },
      sleep: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/7bbuuY24RorKJbF2L65tjt/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/L2UyMvoo4SpQDTegRtRN5C/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/Ck322ZGXFKCwMFpx8xeRrc/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/e3o5Vv77BQxiPMu554oCn2/frame_003.png',
        ],
        fps: 3,
      },
    },
  },
  {
    id: 'sasquatch',
    name: 'Sasquatch',
    habitat: 'Fall Forest',
    description: 'A gentle giant roaming the autumn woods.',
    color: '#8B4513',
    accentColor: '#D2691E',
    backgroundFrames: [
      'https://cdn-ai.onspace.ai/onspace/files/3KAzJeZv6FvasAquAC4Zxa/Add_moonlight_highlights_202602071443_(1).jpeg',
      'https://cdn-ai.onspace.ai/onspace/files/GVZTXM74C8CXW2oChbeM47/Generate_a_fall_202602071437.jpeg',
    ],
    sprites: {
      neutral: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/KQQaC6f8QypCu4vxoiFXxr/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/5KyfPLRGw2MxzKMFdX8pEZ/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/7wzBHBrNiGLD8eeyJXbUPL/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/nw33cuLY3QA5ChhJXGATix/frame_003.png',
        ],
        fps: 3,
      },
      bored: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/aGAKZxBTh4HCLrsR6PGGcz/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/WfGjZhRoN6KerWzRRCaK8B/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/dHxETeWMsH5h97tiKsbdZb/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/8rq29R3f4MfQhgmz42DWPr/frame_003.png',
        ],
        fps: 3,
      },
      loved: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/E9bhJAwkoQg6evDahwwRh6/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/M5CQyXbp4ew8qTAd5gbZ6c/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/FEmvLRUmZTbAWbsgN3HWCG/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/dAUvHLPdK3c8j2W3WzTw24/frame_003.png',
        ],
        fps: 3,
      },
      hungry: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/Jp76aVybU253hbdjAH6Tay/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/3annCCFHUtsDTdxpXdTPCf/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/5TD9n7uPKWuNWF9KzpjsQp/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/iimkkkTqYMYxFcbEP7j2xs/frame_003.png',
        ],
        fps: 3,
      },
      sad: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/5xfsnkqsh3aSbzKsZBpJ7w/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/d34TjNnCPzLXTRFaWrSTCZ/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/mqRofBBGNm2wR3weZ77t4L/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/AQQyeRBvwZH8mL7egwZcAR/frame_003.png',
        ],
        fps: 3,
      },
      sick: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/X6xkaVXXfL8mwqkqKRtTqR/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/dpPAdpV3gVYW4huTUACaaq/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/PMy9CmkRDRnqFEhzD9Wrue/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/RknLgzwW9aJCTSwfBjWay2/frame_003.png',
        ],
        fps: 3,
      },
      happy: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/KDSf87DkRKuUnpKBhc82rP/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/kYXk9FAr8BZVdYPsxf9fzX/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/8YdBmvdXTueVQKgaP7XSkY/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/HPDDgLfvaXJ6VR3pR6Nvuw/frame_003.png',
        ],
        fps: 3,
      },
      excited: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/KDSf87DkRKuUnpKBhc82rP/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/kYXk9FAr8BZVdYPsxf9fzX/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/8YdBmvdXTueVQKgaP7XSkY/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/HPDDgLfvaXJ6VR3pR6Nvuw/frame_003.png',
        ],
        fps: 3,
      },
      tired: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/gFyeAbHJweZn5vZ9rdfo4y/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/Ype5gK4Rq9MVZ27LWciAAu/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/7WZBHrMqSQUSHzJeVfu5Ka/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/cARmnCyPPMEW7EQwKDkUgD/frame_003.png',
        ],
        fps: 3,
      },
      dead: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/NNhvRcHsisAPhUvVBHqpKE/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/NjK3ZwtRe2hjndBxL8SFaE/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/PX2sDsR6jVpdXmXNjKHtu2/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/Vj2S8W7fXiZvwiJ8SooBib/frame_003.png',
        ],
        fps: 1,
        loop: false,
      },
    },
    actionSprites: {
      feed: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/EKPy7mJNCJr6cyFpys4ixq/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/WSJcgLsQeh2Vm4Mxd4J4am/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/6TXiiE9LfwEC6vuMwxQN7F/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/UEiQdEShHtVJ22T5sxvTzX/frame_003.png',
        ],
        fps: 3,
      },
      sleep: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/XGGx5CD4kYsgFuFUBxQ4qA/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/aeLjVXfSzJyiQQVAnAMaf7/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/Uk63ESyssqhQTd8iPz5qdf/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/BWKdXq28nc7TA3TR5iigKb/frame_003.png',
        ],
        fps: 3,
      },
      bathe: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/CsNYAefcxwd9mW3aNYyrjh/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/K7BvX7XpFPTujStX5qxdF3/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/TEAzZrDhRYYKgfjpzMYFhv/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/Atrr5Yg2JkiJErPgFuA5ML/frame_003.png',
        ],
        fps: 3,
      },
      playLeft: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/cXgX3AGgYFViGrriXGD8by/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/fHbL4L3XmXogqjAfay94Af/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/oUd978PStFpCNBPtJWspPX/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/gBALEiWgVHTJe2pKWXE8bA/frame_003.png',
          'https://cdn-ai.onspace.ai/onspace/files/4N3b3NvsG2vw8FuHAJ3xRW/frame_004.png',
          'https://cdn-ai.onspace.ai/onspace/files/MEpnb48uEH77WTzPYcAnik/frame_005.png',
        ],
        fps: 3,
      },
      playRight: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/jiFouU5okqEMthmL4K6Tct/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/nddiimKwEnDLUCMzb9e2YK/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/XebTpHTQRmAXgivxF5VyeJ/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/XUYo3jmWxCFqhzV5rZXUTQ/frame_003.png',
          'https://cdn-ai.onspace.ai/onspace/files/DLSrDNFe4WoVqnzKabgWSe/frame_004.png',
          'https://cdn-ai.onspace.ai/onspace/files/4C4iduaHaMm6BFiMP4ubgF/frame_005.png',
        ],
        fps: 3,
      },
    },
    stageSprites: {
      teen: {
        sprites: {
          neutral: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/dY6ikRbKnjdCugXkm7J3BV/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/j29DRuH5UtccENhuLcuZLb/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/EcSSSTXU2xZXk2sQLM6uTW/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/kt99UqFcpu9b4ZBxtstkVA/frame_003.png',
            ],
            fps: 3,
          },
          dead: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/8hpMpkmLkrbpGhLzwViyds/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/5HVDxBtA4CbFxxJoWLwhcU/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/DJBZh7ey6jt4cTWQj9eA8t/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/SG82rDZLedyFs6GrEC7UC3/frame_003.png',
            ],
            fps: 1,
            loop: false,
          },
          hungry: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/6xtZoZdpcLCNFffpuWLERt/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/g8aRPkc4g8WtjrrNBvSwt6/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/Q2uS3UGUARy4hhR7kz23iz/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/QaEM2SeaTXTww78rmnSjPS/frame_003.png',
            ],
            fps: 3,
          },
          sad: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/39ojkG7nCU5zivGM7u4x6o/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/eWN3tKKf9qmHpv7tbxETr2/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/FXfmW48pmixZRfGcFkgaPU/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/ard5Tzij7SLyP7yqST95to/frame_003.png',
            ],
            fps: 3,
          },
          sick: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/j7CNRdbUbyrXKjJXaTWi8y/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/kVsPJTgy3b3Wp49WAch8oA/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/LwmRARQ4RVVj66FGrP7eEi/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/jrdqfs3U8VzuU2hEhJMeAP/frame_003.png',
            ],
            fps: 3,
          },
          tired: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/H7MXziV7gg4ju5RkdNnKqj/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/U6DPXebPTMxaV6U68HruZJ/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/A2zQvvtbdJZQx8MCtofUCX/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/XtkR8sdK5CcyYhQnzXsJ3M/frame_003.png',
            ],
            fps: 3,
          },
          bored: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/hNHvdXxrzyeVdv8WFbQQWD/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/hPdR7EJZHiBDVWyN4AyiQy/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/EFZztt2yWthoejRPD4duq8/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/5yt9wJtpGfjsdt87a6d5eK/frame_003.png',
            ],
            fps: 3,
          },
          loved: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/UGC724spvgeqR56cor4C6n/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/QxpNH8cKDPzrPtBtUbQo4i/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/Bt74fNcLWxTrB5unVogend/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/aui9YK9QEfdXhiz99bZpBG/frame_003.png',
            ],
            fps: 3,
          },
          happy: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/Rj9KMGVVs9TKuDf5fXgcBq/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/ZxovRn86VdmCEZhEKP9rG3/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/ZSyUncWTj36JpETAYEcdy9/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/3wJ87Ct2ahGsqZkuFTBpgp/frame_003.png',
            ],
            fps: 3,
          },
          excited: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/Rj9KMGVVs9TKuDf5fXgcBq/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/ZxovRn86VdmCEZhEKP9rG3/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/ZSyUncWTj36JpETAYEcdy9/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/3wJ87Ct2ahGsqZkuFTBpgp/frame_003.png',
            ],
            fps: 3,
          },
        },
        actionSprites: {
          feed: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/FQGyaKX4cbyYHcmmvhotZn/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/MRsu2evNi3L8e7SQzvdoYj/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/aXkEzmwAdrDUwvNSHXWfGo/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/k4uataX97whFoBe9yaZAep/frame_003.png',
            ],
            fps: 3,
          },
          bathe: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/378fe8oPfeHW2VG7NTLJwV/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/NzXUxteFZdeuMZVKrkqshP/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/B8ZUUUTxagrEhmK54ZAbeJ/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/dMAPRXXvBDdSQpCnyTrNns/frame_003.png',
            ],
            fps: 3,
          },
        },
      },
    },
  },
  {
    id: 'swampMonster',
    name: 'Swamp Monster',
    habitat: 'Murky Pond',
    description: 'A slimy creature lurking in the deep swamp.',
    color: '#2ECC71',
    accentColor: '#1A5C2E',
    backgroundFrames: [
      'https://cdn-ai.onspace.ai/onspace/files/RAmYygq9PovQNyo773YPeW/Add_moonlight_highlights_202602071443.jpeg',
      'https://cdn-ai.onspace.ai/onspace/files/WHXDfgiFuUamTPMLwDixVu/Generate_a_green_202602071437.jpeg',
    ],
    sprites: {
      neutral: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/bTNf3yBLTiDVKLpbJGxpMh/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/nRvbKFHi87JGdwLpqMxD4m/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/4e4CGoatUm9pAKa963hsFW/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/4Fj35cxSsSNTN3VAjdyzyJ/frame_003.png',
        ],
        fps: 3,
      },
      happy: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/gxWNjFg2eqaakj3cSzBmZK/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/G7b66PzpvfisHpbHnzV5u8/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/nmq739pD86DMm3faHrfPE3/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/LVm9BFbVYWsxww7XwTe3vk/frame_003.png',
        ],
        fps: 3,
      },
      hungry: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/NcyyHBewT2i7CuVgjUYcNA/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/KrBW6PXFZHuCcq3bSdm7gA/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/G2EFHvLU68ch3tdDxiGH5Q/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/efPTDR9hoThyCW4aqjWE5s/frame_003.png',
        ],
        fps: 3,
      },
      sad: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/iomEGngtbePYiDiDMLr59i/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/czMAMFQvzd9MRzAfFD3kvB/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/V2iU4siBNrdjGcJD95hkNs/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/2Mf984ec778iWimVeT5aUs/frame_003.png',
        ],
        fps: 3,
      },
      sick: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/Cfr3hYcs2W565JPdnkead7/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/MgY5bSyY5vEjJybZpYM7p9/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/LCFoAVkeDdYV9DhzGi7jiV/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/nd5oTtkC3WRpf7EuZ3Y7GT/frame_003.png',
        ],
        fps: 3,
      },
      tired: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/XMkVJ5JRCAuAMz9HRqBmcP/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/kbnrAhGMLsevTNefd7xUzL/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/dibJf8RjPSer2WJg9Bwfzr/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/PkAivzsvqXM7bpfXJ8fSeC/frame_003.png',
        ],
        fps: 3,
      },
      excited: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/7At2XXwyfvV4yqQA64rUdv/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/nZncDULncujwTP799h8qtv/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/PwgtEWvKkYDmF5gASCzn43/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/fNQkZnbPUgbbiX7vyJSGiV/frame_003.png',
        ],
        fps: 3,
      },
      dead: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/boAqpUo2N2W8KfiVDqpxpq/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/nFEJPqdaS72MgDJYwfaaCv/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/dY8bYMo49L8zaDqKjWfEL7/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/N9k5SRxAzzKvp2f3JiUwT5/frame_003.png',
        ],
        fps: 1,
        loop: false,
      },
    },
    actionSprites: {
      feed: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/S9DgEJNjErjqV5jdF5uqNY/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/a5HpYZW7xBbtZfazHxKLyQ/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/XWCp56zXy3AbuqgYzi7axq/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/Ha7La9892ccE2qduhDsz42/frame_003.png',
        ],
        fps: 3,
      },
      play: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/VsR5K3GRqU35fs2GtgG4GX/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/CAZHXZ2fD4ShSrmQeET9sS/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/Yb52q4HzaFCvUiexpShqcm/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/jWNacyCdfAkFb2KySAz95q/frame_003.png',
          'https://cdn-ai.onspace.ai/onspace/files/FPJGHDvNX2gR53UQz9Vxa3/frame_004.png',
          'https://cdn-ai.onspace.ai/onspace/files/33qqkqUviFa4jLnoUzua5x/frame_005.png',
        ],
        fps: 3,
      },
      playLeft: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/KobvioovLoyZwPFzFQnwMV/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/N4Dr8Ke38FWV3XoiWAABSK/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/8KuZnMkjr6SdkfPtg5f4Jn/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/U5b4DaDVgduwTqgmSKKctG/frame_003.png',
          'https://cdn-ai.onspace.ai/onspace/files/VNL2CBRX5XUz9XRibVyxm3/frame_004.png',
          'https://cdn-ai.onspace.ai/onspace/files/3DsEeGLj5wjawb8Vd8BsKk/frame_005.png',
        ],
        fps: 3,
      },
      playRight: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/7kvNPxAwBF57GZa9cCprRZ/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/F7jNbn45kMbqYF8C3ssXFv/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/BM26iTxz9mR2YffJ7LgWP7/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/enUmx6hWE3Pg5cZbrdjSNt/frame_003.png',
          'https://cdn-ai.onspace.ai/onspace/files/FkrvYNoCmdvBAzEwaFZmQX/frame_004.png',
          'https://cdn-ai.onspace.ai/onspace/files/GjJCBW7kcCmrXP4pdCi5bo/frame_005.png',
        ],
        fps: 3,
      },
      bathe: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/YmpC8KFJMUnrsz393e3FRU/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/LBQZxr9v2xsT7SVwHqdbiG/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/VnKw98R7UKMwsPKbSnpcom/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/iPPraeyyBf6isnUSSDn5d8/frame_003.png',
        ],
        fps: 3,
      },
      sleep: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/eVVPwDtJUaJpuEAw7XBJiq/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/XaNeowHg4c78Gc43KYmie9/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/AccYmbfqxLvCBXJxsVbVr3/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/hqJGQzXDy7HKDokaA5SjRd/frame_003.png',
        ],
        fps: 3,
      },
    },
    stageSprites: {
      teen: {
        sprites: {
          sad: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/a9q7rh9SQ4YUS9AFUPSndR/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/kA5an5AJCicUwNhg8XVFzx/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/7LvwrAxFh6QQKsYEbTBLZS/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/LcXrFduHQrqVAx3mj4Vruk/frame_003.png',
            ],
            fps: 3,
          },
          neutral: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/iYDtm9KgjZvnMttwVhVqgV/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/g96gER8G8As5B73ejEaVpK/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/ed2Hh9Lxtu7scSDsnr2g5m/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/UY3UdZgZ95nCieYHkgM46G/frame_003.png',
            ],
            fps: 3,
          },
          excited: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/g83q5etJhH3p4beHUbFDt2/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/ZynhfRWaG6MrJ5fC99yTRB/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/YCqp46deheWvv9WbwSDC86/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/Wz4dGNpxtgn4eNYEtxDuXx/frame_003.png',
            ],
            fps: 3,
          },
          sick: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/9PwAantogXQByxnWKpRbM4/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/Rhfk4NeRmw77e2AF9BVokA/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/HHZwu8rAnKH8GMaNfuPHi6/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/gM9aDcEwCL4qV96BAtr4Ga/frame_003.png',
            ],
            fps: 3,
          },
          tired: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/5BWhATrzYeEeWBVLxAPsCL/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/Pwtdkj4PCdZwy6fYMfRGKo/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/Ah6GAcKqyLoLWdiYFgP5Qy/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/TGfWVrjAitqGU6tYS6nVtE/frame_003.png',
            ],
            fps: 3,
          },
          hungry: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/iLFButW5sDxCfVcpx3LqVf/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/HfdGSMvG3Z65zqPRiinpQH/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/NfJtHnELjhykUeR7NjdAgV/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/9t28A9uVV8nAiGPmLBZfxE/frame_003.png',
            ],
            fps: 3,
          },
          happy: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/ZBSBL4vZD3cQEUbbjRcvLQ/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/5s6oYCHCoEyxMStPMAb3cs/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/XPrxTtsDjAWNFAZpUHFSEM/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/aqWLqArWpTDcWgQ97ArzpD/frame_003.png',
            ],
            fps: 3,
          },
          dead: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/Ttj55jHCB87JbLwdEtdPnc/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/MLozLai4pWP4Qjv5Y7gEFs/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/RKKV5EBr9AJ4RTQ4sLE7yW/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/hcArKESSBh5nmaWXTrd2xL/frame_003.png',
            ],
            fps: 1,
            loop: false,
          },
        },
        actionSprites: {
          feed: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/Kzae2xzQRTiukVkaH7DUaE/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/AfLkCNgXnGmP3GssN2ij7f/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/UY75TeeiH67qSExoRywhzS/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/FQ5icUBHWJuNmFhKrMxonu/frame_003.png',
            ],
            fps: 3,
          },
          bathe: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/MtVYLK7EBsAY58jw57wfyj/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/94QJpwQph8scU76a92Ja54/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/kLGQzsXdFk2StnKiBKwpdF/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/8z9eqqP9RH38ceMH8GuSR4/frame_003.png',
            ],
            fps: 3,
          },
          play: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/SEWS4KH3i3H2KAX33nR3ZT/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/ao2oSP2F7q7StwYkCm6Vga/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/bqfvLdN97G5aBzSjp38raz/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/kQYPXH7APTju2Hk7nputjC/frame_003.png',
            ],
            fps: 3,
          },
          playLeft: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/XaoaWqNcx5QjM5SwYsp9zf/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/oWW9PNpYUxujYp6qA6FJGh/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/8bvNc23zo8wtfPMG7irDPg/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/eYA7EqXGReyUPzwtTJyFRP/frame_003.png',
              'https://cdn-ai.onspace.ai/onspace/files/azJntmmtAVYAvqjvCPRB7C/frame_004.png',
              'https://cdn-ai.onspace.ai/onspace/files/JUG9Lt2ywwZSeVuvKpnVeY/frame_005.png',
            ],
            fps: 3,
          },
          playRight: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/35xJb2f7YGKkZATf7WRuf5/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/EhZs5zqT27b34H46znBSzu/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/EMBPuN5BFKiYo6eN7aY5Tr/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/8YxRGSoZ4YZvXYHohz8CtX/frame_003.png',
              'https://cdn-ai.onspace.ai/onspace/files/XUqsH7GqskmTkEVTseaiFg/frame_004.png',
              'https://cdn-ai.onspace.ai/onspace/files/8HVeDDTWpNQ3jWaASJKQJA/frame_005.png',
            ],
            fps: 3,
          },
          sleep: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/WhwgqQBejWjbEsReDmKMhP/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/2iWVTW7LBjk84QKoX4HjoV/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/CQdfcTBPtmnsqHGdGFwAHB/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/3ZY3fG3ZdFybS4aKKc47TK/frame_003.png',
            ],
            fps: 3,
          },
        },
      },
      adult: {
        sprites: {
          neutral: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/ZSqUgJRbsA2F4GbuGDvwzi/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/4bC2DTqzPHUJrNy7Yc8his/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/9GRhZm5YADwc4A7gtLWBSq/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/gzPsgtpT8wqFcVgVnVqkgy/frame_003.png',
            ],
            fps: 3,
          },
          happy: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/95gQMcRMSmRbTAfFVb4jqe/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/4bfvqhetFcNnpNVhhLsRYF/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/byRa2CvyhRAKuVH5v8iK8z/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/W35XVr8SfVHQNPzkxvUwRC/frame_003.png',
            ],
            fps: 3,
          },
          sad: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/NDqBAq4GYkWjn5qMGp9qsr/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/RcVrepR5g7pjZSofbuNSip/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/9jiuRH3TdzninThpw93X24/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/4E6kKfLHkhV7tndY6KR7Lw/frame_003.png',
            ],
            fps: 3,
          },
          hungry: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/hbTurLFzjLrRZkScmqdavU/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/XNsLkN3BvETghKHXt6fCrk/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/MkoJWPcqpVj6WtFArvSFsa/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/UYekeJrT3JvjyjaUmDR43m/frame_003.png',
            ],
            fps: 3,
          },
          sick: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/CDQygYtMfpBkkgjqpdmDZ2/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/8zB5i9oZcF5t33N2UxENKn/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/nYG3GpsojccvAxEiwpJ4UN/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/NfpWWYK9YSS65j8h8heyrq/frame_003.png',
            ],
            fps: 3,
          },
          tired: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/mftfgLxurecv9DcfRFhJqY/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/PPRTyZ7oGCR2EPjdj3tQN4/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/Mm4Zr748M7dXCPDW7Sp5DD/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/hBvcatzbVi3Wp8JVtSmJG5/frame_003.png',
            ],
            fps: 3,
          },
          excited: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/dRHCXsKz8tJoqMpkpAqfQv/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/BvMJP8WG2nscfipjoTm3Ci/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/FJDkL9fcNtjLHJDCj6wu9J/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/P49ZwSYp4NXfTsXzYiHMf7/frame_003.png',
            ],
            fps: 3,
          },
          dead: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/jLGgFaTTV8UnNrYyQUH9XV/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/WmQ46ZmAMpzHxqbWJqvhPa/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/TK8HkBc3gt4nmvNkt8FRVs/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/9hxncd49NWA4TSsBbUHAgV/frame_003.png',
            ],
            fps: 1,
            loop: false,
          },
        },
        actionSprites: {
          feed: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/Poj3LNJzfTNtq9yJpsphoE/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/hJwU6y6ST8DgSQCseaLr9w/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/BiGBvF6Rtiaxr2dcEpUoFU/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/iXgfGZrvjD6s6HEyrKC6MK/frame_003.png',
            ],
            fps: 3,
          },
          sleep: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/e4q5jsZMReyCKZfc4hsfmL/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/8EsTEEd7LZfwEF67Ypm8mx/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/XBQ6eKoQm7jN5nFsNxLQiu/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/LSiHRN9tJgock8QpQZn2bW/frame_003.png',
            ],
            fps: 3,
          },
          bathe: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/BMVT8nqY83KuZK5xMCyPkq/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/bHcRwMmSqefg7gy5UhEydJ/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/RZQqewH4ekqewxVMLGjHNR/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/3TRKZoXcymh8ja28YpbCKG/frame_003.png',
            ],
            fps: 3,
          },
          playLeft: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/CpjMoujHuMRibkWukzUDgG/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/mDJpknSy53U7BXKbB36S3x/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/MJp2DpXvGZKac6QQ9P7DTH/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/WR28nafwFQZDxSPxB6o96i/frame_003.png',
            ],
            fps: 3,
          },
          playRight: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/gaXAG7PdQisYsKpusuBxFt/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/YapGmhnxuH5HpJFwRMEM2d/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/buNWumy3xBHsS78MRp5Vmk/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/cpESQhyYhYhCHEgnAXnA4Z/frame_003.png',
            ],
            fps: 3,
          },
        },
      },
    },
  },
  {
    id: 'chupacabra',
    name: 'Chupacabra',
    habitat: 'Pine Forest',
    description: 'A mysterious beast prowling the moonlit pines.',
    color: '#9B59B6',
    accentColor: '#6C3483',
    backgroundFrames: [
      'https://cdn-ai.onspace.ai/onspace/files/PhWKXzt3oUQeGncKg8xymo/Add_moonlight_highlights_202602071443_(2).jpeg',
      'https://cdn-ai.onspace.ai/onspace/files/YAr8ed6MWzvh8pyYPejNPG/Generate_a_jersey_202602071438.jpeg',
    ],
  },
  {
    id: 'mothman',
    name: 'Mothman',
    habitat: 'Old Highway',
    description: 'A winged terror perched on the crumbling overpass.',
    color: '#4A4A8A',
    accentColor: '#2C2C54',
    backgroundFrames: [
      'https://cdn-ai.onspace.ai/onspace/files/die42m6z3KosvQgfU88m3z/Add_moonlight_highlights_202602071442.jpeg',
      'https://cdn-ai.onspace.ai/onspace/files/L38N9K2iWEppoe2uzgod9e/Remove_the_mothman_202602071439.jpeg',
    ],
    sprites: {
      neutral: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/8m7vRNyALTffPjfzohpGSV/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/RuAfngCuFmHdEDSty5fCjU/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/9RsKsBMpR88XSgh4gdKerx/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/EFNuRhiTRgQZQqH97KgqCK/frame_003.png',
        ],
        fps: 3,
      },
      sad: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/A5tUMZbpxvv4P4dgzeyVn8/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/fxu6x42cj8ZinakmEM4P3r/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/dNfHYtdWbnFYCtAzNsoA82/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/7dQShVoPKkXLnpiaMVhbm9/frame_003.png',
        ],
        fps: 3,
      },
      bored: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/XWUBwEMGvsdnDjjMNdbxMC/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/baKFhtD2dVxJaR8kWDcJaJ/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/N6HiUaj8VKkcaGmcwPRM6i/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/KP6rpQnmuwJ3dR8CQzQHsU/frame_003.png',
        ],
        fps: 3,
      },
      happy: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/4WTXpZXDDS77NQj6JnHz3D/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/Tc3KMMRYnckuZwCDQwFpzg/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/8Vu9wmxESgJoDz8FMAZAxT/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/en9AxPQAKT9NsLQuLzzzfY/frame_003.png',
        ],
        fps: 3,
      },
      hungry: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/bysCaw8VRDx92nVpbPHmP6/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/3Hx44qoSCqCMuvhp9EYjmQ/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/T8aU8YMiAqHJi6XfSi5nNr/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/ERpuwfXRXZDihfNwEUVM4n/frame_003.png',
        ],
        fps: 3,
      },
      sick: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/dr4JLRbMztC6S2TJPGaFeL/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/euycxdHzfPkj4vJx5pTQ8n/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/CbYLNoZFgBVkEeQwU9FBTZ/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/C4eJV4wEaS9FDmEXQKjnCQ/frame_003.png',
        ],
        fps: 3,
      },
      tired: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/nXMsvySXL8ywiqakXkn9Ek/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/MNZhne3AKdngCX4fHHrNX8/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/2CTfgN2T3yXDtEnxyBAYu4/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/DCgKSPBRR4WBHjnYFFBHBU/frame_003.png',
        ],
        fps: 3,
      },
      excited: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/kE9EjqEiKQmpqbUMJVMp2U/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/XL4zkEscuy5koSx384PwkJ/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/Q4ksBeX7QLNLNgsb47NLuv/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/ZXeZAREF9L8v9ip728cdHk/frame_003.png',
        ],
        fps: 3,
      },
      dead: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/8Kb6fypNceNNDXzp6B3g47/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/4yYDSaSXT2butR3YkyfN7d/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/m9ZierErqbaTeNLMUgGYox/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/XRqVqTJKQt2E2Jd5aLstNA/frame_003.png',
        ],
        fps: 1,
        loop: false,
      },
    },
    actionSprites: {
      feed: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/TfdLXWzghsQ5tMgaJQJJGg/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/JTQnpteBgoiYCtBZ5kGiUW/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/KrkyWbWe7k8XkJbRsikNMS/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/FWkj9yZVPN5RAHgJpmfrrB/frame_003.png',
        ],
        fps: 3,
      },
      sleep: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/2sLZjiLzHH2QwjQfLFJfg3/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/BqthonANMeCmT7iShdLLKW/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/MGJLDJEReAiURYgnQ2zJsr/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/jQUsf4k8zhhGjwPWozD5L9/frame_003.png',
        ],
        fps: 3,
      },
      bathe: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/TUiriLrpuAyfRRsXRHfV3K/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/amAn4wnUtaXBq4BdvZ3PQD/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/XomzmP2ubgmE7BuHrGVZNa/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/7YKEbPfTpTpCQTmHcr26Rj/frame_003.png',
        ],
        fps: 3,
      },
      play: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/m85mcWMPZevm3MVvYswNV5/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/8wLi7SVS57vQyA89HcNDit/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/A3XSWDs5dxP4JGVPiXukvM/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/dsyQc4a6ssYou8e5DbJAYw/frame_003.png',
          'https://cdn-ai.onspace.ai/onspace/files/JWZiUS2N8bmQX6aQ5RaMDK/frame_004.png',
          'https://cdn-ai.onspace.ai/onspace/files/S8fMGFWPL3wBg5HstoAkDH/frame_005.png',
        ],
        fps: 3,
      },
      playLeft: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/35RsWk6r3sBPZ7F5zeqFAv/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/2W33uFAauZA6CRHRmtLLgn/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/7GZNVsP3bzDqEosmNoSv5d/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/kjMuJcr923Hj2cBMrCzgzJ/frame_003.png',
          'https://cdn-ai.onspace.ai/onspace/files/88m5qX5rjkzyaCctVcPXCC/frame_004.png',
          'https://cdn-ai.onspace.ai/onspace/files/7yDfUYWcp54S2iZNxUXePv/frame_005.png',
        ],
        fps: 3,
      },
      playRight: {
        idle: [
          'https://cdn-ai.onspace.ai/onspace/files/B8sCVvZUkNvRGFJo5RqSmb/frame_000.png',
          'https://cdn-ai.onspace.ai/onspace/files/neH33XzCZBBH555yfVqmsV/frame_001.png',
          'https://cdn-ai.onspace.ai/onspace/files/f6zUTQLPqKTgdiSXWG2aCb/frame_002.png',
          'https://cdn-ai.onspace.ai/onspace/files/AXXjXxMQthi4LrqhYLDRK7/frame_003.png',
          'https://cdn-ai.onspace.ai/onspace/files/FcjEWBGCGEd3wkqLKpsVRG/frame_004.png',
          'https://cdn-ai.onspace.ai/onspace/files/BNdHqHhtLVnFBocqE2d2a3/frame_005.png',
        ],
        fps: 3,
      },
    },
    stageSprites: {
      adult: {
        sprites: {
          neutral: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/CxuESfoFe2pSzdMmMyhoLM/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/RygPk7Kfn7wVj9kLktdEor/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/3g6pDxNJqh5wC98ZJYjs5K/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/X2xuZHJRUF3rkgHZRLqdas/frame_003.png',
            ],
            fps: 3,
          },
          loved: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/JcCMPyavsNiN59QrQoUrSB/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/K83LxFVbYEcm4Z5VqQnJZM/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/X8YsYhphiVQEaBXDVQPzcJ/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/cCwz9FnmaLvXELovJQinbp/frame_003.png',
            ],
            fps: 3,
          },
          bored: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/YPkjfYaqqCckwhV4tFAeox/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/n5fcBzDw8ziy95qrvdoZKj/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/gfo2o4oNzynsDEWid3s2aD/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/htjTDACRYd3hKzvxNAKbHA/frame_003.png',
            ],
            fps: 3,
          },
          happy: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/QAZWueb4U6cQqutKkYWDGL/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/o3SoKUofnZSgVT4pbbesvP/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/3hjqgDN3rWszc989CRpufm/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/aSY4YYCseY4BTXiEx8k823/frame_003.png',
            ],
            fps: 3,
          },
          excited: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/QAZWueb4U6cQqutKkYWDGL/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/o3SoKUofnZSgVT4pbbesvP/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/3hjqgDN3rWszc989CRpufm/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/aSY4YYCseY4BTXiEx8k823/frame_003.png',
            ],
            fps: 3,
          },
          hungry: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/k7vQUv3mBUwDidxudAxHqt/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/hiKR7oTrmtQMXEzr4yCrsJ/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/KFqK38CJ6XKRBxn5ZCkg3B/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/8Lv7km5jPACLdpuTbg5TNa/frame_003.png',
            ],
            fps: 3,
          },
          sad: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/SAKVqr9ApSMfHX97pFG6cH/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/NabkU9gWpHaAHZnTDfSasR/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/A8VLew8ayEvg2yY85JjfAt/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/jXtmPHwCugRqiTCk6hLVHK/frame_003.png',
            ],
            fps: 3,
          },
          sick: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/ELXuwSJjaTdgCwjJ8uXfg7/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/9vi2MqZ56TjNMriPVxp7Am/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/XxeRfNKJJwDM9yRm4AXySV/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/f4y9Z4bhZsk8a5ocZw4QJq/frame_003.png',
            ],
            fps: 3,
          },
          tired: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/Uc52Q2QJtMzbXtUduwDHBv/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/8EH4vfbQTSqvT2afE3LMSN/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/eDnyvi3vD7mS8QzEMrS7Lf/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/YqzDg5RLQt2qg75BwGScYJ/frame_003.png',
            ],
            fps: 3,
          },
          dead: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/2Bd9TDppHA9Sjbechxwyz8/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/7vFwZ9tdKxSzAbkMTu4Ked/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/6CmqB8ZVZsH2X2cvhHFWkZ/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/b3siae9xBgdwcQtYoztf3S/frame_003.png',
            ],
            fps: 1,
            loop: false,
          },
        },
        actionSprites: {
          feed: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/hbVdmxWzxpaRpNudumcEHJ/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/CzaSA7da2jmWDoEJTQraGe/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/jDb4sZQz7fmDTbE7eqvjrG/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/QGiyptCRKUVcTfeGxXPWQM/frame_003.png',
            ],
            fps: 3,
          },
          playLeft: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/5c6JHsbZUyukP7EkVpugRi/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/o3ZTdkx8HyrhbQzBsvg43c/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/gAS9QeRY7u3QQnVM5da6de/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/TtcgKaKdxGsdcLnT9TChuK/frame_003.png',
            ],
            fps: 3,
          },
          playRight: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/RRHhHE6PTYUzdUbkGKUm2o/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/RUCvNogaPrHdKXUUrBiAMy/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/3QzirvcQXfEmsTEqVdAEha/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/HXGTt6acoU2feCPmu74tyU/frame_003.png',
            ],
            fps: 3,
          },
          bathe: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/X4fpDzSeTuDEX96BRpLXPo/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/bpvyyS48uKLEbLYX3hyNV3/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/nGEjtGzDebcRXz7mAtv9NB/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/KDaRebWcUGyaYJDFHhdtAT/frame_003.png',
            ],
            fps: 3,
          },
          sleep: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/efnBGxHRWHA5afiFvxbtAH/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/RBUfT8ciaiXqiwVVgfpfKF/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/bisQ4nioP7N2QV7aHN973R/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/44bwUJQTLgEzc3r9PGmNNF/frame_003.png',
            ],
            fps: 3,
          },
        },
      },
      teen: {
        sprites: {
          neutral: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/LQrjfGwyk7cHaT9EfNMaFU/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/BEd8iLmWM2qN5ZjGu38v4t/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/TkmcvzLGJrcXks7DvtVaGi/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/huvKjJUjD3AhsEn4TScoy8/frame_003.png',
            ],
            fps: 3,
          },
          bored: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/DDNbYR2RMisYz5HQHRPzgS/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/cDeRKWbZUk3wzYLdtsMEvn/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/6BvtkovLy28RgRHAcPJxn7/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/B5DMzoshG6MXyKmQAYS8Rw/frame_003.png',
            ],
            fps: 3,
          },
          loved: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/mRzbTwacPXVhJ96u4F3SCF/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/YWcL3y36E7Y8DpZhnvkJGF/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/ko5KYVpyEKuk7U55CHjyrc/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/YfYQDAehmMT2LiQ4QWZnGw/frame_003.png',
            ],
            fps: 3,
          },
          sick: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/nvRbMEJYKtWYLrULX9Jjk2/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/4qLDGLBEvFAEqmN9BPxQQM/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/BcqjvLrJHx9nprvHrPtJXF/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/aEweRebzqwWREnnRHrptbR/frame_003.png',
            ],
            fps: 3,
          },
          tired: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/cypWNXf3RHsdXNHw5d9X2n/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/Zuo9UeTmKdhmMX37LeNKnK/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/84c6VV7NaL8zzEyhuyuaQ2/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/NmxwMEbuikR9U2afJ26STS/frame_003.png',
            ],
            fps: 3,
          },
          excited: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/d5Hm5Y5hKitUdVEgWAk46M/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/bCfgKXWUBwQziEANepY48D/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/Lrvpwke4pcLKmoxwiNquX6/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/X8MmRKHx8MrzMTMvEpTQDj/frame_003.png',
            ],
            fps: 3,
          },
          hungry: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/nAeQoW8VhXuX3EjtKJnQSQ/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/dHQpM6uuHhtbNb9737EQUo/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/4WGKt59NrRw9XeUXEDTzy6/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/a2ikiTkJEjjjpLvxNWYziK/frame_003.png',
            ],
            fps: 3,
          },
          sad: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/ecxbFWjqsq3ycXFjp37T7s/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/fTimttHpFnVvX6Wiqqa6wf/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/2f4RPHjdvYXWLXiMHcyhtk/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/Pt9gw8GkeUZSYseUMRn7Sf/frame_003.png',
            ],
            fps: 3,
          },
          happy: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/B7Tw3YkMToqa7aggcNM3YG/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/UNqT9zV4QxT2KxPiW6Fe6D/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/W4V3RevRXZWr7CAbgkMDyA/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/GTeSsR3Zuii7xaezHiBqvi/frame_003.png',
            ],
            fps: 3,
          },
          dead: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/FYTnkvnsoseWCNYcxiXoGV/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/3qz3LRkZ5BUDTnnfwEBUcQ/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/FLZNB8hYr5hp7iAdbBgHB5/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/kxSpaw3jdrtvMkQpEHEWU3/frame_003.png',
            ],
            fps: 1,
            loop: false,
          },
        },
        actionSprites: {
          feed: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/MCvHwmCpFH2e998mfJr9c2/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/FbTCyP36zKMXEQe2qiMku5/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/f7QEc7jU9JgUf7mHw6FzfT/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/Y5JMUbKKYFK9LhadrFxpUv/frame_003.png',
            ],
            fps: 3,
          },
          sleep: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/69LkmMigs52RE3gpbvwFqE/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/HkTQgQja34Ss33HkuJYrPR/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/jZRreDBtkTRGZmYv7mkBFu/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/dzmwQFcNSYeVejbeUMxzAL/frame_003.png',
            ],
            fps: 3,
          },
          bathe: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/fVKaJ42dPUfYoJzd6Hqotj/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/X5m5AdumcQhNUpQzJn52S6/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/gTqYmj2L5obQmxG7KHMjEH/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/hzUbsoCUXLFnz7KsBNMkrm/frame_003.png',
            ],
            fps: 3,
          },
          playRight: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/dzQPjQZ3PLfSsNvtqp7zTZ/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/cyxDSc3vRnxRsj3QsjLuXG/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/Rx9dbYDkprQmf3sDgpsTG4/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/R72qJjy2J9hGLQxmQ9hKJu/frame_003.png',
              'https://cdn-ai.onspace.ai/onspace/files/4xRWQThG8JWAy3EDuxTTRe/frame_004.png',
              'https://cdn-ai.onspace.ai/onspace/files/AwED7MnwKe7bBBu5HTzYLT/frame_005.png',
            ],
            fps: 3,
          },
          playLeft: {
            idle: [
              'https://cdn-ai.onspace.ai/onspace/files/h9KCUjhoMqfoNZ2u3eqzEx/frame_000.png',
              'https://cdn-ai.onspace.ai/onspace/files/4DtptWb2Lki4TB8zX3YmTm/frame_001.png',
              'https://cdn-ai.onspace.ai/onspace/files/ZUe8rXWqvtDw5xRmURWMPH/frame_002.png',
              'https://cdn-ai.onspace.ai/onspace/files/BCACkcwAy8ADTj9wrSSyCR/frame_003.png',
              'https://cdn-ai.onspace.ai/onspace/files/VaMFd4iYYksUQ93b8CGJfQ/frame_004.png',
              'https://cdn-ai.onspace.ai/onspace/files/UBr2RejjBYEv6FocABhsTX/frame_005.png',
            ],
            fps: 3,
          },
        },
      },
    },
  },
];

export const getPetById = (id: PetSpecies): PetData | undefined => {
  return petSpecies.find(p => p.id === id);
};
