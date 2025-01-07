import { Point2 } from "simplekit/utility";

/**
 * Returns the closest point on a line segment to a given point.
 * @param M Point to find closest point to
 * @param P0 Line segment start
 * @param P1 Line segment end
 * @param segmentOnly If true, only return points within the line segment
 * @returns Closest point on line segment to given point
 */
export function closestPoint(
  M: Point2,
  P0: Point2,
  P1: Point2,
  segmentOnly = true
): Point2 {
  const v = P1.subtract(P0); // v = P1 - P0

  // early out if line is less than 1 pixel long
  if (v.magnitude() < 1) return P0.clone();

  const u = M.subtract(P0); // u = M - P0

  // scalar of vector projection ...
  const s = u.dot(v) / v.dot(v);

  // returns closest point on infinite line
  if (!segmentOnly) {
    return P0.add(v.multiply(s));
  }

  // find point for constrained line segment
  if (s < 0) {
    return P0.clone();
  } else if (s > 1) {
    return P1.clone();
  } else {
    const w = v.multiply(s); // w = s * v
    return P0.add(w); // Q = P0 + w
  }
}
