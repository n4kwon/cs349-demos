import { h, render } from "./vdom.ts";

import "./style.css";

// state
let clicked = false;
const setClicked = (value: boolean) => {
  clicked = value;
  update();
};

// create the UI tree for the app
function App() {
  return h("div", { class: "container" }, [
    h("p", {}, clicked ? "CLICKED" : "declarative-h-mine"),
    h("button", { onClick: () => setClicked(true) }, "Ok"),
  ]);
}

// when state changes, re-render the app
function update() {
  render(App(), document.querySelector("#app") as HTMLElement);
}

// initial render
update();

const msg = "hi hyperscript";
const r = h("div", { class: "container" }, [
  h("p", {}, msg),
  h("button", {}, "Ok"),
]);

// View the VDOM tree
console.log(JSON.stringify(r, null, 2));
