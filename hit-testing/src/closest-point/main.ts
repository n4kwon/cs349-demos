import {
  setSKDrawCallback,
  setSKEventListener,
  startSimpleKit,
  SKMouseEvent,
  SKResizeEvent,
} from "simplekit/canvas-mode";

import { Point2, point, random } from "simplekit/utility";

import { closestPoint } from "./closest-point";

// state to track canvas size
let width = 0;
let height = 0;

// helper function to get random point inside canvas
function randomPoint(
  width: number,
  height: number,
  margin = 50
): Point2 {
  // margin keeps point away from canvas edges
  return point(
    random(margin, width - margin),
    random(margin, height - margin)
  );
}

// points to test and render in demo
let P0: Point2 = point(0, 0); // line segment start
let P1: Point2 = point(0, 0); // line segment end
let M: Point2 = point(0, 0); // mouse point
let Q: Point2 = point(0, 0); // closest point on line segment
let QInf: Point2 = point(0, 0); // closest point on infinite line

// handle events
setSKEventListener((e) => {
  function updateClosestPoint() {
    Q = closestPoint(M, P0, P1);
    QInf = closestPoint(M, P0, P1, false);
  }

  switch (e.type) {
    case "mousemove":
      const { x, y } = e as SKMouseEvent;
      M.x = x;
      M.y = y;
      updateClosestPoint();
      break;
    case "click":
      // new random line
      P0 = randomPoint(width, height);
      P1 = randomPoint(width, height);
      updateClosestPoint();
      break;
    case "resize":
      const re = e as SKResizeEvent;
      // update local canvas size state
      // (SimpleKit always sends resize event before first draw)
      width = re.width;
      height = re.height;
      // new random line
      P0 = randomPoint(width, height);
      P1 = randomPoint(width, height);
      updateClosestPoint();
      break;
  }
});

// draw line and closest point
setSKDrawCallback((gc) => {
  // clear background
  gc.clearRect(0, 0, width, height);

  // line
  gc.beginPath();
  gc.moveTo(P0.x, P0.y);
  gc.lineTo(P1.x, P1.y);
  gc.lineWidth = 2;
  gc.strokeStyle = "black";
  gc.stroke();

  // mouse point
  gc.beginPath();
  gc.arc(M.x, M.y, 10, 0, Math.PI * 2);
  gc.strokeStyle = "blue";
  gc.stroke();

  // closest point on infinite line
  gc.beginPath();
  gc.arc(QInf.x, QInf.y, 6, 0, Math.PI * 2);
  gc.strokeStyle = "orange";
  gc.stroke();

  // closest point on line segment
  gc.beginPath();
  gc.arc(Q.x, Q.y, 10, 0, Math.PI * 2);
  gc.strokeStyle = "red";
  gc.stroke();
});

startSimpleKit();
