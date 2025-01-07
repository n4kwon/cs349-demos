import { Point2 } from "simplekit/utility";
import { hitTestLine } from "./hittest-line";

export function edgeHitTestPolyline(
  mx: number,
  my: number,
  points: Point2[],
  strokeWidth: number
) {
  let [p0, ...pointsAfter] = points;

  // using for-of loop to allow early return
  for (let p1 of pointsAfter) {
    if (hitTestLine(mx, my, p0.x, p0.y, p1.x, p1.y, strokeWidth))
      return true;
    p0 = p1;
  }
  return false;
}
