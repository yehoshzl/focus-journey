import { JigsawOverlay } from './JigsawOverlay'

/**
 * Landscape image with jigsaw puzzle fog overlay
 */
export function LandscapeReveal({ imageSrc, progress = 0, width = 280, height = 200 }) {
  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden'
      }}
    >
      {/* Landscape image */}
      <img
        src={imageSrc}
        alt="Focus journey landscape"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* Jigsaw puzzle overlay */}
      <JigsawOverlay
        width={width}
        height={height}
        progress={progress}
      />
    </div>
  )
}
