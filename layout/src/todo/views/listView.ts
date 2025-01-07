import { SKContainer } from "simplekit/imperative-mode";

// local imports
import { StackColLayout } from "../layouts/stackCol";
import { TodoView } from "./todoView";

export class ListView extends SKContainer {
  constructor() {
    super();

    // setup the view design
    this.padding = 5;
    this.fillWidth = 1;
    this.fillHeight = 1;
    // this.debug = true;

    // use a custom layout in this app
    this.layoutMethod = new StackColLayout();

    // add 5 todos to the list
    Array.from({ length: 5 }).forEach(() =>
      this.addChild(new TodoView())
    );
  }
}
