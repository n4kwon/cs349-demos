// general settings - - - - - - - - - - - -

// canvas scale
// (1.0 is full size of original camera frame,
// 0.5 is half original camera frame, etc..)
let canvasScale = 1.0;

// scale down image for faster processing
// (1.0 is no scale, try 0.5, 0.25, or 0.125 if slow)
let downScale = 0.5;

// adjust framerate for faster processing
// (30 is default, try 20, 15, or 10 if slow)
let fps = 30;

// horizontally mirror the camera image
let mirror = true;

// make rendered video darker and more subtle
let subtle = true;

// processing settings - - - - - - - - - - -

// size of image sample to calculate each flow vector
// (recommend > 4, lower needs processing)
const step = 8;

// run the drawing app
let makeDrawing = true;

// processing  - - - - - - - - - - - - - - -
// (using https://github.com/anvaka/oflow)

// flow calculation object
let flow;

// buffer used by flow
let previousPixels;

// the interactive drawing visualization
let viz;
// last point of the drawing
let lastPoint;
// current direction
let direction;

// called once before frame processing starts
function setupFrameProcessing() {
  // optical flow setup
  flow = new FlowCalculator(step);
  // save the overall direction vector in here
  direction = new p5.Vector(0, 0);
}

// called each new camera frame
function processFrame(f) {
  f.loadPixels();

  if (f.pixels.length > 0) {
    if (previousPixels) {
      // cheap way to ignore duplicate frames
      if (same(previousPixels, f.pixels, 8, width)) {
        return;
      }
      flow.calculate(previousPixels, f.pixels, f.width, f.height);
    }

    previousPixels = copyImage(f.pixels, previousPixels);

    // check if flow object is running and has calculated flow
    if (flow.flow && flow.flow.u != 0 && flow.flow.v != 0) {
      // draw the flow in each zone
      push();
      scale(
        (1 / downScale) * canvasScale,
        (1 / downScale) * canvasScale
      );
      strokeWeight(2 * downScale * canvasScale);
      flow.flow.zones.forEach(function (zone) {
        stroke(128);
        // use multi coloured vectors
        if (!makeDrawing) {
          stroke(
            map(zone.u, -step, +step, 0, 255),
            map(zone.v, -step, +step, 0, 255),
            128
          );
        }
        line(zone.x, zone.y, zone.x + zone.u, zone.y + zone.v);
      });

      pop();

      // get overall flow
      direction = new p5.Vector(flow.flow.u, flow.flow.v);

      // draw direction vector in middle
      stroke(255);
      strokeWeight(2);
      let s = 10.0;
      push();
      translate(width / 2, height / 2);
      line(0, 0, flow.flow.u * s, flow.flow.v * s);
      pop();
    }
  }

  // the interactive visualization part
  if (makeDrawing) {
    // create drawing viz buffer and init last point
    if (!lastPoint) {
      lastPoint = new p5.Vector(width / 2, height / 2);
      viz = createGraphics(width, height);
    }

    // make the drawing
    nextPoint = p5.Vector.add(
      lastPoint,
      p5.Vector.mult(direction, 1.0)
    );

    // drawing in the PGraphics
    viz.stroke(255);
    viz.strokeWeight(4);
    viz.line(lastPoint.x, lastPoint.y, nextPoint.x, nextPoint.y);

    // paste the viz into the canvas
    image(viz, 0, 0);

    lastPoint = nextPoint;
  }
}

// not used in this demo
function demoKeyPressed() {}

// helper functions - - - - - - - - - - - -

function copyImage(src, dst) {
  var n = src.length;
  if (!dst || dst.length != n) dst = new src.constructor(n);
  while (n--) dst[n] = src[n];
  return dst;
}

function same(a1, a2, stride, n) {
  for (var i = 0; i < n; i += stride) {
    if (a1[i] != a2[i]) {
      return false;
    }
  }
  return true;
}
