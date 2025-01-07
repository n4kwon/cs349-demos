export const insideHitTestCircle = (
  mx: number,
  my: number,
  x: number,
  y: number,
  r: number
) => (mx - x) ** 2 + (my - y) ** 2 <= r ** 2;

export const insideHitTestRectangle = (
  mx: number,
  my: number,
  x: number,
  y: number,
  width: number,
  height: number
) => mx >= x && mx <= x + width && my >= y && my <= y + height;

/**
 * Rotate a 2D point around a center point
 * x,y is the point to rotate
 * angle is the angle in radians
 * cx,cy is the center of rotation
 * returns new point [x, y]
 */
export const rotate = (
  x: number,
  y: number,
  angle: number,
  cx = 0,
  cy = 0
) => [
  (x - cx) * Math.cos(angle) - (y - cy) * Math.sin(angle) + cx,
  (x - cx) * Math.sin(angle) + (y - cy) * Math.cos(angle) + cy,
];

/**
 * Draws two lines to form a cross centered at (x, y)
 * each line is 2 * size long
 */
export function drawCross(
  gc: CanvasRenderingContext2D,
  x: number,
  y: number,
  size = 5
) {
  gc.beginPath();
  gc.moveTo(x - size, y);
  gc.lineTo(x + size, y);
  gc.moveTo(x, y - size);
  gc.lineTo(x, y + size);
  gc.lineWidth = 1;
  gc.stroke();
}
