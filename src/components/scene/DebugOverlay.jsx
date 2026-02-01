import { getBoundaryPath } from '../../lib/scene/boundaryUtils';

/**
 * Debug visualization and controls for the landscape overlay.
 */
export function DebugOverlay({
  edges,
  originalWidth,
  originalHeight,
  displayWidth,
  displayHeight,
  offsetX,
  offsetY,
  showBoundary,
  onToggleBoundary,
  onAddTree,
  onClearAll,
  treeCount,
}) {
  const viewBox = `0 0 ${originalWidth} ${originalHeight}`;

  return (
    <>
      {/* Boundary polygon SVG overlay */}
      {showBoundary && (
        <svg
          className="absolute pointer-events-none"
          style={{
            left: offsetX,
            top: offsetY,
            width: displayWidth,
            height: displayHeight,
          }}
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d={getBoundaryPath(edges)}
            fill="none"
            stroke="red"
            strokeWidth="3"
            strokeDasharray="10,5"
          />
        </svg>
      )}

      {/* Debug controls panel */}
      <div className="absolute bottom-4 left-4 p-3 backdrop-blur-md bg-stone-900/80 border border-stone-700/50 rounded-lg flex flex-col gap-2">
        <div className="text-stone-300 text-sm font-medium">
          Debug Controls
        </div>

        <label className="flex items-center gap-2 text-stone-400 text-xs cursor-pointer">
          <input
            type="checkbox"
            checked={showBoundary}
            onChange={onToggleBoundary}
            className="rounded border-stone-600"
          />
          Show Boundary
        </label>

        <div className="flex gap-2">
          <button
            onClick={onAddTree}
            className="px-3 py-1.5 bg-forest-700 hover:bg-forest-600 text-white text-xs rounded transition-colors"
          >
            Add Tree
          </button>
          <button
            onClick={onClearAll}
            className="px-3 py-1.5 bg-stone-700 hover:bg-stone-600 text-white text-xs rounded transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="text-stone-500 text-xs">
          Trees: {treeCount}
        </div>
      </div>
    </>
  );
}
