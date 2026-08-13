# v2 Art Production Plan (audited)

## Origin of the art (confirmed)

The Afterlives character sprites are made in **PixelLab.ai**, an AI pixel-art
character generator. You prompt a character (e.g. "an adorable kawaii mothman")
from a rigged mannequin template; PixelLab produces an 8-directional,
keypoint-rigged pixel sprite; you then add animations, both built-in presets
(breathing-idle, walking) and custom prompt-driven ones you describe in plain
language. Export is a zip of rotations/, animations/<name>/<dir>/frame_NNN.png,
and metadata.json.

OnSpace was only ever the HOST for uploaded art, not the source. Do not credit
OnSpace or Meshy as the origin. It is PixelLab.

## The target: 13 core animations per character-stage

Presets (2): breathing-idle, walking
Moods (7): very happy, feeling loved, bored, tired, hungry, sick, sad and crying
Actions (4): eating, bubble bath, sleeping, death/cemetery

Required for every character-stage. Life stages: baby, teen, adult.
Full target = 7 species x 3 stages x 13 animations.

Species-specific BONUS moves (extras, tracked separately, not part of the core 13):
mothman: flying, flying-kick.  swamp: swimming, floating-in-water idle.

## Audited coverage (from uploaded exports)

7 of 21 character-stages are complete (all 13 animations):

              baby   teen   adult
  ghost         -      -      -
  swamp         X      -      X
  sasquatch     X      X      -
  chupacabra    -      -      -
  mothman       X      X      X
  cthulhu       -      -      -
  nightcrawler  -      -      -

MISSING: 14 character-stages = 182 core animations still to build.
  - 4 species with nothing yet: ghost, chupacabra, cthulhu, nightcrawler (all 3 stages)
  - 2 stage fill-ins: swamp teen, sasquatch adult

Note on naming: PixelLab animation names vary slightly between exports
("very happy" vs "happy and excited", "walk" vs "walking"). The audit matched by
meaning, not exact string.

## Checklist spreadsheet

afterlives-v2-art-checklist.xlsx has:
- Master Checklist: 13 animations x 21 character-stages grid, HAVE/missing audited
- Missing List: every missing animation listed explicitly by character-stage
- Bonus Moves: the species-specific extras
