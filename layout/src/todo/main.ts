import {
  startSimpleKit,
  setSKRoot,
  SKContainer,
  Layout,
  Settings,
} from "simplekit/imperative-mode";

// local imports
import { FormView } from "./views/formView";
import { ListView } from "./views/listView";
import { StackColLayout } from "./layouts/stackCol";
import { InfoView } from "./views/infoView";

// root container
const root = new SKContainer();
root.id = "root";
root.layoutMethod = new Layout.FillRowLayout();

// create container to hold left-side views
const left = new SKContainer();
left.fillWidth = 1;
left.layoutMethod = new StackColLayout();

// add views to left (will be stacked vertically)
left.addChild(new FormView());
left.addChild(new ListView());

// add views to root (will be left and right areas)
root.addChild(left);
root.addChild(new InfoView());

setSKRoot(root);

startSimpleKit();

// Settings.debug = true;
