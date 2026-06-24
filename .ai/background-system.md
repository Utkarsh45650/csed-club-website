# Background System Specification

## Overview
The Background System is a globally shared, multi-layered visual foundation that spans across all pages of the Tech Club website. It establishes the "Futuristic Corporate Technology" aesthetic while remaining deeply subtle, ensuring maximum text readability and focus on primary content. The system relies heavily on CSS variables, hardware acceleration, and standard compositing to remain highly GPU-friendly.

---

## Layer Hierarchy (Z-Index Stack)

The background consists of four distinct layers, stacked from back to front. The entire system is anchored behind the main application content wrapper (`z-index: -1`). To ensure performance, all layers must have `pointer-events: none` to prevent them from interfering with user interactions.

1. **Layer 0 (Base):** Gradient Mesh (Deep atmospheric color)
2. **Layer 1:** Floating Glow Orbs (Dynamic focal points)
3. **Layer 2:** Animated Grid (Structural, technical texture)
4. **Layer 3 (Top):** Noise Texture (Film grain for premium finish)
5. **Layer 4 (Content):** All actual website content (Cards, Text, Navbar)

---

## 1. Gradient Mesh (Layer 0)

*   **Purpose:** Establishes the core darkness of the site while avoiding flat, dead black (`#000000`).
*   **Placement:** Fixed to the viewport, covering 100% width and height.
*   **Opacity:** 100%
*   **Design:** A subtle radial or conic CSS gradient blending the base dark colors.
    *   Center: `color-bg-surface` (`#0B1020`)
    *   Edges: `color-bg-base` (`#050816`)
*   **Motion Behaviour:** Static. It does not move, ensuring a solid, unmoving foundation that anchors the site.

## 2. Floating Glow Orbs (Layer 1)

*   **Purpose:** Injects the brand colors into the environment, creating an ambient, dynamic glow.
*   **Placement:** Absolute positioned, fixed to the viewport. Typically placed asymmetrically (e.g., one large primary orb top-right, one smaller secondary orb bottom-left).
*   **Opacity:** 15% to 25% (Very low, diffuse presence).
*   **Design:** Large, highly blurred circles (e.g., `width: 800px`, `height: 800px`, static CSS `filter: blur(150px)`).
*   **Motion Behaviour:**
    *   **Animation:** "Breathing" and floating.
    *   **Speed:** Extremely slow (`duration: 20s` to `30s` per cycle).
    *   **Movement:** Translates randomly within a small bounded area via `translate3d(x, y, 0)` and scales slightly (`scale(1.05)`).
*   **Performance:** The heavy blur is static. Only the `transform` property is animated to ensure hardware acceleration without repainting the blur every frame.

## 3. Animated Grid (Layer 2)

*   **Purpose:** Adds the specific "technical/engineering" feel associated with developer tools.
*   **Placement:** Fixed to the viewport, overflowing slightly (e.g., 150% width/height) to allow for infinite panning movement without running out of texture.
*   **Opacity:** 4% to 8% (Barely visible, subliminal).
*   **Design:** A repeating `linear-gradient` pattern creating a standard isometric or square grid. Line color: `rgba(255, 255, 255, 0.1)`. A CSS `mask-image: radial-gradient(...)` is applied to fade the grid out completely towards the edges of the screen, focusing it in the center.
*   **Motion Behaviour:**
    *   **Animation:** Infinite linear panning.
    *   **Speed:** Very slow and continuous (`duration: 60s` to `120s`).
    *   **Movement:** Moves downwards or diagonally to simulate forward momentum (`transform: translateY(...)`).

## 4. Noise Texture (Layer 3)

*   **Purpose:** Breaks up CSS color banding in gradients and adds a premium "film grain" matte finish, preventing the digital space from looking too sterile or plastic.
*   **Placement:** Fixed to the viewport, completely covering the screen.
*   **Opacity:** 2% to 4%.
*   **Design:** A tiny seamless PNG or SVG-based noise pattern repeating over the entire surface.
*   **Motion Behaviour:**
    *   **Animation:** High-speed micro-jitter (Optional, but adds realism).
    *   **Speed:** Very fast (e.g., 8-10 frames per second).
    *   **Movement:** Rapidly shifting the `background-position` by a few pixels to simulate active grain. Alternatively, swapping between two noise layers.

---

## Responsive & Performance Considerations

*   **Strict GPU Optimization:** All moving elements (Orbs, Grid) MUST exclusively animate via the `transform` and `opacity` properties. Animating `top`, `left`, `width`, `height`, or dynamically changing `filter: blur()` values triggers expensive browser layout recalculations and will destroy page scrolling performance.
*   **Reduced Motion (`prefers-reduced-motion: reduce`):**
    *   The Animated Grid must stop panning entirely.
    *   The Glow Orbs must freeze their breathing/floating animations.
    *   The Noise Texture must become static.
*   **Mobile Optimizations (`< 768px`):**
    *   Reduce the number of Glow Orbs from 2-3 to exactly 1 to save mobile memory.
    *   Disable the Animated Grid's continuous movement to conserve battery life, leaving it as a static texture.
    *   Optionally disable the Noise jitter animation.
