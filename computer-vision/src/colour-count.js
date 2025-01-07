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
let subtle = false;

// processing settings - - - - - - - - - - -

// target HSB colour to track
const targetColour = [334, 70, 100];

// threshold colour distance
const colourThreshold = 50;

// maximum and minimum counts to calibrate
let minCount = 500;
let maxCount = 20000;

// processing  - - - - - - - - - - - - - - -

// called each new camera frame
function processFrame(f) {
  // initialize count
  let specialPixelCount = 0;

  // library call to make pixels available
  f.loadPixels();

  // step by 4 since R, G, B, A values for each pixel
  for (let i = 0; i < f.pixels.length; i += 4) {
    // get the pixel colour and its distance to target colour
    const pixelColour = getPixelColour(f.pixels, i);
    const d = colourDistance(pixelColour, targetColour);

    // if it's closer than threshold, add to the count
    if (d < colourThreshold) {
      specialPixelCount++;
    }
  }

  // display a bar for the count
  colorMode(HSB);
  strokeWeight(1);
  stroke(255);
  fill(targetColour);
  let normCount = map(specialPixelCount, minCount, maxCount, 0, 1);
  rect(0, 0, 20, max(normCount * height, 0));
  colorMode(RGB);

  // print some debug information
  fill(255);
  stroke(0);
  strokeWeight(1);
  textSize(20);
  text(`${specialPixelCount} range [${[minCount, maxCount]})`, 5, 25);

  if (game) {
    game.update(normCount);
    game.draw();
  }
}

// not used in this demo
function setupFrameProcessing() {}

// game demo - - - - - - - - - - - -

function demoKeyPressed() {
  if (key == " ") game = new Game();
}

const PLAY = 0,
  LOSE = 1,
  WIN = 2;

let game;

class Game {
  constructor() {
    this.targets = [{ x: width / 2, y: height, size: 20 }];
    this.player = [];
    this.s = 20;
    this.state = PLAY;
    this.score = 0;
    this.playerSize = 50;
  }

  update(c) {
    if (this.state == PLAY) {
      this.player.x = width * c;
      this.player.y = 50;
    }

    for (let t of this.targets) {
      if (this.state == PLAY) t.y -= map(this.score, 0, 10, 4, 8);

      // see if player catches dot
      let d = dist(this.player.x, this.player.y, t.x, t.y);
      if (d < t.size / 2 + this.playerSize / 2) {
        this.score++;
        t.x = random(20, width - 20);
        t.y = height;
      }

      // if dot makes it past player
      if (t.y < 0) {
        this.state = LOSE;
      }
    }
  }

  draw() {
    stroke(255);
    strokeWeight(1);
    fill(0);
    circle(this.player.x, this.player.y, this.playerSize);
    textAlign(CENTER, CENTER);
    textSize(20);
    noStroke(0);
    fill(255);
    text(this.score, this.player.x, this.player.y);

    for (let t of this.targets) {
      stroke(0);
      fill(255);
      circle(t.x, t.y, 20);
    }

    if (this.state == LOSE) {
      textAlign(CENTER, CENTER);
      textSize(30);
      stroke(0);
      fill(255);
      text("You Lost", width / 2, height / 2);
    }
  }
}
