import { h, render } from "preact";

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
    h("p", {}, clicked ? "CLICKED" : "declarative-h"),
    h("button", { onClick: () => setClicked(true) }, "Ok"),
  ]);
}

// when state changes, re-render the app
function update() {
  render(App(), document.querySelector("#app") as HTMLElement);
}

// initial render
update();

// View the VDOM tree
// console.log(JSON.stringify(App(), null, 2));
