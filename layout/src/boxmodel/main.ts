import {
  Settings,
  SKContainer,
  startSimpleKit,
  setSKRoot,
  Size,
} from "simplekit/imperative-mode";

// global debug flag
// Settings.debug = false;

const root = new SKContainer();
root.id = "ROOT";
root.fill = "white";
// root.debug = true;
root.padding = 10;
console.log(`root: ${root.debug}`);

const a = new SKContainer({ x: 30, y: 30, width: 100, height: 100 });
a.margin = 20;
a.padding = 10;
// a.border = "1px solid black";
a.fill = "lightgrey";
// for debug only
a.debug = true;
a.id = "A";
root.addChild(a);

function sizeToString(s: Size): string {
  return `${s.width} x ${s.height}`;
}

a.addEventListener("click", (e) => {
  // try a.marginBox and a.contentBox
  console.log(`'${a.id}' ${sizeToString(a.marginBox)}`);
});

setSKRoot(root);

// Settings.debugLayout = true;

startSimpleKit();
