# Component Inventory Specification

This document details the complete component inventory for the Tech Club website, strictly adhering to the approved Futuristic Corporate Technology design system.

---

## Layout Components

### Navbar
*   **Responsibilities:** Provides global navigation across the site. Displays logo, primary links, and a CTA. Includes a responsive mobile drawer.
*   **Props:** `links` (Array of objects with `label` and `href`), `activePath` (String), `ctaText` (String).
*   **States:** Default (Top of page, transparent), Scrolled (Glassmorphic background). Mobile states: Menu Open, Menu Closed.
*   **Variants:** Standard (Desktop), Drawer (Mobile).
*   **Hover interactions:** Links trigger a TextWave animation and an animated underline or subtle pill background. CTA Button scales and applies `glow-primary`.
*   **Animations:** Transition between transparent and glassmorphic (`duration-normal`, `ease-smooth`). Mobile drawer slides in from the right.
*   **Accessibility requirements:** Must use `<nav>` semantics. Use `aria-current` on the active link. Keyboard focus trapping within the mobile drawer when open. Use `aria-expanded` and `aria-controls` for the hamburger button.

### Footer
*   **Responsibilities:** Site conclusion, secondary navigation, legal links, and social media links.
*   **Props:** `quickLinks` (Array), `socialLinks` (Array), `copyrightText` (String).
*   **States:** Static.
*   **Variants:** Standard.
*   **Hover interactions:** Link text color brightens to `color-text-primary`. Social icons slightly scale and glow with `color-primary`.
*   **Animations:** Standard fast fade on link hovers (`duration-fast`, `ease-smooth`).
*   **Accessibility requirements:** Must use `<footer>` semantics. Provide `aria-label` for social icon links. Ensure clear focus states for keyboard navigation.

### Container
*   **Responsibilities:** Centers content horizontally and constrains maximum width to maintain readability. Ensures consistent lateral padding.
*   **Props:** `children` (ReactNode), `className` (String), `size` (Enum: 'sm', 'md', 'lg', 'xl').
*   **States:** Static.
*   **Variants:** Narrow (`max-w-3xl`), Standard (`max-w-7xl` / 1280px), Full (`max-w-full`).
*   **Hover interactions:** None.
*   **Animations:** None.
*   **Accessibility requirements:** None directly; it serves purely as a structural element.

### PageWrapper
*   **Responsibilities:** Wraps the entire page content, applies global background layers (like AnimatedGrid and GradientOrb), and orchestrates page-level entry/exit transitions.
*   **Props:** `children` (ReactNode), `title` (String for SEO).
*   **States:** Loading, Loaded.
*   **Variants:** Standard.
*   **Hover interactions:** None.
*   **Animations:** Initial page load fade-in and slight slide-up (`duration-slow`, `ease-smooth`). Page exit transitions for route changes.
*   **Accessibility requirements:** Should manage focus on route changes (e.g., focusing a hidden heading to announce the new page to screen readers).

---

## UI Components

### Button
*   **Responsibilities:** Triggers user actions, form submissions, and critical navigation.
*   **Props:** `children` (ReactNode), `variant` (Enum: 'primary', 'secondary', 'ghost'), `size` (Enum: 'sm', 'md', 'lg'), `onClick` (Function), `disabled` (Boolean), `icon` (ReactNode).
*   **States:** Default, Hover, Active/Pressed, Disabled, Loading.
*   **Variants:** Primary (Solid fill), Secondary (Outline/Glass), Ghost (Transparent).
*   **Hover interactions:**
    *   Primary: Triggers `glow-primary`, scales 1.02x.
    *   Secondary: Background shifts to slight glassmorphism (`rgba(255,255,255,0.05)`).
    *   Ghost: Background becomes slightly visible, text brightens.
*   **Animations:** Spring scaling on press/hover (`duration-fast`, `ease-spring`). Loading spinner crossfade.
*   **Accessibility requirements:** Use `<button>` element. Clear visible focus ring (`glow-border`). Ensure `aria-disabled` is set when disabled.

