import {
  startSimpleKit,
  setSKRoot,
  SKContainer,
  Layout,
  Settings,
  setSKEventListener,
  SKKeyboardEvent,
} from "simplekit/imperative-mode";

// local imports
import { Model } from "./model";
import { FormView } from "./views/formView";
import { ListView } from "./views/listView";
import { StackColLayout } from "./layouts/stackCol";
import { InfoView } from "./views/infoView";

// data
const model = new Model();

// user interface

// root container
const root = new SKContainer({
  id: "root",
  layoutMethod: new Layout.FillRowLayout(),
});

// create container to hold left-side views
const left = new SKContainer({
  fillWidth: 1,
  layoutMethod: new StackColLayout(),
});

// add views to left (will be stacked vertically)
left.addChild(new FormView(model));
left.addChild(new ListView(model));

// add views to root (will be left and right areas)
root.addChild(left);
root.addChild(new InfoView(model));

setSKRoot(root);

startSimpleKit();

// Settings.debug = true;

//// call notifiyObservers when Escape key is pressed
//// (for debugging purposes, must use observer-debug include in model)
// setSKEventListener((e) => {
//   if (e.type === "keydown") {
//     const { key } = e as SKKeyboardEvent;
//     if (key === "Escape") {
//       model.notifyObservers();
//     }
//     // console.log(key);
//   }
// });
