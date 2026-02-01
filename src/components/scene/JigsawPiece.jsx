import { useMemo } from 'react'
import { createJigsawPath } from '../../lib/puzzle/generator'

/**
 * Single jigsaw puzzle piece with fade transition
 */
export function JigsawPiece({ width, height, tabs, isRevealed }) {
  const path = useMemo(
    () => createJigsawPath(width, height, tabs),
    [width, height, tabs]
  )

  // Add padding for tabs that extend beyond piece bounds
  const padding = Math.min(width, height) * 0.25
  const viewBoxWidth = width + padding * 2
  const viewBoxHeight = height + padding * 2

  return (
    <svg
      width={viewBoxWidth}
      height={viewBoxHeight}
      viewBox={`${-padding} ${-padding} ${viewBoxWidth} ${viewBoxHeight}`}
      style={{
        position: 'absolute',
        left: -padding,
        top: -padding,
        overflow: 'visible',
        transition: 'opacity 0.5s ease-out',
        opacity: isRevealed ? 0 : 1,
        pointerEvents: 'none'
      }}
    >
      <path
        d={path}
        fill="rgba(45, 74, 45, 0.92)"
        stroke="rgba(255, 255, 255, 0.08)"
        strokeWidth="1"
      />
    </svg>
  )
}
