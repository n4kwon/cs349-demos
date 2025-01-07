// this demo doesn't use SimpleKit

export {}; // force module

// A simple red dot drawable
class Dot {
  constructor(public x = 0, public y = 0, public r = 20) {}

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

// add canvas and get graphics context
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.style.setProperty("background", "lightgrey");
const gc = canvas.getContext("2d");

if (gc) {
  dot.x = 50;

  // choose a demo to run
  demoIntervalTimer(gc);
  // demoRequestAnimationFrame(gc);
}

// linear interpolation function
const lerp = (start: number, end: number, t: number) =>
  start + (end - start) * t;

// using intervalTimer
function demoIntervalTimer(gc: CanvasRenderingContext2D) {
  let start = performance.now();
  const duration = 2000;
  let timer = setInterval(() => {
    const timePassed = performance.now() - start;
    dot.x = lerp(50, 250, timePassed / duration);
    gc.clearRect(0, 0, canvas.width, canvas.height);
    dot.draw(gc);
    // stop after certain time
    if (timePassed > duration) {
      clearInterval(timer);
    }
  }, 1000 / 60); // try lower FPS and see when flickering starts
}

// using requestAnimationFrame
function demoRequestAnimationFrame(gc: CanvasRenderingContext2D) {
  const duration = 2000;
  requestAnimationFrame(function animate(timePassed) {
    dot.x = lerp(50, 250, timePassed / duration);
    gc.clearRect(0, 0, canvas.width, canvas.height);
    dot.draw(gc);
    // stop after certain time
    if (timePassed < duration) {
      requestAnimationFrame(animate);
    }
  });
}
