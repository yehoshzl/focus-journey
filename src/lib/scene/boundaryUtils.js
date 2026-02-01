/**
 * Check if a point is inside the boundary polygon (diamond shape).
 * Uses the ray-casting algorithm.
 */
export function isPointInBoundary(x, y, edges) {
  const vertices = [
    edges.top,
    edges.right,
    edges.bottom,
    edges.left,
  ];

  let inside = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const xi = vertices[i].x;
    const yi = vertices[i].y;
    const xj = vertices[j].x;
    const yj = vertices[j].y;

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersect) {
      inside = !inside;
    }
  }

  return inside;
}

/**
 * Generate a random point within the boundary polygon.
 * Uses rejection sampling within the bounding box.
 */
export function getRandomPointInBoundary(edges) {
  const minX = Math.min(edges.left.x, edges.top.x, edges.right.x, edges.bottom.x);
  const maxX = Math.max(edges.left.x, edges.top.x, edges.right.x, edges.bottom.x);
  const minY = Math.min(edges.left.y, edges.top.y, edges.right.y, edges.bottom.y);
  const maxY = Math.max(edges.left.y, edges.top.y, edges.right.y, edges.bottom.y);

  let x, y;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    x = minX + Math.random() * (maxX - minX);
    y = minY + Math.random() * (maxY - minY);
    attempts++;
  } while (!isPointInBoundary(x, y, edges) && attempts < maxAttempts);

  return { x, y };
}

/**
 * Get an SVG path string for the boundary polygon.
 */
export function getBoundaryPath(edges) {
  return `M ${edges.top.x} ${edges.top.y} L ${edges.right.x} ${edges.right.y} L ${edges.bottom.x} ${edges.bottom.y} L ${edges.left.x} ${edges.left.y} Z`;
}

/**
 * Shrink a boundary polygon by moving each vertex towards the center.
 * @param {Object} edges - The boundary edges (left, top, right, bottom)
 * @param {number} amount - The amount to shrink in pixels
 * @returns {Object} New edges with shrunk boundary
 */
export function shrinkBoundary(edges, amount) {
  const cx = (edges.left.x + edges.top.x + edges.right.x + edges.bottom.x) / 4;
  const cy = (edges.left.y + edges.top.y + edges.right.y + edges.bottom.y) / 4;

  const shrinkVertex = (vertex) => {
    const dx = cx - vertex.x;
    const dy = cy - vertex.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const ratio = amount / distance;
    return {
      x: vertex.x + dx * ratio,
      y: vertex.y + dy * ratio,
    };
  };

  return {
    left: shrinkVertex(edges.left),
    top: shrinkVertex(edges.top),
    right: shrinkVertex(edges.right),
    bottom: shrinkVertex(edges.bottom),
  };
}
