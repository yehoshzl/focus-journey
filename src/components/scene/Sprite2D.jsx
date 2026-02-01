/**
 * Renders a sprite at a transformed screen position with anchor point support.
 */
export function Sprite2D({
  src,
  screenX,
  screenY,
  scale,
  anchor = { x: 0.5, y: 1.0 },
  baseScale = 0.15,
  originalWidth = 1024,
  showBoundary = false,
}) {
  const spriteSize = originalWidth * baseScale * scale;
  const offsetX = spriteSize * anchor.x;
  const offsetY = spriteSize * anchor.y;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: screenX - offsetX,
        top: screenY - offsetY,
        width: spriteSize,
        height: spriteSize,
        border: showBoundary ? '2px solid red' : 'none',
        boxSizing: 'border-box',
      }}
    >
      <img
        src={src}
        alt=""
        className="w-full h-full"
      />
    </div>
  );
}
