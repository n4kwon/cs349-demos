import { Point2 } from "simplekit/utility";
// local
import { Shape } from "./shape";
import {
  edgeHitTestPolygon,
  insideHitTestPolygon,
} from "../hittest/hittest-polygon";

export class Polygon extends Shape {
  constructor(public points: Point2[]) {
    super();
  }

  draw(gc: CanvasRenderingContext2D) {
    gc.save();
    gc.fillStyle = this.fill;
    gc.strokeStyle = this.stroke;
    gc.lineWidth = this.strokeWidth;
    gc.beginPath();
    this.points.forEach((p) => gc.lineTo(p.x, p.y));
    gc.closePath();
    if (this.isFilled) gc.fill();
    if (this.isStroked) gc.stroke();
    gc.restore();
  }

  hitTest(mx: number, my: number) {
    return (
      (this.isStroked &&
        edgeHitTestPolygon(mx, my, this.points, this.strokeWidth)) ||
      (this.isFilled && insideHitTestPolygon(mx, my, this.points))
    );
    // NOTE: insideHitTestPolygon isn't implemented
  }
}
