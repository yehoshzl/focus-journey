/**
 * Jigsaw puzzle generator utilities
 * Creates puzzle piece configurations with interlocking tabs
 */

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Generates tab configuration for a piece at given position
 * @param {number} row - Row index (0-based)
 * @param {number} col - Column index (0-based)
 * @param {number} rows - Total rows
 * @param {number} cols - Total columns
 * @returns {{ top: boolean|null, right: boolean|null, bottom: boolean|null, left: boolean|null }}
 *   true = outward tab, false = inward slot, null = flat edge
 */
export function generateTabConfig(row, col, rows, cols) {
  return {
    top: row === 0 ? null : false,      // First row flat, others have slot
    bottom: row === rows - 1 ? null : true,  // Last row flat, others have tab
    left: col === 0 ? null : false,     // First col flat, others have slot
    right: col === cols - 1 ? null : true    // Last col flat, others have tab
  }
}

/**
 * Creates SVG path for a jigsaw piece
 * @param {number} width - Piece width in pixels
 * @param {number} height - Piece height in pixels
 * @param {{ top: boolean|null, right: boolean|null, bottom: boolean|null, left: boolean|null }} tabs
 * @returns {string} SVG path d attribute
 */
export function createJigsawPath(width, height, tabs) {
  const tabSize = Math.min(width, height) * 0.2
  const tabNeck = tabSize * 0.4

  let path = ''

  // Start at top-left
  path += `M 0 0`

  // Top edge (left to right)
  if (tabs.top === null) {
    path += ` L ${width} 0`
  } else {
    const mid = width / 2
    const dir = tabs.top ? -1 : 1 // slot goes up (negative), tab comes in
    path += ` L ${mid - tabNeck} 0`
    path += ` C ${mid - tabNeck} ${dir * tabSize * 0.3}, ${mid - tabSize} ${dir * tabSize * 0.3}, ${mid - tabSize} ${dir * tabSize}`
    path += ` C ${mid - tabSize} ${dir * tabSize * 1.2}, ${mid + tabSize} ${dir * tabSize * 1.2}, ${mid + tabSize} ${dir * tabSize}`
    path += ` C ${mid + tabSize} ${dir * tabSize * 0.3}, ${mid + tabNeck} ${dir * tabSize * 0.3}, ${mid + tabNeck} 0`
    path += ` L ${width} 0`
  }

  // Right edge (top to bottom)
  if (tabs.right === null) {
    path += ` L ${width} ${height}`
  } else {
    const mid = height / 2
    const dir = tabs.right ? 1 : -1 // tab goes right (positive)
    path += ` L ${width} ${mid - tabNeck}`
    path += ` C ${width + dir * tabSize * 0.3} ${mid - tabNeck}, ${width + dir * tabSize * 0.3} ${mid - tabSize}, ${width + dir * tabSize} ${mid - tabSize}`
    path += ` C ${width + dir * tabSize * 1.2} ${mid - tabSize}, ${width + dir * tabSize * 1.2} ${mid + tabSize}, ${width + dir * tabSize} ${mid + tabSize}`
    path += ` C ${width + dir * tabSize * 0.3} ${mid + tabSize}, ${width + dir * tabSize * 0.3} ${mid + tabNeck}, ${width} ${mid + tabNeck}`
    path += ` L ${width} ${height}`
  }

  // Bottom edge (right to left)
  if (tabs.bottom === null) {
    path += ` L 0 ${height}`
  } else {
    const mid = width / 2
    const dir = tabs.bottom ? 1 : -1 // tab goes down (positive)
    path += ` L ${mid + tabNeck} ${height}`
    path += ` C ${mid + tabNeck} ${height + dir * tabSize * 0.3}, ${mid + tabSize} ${height + dir * tabSize * 0.3}, ${mid + tabSize} ${height + dir * tabSize}`
    path += ` C ${mid + tabSize} ${height + dir * tabSize * 1.2}, ${mid - tabSize} ${height + dir * tabSize * 1.2}, ${mid - tabSize} ${height + dir * tabSize}`
    path += ` C ${mid - tabSize} ${height + dir * tabSize * 0.3}, ${mid - tabNeck} ${height + dir * tabSize * 0.3}, ${mid - tabNeck} ${height}`
    path += ` L 0 ${height}`
  }

  // Left edge (bottom to top)
  if (tabs.left === null) {
    path += ` L 0 0`
  } else {
    const mid = height / 2
    const dir = tabs.left ? -1 : 1 // slot goes left (negative)
    path += ` L 0 ${mid + tabNeck}`
    path += ` C ${dir * tabSize * 0.3} ${mid + tabNeck}, ${dir * tabSize * 0.3} ${mid + tabSize}, ${dir * tabSize} ${mid + tabSize}`
    path += ` C ${dir * tabSize * 1.2} ${mid + tabSize}, ${dir * tabSize * 1.2} ${mid - tabSize}, ${dir * tabSize} ${mid - tabSize}`
    path += ` C ${dir * tabSize * 0.3} ${mid - tabSize}, ${dir * tabSize * 0.3} ${mid - tabNeck}, 0 ${mid - tabNeck}`
    path += ` L 0 0`
  }

  path += ' Z'
  return path
}

/**
 * Generates a puzzle grid with pieces
 * @param {number} rows - Number of rows
 * @param {number} cols - Number of columns
 * @returns {Array<{ id: string, row: number, col: number, revealIndex: number, tabs: object }>}
 */
export function generatePuzzleGrid(rows = 4, cols = 4) {
  const totalPieces = rows * cols
  const revealOrder = shuffleArray([...Array(totalPieces).keys()])

  const pieces = []
  let index = 0

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      pieces.push({
        id: `${row}-${col}`,
        row,
        col,
        revealIndex: revealOrder[index],
        tabs: generateTabConfig(row, col, rows, cols)
      })
      index++
    }
  }

  return pieces
}
