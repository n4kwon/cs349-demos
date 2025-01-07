import html from "html-template-tag";

console.log("html");

// convention is to put app in a div
const root = document.querySelector("div#app") as HTMLDivElement;
// good practice to throw an error if element not found
if (!root) throw new Error("div with id root not found");

// demo two ways to create a button and add to the DOM
imperative(root);
declarative(root);

// imperative DOM manipulation
function imperative(root: HTMLDivElement) {
  // create node
  const button = document.createElement("button");

  // set attributes
  button.innerText = "Imperative";
  button.style.color = "red";

  // add to DOM
  root.appendChild(button);
}

// declarative DOM manipulation
function declarative(root: HTMLDivElement) {
  // define node in HTML and insert into DOM
  // try changing "beforeend" to "afterbegin" or "beforebegin" or "afterend"
  root.insertAdjacentHTML(
    "beforeend",
    html`<button style="color: blue;">Declarative</button>`
  );

  // try this instead, what happens to the imperative button?
  //   root.innerHTML = html`<button>💥</button>`;
}
