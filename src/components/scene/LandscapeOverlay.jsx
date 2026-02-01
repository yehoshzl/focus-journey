import { useRef, useState, useCallback, useMemo } from 'react';
import { useLandscapeTransform } from '../../hooks/useLandscapeTransform';
import { getRandomPointInBoundary, shrinkBoundary } from '../../lib/scene/boundaryUtils';
import { SPRITE_DEFINITIONS, BOUNDARY_INSET } from '../../lib/scene/landscapeConfig';
import { Sprite2D } from './Sprite2D';
import { DebugOverlay } from './DebugOverlay';

/**
 * Main container that renders the landscape with sprite overlays.
 * Handles click events to add trees and manages tree state.
 */
export function LandscapeOverlay({
  landscape,
  debugMode = true,
  children,
}) {
  const containerRef = useRef(null);
  const [trees, setTrees] = useState([]);
  const [showBoundary, setShowBoundary] = useState(false);

  const { originalWidth, originalHeight, edges, src } = landscape;
  const shrunkEdges = useMemo(() => shrinkBoundary(edges, BOUNDARY_INSET), [edges]);
  const treeDef = SPRITE_DEFINITIONS.tree_1;

  const {
    scale,
    offsetX,
    offsetY,
    displayWidth,
    displayHeight,
    toScreenCoords,
  } = useLandscapeTransform(containerRef, originalWidth, originalHeight);

  const addTreeAtRandomPosition = useCallback(() => {
    const pos = getRandomPointInBoundary(shrunkEdges);
    setTrees((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        x: pos.x,
        y: pos.y,
        scale: 0.8 + Math.random() * 0.4, // Random scale 0.8-1.2
      },
    ]);
  }, [shrunkEdges]);

  const handleClick = useCallback(() => {
    addTreeAtRandomPosition();
  }, [addTreeAtRandomPosition]);

  const handleClearAll = useCallback(() => {
    setTrees([]);
  }, []);

  const handleToggleBoundary = useCallback(() => {
    setShowBoundary((prev) => !prev);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-pointer"
      onClick={handleClick}
    >
      {/* Landscape image */}
      <img
        src={src}
        alt="Journey landscape"
        className="w-full h-full object-contain"
      />

      {/* Render trees sorted by Y position for depth */}
      {[...trees]
        .sort((a, b) => a.y - b.y)
        .map((tree) => {
          const screenPos = toScreenCoords(tree.x, tree.y);
          return (
            <Sprite2D
              key={tree.id}
              src={treeDef.src}
              screenX={screenPos.x}
              screenY={screenPos.y}
              scale={scale * tree.scale}
              anchor={treeDef.anchor}
              baseScale={treeDef.baseScale}
              originalWidth={originalWidth}
              showBoundary={showBoundary}
            />
          );
        })}

      {/* Debug overlay */}
      {debugMode && (
        <DebugOverlay
          edges={shrunkEdges}
          originalWidth={originalWidth}
          originalHeight={originalHeight}
          displayWidth={displayWidth}
          displayHeight={displayHeight}
          offsetX={offsetX}
          offsetY={offsetY}
          showBoundary={showBoundary}
          onToggleBoundary={handleToggleBoundary}
          onAddTree={addTreeAtRandomPosition}
          onClearAll={handleClearAll}
          treeCount={trees.length}
        />
      )}

      {/* Pass through any children (like the floating card) */}
      {children}
    </div>
  );
}
