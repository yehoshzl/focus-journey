// Inset amount for boundary (in original image pixels)
export const BOUNDARY_INSET = 40;

export const LANDSCAPE_CONFIG = {
  landscape_1: {
    src: '/assets/landscape 1.png',
    originalWidth: 1024,
    originalHeight: 1024,
    edges: {
      left: { x: 23, y: 500 },
      top: { x: 451, y: 320 },
      right: { x: 1011, y: 444 },
      bottom: { x: 560, y: 740 },
    },
  },
};

export const SPRITE_DEFINITIONS = {
  tree_1: {
    src: '/assets/tree_1.png',
    anchor: { x: 0.5, y: 1.0 },
    baseScale: 0.15,
  },
};
