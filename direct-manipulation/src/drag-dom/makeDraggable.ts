/**
 * Note this implementation does not work properly.
 *   1. The circle centre "jumps" to the mouse when dragging starts.
 *
 * Apply the same fix  as the canvas drag demo.
 */

// function to add dragging functionality to a circle
export function makeDraggable(
  circle: HTMLDivElement,
  parent: HTMLElement
) {
  let isDragging = false;

  circle.addEventListener("mousedown", (_) => {
    console.log("hit");
    isDragging = true;
  });

  parent.addEventListener("mousemove", (e) => {
    if (isDragging) {
      console.log("dragging");
      const rect = circle.getBoundingClientRect();
      // divs are positioned from top-left, so need to adjust
      circle.style.left = `${e.x - rect.width / 2}px`;
      circle.style.top = `${e.y - rect.height / 2}px`;
    }
  });

  parent.addEventListener("mouseup", (_) => {
    isDragging = false;
  });
}
