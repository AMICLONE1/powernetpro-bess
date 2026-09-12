# 3D / Parallax Hero — preserved (not deleted)

The homepage currently uses the **original** `<Hero />`
(`src/components/sections/Hero.tsx`). The Three.js 3D hero built on top of it is
kept intact and can be switched back on at any time.

## What's saved

| File | Purpose |
| --- | --- |
| `src/components/sections/HeroScene.tsx` | The 3D hero React wrapper: centered "PowerNetPro" wordmark → header-logo scroll handoff, blur-until-loaded copy, header hidden until the scene draws, reduced-motion/no-WebGL fallback. |
| `src/components/hero3d/Scene3D.tsx` | Mounts the WebGL scene, dynamic-imports three, `onReady` reveal, pauses off-screen, disposes on unmount. |
| `src/components/hero3d/buildScene.ts` | The actual Three.js diorama: bungalow + gable roof, **rooftop solar array**, **featured BESS unit** (screen/charge-bars/glowing status ring), mountains, drifting clouds, and the **PowerNetPro half-sun** (starburst = the logo mark). Static camera, warm brand palette, subtle idle animation only. |

An earlier **2.5D parallax** version (before the full Three.js scene) also lives in
git history of `HeroScene.tsx` if the lighter, non-WebGL variant is ever wanted.

## How to bring the 3D hero back

In `src/app/page.tsx`:

```tsx
// 1. import it
import { HeroScene } from "@/components/sections/HeroScene";

// 2. render it instead of <Hero />
export default function HomePage() {
  return (
    <>
      <HeroScene />   {/* was: <Hero /> */}
      ...
```

That's the only change needed. The supporting header hooks are already in place
and are safe no-ops while `<Hero />` is used:

- `src/components/ui/Logo.tsx` — the light logo carries `data-logo-mark` and
  `opacity: var(--logo-mark-opacity, 1)` (the wordmark docks onto this box).
- `src/components/layout/Header.tsx` — the header uses
  `opacity: var(--header-ready, 1)` / `pointer-events: var(--header-ready-pe, auto)`
  so the hero can hold it back until the scene loads.

Because all three CSS vars **default to visible** when unset, the plain `<Hero />`
and every other page render normally with no side effects.

## Dependency

`three@0.169.0` (+ `@types/three`) is installed. It is **dynamically imported**
only inside `Scene3D.tsx`, so it never ships in the initial bundle and does not
affect load performance while the original hero is active.
