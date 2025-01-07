console.log("start");

const b = document.querySelector("button") as HTMLButtonElement;
b.addEventListener("click", () => {
  console.log("💥 button");
  long(); // can block from a callback too
});

setTimeout(() => {
  console.log("⏰ timer");
}, 1000);

function bar() {
  console.log("bar");
}

function foo() {
  bar();
  console.log("foo");
}

function long() {
  console.log("long start");
  let i = 0;
  while (i < 5000000000) {
    i++;
  }
  console.log("long end");
}

foo();

// note how long() blocks the timer and button clicks
// long();

console.log("end");
