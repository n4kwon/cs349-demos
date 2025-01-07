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
let fps = 30;

// horizontally mirror the camera image
let mirror = true;

// make rendered video darker and more subtle
let subtle = false;

// processing settings - - - - - - - - - - -

// processing  - - - - - - - - - - - - - - -

// called once before frame processing starts
function setupFrameProcessing() {}

// called each new camera frame
function processFrame(f) {}
