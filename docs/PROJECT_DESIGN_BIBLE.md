# CraveCart Design System
## Version 0.1 (Design Proposal)

This document proposes the complete visual language, user interface standards, user experience principles, and component guidelines for the **CraveCart** application. It serves as a unified design specification to ensure visual consistency, accessibility, and high-fidelity rendering throughout future development milestones.

---

## 1. Design Vision

The core mission of CraveCart is to provide a seamless, premium, and appetizing food ordering experience.

### 1.1 Brand Personality
* **Appetizing & Food-Centric:** Food is the hero. The layout frame acts as a high-contrast showcase for culinary imagery.
* **Warm & Welcoming:** Ordering food is a joyful, comforting experience. We use warm primary colors, rounded corners, and soft typography to establish an inviting visual tone.
* **Intelligent & Efficient:** Delivery is about accuracy and speed. We communicate reliable timing and order precision using explicit statuses, clear navigation, and functional icons.

### 1.2 UX Principles & Long-term Goals
* **Frictionless Navigation:** We minimize clicks to browse and check out, grouping actions logically.
* **Micro-Delights:** Buttons, cards, and interactive fields react smoothly using ease-in-out transitions.
* **Inclusive Accessibility:** We design for WCAG 2.1 AA compliance from the start, ensuring correct color contrasts, focus states, and screen reader semantic landmarks.

---

## 2. Color System

To foster appetite and warmth, we recommend replacing cool Indigo tones with a food-oriented primary color scheme centered around **Orange** and **Amber**.

| Color Token | Recommended Value | Intended Purpose & Usage | Avoid Using When... |
| :--- | :--- | :--- | :--- |
| **Primary (Brand)** | Orange 600 (`#ea580c`) | Primary buttons, brand headers, active nav items, highlighting main actions. | Writing large blocks of body copy (reduces legibility). |
| **Primary Accent** | Orange 700 (`#c2410c`) | Hover states of primary buttons, gradients for CTA banners, special promotions. | Styling status indications like success or errors. |
| **Secondary** | Slate 600 (`#475569`) | Outlined buttons, auxiliary actions, borders, filters. | Primary buttons or main action callouts. |
| **Accent** | Amber 500 (`#f59e0b`) | Star ratings, highlighted promotion badges, special tags. | Styling success messages or standard navigations. |
| **Success** | Emerald 600 (`#059669`) | "Open" status indicators, order completed alerts, checkout success. | Highlighting alerts or warning details. |
| **Warning** | Amber 600 (`#d97706`) | "Busy" kitchen status badges, delay warnings, pending states. | Standard background styling or successful checkouts. |
| **Error** | Rose 600 (`#e11d48`) | "Closed" overlay badges, error alerts, input validation errors. | Accent banners or category styling. |
| **Background** | Slate 50 (`#f8fafc`) | Main viewport background, providing contrast for white cards. | Inside card backgrounds (reduces separation). |
| **Surface/Card** | White (`#ffffff`) | Card frames, headers, dropdown drawers, dialog bodies. | Overlay filters (causes blending). |
| **Border** | Slate 200 (`#e2e8f0`) | Card boundaries, input outlines, table rows, button outlines. | Highlighting active states (use primary/accent colors). |
| **Divider** | Slate 100 (`#f1f5f9`) | Internal card separators, metadata partitions. | Framing high-level containers (use Borders instead). |
| **Text (Primary)** | Slate 900 (`#0f172a`) | Main titles, card headings, button text, primary fields. | Muted label texts or timestamps. |
| **Text (Secondary)** | Slate 500 (`#64748b`) | Subtitles, cuisine labels, descriptions, secondary items. | Hero titles or primary buttons (needs higher contrast). |
| **Text (Muted)** | Slate 400 (`#94a3b8`) | Timestamps, placeholder labels, inactive nav descriptions. | Crucial data fields or active instruction notes. |

---

## 3. Typography System

We recommend a typography system combining **Plus Jakarta Sans** for headings and **Inter** for body text.

### 3.1 Typography Pairing & Rationale
* **Headings:** **Plus Jakarta Sans** — A modern, geometric sans-serif with subtle warm curves. It brings character, personality, and an appetite-whetting warmth to titles.
* **Body Text:** **Inter** — An exceptionally legible typeface designed specifically for UI screens. It remains crisp, readable, and highly readable in dense lists, small captions, and metadata arrays.

