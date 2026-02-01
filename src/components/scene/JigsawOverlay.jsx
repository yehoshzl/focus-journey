import { useJigsawPuzzle } from '../../hooks/useJigsawPuzzle'
import { JigsawPiece } from './JigsawPiece'

/**
 * Container for jigsaw puzzle pieces overlay
 */
export function JigsawOverlay({ width, height, progress, rows = 4, cols = 4 }) {
  const { pieces } = useJigsawPuzzle(rows, cols, progress)

  const pieceWidth = width / cols
  const pieceHeight = height / rows

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'visible'
      }}
    >
      {pieces.map(piece => (
        <div
          key={piece.id}
          style={{
            position: 'absolute',
            left: piece.col * pieceWidth,
            top: piece.row * pieceHeight,
            width: pieceWidth,
            height: pieceHeight
          }}
        >
          <JigsawPiece
            width={pieceWidth}
            height={pieceHeight}
            tabs={piece.tabs}
            isRevealed={piece.isRevealed}
          />
        </div>
      ))}
    </div>
  )
}
