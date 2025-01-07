import { point, Point2, vector } from "simplekit/utility";
import { edgeHitTestPolyline } from "./hittest-polyline";

export function edgeHitTestPolygon(
  mx: number,
  my: number,
  points: Point2[],
  strokeWidth: number
) {
  return edgeHitTestPolyline(
    mx,
    my,
    [...points, points[0]],
    strokeWidth
  );
}

export function insideHitTestPolygon(
  mx: number,
  my: number,
  points: Point2[]
) {
  console.warn("insideHitTestPolygon isn't implemented");
  return false;
}
