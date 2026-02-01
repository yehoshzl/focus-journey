# Timer Widget Style Guide

A comprehensive style guide for recreating the circular timer widget from Forest Focus.

---

## Color Palette

### Primary Colors
| Name         | Hex       | Usage                                    |
|--------------|-----------|------------------------------------------|
| Forest Green | `#4A9B8E` | Primary actions, progress ring gradient  |
| Deep Teal    | `#3D7B72` | Card backgrounds, gradients              |
| Light Sage   | `#7EC4B6` | Secondary text, subtle accents           |

### Accent Colors
| Name          | Hex       | Usage                                   |
|---------------|-----------|------------------------------------------|
| Grass Green   | `#A8D969` | Success states, completion glow          |
| Golden Yellow | `#F4C430` | Pause button gradient start              |
| Soil Brown    | `#8B6F47` | Pause button gradient end                |
| Soft Cream    | `#F5F3E8` | Input backgrounds (8% opacity)           |

### Utility Colors
| Name        | Hex       | Usage                                    |
|-------------|-----------|------------------------------------------|
| Charcoal    | `#2D3436` | Main background, card shadows            |
| Medium Gray | `#636E72` | Disabled states                          |
| Coral Red   | `#FF7675` | Destructive actions (Give Up button)     |

### Opacity Helper
```javascript
const colorWithOpacity = (hex, opacity) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
```

---

## Typography

| Element           | Size       | Weight | Additional Styles                        |
|-------------------|------------|--------|------------------------------------------|
| Timer Display     | `3.5rem`   | 300    | `letter-spacing: 0.05em`, `monospace`    |
| Status Text       | `0.875rem` | 400    | `letter-spacing: 0.05em`                 |
| App Title         | `0.75rem`  | 500    | `letter-spacing: 0.25em`, `uppercase`    |
| Preset Buttons    | `0.875rem` | 500    | —                                        |
| Action Buttons    | inherit    | 500    | —                                        |
| Completion Title  | `1.5rem`   | 300    | —                                        |
| Completion Detail | `0.875rem` | 400    | —                                        |

### Font Stack
```css
font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
```

---

## Spacing System (8pt Grid)

| Token  | Value  |
|--------|--------|
| xs     | `4px`  |
| sm     | `8px`  |
| md     | `16px` |
| lg     | `24px` |
| xl     | `32px` |
| 2xl    | `48px` |

---

## Border Radius

| Token  | Value  |
|--------|--------|
| Button | `12px` |
| Card   | `16px` |
| Modal  | `20px` |

---

## Circular Timer Component

### Dimensions
- **Size**: 280px × 280px
- **Stroke Width**: 12px
- **Radius**: `(size - strokeWidth) / 2` = 134px
- **Circumference**: `2 * Math.PI * radius` ≈ 842px

### SVG Structure
```jsx
<svg width={280} height={280} style={{ transform: 'rotate(-90deg)' }}>
  {/* Background track */}
  <circle
    cx={140}
    cy={140}
    r={134}
    fill="none"
    stroke="rgba(255,255,255,0.06)"
    strokeWidth={12}
  />

  {/* Progress arc */}
  <circle
    cx={140}
    cy={140}
    r={134}
    fill="none"
    stroke="url(#timerGradient)"
    strokeWidth={12}
    strokeLinecap="round"
    strokeDasharray={842}
    strokeDashoffset={842 * (1 - progress)}
  />
</svg>
```

### Progress Ring Gradient
```jsx
// Default (running/idle)
<linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stopColor="#7EC4B6" />   {/* Light Sage */}
  <stop offset="50%" stopColor="#4A9B8E" />  {/* Forest Green */}
  <stop offset="100%" stopColor="#3D7B72" /> {/* Deep Teal */}
</linearGradient>

// Completed state
<linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stopColor="#A8D969" />   {/* Grass Green */}
  <stop offset="100%" stopColor="#4A9B8E" /> {/* Forest Green */}
</linearGradient>
```

### Progress Arc Drop Shadow
```css
filter: drop-shadow(0 0 8px rgba(74, 155, 142, 0.6));
/* Completed: rgba(168, 217, 105, 0.6) */
```

### Inner Circle (Behind Timer)
```css
width: 256px;       /* size - 24 */
height: 256px;
border-radius: 50%;
background-color: rgba(61, 123, 114, 0.5);  /* Deep Teal @ 50% */
backdrop-filter: blur(8px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Glow Effect (Behind Everything)
```css
width: 260px;       /* size - 20 */
height: 260px;
border-radius: 50%;
background-color: #4A9B8E;  /* Forest Green (or Grass Green when complete) */
opacity: 0.25;              /* Scales with progress: fillPercent * 0.25 */
filter: blur(40px);
transition: all 0.7s ease;
```

---

## Card Container

```css
width: 100%;
max-width: 400px;
padding: 32px;
border-radius: 16px;
backdrop-filter: blur(16px);
background: linear-gradient(
  145deg,
  rgba(61, 123, 114, 0.4),   /* Deep Teal @ 40% */
  rgba(45, 52, 54, 0.6)       /* Charcoal @ 60% */
);
box-shadow:
  0 8px 32px rgba(45, 52, 54, 0.4),
  inset 0 1px 0 rgba(255, 255, 255, 0.05);
