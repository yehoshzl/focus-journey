import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to calculate screen coordinates from original image coordinates.
 * Handles object-contain letterboxing and scaling.
 */
export function useLandscapeTransform(containerRef, originalWidth, originalHeight) {
  const [transform, setTransform] = useState({
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    displayWidth: originalWidth,
    displayHeight: originalHeight,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateTransform = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const imageAspect = originalWidth / originalHeight;
      const containerAspect = containerWidth / containerHeight;

      let displayWidth, displayHeight, offsetX, offsetY, scale;

      if (containerAspect > imageAspect) {
        // Container is wider - letterbox on sides
        displayHeight = containerHeight;
        displayWidth = containerHeight * imageAspect;
        scale = displayHeight / originalHeight;
        offsetX = (containerWidth - displayWidth) / 2;
        offsetY = 0;
      } else {
        // Container is taller - letterbox on top/bottom
        displayWidth = containerWidth;
        displayHeight = containerWidth / imageAspect;
        scale = displayWidth / originalWidth;
        offsetX = 0;
        offsetY = (containerHeight - displayHeight) / 2;
      }

      setTransform({
        scale,
        offsetX,
        offsetY,
        displayWidth,
        displayHeight,
      });
    };

    const resizeObserver = new ResizeObserver(updateTransform);
    resizeObserver.observe(containerRef.current);

    // Initial calculation
    updateTransform();

    return () => resizeObserver.disconnect();
  }, [containerRef, originalWidth, originalHeight]);

  /**
   * Convert original image coordinates to screen coordinates.
   */
  const toScreenCoords = useCallback(
    (x, y) => ({
      x: x * transform.scale + transform.offsetX,
      y: y * transform.scale + transform.offsetY,
    }),
    [transform]
  );

  /**
   * Convert screen coordinates to original image coordinates.
   */
  const fromScreenCoords = useCallback(
    (screenX, screenY) => ({
      x: (screenX - transform.offsetX) / transform.scale,
      y: (screenY - transform.offsetY) / transform.scale,
    }),
    [transform]
  );

  return {
    ...transform,
    toScreenCoords,
    fromScreenCoords,
  };
}
