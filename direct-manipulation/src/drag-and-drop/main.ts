import { Circle } from "../drag/circle";
import { makeDragAndDroppable } from "./makeDragAndDroppable";

import "./style.css";

console.log("drag-and-drop");

// create canvas element and append to DOM
const canvas = document.createElement("canvas");
canvas.width = 400;
canvas.height = 400;
document.querySelector("div#app")?.appendChild(canvas);

const circles = [
  new Circle(80, 100, 64, "red"),
  new Circle(80, 200, 64, "blue"),
  new Circle(80, 300, 64, "green"),
];

const target = new Circle(300, 200, 128, "gray");

circles.forEach((c) => makeDragAndDroppable(c, target, canvas));

function draw(gc: CanvasRenderingContext2D) {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  target.draw(gc);
  circles.forEach((c) => c.draw(gc));

  // continue draw loop
  requestAnimationFrame(() => draw(gc));
}

// start the draw loop
draw(canvas.getContext("2d") as CanvasRenderingContext2D);