### 3.2 Typography Scale & Rhythm
* **Hero Title (Desktop: 36px / Mobile: 30px):** `font-extrabold`, line-height `tight` (`leading-tight`), tracking `tight`. Used on landing pages to grab attention.
* **Page Title (Desktop: 30px / Mobile: 24px):** `font-extrabold`, line-height `tight`, tracking `tight`. Heads main workspace pages (e.g. Restaurants listing).
* **Section Heading (Desktop: 24px / Mobile: 20px):** `font-bold`, line-height `snug` (`leading-snug`), tracking `tight`. Groups card lists.
* **Card Title (16px / 1.0rem):** `font-bold`, line-height `normal`. Identifies cards.
* **Body Copy (14px / 0.875rem):** `font-normal`, line-height `relaxed` (`leading-relaxed`), Slate 500 text color. Ensures comfortable reading of descriptions.
* **Button Labels (14px / 0.875rem):** `font-semibold`, line-height `none`. Center aligned.
* **Caption / Small (12px / 0.75rem):** `font-medium`, line-height `normal`. Formats times, ratings, and prices.

---

## 4. Spacing System

A consistent spacing system creates visual alignment and grouping, guiding the user's eye naturally. We propose an 8px grid spacing scale:

* **4px (`space-1`):** Badge padding, rating star text gaps.
* **8px (`space-2`):** Cuisine tags margin, header text description gaps.
* **12px (`space-3`):** Small component paddings, button internal margins.
* **16px (`space-4`):** Default card content paddings, layout elements margins.
* **24px (`space-6`):** Grid column gaps, page wrapper paddings.
* **32px (`space-8`):** Section margins on mobile, large layout separation pads.
* **48px (`space-12`):** Section margins on desktop, hero layout margins.

---

## 5. Border Radius System

To match the friendly, premium visual design, we recommend soft, rounded corners rather than sharp edges.

* **Modals & Dialogs:** `rounded-3xl` (24px) — Highly rounded containers for overlays.
* **Cards & Banners:** `rounded-2xl` (16px) — Smooth border containers.
* **Buttons & Inputs:** `rounded-xl` (12px) — Highly touch-friendly radius for interactive elements.
* **Badges & Small Details:** `rounded-lg` (8px) — Used for rating blocks and small status labels.
* **Avatars & Icons:** `rounded-full` — Appropriate for circular categories and profile avatars.

---

## 6. Shadows & Elevation

We recommend using soft, multi-layered shadows to represent elevation and depth without cluttering the interface.

* **Surface Layer (0dp):** No shadow. Used for page backgrounds and content dividers.
* **Level 1 (Card Resting):** `shadow-sm` (`0 1px 2px 0 rgba(0,0,0,0.05)`) — Standard borders for listing cards.
* **Level 2 (Card Active / Hover):** `shadow-md` (`0 4px 6px -1px rgba(0,0,0,0.1)`) — Indicates interactive focus.
* **Level 3 (Popovers & Drawers):** `shadow-lg` (`0 10px 15px -3px rgba(0,0,0,0.1)`) — Floats above pages.
* **Level 4 (Modals):** `shadow-xl` — Full overlay elevation.

---

## 7. Button Design System

Buttons must have distinct visual weights to guide users through checkout, search, or browsing paths.

### 7.1 States & Sizing
* **Primary Button:** Solid Orange 600 background, bold white text. Focus outline: `focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`.
* **Secondary Button:** Slate 100 background, Slate 700 text. Used for auxiliary landing triggers.
* **Outlined Button:** Transparent background, Slate 200 border, Slate 700 text.
* **Disabled Button:** Opacity 50%, Slate 100 background, Slate 400 text, `cursor-not-allowed`.
* **Hover Interaction:** Transition: `transition-colors duration-200`. Open button hovers translate upward slightly (`hover:translate-y-[-1px]`) with Orange 700 backgrounds. Closed buttons disable hover effects.

---

## 8. Card Design Guidelines

Cards organize listings visually. We recommend structured specifications:

### 8.1 Card Varieties
* **Restaurant Cards:** Ratio 16:9 images. Ratings badge floats at top-right. Cuisines list fits on one line. Footer separates time and price tags with a Slate 100 divider. Hover: Open restaurants scale up slightly (`hover:translate-y-[-2px]`) with soft shadow transitions (`hover:shadow-md`). Closed ones remain static.
* **Category Cards:** Circular image with center cropping. Category title positioned underneath, centered.
* **Future Food Cards:** Horizontal layout. Title, price, description, and an "Add to Cart" button on the right, with a 1:1 image on the left.
* **Future Cart Cards:** Left-aligned item name and price, center-aligned quantity controls (+/-), right-aligned trash icon.
* **Future Order Cards:** Compact summary showing order date, item names, status badge, cost total, and a "Reorder" button.

