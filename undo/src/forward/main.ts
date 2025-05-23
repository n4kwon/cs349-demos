import { EditView } from "./views/editView";
import { Model } from "./model";
import { ToolbarView } from "./views/toolbarView";

console.log("command");

const model = new Model();

// get reference to panel
const app = document.getElementById("app") as HTMLElement;
if (!app) throw new Error("div#app not found");

// setup the views
app.appendChild(new ToolbarView(model).root);
app.appendChild(new EditView(model).root);
