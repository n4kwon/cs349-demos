// camera
let cam;

// buffer for downsampled and possibly mirrored video frame
let frame;

// called once and start-up by the p5.js toolkit
function setup() {
  createCanvas(100, 100);

  // opens your camera
  cam = createCapture(VIDEO, () => {
    let w = cam.width;
    let h = cam.height;
    print(`🎥 camera opened`);
    print(` capture size (${w}, ${h})`);
    // create the frame buffer
    frame = createGraphics(w * downScale, h * downScale);
    frame.pixelDensity(1);
    print(
      ` capture frame scaled by ${downScale} to (${frame.width}, ${frame.height})`
    );
    // set the canvas size to match aspect ratio of frame
    resizeCanvas(w * canvasScale, h * canvasScale);
    print(
      ` display canvas scaled by ${canvasScale} to (${width}, ${height})`
    );
    print(` target fps ${fps}`);
  });

  // hide the HTML camera view
  cam.hide();

  // most webcams are 30 FPS or less
  frameRate(fps);

  // force retina displays to not double pixels
  pixelDensity(1);

  // any specific frame processing
  setupFrameProcessing();
}

// called every drawing frame by the p5.js toolkit
function draw() {
  background("blue");

  // if frame is ready, then process it
  if (cam.loadedmetadata) {
    transformFrame(cam, mirror);
    if (subtle) tint(100, 200);
    image(frame, 0, 0, width, height);
    if (subtle) noTint();
    processFrame(frame);
  }

  mouseColourPicker();

  drawFps();
}

function keyPressed() {
  if (key === "?") {
    // print info
  }

  demoKeyPressed();
}

// displays rect with colour of pixel at cursor position
function mouseColourPicker() {
  const c = get(mouseX, mouseY);
  stroke(255);
  strokeWeight(1);
  fill(c);
  rect(mouseX - 10, mouseY - 10, 20, 20);
}

// prints HSB colour to console at cursor position
function mousePressed() {
  const c = get(mouseX, mouseY);
  const cHSB = rgb2hsv(c[0], c[1], c[2]).map(int);
  print(`HSB ${cHSB} at ${[mouseX, mouseY]}`);
}

// basic processing for every frame
function transformFrame(img, mirror = true) {
  // flip it horizontally if mirror flag is set
  if (mirror) {
    frame.push();
    frame.scale(-1, 1);
    frame.translate(-frame.width, 0);
  }
  // render the camera image to buffer
  frame.image(img, 0, 0, frame.width, frame.height);
  if (mirror) frame.pop();
}

// helper functions

function getPixelColour(pixels, i) {
  const c = rgb2hsv(pixels[i], pixels[i + 1], pixels[i + 2]);
  return [c[0], c[1], c[2]];
}

function colourDistance(p1, p2) {
  return dist(p1[0], p1[1], p1[2], p2[0], p2[1], p2[2]);
}

function getPixelLocation(i, w, stride = 4) {
  const j = i / stride;
  return [j % w, floor(j / w)];
}

// input: r,g,b in [0,255], out: h in [0,360) and s,v in [0,100]
// (note HSV is same as HSB colourspace)
function rgb2hsv(r, g, b) {
  r = r / 255;
  g = g / 255;
  b = b / 255;
  let v = Math.max(r, g, b),
    c = v - Math.min(r, g, b);
  let h =
    c &&
    (v == r
      ? (g - b) / c
      : v == g
      ? 2 + (b - r) / c
      : 4 + (r - g) / c);
  return [60 * (h < 0 ? h + 6 : h), 100 * (v && c / v), 100 * v];
}

frameRateFiltered = -1;

function drawFps() {
  if (frameRateFiltered < 0) frameRateFiltered = fps;
  const a = 0.1;
  frameRateFiltered = a * frameRate() + (1 - a) * frameRateFiltered;
  stroke(0);
  strokeWeight(1);
  fill(255);
  textAlign(LEFT, TOP);
  textSize(20.0);
  text(this.frameRateFiltered.toFixed(1), 5, 5);
}