### Badge
*   **Responsibilities:** Displays status, categories, or small tags.
*   **Props:** `label` (String), `variant` (Enum: 'default', 'success', 'warning', 'error', 'accent').
*   **States:** Static.
*   **Variants:** Default (Muted text/border), Status colors (Success, Warning, Error, Accent with corresponding subtle text glow).
*   **Hover interactions:** None typically, unless interactive (in which case it brightens slightly).
*   **Animations:** None.
*   **Accessibility requirements:** If purely visual, use `aria-hidden`. Ensure it provides context via screen reader only text if it conveys status not otherwise apparent.

### SectionHeading
*   **Responsibilities:** Introduces a major section with an eyebrow label, main title, and optional description.
*   **Props:** `eyebrow` (String), `title` (String), `description` (String), `align` (Enum: 'left', 'center').
*   **States:** Hidden, Revealed (via scroll).
*   **Variants:** Left-aligned (standard sections), Center-aligned (Hero, CTA).
*   **Hover interactions:** None.
*   **Animations:** Staggered reveal on scroll. Eyebrow fades in, Title slides up, Description fades in (`duration-slow`, `ease-smooth`).
*   **Accessibility requirements:** Must use correct heading hierarchy (usually `<h2>`).

### SearchBar
*   **Responsibilities:** Allows users to filter or find content (e.g., Projects).
*   **Props:** `placeholder` (String), `value` (String), `onChange` (Function).
*   **States:** Default, Focused, Filled.
*   **Variants:** Standard.
*   **Hover interactions:** Border brightens slightly.
*   **Animations:** Focus ring uses `glow-border` with a quick fade-in (`duration-fast`).
*   **Accessibility requirements:** Use `<input type="search">`. Provide clear `aria-label`. Focus styles must be highly visible.

### FilterChip
*   **Responsibilities:** Toggles filtering categories for list views.
*   **Props:** `label` (String), `active` (Boolean), `onClick` (Function).
*   **States:** Default, Active, Hover.
*   **Variants:** Standard.
*   **Hover interactions:** Background brightens.
*   **Animations:** Quick crossfade between active/inactive background and text colors.
*   **Accessibility requirements:** Use `role="switch"` or `aria-pressed`. Keyboard navigable via Tab and toggleable via Space/Enter.

---

## Cards

### TeamCard
*   **Responsibilities:** Displays team member, mentor, or patron information.
*   **Props:** `image` (URL), `name` (String), `role` (String), `socials` (Array of Links).
*   **States:** Default, Hover.
*   **Variants:** Small (Patrons/Mentors), Standard (Council).
*   **Hover interactions:** Card lifts (`transform: translateY(-4px)`), `glow-border` activates, social icons fade in and slide up from the bottom. Image scales up 1.05x inside its mask.
*   **Animations:** Spring lift (`duration-normal`, `ease-spring`). Staggered social icon reveal.
*   **Accessibility requirements:** Provide `alt` text for images. Social links must have clear `aria-label`s.

### ProjectCard
*   **Responsibilities:** Summarizes a project and acts as a trigger for the detailed modal.
*   **Props:** `image` (URL), `title` (String), `description` (String), `tags` (Array).
*   **States:** Default, Hover.
*   **Variants:** Standard.
*   **Hover interactions:** Border glows with `color-primary`. Inner image slightly zooms. Card lifts.
*   **Animations:** Hover transitions use `ease-smooth` for colors, `ease-spring` for the lift.
*   **Accessibility requirements:** Entire card should act as a button (`role="button"`) or contain a single primary action link that covers the card. Image requires `alt` text.

### EventCard
*   **Responsibilities:** Displays event details and status.
*   **Props:** `banner` (URL), `title` (String), `date` (String), `venue` (String), `status` (Enum: 'upcoming', 'ongoing', 'completed'), `link` (URL).
*   **States:** Default, Hover.
*   **Variants:** Horizontal (List view), Vertical (Grid view).
*   **Hover interactions:** Gradient border animation activates. Card lifts.
*   **Animations:** Ongoing status features a continuous pulsing dot (`glow-accent`). Hover lift (`duration-normal`, `ease-spring`).
*   **Accessibility requirements:** Clear status text for screen readers (do not rely solely on the pulsing dot color).

