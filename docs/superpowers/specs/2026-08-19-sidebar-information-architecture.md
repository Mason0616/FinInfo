# Sidebar Information Architecture Repair

## Layout contract

On desktop, the NEON brand stays at the sidebar's upper-left corner, the primary navigation stays directly below it, and the lower sidebar keeps a stable stacked utility area. Compact sidebar mode reduces navigation to icons but never moves the brand or utility area.

The lower utility area has this exact order:

1. Display preferences
2. About and method
3. Recent research

Recent research lists the two system-maintained public reports as links. The current report may be visually marked when the visitor is on its detail route.

## Responsive boundary

Desktop and laptop widths keep the sidebar layout. The mobile navigation breakpoint is reduced from 820px to 640px so ordinary desktop windows do not trigger the mobile layout. At mobile width, the brand remains at the top and utilities are represented by accessible navigation controls rather than being silently hidden.

## Acceptance

- Brand is visible before all navigation links at desktop and compact widths.
- Display preferences, About and recent reports appear in the stated order.
- Compact mode retains the brand and a usable expand toggle.
- No utility panel is clipped at a 768px desktop viewport.
- Recent report links navigate to their stable report URLs.
