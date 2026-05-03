# NovelHub Design System

## Purpose
Modern dark-theme online reading platform for novel discovery, community connection, and trending content.

## Visual Direction
Contemporary entertainment platform. Energetic, inviting, clean. Bold indigo CTAs with warm amber accents and teal highlights. Card-based layout with generous radius (12px) for friendly feel. Smooth transitions throughout.

## Tone
Entertainment + Community. Users discover, connect, trend.

## Palette (OKLCH)

| Token | L | C | H | Purpose |
|-------|---|---|---|---------|
| Primary | 0.55 | 0.28 | 260 | CTAs, rankings, highlights |
| Secondary | 0.70 | 0.18 | 55 | Accents, badges, featured |
| Accent | 0.60 | 0.22 | 180 | Hover, highlights, interactive |
| Destructive | 0.65 | 0.19 | 22 | Warnings, removals |
| Neutral Background | 0.12 | 0 | 0 | Main background |
| Card | 0.16 | 0.01 | 280 | Elevated surfaces |
| Muted | 0.24 | 0.01 | 0 | Secondary surfaces |

## Typography

| Role | Font | Usage |
|------|------|-------|
| Display | Space Grotesk | Headers, rankings, emphasis |
| Body | General Sans | Content, descriptions, UI text |
| Mono | Geist Mono | Code, technical content |

## Shape Language
- Primary radius: 12px (rounded-lg) for cards, moderate components
- Compact radius: 8px (rounded-md) for buttons, inputs
- Tight radius: 4px (rounded-sm) for badges, small elements
- Full: pill-shaped for badges and indicators

## Elevation and Depth

| Element | Shadow | Context |
|---------|--------|----------|
| Elevated Card | 0 8px 16px -4px rgba(0,0,0,0.3) | Novel cards, profile cards |
| Hover Lift | 0 20px 35px -10px rgba(0,0,0,0.5) | Interactive hover state |
| Subtle | 0 1px 2px 0 rgba(0,0,0,0.05) | Borders, dividers |

## Structural Zones

| Zone | Treatment | Example |
|------|-----------|----------|
| Header | Elevated card, border-b, dark background | Logo, search, user menu |
| Main Content | Dark background bg-background | Novel library, rankings |
| Card Surfaces | bg-card with border, shadow-elevated | Novel cards, friend profiles |
| Sidebar | Subtle muted background, lower contrast | Friend activity, filters |
| Footer | bg-muted/40, border-t | Credits, links |

## Spacing Density
- Header: 1rem padding
- Card: 1.5rem padding
- Content section gap: 2rem
- Inline element gap: 1rem

## Motion and Interaction

| Animation | Duration | Easing | Use |
|-----------|----------|--------|-----|
| Smooth Transition | 0.3s | cubic-bezier(0.4, 0, 0.2, 1) | All interactive elements |
| Fade In | 0.3s | ease-out | Content entry |
| Slide In | 0.3s | ease-out | Modal/drawer entry |
| Scale | 0.05s | ease-out | Button active state |

## Component Patterns
- Novel cards: Image + title + author + genre badges + rating + hover lift
- Rankings: Numbered badges (1-5) with secondary color, animated movement
- Friend profiles: Avatar + username + reading activity status indicator
- CTAs: Indigo primary button with opacity hover + scale active
- Badges: Teal/secondary color with 10% opacity background

## Signature Details
- Smooth hover lift on novel cards (shadow-lg to shadow-xl)
- Gradient accent on top-ranked novels (primary color emphasis)
- Animated friend activity indicator (pulsing on active)
- Seamless search bar interaction with no artificial borders

## Dark Mode
Default theme. All tokens tuned for dark mode (high contrast L values for text, low L for backgrounds).

## Author Collaboration Features

| Element | Style | Interaction |
|---------|-------|-------------|
| Active Co-author | Pulsing green badge (0.72 L, 0.2 C, 142 H) | Real-time presence |
| Author Badge | Cyan accent with 15% opacity background | Distinguishes content creators |
| Collaboration Toast | Card-styled notification, accent border, slide-in | Save/update feedback |
| Co-author Avatar | 8px border with accent outline | Grouped in editor header |

## Author Interface Zones

| Zone | Treatment | Purpose |
|------|-----------|----------|
| Author Dashboard | Card grid, create/edit/delete controls | Novel management |
| Collaborative Editor | Full-width with co-author list sidebar | Active editing experience |
| Save Feedback | Floating toast, bottom-right, accent border | Real-time sync confirmation |
