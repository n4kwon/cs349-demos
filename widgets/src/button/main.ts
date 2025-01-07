import {
  startSimpleKit,
  setSKDrawCallback,
  setSKEventListener,
  SKMouseEvent,
} from "simplekit/canvas-mode";

import { SKButton } from "./button.ts";

import { Style } from "../element/style";
// Style.highlightColour = "lightgreen";

// create a test button
const button = new SKButton({
  text: "Test",
  x: 50,
  y: 50,
  width: 100,
});

setSKEventListener((e) => {
  // test of button behaviour using global events
  // nned to simulate dispatch and focus events

  // if event object has x and y properties, it must be a mouse event
  if ("x" in e && "y" in e) {
    const { x, y } = e as SKMouseEvent;
    const mouseIsOver = button.hitTest(x, y);
    switch (e.type) {
      case "mousemove":
        if (button.state !== "down") {
          if (mouseIsOver) {
            button.state = "hover";
          } else {
            button.state = "idle";
          }
        }
        break;

      case "mousedown":
        if (mouseIsOver) {
          button.state = "down";
        }
        break;

      case "mouseup":
        if (button.state === "down") {
          console.log("button click action");
          if (mouseIsOver) {
            button.state = "hover";
          } else {
            button.state = "idle";
          }
        }
        break;
    }
  }
});

setSKDrawCallback((gc) => {
  gc.fillStyle = "white";
  gc.fillRect(0, 0, gc.canvas.width, gc.canvas.height);
  button.draw(gc);
});

startSimpleKit();
