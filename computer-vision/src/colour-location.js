// general settings - - - - - - - - - - - -

// canvas scale
// (1.0 is full size of original camera frame, 
// 0.5 is half original camera frame, etc..)
let canvasScale = 1.0

// scale down image for faster processing
// (1.0 is no scale, try 0.5, 0.25, or 0.125 if slow)
let downScale = 0.5

// adjust framerate for faster processing
// (30 is default, try 20, 15, or 10 if slow)
let fps = 30

// horizontally mirror the camera image
let mirror = true

// make rendered video darker and more subtle 
let subtle = false

// processing settings - - - - - - - - - - - 

// target HSB colour to track
const targetColour = [330, 100, 100]


// processing  - - - - - - - - - - - - - - -

// called each new camera frame
function processFrame(f) {

    // initial "guess" for special pixel postion and distance
    let specialPixel = [0, 0]
    let specialPixelColour = [0, 0, 0]
    let closestDistance = Number.MAX_VALUE

    // library call to make pixels available
    f.loadPixels()

    // step by 4 since R, G, B, A values for each pixel
    for (let i = 0; i < f.pixels.length; i += 4) {

        // get the pixel colour and its distance to target colour
        const pixelColour = getPixelColour(f.pixels, i)
        const d = colourDistance(pixelColour, targetColour)

        // if it's closer, update the special pixel
        if (d < closestDistance) {
            closestDistance = d
            specialPixel = getPixelLocation(i, f.width)
            specialPixelColour = pixelColour
        }
    }

    // re-map pixel position to display size
    specialPixel = specialPixel.map(i => i / downScale * canvasScale);

    // display a circle at specialpixel location
    colorMode(HSB)
    strokeWeight(3)
    stroke(targetColour)
    fill(specialPixelColour)
    circle(specialPixel[0], specialPixel[1], 20)
    colorMode(RGB)

    // print some debug information
    fill(255)
    stroke(0)
    strokeWeight(1)
    textSize(20)
    text(`${round(closestDistance)} at (${specialPixel})`, 5, 25)

}

// not used in this demo
function setupFrameProcessing() { }
function demoKeyPressed() { }