```

---

## Button Styles

### Primary Button (Start/Resume)
```css
width: 100%;
padding: 16px 32px;
border-radius: 12px;
font-weight: 500;
color: white;
border: none;
cursor: pointer;
background: linear-gradient(135deg, #4A9B8E 0%, #3D7B72 100%);
box-shadow:
  0 4px 24px rgba(74, 155, 142, 0.4),
  inset 0 1px 0 rgba(255, 255, 255, 0.15);
transition: transform 0.2s ease;
```

### Pause Button
```css
/* Same base as primary, but: */
color: #2D3436;  /* Charcoal */
background: linear-gradient(135deg, #F4C430 0%, #8B6F47 100%);
box-shadow:
  0 4px 24px rgba(244, 196, 48, 0.4),
  inset 0 1px 0 rgba(255, 255, 255, 0.2);
```

### Success Button (New Session after completion)
```css
/* Same base as primary, but: */
color: #2D3436;  /* Charcoal */
background: linear-gradient(135deg, #A8D969 0%, #4A9B8E 100%);
box-shadow:
  0 4px 24px rgba(168, 217, 105, 0.4),
  inset 0 1px 0 rgba(255, 255, 255, 0.2);
```

### Ghost/Destructive Button (Give Up)
```css
padding: 16px 24px;
border-radius: 12px;
font-weight: 500;
color: rgba(255, 118, 117, 0.8);  /* Coral Red @ 80% */
background-color: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 118, 117, 0.3);
cursor: pointer;
transition: all 0.2s ease;
```

### Preset Button
```css
padding: 8px 16px;
border-radius: 12px;
font-size: 0.875rem;
font-weight: 500;
border: none;
cursor: pointer;
transition: all 0.2s ease;

/* Unselected */
background-color: rgba(255, 255, 255, 0.05);
color: rgba(255, 255, 255, 0.6);

/* Selected */
background-color: #4A9B8E;  /* Forest Green */
color: white;
```

---

## Input Field

```css
width: 180px;
padding: 12px 16px;
border-radius: 12px;
background-color: rgba(245, 243, 232, 0.08);  /* Soft Cream @ 8% */
border: 1px solid rgba(255, 255, 255, 0.1);
text-align: center;
font-size: 1rem;
color: white;
outline: none;
```

### Focus State (Global)
```css
button:focus,
button:focus-visible {
  outline: 2px solid #7EC4B6;  /* Light Sage */
  outline-offset: 2px;
}
```

---

## Background Effects

### Main Container Background
```css
background-color: #2D3436;  /* Charcoal */
```

### Radial Gradient Overlay
```css
background: radial-gradient(
  ellipse at 50% 30%,
  rgba(61, 123, 114, 0.3) 0%,
  transparent 60%
);
```

### Ambient Glow Effects
```css
/* Top center glow */
.glow-1 {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 400px;
  background-color: rgba(74, 155, 142, 0.12);  /* Forest Green */
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
}

/* Bottom left glow */
.glow-2 {
  position: absolute;
  bottom: 25%;
  left: 33%;
  width: 300px;
  height: 300px;
  background-color: rgba(61, 123, 114, 0.2);  /* Deep Teal */
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

/* Right side glow */
.glow-3 {
  position: absolute;
  top: 50%;
  right: 25%;
  width: 200px;
  height: 200px;
  background-color: rgba(126, 196, 182, 0.1);  /* Light Sage */
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
}
```

---

## Transitions & Animations

| Property              | Duration | Easing     |
|-----------------------|----------|------------|
| Progress ring offset  | 0.5s     | ease-out   |
| Glow opacity/color    | 0.7s     | ease       |
| Status text color     | 0.3s     | ease       |
| Button hover/states   | 0.2s     | ease       |
| Global button default | 0.25s    | ease       |

---

## Status States

| Status    | Timer Text Color | Glow Color   | Status Label     |
|-----------|------------------|--------------|------------------|
| idle      | white            | Forest Green | "{n} min session"|
| running   | white            | Forest Green | "focusing..."    |
| paused    | white            | Forest Green | "paused"         |
| completed | white            | Grass Green  | "complete!"      |

---

## Complete Colors Export

```javascript
export const colors = {
  // Primary
  forestGreen: '#4A9B8E',
  deepTeal: '#3D7B72',
  lightSage: '#7EC4B6',

  // Accent
  grassGreen: '#A8D969',
  goldenYellow: '#F4C430',
  soilBrown: '#8B6F47',
  softCream: '#F5F3E8',

  // Utility
  charcoal: '#2D3436',
  mediumGray: '#636E72',
  coralRed: '#FF7675',
};
```

---

## CSS Custom Properties

```css
:root {
  /* Primary Colors */
  --color-forest-green: #4A9B8E;
  --color-deep-teal: #3D7B72;
  --color-light-sage: #7EC4B6;

  /* Accent Colors */
  --color-grass-green: #A8D969;
  --color-golden-yellow: #F4C430;
  --color-soil-brown: #8B6F47;
  --color-soft-cream: #F5F3E8;

  /* Utility Colors */
  --color-charcoal: #2D3436;
  --color-medium-gray: #636E72;
  --color-coral-red: #FF7675;

  /* Spacing (8pt grid) */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;

  /* Border Radius */
  --radius-button: 12px;
  --radius-card: 16px;
  --radius-modal: 20px;
}
```
