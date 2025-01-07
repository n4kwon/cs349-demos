import {
  startSimpleKit,
  setSKDrawCallback,
  setSKAnimationCallback,
  skTime,
} from "simplekit/canvas-mode";

import { BasicTimer, CallbackTimer } from "./timer";

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

const dot = new Dot(100, 100);

// choose a demo to run
simpleTimerDemo();
// callbackTimerDemo();

startSimpleKit();

function simpleTimerDemo() {
  let timeText = "";

  // the animation callback
  setSKAnimationCallback((time) => {
    timer.update(time);
    timeText = `${(time / 1000).toFixed(1)}`;
  });

  setSKDrawCallback((gc) => {
    // clear canvas and draw it
    gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
    gc.font = "24px sans-serif";
    gc.textBaseline = "top";
    gc.fillText(timeText, 10, 10);
    if (!timer.isRunning) dot.draw(gc);
  });

  // create a three second timer
  const timer = new BasicTimer(3000);
  // start timer
  // (skTime is time in ms since SimpleKit started)
  timer.start(skTime);
}

function callbackTimerDemo() {
  let timeText = "";

  // the animation callback
  setSKAnimationCallback((time) => {
    timer.update(time);
    timeText = `${(time / 1000).toFixed(1)}`;
  });

  setSKDrawCallback((gc) => {
    // clear canvas and draw it
    gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
    gc.font = "24px sans-serif";
    gc.textBaseline = "top";
    gc.fillText(timeText, 10, 10);
    if (isVisible) dot.draw(gc);
  });

  let isVisible = false;

  // create a three second timer
  const timer = new CallbackTimer(3000, (t) => {
    console.log(`time up at ${t}!`);
    isVisible = true;
  });
  // start timer
  // (skTime is time in ms since SimpleKit started)
  timer.start(skTime);
}
