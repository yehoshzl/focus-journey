// Design tokens for inline styles (SVG gradients, etc.)
// These match the CSS custom properties in index.css

export const colors = {
  // Primary greens (from forest palette)
  primary: '#5a9a5a',     // forest-500
  primaryDark: '#4a7c4a', // forest-600
  dark: '#3d5e3d',        // forest-700
  darker: '#2d4a2d',      // forest-800
  darkest: '#1a2e1a',     // forest-900

  // Teals
  light: '#14b8a6',       // teal-500
  lighter: '#2dd4bf',     // teal-400

  // Accents
  warning: '#f59e0b',     // amber-500
  warningLight: '#fbbf24', // amber-400
  danger: '#ef4444',      // red-500

  // Neutrals
  text: '#f5f5f4',        // stone-100
  textMuted: '#a8a29e',   // stone-400
}

export const colorWithOpacity = (hex, opacity) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
