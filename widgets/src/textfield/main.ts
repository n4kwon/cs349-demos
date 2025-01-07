import {
  startSimpleKit,
  setSKDrawCallback,
  setSKEventListener,
  SKMouseEvent,
  SKKeyboardEvent,
} from "simplekit/canvas-mode";

import { SKTextfield } from "./textfield.ts";

// create a test label
const textfield = new SKTextfield({
  text: "Hello Textfield",
  x: 50,
  y: 50,
  width: 150,
});

setSKEventListener((e) => {
  if ("key" in e) {
    const { key } = e as SKKeyboardEvent;
    switch (e.type) {
      case "keydown":
        // test editing text (only when focused)
        if (textfield.focus && key) {
          textfield.text = textfield.applyEdit(textfield.text, key);
        }
        break;
    }
  } else if ("x" in e && "y" in e) {
    const { x, y } = e as SKMouseEvent;
    const mouseIsOver = textfield.hitTest(x, y);
    switch (e.type) {
      case "mousemove":
        // testing mouseexit/mouseenter behaviour
        if (mouseIsOver) {
          textfield.state = "hover";
        } else {
          textfield.state = "idle";
        }
        break;
      case "click":
        // test getting and losing keyboard focus
        if (mouseIsOver) {
          textfield.focus = true;
        } else {
          textfield.focus = false;
        }
        break;
    }
  }
});

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  textfield.draw(gc);
});

startSimpleKit();
