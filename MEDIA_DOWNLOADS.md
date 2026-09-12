# PowerNetPro — Media to Download

The site currently shows **royalty-free stock hotlinks** (Pexels) as placeholders,
set in `src/lib/media.ts`. These can rate-limit or change — replace them with your
own installation photos/video, or with downloaded stock, as soon as you can.

## How to replace
1. Download the file (or shoot your own).
2. Put it in `app/public/media/` (e.g. `public/media/hero.jpg`).
3. In `src/lib/media.ts`, change the value to `"/media/hero.jpg"`.
   That's it — every page using it updates.

**Formats:** images → WebP/JPG, ~1600–2000px wide, < 400 KB each. Video → MP4,
1080p, silent, 10–20s loop, < 6 MB.

---

## Free stock sites (all commercial-OK, no attribution required)
- **Pexels** — https://www.pexels.com (photos + video)
- **Pixabay** — https://pixabay.com (photos + video)
- **Unsplash** — https://unsplash.com (photos)
- **Coverr** — https://coverr.co (free video loops)
- **Mixkit** — https://mixkit.co/free-stock-video (free video)

## YouTube (for reference / if you license or use your own channel)
Search: "home battery storage install", "solar rooftop installation India",
"BESS commissioning", "lithium battery pack manufacturing". Only embed YouTube
you own or have rights to; for the hero, a self-hosted MP4 loop is better.

---

## Exact list (by `media.ts` key → where it shows → what to get)

| Key | Shows on | Get (search terms) |
|---|---|---|
| `heroPoster` | Home hero (big) | Rooftop solar / home battery at golden hour. **Best: your own install.** Search "solar rooftop home" |
| `heroVideo` | Home hero (optional loop) | 15–20s silent clip of an install / panels / battery LED. Coverr/Mixkit "solar" |
| `charge` / `discharge` / `backup` | Home "How storage works" (swaps per step) | 3 images: solar panels (charge), a lit home interior (discharge), a home at night/outage (backup) |
| `wiring` | Home "we supply both" | Close-up of tidy battery/inverter wiring |
| `batteryProduct` | Battery Storage hero | Studio photo of a battery unit/module, neutral background |
| `cell` / `module` / `pack` | Battery Storage "how it's built" | Lithium cell close-up; battery module; battery cabinet/pack |
| `safety` | Battery Storage + Safety | Fuse/isolation/earthing close-up, electrical panel |
| `rooftopSolar` / `solarInstall` | Solar pages, home teaser | Rooftop PV array; installer placing a panel |
| `home` / `society` / `commercial` / `industrial` | Solutions hero (each) | Indian home; apartment/lift lobby; office/server room; factory floor |
| `projectHome` / `projectSociety` / `projectIndustrial` | Home + Projects cards | Your 3 real completed installs (wide + detail) |
| `team` | About hero | Your team on site / install van |
| `partner` | Solar Partner hero | Two installers / solar + battery on a roof |

## Priority (do first)
1. **Home hero** (`heroPoster`, optional `heroVideo`) — most seen.
2. **3 real project photos** — trust, and uniquely yours.
3. **Battery product** photo (`batteryProduct`).
4. Solutions heroes (4) + rooftop solar.

Everything else is fine on stock until you have your own shots.
