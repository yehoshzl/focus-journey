import { useMemo } from 'react'
import { generatePuzzleGrid } from '../lib/puzzle/generator'

/**
 * Hook for managing jigsaw puzzle state
 * @param {number} rows - Number of rows (default 4)
 * @param {number} cols - Number of columns (default 4)
 * @param {number} progress - Progress from 0 to 1
 * @returns {{ pieces: Array, revealedCount: number, totalPieces: number }}
 */
export function useJigsawPuzzle(rows = 4, cols = 4, progress = 0) {
  // Generate pieces once and memoize (stable across re-renders)
  const pieces = useMemo(() => generatePuzzleGrid(rows, cols), [rows, cols])

  const totalPieces = rows * cols
  const revealedCount = Math.floor(progress * totalPieces)

  // Add isRevealed flag to each piece based on progress
  const piecesWithState = useMemo(() => {
    return pieces.map(piece => ({
      ...piece,
      isRevealed: piece.revealIndex < revealedCount
    }))
  }, [pieces, revealedCount])

  return {
    pieces: piecesWithState,
    revealedCount,
    totalPieces
  }
}
