import { startSimpleKit, setSKDrawCallback } from "simplekit/canvas-mode";

startSimpleKit();

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);

  // demos
  // squareDemo(gc);
  // paintersDemo(gc);
  displayListDemo(gc);
});

//#region squareDemo
import { Square1 } from "./square1";

const redSquare = new Square1(50, 50, 50);
const blueSquare = new Square1(250, 50, 50);
const square = new Square1(150, 50, 50);

function squareDemo(gc: CanvasRenderingContext2D) {
  gc.save();
  gc.fillStyle = "pink";
  gc.strokeStyle = "red";
  gc.lineWidth = 3;
  redSquare.draw(gc);
  gc.restore();

  gc.save();
  gc.fillStyle = "lightblue";
  gc.strokeStyle = "blue";
  gc.lineWidth = 3;
  blueSquare.draw(gc);
  gc.restore();

  gc.save();
  gc.fillStyle = "grey";
  square.draw(gc);
  gc.restore();
}
//#endregion

//#region paintersDemo
import { Cat } from "./cat";

const square2 = new Square2({
  x: 100,
  y: 75,
});
const cat = new Cat(50, 100);

function paintersDemo(gc: CanvasRenderingContext2D) {
  square2.draw(gc);
  cat.draw(gc);
}
//#endregion

//#region displayListDemo

import { DisplayList } from "./displaylist";
import { Square2 } from "./square2";

const displayList = new DisplayList();

displayList.add(
  new Square2({
    x: 60,
    y: 50,
    size: 50,
    fill: "red",
    lineWidth: 3,
  })
);

const cat2 = new Cat(100, 60);
displayList.add(cat2);

displayList.add(
  new Square2({
    x: 140,
    y: 50,
    size: 50,
    fill: "blue",
    lineWidth: 3,
  })
);

//#region random objects
if (false) {
  // useful for generating random numbers
  function random(lower: number, upper: number) {
    return lower + Math.random() * (upper - lower);
  }

  for (let i = 0; i < 10; i++) {
    const size = random(25, 50);
    const x = random(25, 175);
    const y = random(25, 75);
    displayList.add(
      new Square2({
        x,
        y,
        size,
        fill: "green",
      })
    );
  }
}
//#endregion

// move shape to front
// displayList.remove(cat2);
// displayList.add(cat2);

function displayListDemo(gc: CanvasRenderingContext2D) {
  displayList.draw(gc);
}

//#endregion
