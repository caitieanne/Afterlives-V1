# v2 Art Production Plan

## Origin of the art (confirmed)

The Afterlives character sprites are made in **PixelLab.ai**, an AI pixel-art
character generator. The pipeline is:

1. Prompt a character (e.g. "an adorable kawaii mothman") from a rigged
   `mannequin` template. PixelLab generates a pixel sprite.
2. The sprite is **8-directional** (N, NE, E, SE, S, SW, W, NW) and **rigged with
   keypoints**, so new directions and poses are generated, not redrawn.
3. Animations are added two ways: built-in presets (`breathing-idle`, `walking`)
   and **custom prompt-driven animations** you describe in plain language
   (e.g. "taking a bubble bath in a white clawfoot tub", "the character dies and
   turns into a cemetery plot", "hungry", "very happy", "sick").
4. Export as a zip: `rotations/` (8 direction stills), `animations/<name>/<dir>/frame_NNN.png`,
   and a `metadata.json` with the character prompt, keypoints, and frame index.

The pixel sprites are hosted on OnSpace only because the older Expo app
(this repo) was built there; OnSpace is the HOST, not the source. The
`cdn-ai.onspace.ai` URLs and the "add moonlight highlights" style filenames are
OnSpace re-hosting and editing uploaded art, not the origin.

Note: an earlier illustrated (full-colour cartoon) art set also exists on the
OnSpace CDN and is what the current lander's "living diorama" shows. The PixelLab
pixel sprites are the direction that actually matches the game. Decide which set
v2 uses before scoping (see below).

## Why this matters for production

Because PixelLab characters are **rigged and prompt-driven**, extending a species
is cheap: you reuse the character and request more animations/directions, rather
than hand-drawing frames. A single custom animation is 4 frames per direction.
Reference export ("an adorable kawaii mothman") contained:
- 8 direction rotations
- 2 preset animations (breathing-idle, walking)
- 11 custom animations (moods + activities), 4 frames each

## Checklist spreadsheet

`afterlives-v2-art-checklist.xlsx` maps coverage across the 7 game species. Note
the frame counts in it were scoped against the older OnSpace set (8 moods x 4
frames per stage). Re-scope against the PixelLab workflow if v2 uses these pixel
sprites: the unit of work becomes "generate the character + N custom animations
per species," which is faster than the raw frame count implies.

Species in the game: ghost, swamp, sasquatch, chupacabra, mothman, cthulhu,
nightcrawler.
