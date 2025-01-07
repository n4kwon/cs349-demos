import { distance, point } from "simplekit/utility";

// find closest point function
import { closestPoint } from "../closest-point/closest-point.ts";

export function hitTestLine(
  mx: number,
  my: number,
  p0x: number,
  p0y: number,
  p1x: number,
  p1y: number,
  strokeWidth: number
) {
  // edge hit-test
  const q = closestPoint(
    point(mx, my),
    point(p0x, p0y),
    point(p1x, p1y)
  );
  const d = distance(mx, my, q.x, q.y);
  if (d <= strokeWidth / 2) return true;

  // no hit
  return false;
}