---

## 9. Page Layout Standards

Consistent layouts build familiarity, making the application easier to navigate.

* **Landing Pages (Home):** Built with wide vertical margins (`py-16 sm:py-24`) to separate content blocks (Hero, Category Grid, Featured Listings, Benefits, CTA).
* **Listing Pages (Browse):** Clean left-aligned page header with catalog grid below (3 columns desktop, 2 columns tablet, 1 column mobile).
* **Detail Pages (Menu):** Wide visual header detailing restaurant metadata, with menu categories on the left and a sticky Cart panel on the right.

---

## 10. Iconography

To maintain UI consistency with React integration libraries, we recommend using standard **Lucide React** icons.

* **Stroke Width:** Maintain `2.0` for navigation icons and `1.5` for descriptions.
* **Sizing Rules:**
  * Small inline helper icons: `16px x 16px` (e.g., rating star, clock).
  * Main header / navbar icons: `24px x 24px` (e.g., cart bag, user profile, menu burger).
  * Large decorative/feature icons: `48px x 48px` inside circular backgrounds.
* **Accessibility:** All decorative icons must include `aria-hidden="true"`. All functional icon triggers must include `aria-label` tags (e.g. `aria-label="View Cart"`).

---

## 11. Motion & Animation

Animations must improve experience, not delay user actions.

* **Standard Durations:**
  * Fade/hover states: `150ms` or `200ms` (`transition duration-200`).
  * Drawers/draw outs: `300ms` (`transition duration-300`).
* **Easing Curves:** Use standard ease-in-out (`cubic-bezier(0.4, 0, 0.2, 1)`).
* **Restrictions:**
  * Do not animate structural elements on page load (causes layout shifts).
  * Avoid looping animations (except load spinners).
  * Disable hover translate animations on status-closed cards.

---

## 12. Responsive Design

We design mobile-first to ensure usable layouts on small viewports.

* **Breakpoints:**
  * Mobile: default (under 640px).
  * Tablet: `sm:` (640px) and `md:` (768px).
  * Desktop: `lg:` (1024px) and `xl:` (1280px).
* **Responsive Spacing Rules:**
  * Container padding: `px-4` on mobile, `px-8` on desktop.
  * Section padding: `py-12` on mobile, `py-20` on desktop.
* **Touch friendliness:** Ensure clickable targets are at least `44px x 44px` on mobile layouts.

---

## 13. Accessibility (a11y)

Accessibility is a core design requirement, not an afterthought.

