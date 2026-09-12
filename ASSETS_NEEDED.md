# PowerNetPro — Images & Video Needed

The site is built with styled **placeholder slots**. Each slot on the site shows
a label + a one-line hint describing the shot. This is the full list, grouped by
page, with what to capture and where each file goes.

## How to add an asset
1. Put the file in `app/public/media/` (e.g. `public/media/hero.mp4`).
2. In the page, pass it to the `<Media>` slot: add `src="/media/hero.mp4"` (and
   `video` for video, plus a real `alt`). The placeholder disappears.
3. Recommended: images as **WebP/AVIF**, ~1600–2000px wide; video as **MP4/WebM**,
   1080p, silent, 10–20s loop, < 6 MB.

Open-source stock to start (swap for your own installs later): **Pexels**,
**Unsplash**, **Pixabay** (all free, commercial-OK). Search terms in brackets.

---

## Home (`/`)
| Slot | Type | What to capture |
|---|---|---|
| Hero | **Video** (or wide photo) | 15–20s silent loop of a real wall-mounted battery install at a home at dusk, warm interior lights on. [stock: "home battery storage", "solar battery wall"] |
| How storage works | Image | Clean photo/diagram of a wall-mounted battery + inverter, cabling visible. [stock: "battery inverter wall", "home energy storage unit"] |
| Projects ×3 | Image | One install photo per project (home / society / industrial), Pune settings. |
| Solar teaser | Image | Aerial/drone shot of a rooftop solar array, golden hour. [stock: "rooftop solar aerial"] |

## Battery Storage (`/battery-storage`)
| Slot | Type | What to capture |
|---|---|---|
| Hero | Image | Studio product photo of the battery pack — neutral background, one clean angle. [stock: "battery module product", "lithium battery pack"] |
| Cell / Module / Pack ×3 | Image | Close-ups or clean illustrations of a single LFP cell, a module, and a finished pack. [stock: "lithium cell", "battery module", "battery cabinet"] |
| Safety detail | Image | Close-up of fusing, isolation switch and earthing inside a cabinet. [stock: "electrical panel wiring", "busbar fuse"] |

## Lithium vs Lead-Acid (`/lithium-vs-lead-acid`)
| Slot | Type | What to capture |
|---|---|---|
| Two cutaways | Image (illustration) | Internal-construction illustration of a lead-acid battery and an LFP battery. Line/technical style. (Best made as custom illustrations.) |

## Solutions (`/solutions/homes|societies|commercial|industrial`)
| Slot | Type | What to capture |
|---|---|---|
| Hero (each) | Image | A real setting per audience: a home exterior/interior; a housing-society common area/lift lobby; an office/server room; a factory floor. [stock: "indian home", "apartment lobby", "office server room", "factory floor"] |

## Solar EPC (`/solar`)
| Slot | Type | What to capture |
|---|---|---|
| Hero | Image | Rooftop solar array on a Pune building, golden hour. [stock: "rooftop solar panels"] |

## Projects (`/projects`)
| Slot | Type | What to capture |
|---|---|---|
| Card ×3 | Image | Wide + detail shots of each completed install (enclosure, cabling, earthing). **Photograph every real install going forward — this is the one asset a competitor can't copy.** |

## About (`/about`)
| Slot | Type | What to capture |
|---|---|---|
| Hero | Image | The team or the branded install van on site. |
| Team ×4 | Image | Square portraits of team members. |

## Safety (`/safety`)
| Slot | Type | What to capture |
|---|---|---|
| Hero | Image | Close-up of protection hardware (fusing / isolation / earthing). |
| Certifications ×3 | (later) | Scans/photos of certification & warranty documents. |

---

## Priority order (do these first)
1. **Home hero video** — the single most important asset.
2. **3 real project photos** — trust, and they're yours alone.
3. **Battery product photo** — for the Battery Storage hero.
4. Solutions hero photos (4) and the solar rooftop shot.

Everything else can stay as a placeholder at launch — the design is built to look
complete without photos, and each slot upgrades independently.
