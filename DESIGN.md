# Design System Document: Architectural Minimalist Dark Mode

## 1. Overview & Creative North Star: "The Monolithic Blueprint"
This design system is a study in structural integrity and chromatic restraint. Moving away from the "soft" aesthetics of the modern web, this system embraces a **High-End Editorial** approach, treating the digital canvas as an architectural manifest. 

The **Creative North Star** is "The Monolithic Blueprint." Every layout should feel like a drafted technical drawing—precise, high-contrast, and unapologetically sharp. We reject the "template" look by utilizing heavy intentional asymmetry, where large typographic displays anchor the composition, and the signature Cobalt blue acts as a singular light source within a deep, charcoal void. There are no rounded corners here; every element is defined by 90-degree precision, emphasizing a sense of permanence and authority.

---

## 2. Colors & The "No-Line" Doctrine
The palette is built on a foundation of "Near-Black" neutrals, designed to create a sense of infinite depth.

### The Palette
- **Background (`#121315`):** The absolute foundation. All layouts begin here.
- **Primary Accent (`#2E5BFF`):** The signature Cobalt. Use this for high-priority actions and structural highlights.
- **Surface Tiers:** 
  - `surface_container_lowest`: `#0d0e10` (Used for "inset" or "sunken" areas).
  - `surface_container_high`: `#292a2c` (Used for "elevated" modules).
  - `on_surface`: `#e3e2e5` (Primary text—off-white to prevent eye strain).

### The "No-Line" Rule
Sectioning must never be achieved with 1px solid borders. This is a hallmark of "standard" UI. Instead, boundaries are defined through **Background Color Shifts**. To separate a sidebar from a main feed, use a transition from `surface` to `surface_container_low`. If visual tension is required, use a significant jump in tonal value rather than a structural line.

### The "Glass & Gradient" Rule
While the philosophy is minimalist, it is not "flat." 
- **CTAs:** Use a subtle linear gradient on primary buttons, transitioning from `primary_container` (#2E5BFF) to a slightly deeper `on_secondary` tone to provide a "lit from within" professional polish.
- **Glassmorphism:** For floating overlays (modals, dropdowns), use `surface_container` tokens with a 60% opacity and a high `backdrop-blur` (20px-40px). This maintains the architectural layering without breaking the dark-mode immersion.

---

## 3. Typography: Architectural Precision
We use **Manrope** exclusively. Its geometric construction mirrors the 0px radius of our containers.

- **Display (Large/Med):** 3.5rem / 2.75rem. These are your anchors. Use tight letter-spacing (-0.02em) and bold weights to create an editorial "masthead" feel.
- **Headlines:** 2rem to 1.5rem. Used for section headers. Always pair these with significant whitespace to allow the "monolith" to breathe.
- **Body (Lg/Md):** 1rem / 0.875rem. Optimized for legibility against the `#121315` background. Ensure a line-height of at least 1.6 for long-form content.
- **Labels:** 0.75rem. Use all-caps with increased letter-spacing (+0.05em) for a technical, "blueprint" aesthetic.

---

## 4. Elevation & Depth: Tonal Layering
In this system, depth is not a shadow; it is a hierarchy of light.

- **The Layering Principle:** Stack containers to create importance. Place a `surface_container_high` card on top of a `surface_background` to create a "lift." Because we use **0px roundedness**, the overlap creates sharp, clean silhouettes.
- **Ambient Shadows:** Standard drop shadows are forbidden. If a floating effect is mandatory (e.g., a top-level navigation bar), use an "Ambient Bloom." This is a shadow with a 60px blur, 0px offset, and 4% opacity, using the `primary` color (#b8c3ff) to simulate a soft cobalt glow.
- **The "Ghost Border" Fallback:** If accessibility requirements demand a container edge, use the `outline_variant` token (#434656) at **15% opacity**. It should be felt, not seen.

---

## 5. Components: Sharp Logic
All components must adhere to the **0px roundedness scale**.

- **Buttons:**
  - **Primary:** Solid `#2E5BFF` background. Sharp 90-degree corners. Text is `on_primary` (#002388).
  - **Secondary:** Transparent background with a "Ghost Border" and `primary` text.
- **Input Fields:** No four-sided boxes. Use a `surface_container_low` background with a 2px bottom-border in `outline` (#8e90a2). On focus, the bottom border transitions to Cobalt (#2E5BFF).
- **Cards & Lists:** Forbid the use of dividers. Lists are separated by 8px of vertical whitespace or alternating tonal shifts between `surface` and `surface_container_lowest`.
- **Chips:** Rectangular blocks. No "pill" shapes. Selection is indicated by a full Cobalt fill or a high-contrast `on_surface` background.
- **Architectural Data Viz:** Use the `tertiary` (#ffb59b) and `error` (#ffb4ab) tokens as "warning" lights against the dark grid. Graphs should be thin, 1px-2px lines with no smoothing (straight-line interpolation).

---

## 6. Do's and Don'ts

### Do:
- **Embrace Asymmetry:** Align a large Headline-LG to the left and leave the right 40% of the screen empty to create a "Gallery" feel.
- **Use "Cobalt Punch":** Use the signature blue sparingly. It should be a beacon, not a flood.
- **Prioritize Legibility:** Ensure `on_surface_variant` is only used for non-essential metadata; all primary content must use the high-contrast `on_surface` (#e3e2e5).

### Don't:
- **No Rounded Corners:** Ever. Not for buttons, not for cards, not for checkboxes. 0px is the law.
- **No Divider Lines:** Avoid the "grid of boxes" look. Use space and color-blocking to define areas.
- **No Grey Shadows:** Dark mode shadows should always be a tint of the background or a "bloom" of the primary accent, never a muddy grey.