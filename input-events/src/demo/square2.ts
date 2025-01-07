import { Drawable } from "./drawable.ts";

type Square2Props = {
  x?: number;
  y?: number;
  size?: number;
  fill?: string;
  stroke?: string;
  lineWidth?: number;
};

export class Square2 implements Drawable {
  constructor({
    x = 0,
    y = 0,
    size = 100,
    fill = "grey",
    stroke = "black",
    lineWidth = 1,
  }: Square2Props = {}) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.fill = fill;
    this.stroke = stroke;
    this.lineWidth = lineWidth;
  }

  x: number;
  y: number;
  size: number;
  fill: string;
  stroke: string;
  lineWidth: number;

  draw(gc: CanvasRenderingContext2D) {
    gc.beginPath();
    if (this.fill) gc.fillStyle = this.fill;
    if (this.stroke) gc.strokeStyle = this.stroke;
    if (this.lineWidth) gc.lineWidth = this.lineWidth;
    gc.rect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
    if (this.fill) gc.fill();
    if (this.lineWidth) gc.stroke();
  }
}