* **Color Contrast:** Background and text elements must meet WCAG AA standards (minimum contrast ratio of 4.5:1).
* **Focus Visibility:** Standard focus rings must be visible for keyboard-nav users. Do not use `outline-none` without providing alternative visible focus states.
* **Touch Targets:** Buttons, links, inputs must have a minimum target size of `44px x 44px` on touch screens.
* **Semantic HTML:** Always use semantic tags (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`) rather than arbitrary nested `div` groups.
* **Alt Text:** Every image must have description tags. Use empty descriptions `alt=""` for purely decorative images.

---

## 14. Component Philosophy

We follow a modular component architecture to avoid duplicate work and structure code logically.

```text
client/src/components/
├── common/         # Globally shared presentation components (Container, PageWrapper, EmptyState, RestaurantCard)
└── home/           # Page-specific components only used on the Home screen (HeroSection, CategoryCard)
```

* **Shared Components:** Put components in `common/` only when they are reused across multiple pages or features.
* **Feature Components:** Keep page-specific components inside subfolders (e.g. `components/home/`).
* **Extension Rule:** If a shared component needs small variations (e.g. `RestaurantCard` closed status), add flags/props instead of cloning the file.

---

## 15. UI Definition of Done

Every UI feature is complete only when it satisfies this checklist:

* [ ] **Visual Cohesion:** Colors, fonts, radius sizes, and shadows strictly match the PROJECT_DESIGN_BIBLE.md specifications.
* [ ] **Responsiveness:** Works without horizontal overflows on Mobile (320px+), Tablet (768px+), and Desktop (1024px+).
* [ ] **Accessibility (a11y):** Meets contrast minimums, includes visible focus indicators, alt tags, and appropriate touch target sizing.
* [ ] **Linter Check:** `npm run lint` compiles cleanly with zero warnings or errors.
* [ ] **Production Bundle:** `npm run build` runs successfully.
* [ ] **Code Hygiene:** Components are modular, dry, and clean, with no dead code or console logs left over.

---

## 16. Future Usage & Revisions

* **Design Implementations:** Future feature stages must reference these tokens for typography, border-radius, color values, and margins.
* **Component Evolution:** When extending components, document new properties inside `PROJECT_DESIGN_BIBLE.md`.
* **Design Updates:** Revision changes to these rules must be proposed in pull requests and approved by the product lead.

---

## 17. Design Tokens

Design tokens are the central UI building blocks for CraveCart. Future stylesheets (or Tailwind configurations) should directly implement the following variables:

```javascript
export const TOKENS = {
  colors: {
    primary: {
      default: '#ea580c',   // Orange 600
      hover: '#c2410c',     // Orange 700
      light: '#ffedd5',     // Orange 100
    },
    accent: {
      default: '#f59e0b',    // Amber 500
      hover: '#d97706',     // Amber 600
    },
    success: '#059669',     // Emerald 600
    warning: '#d97706',     // Amber 600
    error: '#e11d48',       // Rose 600
    bg: '#f8fafc',          // Slate 50
    surface: '#ffffff',     // White
    border: '#e2e8f0',      // Slate 200
    divider: '#f1f5f9',     // Slate 100
    text: {
      primary: '#0f172a',   // Slate 900
      secondary: '#64748b', // Slate 500
      muted: '#94a3b8',     // Slate 400
    }
  },
  typography: {
    fontHeading: '"Plus Jakarta Sans", system-ui, sans-serif',
    fontBody: '"Inter", system-ui, sans-serif',
    sizes: {
      hero: '2.25rem',      // 36px
      title: '1.875rem',    // 30px
      section: '1.5rem',    // 24px
      card: '1rem',         // 16px
      body: '0.875rem',     // 14px
      caption: '0.75rem',   // 12px
    },
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    }
  },
  spacing: {
    xs: '4px',              // space-1
    sm: '8px',              // space-2
    md: '12px',             // space-3
    lg: '16px',             // space-4
    xl: '24px',             // space-6
    xxl: '32px',            // space-8
    section: '48px',        // space-12
  },
  radius: {
    badge: '8px',
    input: '12px',
    button: '12px',
    card: '16px',
    modal: '24px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  animations: {
    hover: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    modal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  layouts: {
    containerMaxWidth: '1280px', // max-w-7xl
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  }
};
```

---

## 18. Standard Component States

Every interactive component inside CraveCart must implement clear visual cues for the following standard states:

* **Default:** The resting, inactive layout. Clear boundaries, neutral borders (`slate-200`), and legible text.
* **Hover:** Triggered when the pointer enters the bounds. Includes color transitions (e.g. Orange 600 -> Orange 700) and card translations (`translate-y-[-2px]` and shadow transitions) to indicate clickability.
* **Active:** Triggered on click/press. Button backgrounds deepen slightly, and cards scale down slightly (`scale-98`) to mimic a physical button press.
* **Focused:** Indicated when keyboard navigation selects an element. Uses a prominent focus ring (`focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`). Outline is never hidden without providing ring highlights.
* **Disabled:** Applied when an action is unavailable. Backgrounds change to Slate 100, text changes to Slate 400, opacity changes to 50%, and cursor changes to `cursor-not-allowed`.
* **Loading:** Displayed during active network operations. The primary text is hidden, and a circular spinner (`animate-spin`) is centered in place.
* **Selected:** Active configuration item. Background changes to light orange (`#ffedd5`), and borders change to Orange 600.
* **Empty:** Displayed when query arrays return 0 results. Renders a neutral description, a gray placeholder icon, and a primary redirect button.
* **Error:** Input fails validations. Borders change to Rose 600, helper text turns Rose 600, and a small warning icon is appended.

---

## 19. Form Components Guidelines

Forms are critical for cart customization, profile updates, and shipping. They must maintain consistent visual and validation states.

### 19.1 Input Varieties
* **Text Inputs:**
  * Height: 44px (touch friendly).
  * Padding: `px-4 py-2.5`.
  * Borders: `border border-slate-200 rounded-xl bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500`.
  * Placeholders: Slate 400 color, written in conversational sentence case (e.g., "Enter your full name").
* **Search Inputs:**
  * Features a leading magnifying glass icon (`LucideSearch` styled at `w-5 h-5 text-slate-400` absolute positioning).
  * Text padding: `pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white`.
* **Textareas:**
  * Used for special delivery instructions.
  * Same border and focus rules as Text Inputs. Must have a minimum height of 100px and allow vertical resizing only.
* **Select Dropdowns:**
  * Uses custom dropdown arrows to maintain visual consistency.
  * Renders select option lists styled with `bg-white border border-slate-200 rounded-xl shadow-lg mt-2 py-1 z-50`.

### 19.2 Form States & Validation
* **Default:** Slate 200 border, Slate 400 placeholder text.
* **Focused:** Orange 500 border with a matching 1px focus ring overlay.
* **Validation (Error):**
  * Border changes to Rose 600 (`border-rose-600`).
  * Input is appended with a leading alert icon.
  * Error message: Rendered directly below the input in Rose 600 text, small size (12px), prefixed with a small warning label.
* **Validation (Success):**
  * Border changes to Emerald 600.
  * Input is appended with an checkmark icon.
* **Helper Text:** Rendered below the input in Slate 500 text, small size (12px), to explain formatting rules (e.g., "Password must be at least 8 characters").

---

## 20. Navigation Standards

Consistent navigation structures help users browse menus and manage accounts without getting lost.

### 20.1 Header & Mobile Layouts
* **Desktop Navbar:**
  * Stretched to 100% viewport width, sticky at `top-0`, `z-50`.
  * Background: White with 85% opacity (`bg-white/85`) and a backdrop blur filter (`backdrop-blur-md`).
  * Items: Logo on left, NavLinks centered (text-slate-600, transition to orange-600, active links styled with `text-orange-600 bg-orange-50/50 rounded-lg`), account avatar on right.
* **Mobile Navigation Drawer:**
  * Hidden by default. Triggered by a burger menu icon.
  * Expands vertically to overlay pages. Lists NavLinks in a vertical stack, with touch-target heights of 48px to allow easy tapping.

### 20.2 Secondary Navigation Layouts
* **Tabs:**
  * Used for category filters or order history lists.
  * Horizontal row with simple border dividers below. Active tabs render an Orange 600 underline (`border-b-2 border-orange-600`) and Orange 600 text. Inactive tabs render Slate 500 text with hover triggers.
* **Breadcrumbs:**
  * Used on detail screens (e.g. Home > Restaurants > The Pizza Slice).
  * Styled in small size (12px), Slate 500, separating links with a right angle bracket `>` (or slash `/`). The active page link is styled in Slate 900 (non-clickable).
* **Pagination:**
  * Used for multi-page listings.
  * Row containing "Previous" and "Next" text buttons, with numbered page buttons in the middle. Active page button styled with Orange 600 background and white text. Inactive numbers styled as secondary outline buttons.
* **Future Sidebar Navigation:**
  * Proposed for account profiles and dashboard layouts.
  * Vertical list of links on the left with Lucide icons (w-5 h-5, stroke-1.5), active states highlighted with a left border line in Orange 600 and light orange background tint.

---

## 21. Application States Guidelines

We design for all application states to ensure a robust user experience under any network conditions.

### 21.1 Core App States
* **Loading States:** Displayed during API fetches.
  * Renders a centered Lucide Loader icon (`animate-spin text-orange-600 w-10 h-10`).
* **Skeleton Loaders:**
  * Recommended for future menu listings and search cards to prevent layout shifts.
  * Built using neutral boxes with a subtle pulse animation (`animate-pulse bg-slate-200`).
* **Empty States (Zero Results):**
  * Triggered when filter/search returns no matches.
  * Renders a centered gray illustration or Lucide icon (`w-16 h-16 text-slate-300`), a bold title ("No results found"), a helper subtitle suggesting filter changes, and a primary button to reset filters.
* **Error States (Failures):**
  * Triggered on API connection failures.
  * Renders a warning visual, title ("Something went wrong"), description ("We couldn't connect to our servers. Please check your connection and try again."), and a "Retry" button.
* **Offline States:**
  * Triggered when `navigator.onLine` is false.
  * Renders a top banner overlay (`bg-slate-900 text-white py-2 text-center text-xs font-semibold`) stating "You are currently offline. Pages may load slowly."

---

## 22. Open Design Decisions

The following proposals are open for feedback in Version 1.0:

1. **Brand Typography:** Should we stick with the proposed **Plus Jakarta Sans** for headings, or explore **Outfit** for a rounder brand character?
2. **Brand Accent Color:** Is **Orange 600** too bright for brand banners? Should we evaluate a warmer **Amber 600** or deep **Red-Orange**?
3. **Card Corner Softness:** Is `rounded-2xl` (16px) too round for cards? Should we align to `rounded-xl` (12px) for a sharper look?
4. **Dark Mode Support:** Should we plan for automatic dark mode support using Tailwind's `dark:` classes, or keep it light-only in early versions?
