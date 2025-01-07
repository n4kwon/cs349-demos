/**
 * SimpleKit Example Project
 *
 * uses a Drawable Square and DisplayList
 * sets event handler with "switch" dispatch
 * sets draw handler
 * starts SimpleKit
 */

import {
  SKEvent,
  SKMouseEvent,
  setSKDrawCallback,
  setSKEventListener,
  startSimpleKit,
} from "simplekit/canvas-mode";

// local import
import { Square2 } from "./square2";
import { DisplayList } from "./displaylist";

// drawable square (from Drawing lecture)
let square = new Square2({
  size: 50,
  lineWidth: 2,
});

// display list of squares
const displayList = new DisplayList();
displayList.add(square);

// event handler with switch statement dispatch
function handleEvent(e: SKEvent) {
  switch (e.type) {
    case "mousemove":
      const { x, y } = e as SKMouseEvent;
      square.x = x;
      square.y = y;
      break;
    case "click":
      const fill = `hsl(${Math.random() * 360} 100% 50%)`;
      square.fill = fill;
      break;
    case "drag":
      square.size += 2;
      break;
    case "dblclick":
      square.size = 50;
      break;
    case "keydown":
      {
        const { key } = e as KeyboardEvent;
        switch (key) {
          case "p":
            square.fill = "deeppink";
            break;
          case " ":
            // create a new square to manipulate
            square = new Square2({
              x: square.x,
              y: square.y,
              size: 50,
              lineWidth: 2,
            });
            displayList.add(square);
        }
      }
      break;
  }
}

// set the event handler
setSKEventListener(handleEvent);

// set the draw callback (using function expression)
setSKDrawCallback((gc: CanvasRenderingContext2D) => {
  // clear the canvas
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  // draw using the display list
  displayList.draw(gc);
});

// start SimpleKit
startSimpleKit();