### StatCard
*   **Responsibilities:** Displays numerical achievements.
*   **Props:** `value` (Number), `label` (String), `icon` (ReactNode).
*   **States:** Default, Hover.
*   **Variants:** Standard.
*   **Hover interactions:** `glow-border` activation and slight lift.
*   **Animations:** Counter animation (numbers count up from 0 to value when scrolled into view).
*   **Accessibility requirements:** The final number and label must be readable by screen readers immediately (hide the counting animation from ARIA and provide the static final value).

---

## Effects

### AnimatedGrid
*   **Responsibilities:** Provides the deep, technical background texture globally.
*   **Props:** `opacity` (Number).
*   **States:** Continuous animation.
*   **Variants:** Standard.
*   **Hover interactions:** None.
*   **Animations:** Infinite slow linear translation to simulate moving slowly over a plane.
*   **Accessibility requirements:** Set `aria-hidden="true"`. Must respect `prefers-reduced-motion` to stop the animation.

### GradientOrb
*   **Responsibilities:** Adds ambient lighting behind sections to break up pure black surfaces.
*   **Props:** `color` (Color token), `size` (Number), `blur` (Number), `position` (Object).
*   **States:** Continuous animation.
*   **Variants:** Standard.
*   **Hover interactions:** None.
*   **Animations:** Slow, organic floating/breathing (transform scale and translate).
*   **Accessibility requirements:** Set `aria-hidden="true"`. Must respect `prefers-reduced-motion`.

### MouseGlow
*   **Responsibilities:** A radial gradient that follows the mouse cursor on desktop, highlighting elements beneath it.
*   **Props:** `color` (Color token), `radius` (Number).
*   **States:** Active (Mouse moving), Inactive (Mouse out of window).
*   **Variants:** Desktop only.
*   **Hover interactions:** Highlights borders and backgrounds of glassmorphic elements it passes over.
*   **Animations:** Instantly follows mouse coordinates.
*   **Accessibility requirements:** Set `aria-hidden="true"`. Purely decorative.

### CursorFollower
*   **Responsibilities:** A smooth trailing circle that follows the cursor, adding a premium feel.
*   **Props:** None.
*   **States:** Active.
*   **Variants:** Desktop only.
*   **Hover interactions:** When hovering over clickable elements (Buttons, Cards, Links), the follower might scale down or snap to the element.
*   **Animations:** Delayed, smoothed trailing behind the actual OS cursor.
*   **Accessibility requirements:** Must be entirely hidden from screen readers. Provide a global way to disable it if it causes distraction.

### TextWave
*   **Responsibilities:** Adds dynamic character-by-character animation to important text.
*   **Props:** `text` (String).
*   **States:** Default, Hover/Triggered.
*   **Variants:** On-hover (Navbar links), On-reveal (Hero headers).
*   **Hover interactions:** Characters sequentially translate up and down slightly.
*   **Animations:** Staggered Y-axis translation and opacity change per character (`duration-fast`).
*   **Accessibility requirements:** Must maintain the original full string as accessible text; the animated split characters must be set to `aria-hidden="true"`.

### Reveal
*   **Responsibilities:** Reusable wrapper to animate elements when they scroll into the viewport.
*   **Props:** `children` (ReactNode), `delay` (Number), `direction` (Enum: 'up', 'down', 'left', 'right').
*   **States:** Hidden, Visible.
*   **Variants:** Standard.
*   **Hover interactions:** None.
*   **Animations:** Opacity fades from 0 to 1, translates from offset to 0 (`duration-normal` or `duration-slow`, `ease-smooth`).
*   **Accessibility requirements:** Must ensure content is readable by screen readers even before it visually reveals, or trigger the reveal immediately for screen reader users.
