import {
  startSimpleKit,
  setSKDrawCallback,
  setSKAnimationCallback,
  skTime,
} from "simplekit/canvas-mode";

import {
  flip,
  easeOut,
  easeIn,
  easeInOut,
  bow,
  bounce,
  Animator,
  lerp,
} from "./animator";

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

const dot = new Dot(0, 350);

// set the animation callback
setSKAnimationCallback((time) => {
  animateDotX.update(time);
});

setSKDrawCallback((gc) => {
  // clear canvas and draw it
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  graph.draw(gc);
  dot.draw(gc);
});

// setup the animation
const animateDotX = new Animator(
  50,
  300,
  1000,
  (value) => {
    dot.x = value;
    // (only needed to render the graph)
    graph.add(value);
  },
  (t) => flip(easeIn(t))
);

animateDotX.start(skTime);

startSimpleKit();

// object to save data and draw as graph
const graph = {
  // array of time and position
  data: [] as { t: number; p: number }[],

  add(value: number) {
    const t = skTime / animateDotX.duration;
    const p = lerp(
      0,
      1,
      (value - animateDotX.startValue) /
        (animateDotX.endValue - animateDotX.startValue)
    );

    this.data.push({ t, p });
  },

  x: 50,
  y: 50,
  wh: 250,

  draw(gc: CanvasRenderingContext2D) {
    // axes
    gc.beginPath();
    gc.moveTo(this.x, this.y);
    gc.lineTo(this.x, this.y + this.wh);
    gc.lineTo(this.x + this.wh, this.y + this.wh);
    gc.lineWidth = 2;
    gc.strokeStyle = "grey";
    gc.stroke();
    // curve
    gc.beginPath();
    this.data.forEach((d) => {
      gc.lineTo(this.x + d.t * this.wh, this.y + (1 - d.p) * this.wh);
    });
    gc.strokeStyle = "red";
    gc.stroke();
  },
};
