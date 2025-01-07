// general settings - - - - - - - - - - - -

// canvas scale
// (1.0 is full size of original camera frame,
// 0.5 is half original camera frame, etc..)
let canvasScale = 1;

// scale down image for faster processing
// (1.0 is no scale, try 0.5, 0.25, or 0.125 if slow)
let downScale = 0.5;

// adjust framerate for faster processing
// (30 is default, try 20, 15, or 10 if slow)
let fps = 20;

// horizontally mirror the camera image
let mirror = true;

// make rendered video darker and more subtle
let subtle = false;

// processing settings - - - - - - - - - - -

// processing  - - - - - - - - - - - - - - -

// the FaceMesh model
// using https://docs.ml5js.org/#/reference/facemesh
let model;

// latest model predictions
let predictions = [];

// flag to indicate model is ready
let modelReady = false;

function preload() {
  // initialize the model
  model = ml5.faceMesh(
    // options
    {
      maxFaces: 1,
      detectionConfidence: 0.5,
    },
    // callback when loaded
    () => {
      console.log("🚀 model loaded");
      modelReady = true;
    }
  );
}

// not used in this example
function setupFrameProcessing() {}

// called each new camera frame
function processFrame(f) {
  if (!modelReady) return;

  // see benefit of webgl gpu by forcing model to use cpu
  // ml5.setBackend("cpu");

  // get a prediction
  model.detect(f, (results) => {
    predictions = results;
  });

  // draw the face landmarks
  push();

  scale((1 / downScale) * canvasScale, (1 / downScale) * canvasScale);
  stroke(128);
  strokeWeight(1 * downScale * canvasScale);
  fill(255);

  drawLandmarks(5 * downScale * canvasScale);

  pop();
}

// Draw dots for all detected keypoints
function drawLandmarks(size) {
  for (let p of predictions) {
    const keypoints = p.keypoints;

    // Draw facial keypoints.
    for (let k of keypoints) {
      const { x, y } = k;
      circle(x, y, size);
    }
  }
}

function demoKeyPressed() {
  console.log(predictions);
}
