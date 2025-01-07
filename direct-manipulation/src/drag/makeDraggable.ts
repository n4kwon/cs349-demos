/**
 * Note this implementation does not work properly.
 *   1. The circle centre "jumps" to the mouse when dragging starts.
 *   2. All circles beneath the the cursor are selected (should only be one).
 *   3. We want to drag the "front" circle, not the "back" one.
 *
 * In lecture, we fix these issues.
 *
 */

import { Circle } from "./circle";

// function to add dragging functionality to a circle
export function makeDraggable(
  circle: Circle,
  canvas: HTMLCanvasElement
) {
  let isDragging = false;

  canvas.addEventListener("mousedown", (e) => {
    // MouseEvent.offsetX and MouseEvent.offsetY are relative
    // to the canvas element, not the window
    if (circle.hitTest(e.offsetX, e.offsetY)) {
      isDragging = true;
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    if (isDragging) {
      circle.x = e.offsetX;
      circle.y = e.offsetY;
    }
  });

  canvas.addEventListener("mouseup", (_) => {
    isDragging = false;
  });
}
