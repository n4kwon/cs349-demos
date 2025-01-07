import { Circle } from "../drag/circle";

export function makeDragAndDroppable(
  circle: Circle,
  target: Circle,
  canvas: HTMLCanvasElement
) {
  let isDragging = false;
  // starting position of the circle
  let start = { x: 0, y: 0 };

  canvas.addEventListener("mousedown", (e) => {
    if (circle.hitTest(e.offsetX, e.offsetY)) {
      isDragging = true;
      start.x = circle.x;
      start.y = circle.y;
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    circle.x = e.offsetX;
    circle.y = e.offsetY;

    if (target.hitTest(circle.x, circle.y)) {
      target.stroke = "yellow";
    } else {
      target.stroke = "black";
    }
  });

  canvas.addEventListener("mouseup", (_) => {
    if (!isDragging) return;

    if (target.hitTest(circle.x, circle.y)) {
      target.fill = circle.fill;
      target.stroke = "black";
    }
    // reset circle position
    circle.x = start.x;
    circle.y = start.y;
    isDragging = false;
  });
}
