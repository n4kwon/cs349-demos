export {}; // force module

import { random } from "simplekit/utility";
import {
  startSimpleKit,
  setSKDrawCallback,
  setSKAnimationCallback,
} from "simplekit/canvas-mode";

// A simple red dot drawable
class Dot {
  constructor(public x = 0, public y = 0, public r = 32) {}

  draw(gc: CanvasRenderingContext2D) {
    gc.save();
    gc.beginPath();
    gc.fillStyle = "red";
    gc.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    gc.fill();
    gc.restore();
  }
}

const dot = new Dot();

// A simple box drawable
class Box {
  constructor(public width = 250, public height = 250) {}

  draw(gc: CanvasRenderingContext2D) {
    gc.save();
    gc.fillStyle = "white";
    gc.strokeStyle = "black";
    gc.lineWidth = 1;
    gc.beginPath();
    gc.rect(0, 0, this.width, this.height);
    gc.fill();
    gc.stroke();
    gc.restore();
  }
}

const box = new Box();

setSKDrawCallback((gc) => {
  // clear canvas and draw everything
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  box.draw(gc);
  dot.draw(gc);
});

// set the animation callback
setSKAnimationCallback((time) => {
  bounce();
  // circle(time);
});

startSimpleKit();

//#region Bouncing dot animation using simulation

// random starting position
dot.x = random(dot.r, box.width - dot.r);
dot.y = random(dot.r, box.height - dot.r);

// random starting direction
let dx = random(1, 3) * (random(0, 1) < 0.5 ? -1 : 1);
let dy = random(1, 3) * (random(0, 1) < 0.5 ? -1 : 1);

// bounce the dot around the box
function bounce() {
  // if dot hits the edge of the canvas, change direction
  if (dot.x < dot.r || dot.x > box.width - dot.r) {
    dx *= -1.0;
  }
  if (dot.y < dot.r || dot.y > box.height - dot.r) {
    dy *= -1.0;
  }

  // update the dot position
  dot.x += dx;
  dot.y += dy;
}

//#endregion

// Circular path animation using simulation
function circle(time: number) {
  const cx = box.width / 2;
  const cy = box.height / 2;
  const r = Math.min(cx, cy) - dot.r;

  // uses time to control the animation
  const theta = time / 1000;
  dot.x = cx + r * Math.cos(theta);
  dot.y = cy + r * Math.sin(theta);
}
