# Design System Specification

## Overview
This design system defines the visual language for the Tech Club website. Inspired by the clean, premium, and futuristic aesthetics of Stripe, Linear, and Vercel, this system ensures a professional, innovative, and highly polished user experience.

---

## 1. Color Tokens

### Primary & Accent Colors
* **Primary (Brand Identity)**
  * **Token:** `color-primary` (#00D4FF)
  * **Purpose:** Core brand identity and primary interaction states.
  * **Usage:** Primary buttons, active navigation links, highlighted text, major graphical elements.
  * **Example:** The main "Apply Now" button or the active state in the Navbar.
* **Secondary (Support & Depth)**
  * **Token:** `color-secondary` (#6C63FF)
  * **Purpose:** Complements the primary color, providing depth to gradients and illustrations.
  * **Usage:** Background mesh gradients, secondary accents, illustration highlights.
  * **Example:** The subtle purple undertone in the Hero section's background orb.
* **Accent (Highlighting)**
  * **Token:** `color-accent` (#00FFC8)
  * **Purpose:** Grabbing attention for special features or micro-interactions.
  * **Usage:** Success states, glowing borders on hover, "New" badges.
  * **Example:** A glowing dot next to an "Ongoing Event".

### Background Colors
* **Background Base**
  * **Token:** `color-bg-base` (#050816)
  * **Purpose:** The deepest background layer, establishing the "dark mode" canvas.
  * **Usage:** The global body background.
  * **Example:** The foundational color beneath all sections.
* **Background Surface**
  * **Token:** `color-bg-surface` (#0B1020)
  * **Purpose:** Slightly elevated areas to distinguish from the base.
  * **Usage:** Secondary sections, large container backgrounds.
  * **Example:** The background of the "About Us" section to break up the page.
* **Background Elevated**
  * **Token:** `color-bg-elevated` (#111827)
  * **Purpose:** Highly elevated components sitting above the base and surface.
  * **Usage:** Cards, dropdowns, modals.
  * **Example:** A Project Card or the Team Member Card background.

### Text Colors
* **Text Primary**
  * **Token:** `color-text-primary` (#FFFFFF)
  * **Purpose:** Maximum contrast and readability for main content.
  * **Usage:** Headings (H1-H6), primary body text, button text.
  * **Example:** The Hero section's main headline.
* **Text Secondary**
  * **Token:** `color-text-secondary` (#D1D5DB)
  * **Purpose:** Less prominent text to establish typographic hierarchy.
  * **Usage:** Subtitles, standard paragraph text, card descriptions.
  * **Example:** The short description under a project title.
* **Text Muted**
  * **Token:** `color-text-muted` (#9CA3AF)
  * **Purpose:** Lowest hierarchy text, often used for metadata.
  * **Usage:** Dates, tags, footer links, form placeholders.
  * **Example:** The date on an Event Card.

### Semantic Colors
* **Success:** `color-success` (#22C55E)
  * **Purpose:** Positive affirmations.
  * **Usage:** Completed actions, positive indicators.
  * **Example:** "Registration Successful" toast message.
* **Warning:** `color-warning` (#F59E0B)
  * **Purpose:** Alerting users to potential issues or pending states.
  * **Usage:** Pending statuses, caution banners.
  * **Example:** "Registration Closing Soon" badge.
* **Error:** `color-error` (#EF4444)
  * **Purpose:** Destructive actions and form validation.
  * **Usage:** Error messages, delete buttons.
  * **Example:** "Invalid Email" text under an input field.

---

## 2. Typography Scale

Typography should feel modern, technical, and highly legible. Use a clean, modern sans-serif typeface (e.g., Inter, Roboto, or Geist).

* **Display / Hero**
  * **Token:** `text-hero` (72px, Line Height: 1.1, Weight: 700/800, Tracking: -0.02em)
  * **Purpose:** Maximum impact for page introductions.
  * **Usage:** Only for the main headline on the Home Page hero section.
  * **Example:** "Innovating the Future."
* **Heading 1 (H1)**
  * **Token:** `text-h1` (56px, Line Height: 1.2, Weight: 700, Tracking: -0.01em)
  * **Purpose:** Main page titles.
  * **Usage:** The title of the Projects, Team, or Events page.
  * **Example:** "Our Projects" at the top of the Projects page.
* **Heading 2 (H2)**
  * **Token:** `text-h2` (40px, Line Height: 1.2, Weight: 600, Tracking: -0.01em)
  * **Purpose:** Major section dividers.
  * **Usage:** Section headings like "Featured Projects" or "Upcoming Events".
  * **Example:** Used globally with the Section Heading component.
* **Heading 3 (H3)**
  * **Token:** `text-h3` (28px, Line Height: 1.3, Weight: 600)
  * **Purpose:** Card titles and subsection headers.
  * **Usage:** The title of a specific project inside a Project Card.
  * **Example:** "AI Navigation Robot" card title.
* **Body Large**
  * **Token:** `text-body-lg` (18px, Line Height: 1.6, Weight: 400/500)
  * **Purpose:** Introductory paragraphs or lead text.
  * **Usage:** The subtitle under the Hero heading.
  * **Example:** "Join the brightest minds building the next generation of tech."
* **Body Base**
  * **Token:** `text-body` (16px, Line Height: 1.6, Weight: 400)
  * **Purpose:** Standard reading text.
  * **Usage:** Project descriptions, about page paragraphs.
  * **Example:** Standard markdown text in a project details modal.
* **Caption / Small**
  * **Token:** `text-caption` (14px, Line Height: 1.5, Weight: 400/500)
  * **Purpose:** Metadata and small UI elements.
  * **Usage:** Tags, dates, navbar links, button text.
  * **Example:** "React", "TypeScript", or "Oct 12, 2026" on a card.

---

## 3. Spacing Scale

A strict multiple-of-4 scale to ensure perfect rhythm and alignment.

* **Space 1 / 4px:** `spacing-1`
  * **Purpose:** Minimal gaps.
  * **Usage/Example:** Between an icon and its adjacent text inside a button.
* **Space 2 / 8px:** `spacing-2`
  * **Purpose:** Tight gaps.
  * **Usage/Example:** Between a card title and its subtitle.
* **Space 3 / 12px:** `spacing-3`
  * **Purpose:** Small padding.
  * **Usage/Example:** Padding inside badges or small input fields.
* **Space 4 / 16px:** `spacing-4`
  * **Purpose:** Standard padding.
  * **Usage/Example:** Standard button padding, grid gap for dense content.
* **Space 6 / 24px:** `spacing-6`
  * **Purpose:** Medium padding.
  * **Usage/Example:** Inner padding for Project and Event cards.
* **Space 8 / 32px:** `spacing-8`
  * **Purpose:** Large gaps.
  * **Usage/Example:** Spacing between distinct elements within a section (e.g., between Section Heading and the Grid).
* **Space 12 / 48px:** `spacing-12`
  * **Purpose:** Sectional padding.
  * **Usage/Example:** Padding inside large feature blocks or modals.
* **Space 16 / 64px:** `spacing-16`
  * **Purpose:** Minor section breaks.
  * **Usage/Example:** Vertical space between compact, related sections.
* **Space 24 / 96px:** `spacing-24`
  * **Purpose:** Major section breaks.
  * **Usage/Example:** Vertical rhythm between standard distinct page sections.
* **Space 32 / 128px:** `spacing-32`
  * **Purpose:** Hero section spacing.
  * **Usage/Example:** Massive top/bottom padding for the hero section to isolate it.

---

## 4. Radius Scale

Rounded corners soften the UI, making the futuristic tech vibe feel elegant rather than harsh.

* **Radius Small**
  * **Token:** `radius-sm` (8px)
  * **Purpose:** Subtle softening for small interactive elements.
  * **Usage/Example:** Badges, tags, tooltips.
* **Radius Medium**
  * **Token:** `radius-md` (12px)
  * **Purpose:** Standard interactive elements.
  * **Usage/Example:** Buttons, input fields, dropdown menus.
* **Radius Large**
  * **Token:** `radius-lg` (16px)
  * **Purpose:** Contained blocks of content.
  * **Usage/Example:** Standard Cards (ProjectCard, EventCard).
* **Radius Extra Large**
  * **Token:** `radius-xl` (24px)
  * **Purpose:** Major structural elements.
  * **Usage/Example:** Modals, large feature banners, hero image containers.
* **Radius Full**
  * **Token:** `radius-full` (9999px)
  * **Purpose:** Perfectly circular or pill-shaped elements.
  * **Usage/Example:** Avatars, icon buttons, pill-shaped badges.

---

## 5. Shadow System

Shadows create depth and hierarchy. In dark mode, shadows must be subtle and often rely on subtle borders to assist.

* **Shadow Small (Elevated)**
  * **Token:** `shadow-sm` (0 4px 12px rgba(0,0,0,0.2))
  * **Purpose:** Subtle lift for hovering elements.
  * **Usage/Example:** Primary buttons on hover, active navbar items.
* **Shadow Medium (Floating)**
  * **Token:** `shadow-md` (0 10px 40px rgba(0,0,0,0.25))
  * **Purpose:** Standard elevation for content blocks.
  * **Usage/Example:** Floating cards, standard dropdowns.
* **Shadow Large (Modal)**
  * **Token:** `shadow-lg` (0 20px 60px rgba(0,0,0,0.4))
  * **Purpose:** Maximum elevation for overlays.
  * **Usage/Example:** Modals, full-screen mobile drawers.
* **Shadow Inner (Inset)**
  * **Token:** `shadow-inner` (inset 0 1px 0 rgba(255,255,255,0.1))
  * **Purpose:** Creating a "glass" or metallic edge effect to catch light.
  * **Usage/Example:** Top edge of buttons and cards.

---

## 6. Glow System

Glows (diffuse shadows tinted with brand colors) are critical for the "Futuristic Corporate" aesthetic.

* **Glow Primary**
  * **Token:** `glow-primary` (0 0 20px rgba(0, 212, 255, 0.3))
  * **Purpose:** Highlighting primary actions.
  * **Usage/Example:** Hover state for the primary CTA button.
* **Glow Accent**
  * **Token:** `glow-accent` (0 0 30px rgba(0, 255, 200, 0.2))
  * **Purpose:** Drawing attention to success or live features.
  * **Usage/Example:** A pulsing "Live Now" event indicator dot.
* **Glow Ambient**
  * **Token:** `glow-ambient` (0 0 100px rgba(108, 99, 255, 0.15))
  * **Purpose:** Background atmospheric lighting.
  * **Usage/Example:** Placed behind hero text or global grid sections to break up pure black.
* **Glow Border**
  * **Token:** `glow-border` (box-shadow: 0 0 0 1px rgba(0, 212, 255, 0.5))
  * **Purpose:** Sharp, precise focus states.
  * **Usage/Example:** Input focus rings, card hover borders.

---

## 7. Grid System

A standard 12-column grid provides structure and alignment.

* **Grid Columns:** 12 columns.
* **Grid Gap:** 24px (`spacing-6`).
* **Max Width:** 1280px.
* **Purpose:** To maintain readability and structured alignment across devices, especially on ultrawide monitors.
* **Usage/Example:** A row of 3 Project Cards spans 4 columns each (4x3=12). A featured hero layout might split text (7 cols) and an image (5 cols).

---

## 8. Layout Rules

* **Container Padding:** 
  * **Purpose:** Prevent content from touching screen edges. 
  * **Usage/Example:** Always maintain consistent lateral padding (e.g., 24px on mobile, 48px on tablet, auto-margin on desktop containers).
* **Vertical Rhythm:** 
  * **Purpose:** Provide breathing room between sections.
  * **Usage/Example:** Use `spacing-24` (96px) or `spacing-32` (128px) between major page sections.
* **Centering vs. Left-Align:** 
  * **Purpose:** Optimize readability.
  * **Usage/Example:** Centralize text alignment for Hero sections and short CTA sections. Left-align text for complex content, cards, and data displays (Linear-style).
* **Glassmorphism Layering:** 
  * **Purpose:** Establish a sense of depth without solid opacities.
  * **Usage/Example:** Use `backdrop-blur-md` with `rgba(255,255,255,0.02)` background and a subtle `rgba(255,255,255,0.08)` border for floating elements (Navbar, Cards).

---

## 9. Animation Tokens

Animations must be highly performant, subtle, and purposeful. Avoid bouncy or jarring movements.

* **Duration Fast**
  * **Token:** `duration-fast` (150ms)
  * **Purpose:** Immediate micro-interactions to signify responsiveness.
  * **Usage/Example:** Button hover color changes, link underlines.
* **Duration Normal**
  * **Token:** `duration-normal` (300ms)
  * **Purpose:** Standard structural movements.
  * **Usage/Example:** Card lifts on hover, modal fades, dropdown opens.
* **Duration Slow**
  * **Token:** `duration-slow` (700ms)
  * **Purpose:** Page loads and orchestrated reveals.
  * **Usage/Example:** Hero text stagger reveal, background orb floating over time.
* **Easing Spring (Snappy)**
  * **Token:** `ease-spring` (cubic-bezier(0.175, 0.885, 0.32, 1.275))
  * **Purpose:** Adding slight physicality to interactions without excessive bounce.
  * **Usage/Example:** Modal scaling, card hover lift.
* **Easing Smooth (Linear/Vercel style)**
  * **Token:** `ease-smooth` (cubic-bezier(0.4, 0, 0.2, 1))
  * **Purpose:** Elegant, frictionless motion.
  * **Usage/Example:** Page transitions, opacity fades.

---

## 10. Responsive Breakpoints

Mobile-first approach.

* **Mobile (sm):** 640px 
  * **Purpose:** Phones landscape and large phones.
  * **Usage/Example:** Switch from 1 column to 2 columns for small stat grids.
* **Tablet (md):** 768px 
  * **Purpose:** iPads, smaller tablets.
  * **Usage/Example:** Transform the mobile hamburger menu into a visible inline navbar if space permits, or adjust grid to 2 columns for cards.
* **Laptop (lg):** 1024px
  * **Purpose:** Standard laptops.
  * **Usage/Example:** Display full 3-column card layouts, expand full desktop navbar.
* **Desktop (xl):** 1280px
  * **Purpose:** Large monitors.
  * **Usage/Example:** Container stops growing and centers itself.
* **Ultrawide (2xl):** 1536px
  * **Purpose:** Extremely large displays.
  * **Usage/Example:** Backgrounds scale and bleed, content remains centered at 1280px max width.

---

## Component Styles

### Navbar Style
* **Purpose:** Global navigation.
* **Aesthetic:** Floating, glassmorphic pill or full-width bar.
* **Behavior:** Starts transparent at the top of the page. On scroll, transitions to a glassmorphic state (`backdrop-blur-lg`, `bg-opacity-10`, bottom border `rgba(255,255,255,0.05)`).
* **Interactions:** Hovering over links triggers a subtle Text Wave animation and an animated underline or subtle white background pill.

### Footer Style
* **Purpose:** Site conclusion and secondary navigation.
* **Aesthetic:** Deepest background color (`color-bg-base`), separated from the main content by a subtle 1px gradient border or a `spacing-32` gap.
* **Typography:** `text-muted` for links, `text-secondary` for headers.
* **Layout:** Multi-column grid (Brand column, Links, Legal, Socials).

### Card Style
* **Purpose:** Displaying discrete pieces of content (Projects, Events, Team).
* **Aesthetic:** Surface background (`color-bg-elevated`), `radius-lg`, with a 1px border of `rgba(255,255,255,0.05)`.
* **Interactions:** On hover, the card lifts slightly (`transform: translateY(-4px)`), the border transitions to a subtle gradient or `glow-border`, and an inner image (if present) scales up slightly (1.05x) within its masked container.

### Button Style
* **Primary Button:** Solid `color-primary` background, `color-bg-base` text (dark text on bright background for maximum contrast). `radius-md`. On hover, applies `glow-primary` and scales 1.02x (`duration-fast`, `ease-spring`).
* **Secondary Button:** Transparent background, `color-text-primary` text, border `rgba(255,255,255,0.1)`. `radius-md`. On hover, background transitions to `rgba(255,255,255,0.05)`.
* **Ghost Button:** No border, `color-text-secondary` text. `radius-md`. On hover, text brightens to `color-text-primary` and background becomes `rgba(255,255,255,0.03)`.

### Section Layout Style
* **Heading (Section Heading Component):** Left-aligned (or centered for major sections like Hero/CTA). Includes a small, uppercase "Eyebrow" label in `color-primary` (`text-caption`), followed by a `text-h2` title, and a `text-body` description in `color-text-secondary`.
* **Content:** Displayed in a CSS Grid below the heading, separated by `spacing-12`.
* **Reveal:** Sections should fade and slide up (`duration-slow`, `ease-smooth`) by 20px as they enter the viewport via scroll.
