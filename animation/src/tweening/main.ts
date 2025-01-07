export {}; // force module

import {
  startSimpleKit,
  setSKDrawCallback,
  setSKAnimationCallback,
  skTime,
} from "simplekit/canvas-mode";

import { Animator } from "./animator";

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

const dot = new Dot(0, 75);

// animation callback
setSKAnimationCallback((time) => {
  animateDotX.update(time);
});

// draw callback
setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);

  dot.draw(gc);
});

// setup the animation object
const animateDotX = new Animator(50, 300, 3000, (value) => {
  dot.x = value;
});

// start timer
animateDotX.start(skTime);

startSimpleKit();
