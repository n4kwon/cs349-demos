import { makeDraggable } from "./makeDraggable";

console.log("drag-dom");

// get reference to app div
const app = document.querySelector("div#app") as HTMLDivElement;

// array of "div" circles to draw
const circles: HTMLDivElement[] = [];

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// create circles
for (let i = 0; i < 5; i++) {
  const div = document.createElement("div");
  div.classList.add("circle");
  const diameter = random(32, 128);
  div.style.width = `${diameter}px`;
  div.style.height = `${diameter}px`;
  div.style.left = `${random(
    app.offsetLeft,
    app.offsetLeft + app.offsetWidth - diameter
  )}px`;
  div.style.top = `${random(
    app.offsetTop,
    app.offsetTop + app.offsetHeight - diameter
  )}px`;

  circles.push(div);
}

// make all circles draggable
circles.forEach((circle) => makeDraggable(circle, app));

// add all circles to the DOM
circles.forEach((circle) => app.appendChild(circle));
