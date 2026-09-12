# PowerNetPro — Image Generation Prompts

Prompts tuned to this site's exact look and needs. Works with Midjourney,
DALL·E 3, Ideogram, Firefly, Flux, or Stable Diffusion.

## Global style (paste into EVERY prompt)
> Warm, natural, photographic (not CGI). Soft daylight, warm cream/beige tones,
> muted earthy palette with subtle terracotta-orange and golden-amber accents.
> Clean, premium, editorial energy-brand aesthetic. Indian setting (Pune,
> Maharashtra). No text, no logos, no watermarks, realistic proportions.
> Shallow depth of field where noted. Aspect noted per shot.

**Brand palette to echo in scenes:** cream `#F6F2EA`, terracotta `#E4622E`,
gold `#F5A623`, deep forest green `#1F3D34`, near-black `#211D18`.

For Midjourney add: `--style raw --ar 16:9 --v 6` (change `--ar` per shot).

---

## 1 — Home hero (`heroPoster`) · 16:9
> A modern Indian home wall at golden hour with a sleek wall-mounted lithium
> battery unit and a compact inverter beside it, tidy conduit and cabling, warm
> interior lights glowing through a window, calm and reassuring mood, terracotta
> and cream tones, wide cinematic shot, soft golden light. --ar 16:9

**Optional hero video (`heroVideo`) 15–20s silent loop:** slow push-in on the
same wall-mounted battery with its status LED softly pulsing, warm light, gentle
handheld feel.

## 2 — "How storage works" (3 swapping images) · 4:3 each
- **Charge (`charge`)** — > Rooftop solar panels on an Indian home under bright midday sun feeding a home battery, sense of energy flowing in, warm clean daylight, wide angle. --ar 4:3
- **Discharge (`discharge`)** — > Cozy Indian living room in the early evening, lamps and TV on, warm interior glow, calm family-home feeling, power clearly on during dusk outside the window. --ar 4:3
- **Backup (`backup`)** — > An Indian neighbourhood at night during a power cut, all houses dark except ONE home with warm lights on, quietly powered, subtle hero contrast, cinematic. --ar 4:3

## 3 — "We supply both / wiring" (`wiring`) · 4:3
> Extreme close-up of neat professional battery and inverter wiring inside an
> open enclosure, colour-coded cables, tidy cable management, torque-marked
> lugs, shallow depth of field, cool clean workmanship, warm ambient light.
> --ar 4:3

## 4 — Battery product (`batteryProduct`) · 4:3
> Studio product photograph of a sleek matte dark-grey home battery storage unit
> with a subtle warm-amber status light, clean seamless cream/beige background,
> soft top-left key light, gentle contact shadow, premium and minimal, Tesla
> Powerwall energy but distinct. --ar 4:3

## 5 — Cell / Module / Pack (`cell` / `module` / `pack`) · 4:3
- > Macro photo of a single cylindrical lithium iron phosphate (LFP) battery cell standing upright, metallic top terminal, clean dark surface, dramatic side light. --ar 4:3
- > A battery module: rows of prismatic LFP cells wired together with a blue BMS board, precise and technical, studio light on dark surface. --ar 4:3
- > A finished battery pack enclosure, matte dark casing sealed and clean, ready to install, neutral studio background. --ar 4:3

## 6 — Safety detail (`safety`) · 4:3
> Close-up of electrical safety hardware inside a battery cabinet: fuses, an
> isolation switch, earthing connection, clean orderly panel, cool clinical
> light, trustworthy engineering feel. --ar 4:3

## 7 — Rooftop solar (`rooftopSolar`) & install (`solarInstall`) · 4:3 / 3:2
- > Aerial drone view of neat rows of dark solar panels on an Indian rooftop, clear blue sky, long golden-hour shadows, clean and geometric. --ar 4:3
- > An installer in a branded polo carefully placing a solar panel on a tiled Indian roof, gloves on, safe and professional, warm daylight. --ar 3:2

## 8 — Audience heroes · 4:3 each
- **Homes (`home`)** — > Warm exterior of a middle-class Indian independent house in Pune at dusk, lights on, welcoming, a discreet battery unit on the side wall. --ar 4:3
- **Societies (`society`)** — > A modern Indian apartment housing-society lobby / lift area, clean and lit, calm, sense of reliable common-area power. --ar 4:3
- **Commercial (`commercial`)** — > A tidy modern office / small server room with equipment running smoothly, cool professional light, no people. --ar 4:3
- **Industrial (`industrial`)** — > A clean modern Indian factory floor with machinery, an industrial battery/BESS rack in view, safety signage, high-vis order. --ar 4:3

## 9 — Projects (`projectHome` / `projectSociety` / `projectIndustrial`) · 4:3
> Documentary photo of a completed PowerNetPro-style install — show the
> enclosure, the cabling and the earthing clearly; workmanship is the subject;
> natural light, wide + detail feel. (One per segment: home wall / society
> utility room / factory rack.) --ar 4:3
**Best replaced with your own real install photos.**

## 10 — About team (`team`) · 3:2
> A small professional Indian energy-engineering team in matching branded polo
> shirts standing in front of a install van or a completed rooftop install,
> confident but approachable, natural outdoor light, Pune setting. --ar 3:2

## 11 — Solar partner (`partner`) · 4:3
> Two installers on a rooftop, one handling solar panels and one beside a battery
> unit, collaborating, warm daylight, sense of partnership and teamwork. --ar 4:3

---

## Tips
- Generate 4–6 variations per slot, pick the warmest/cleanest.
- Keep people's faces turned or mid-action (avoids the "stock-smile" look the
  brand should avoid).
- Export ~1600–2000px wide, compress to WebP/JPG < 400 KB.
- Drop files in `public/media/` and point `src/lib/media.ts` at them (see
  `MEDIA_DOWNLOADS.md`).
