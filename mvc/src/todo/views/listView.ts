import { SKContainer } from "simplekit/imperative-mode";

// local imports
import { Observer } from "../observer";
import { Model } from "../model";
import { StackColLayout } from "../layouts/stackCol";
import { TodoView } from "./todoView";

export class ListView extends SKContainer implements Observer {
  //#region observer pattern

  // numTodos = 0;

  update(): void {
    // Simplest thing to do is clear all children and build todo
    // list each time model updates. If performance becomes an issue,
    // then add code to keep undos with matching ids, etc.

    // if (this.numTodos === this.model.numTodos) return;

    // remove all child observers from model to avoid memory leak
    this.children.forEach((t) => {
      // type guard: TodoView is an Observer
      if (t instanceof TodoView) this.model.removeObserver(t);
    });

    // remove all current children
    this.clearChildren();

    // go through list of Todos, create a View for each
    this.model.allTodos().forEach((t) => {
      this.addChild(new TodoView(this.model, t.id));
    });

    // this.numTodos = this.model.numTodos;
  }

  //#endregion

  constructor(private model: Model) {
    super();

    this.id = "list";
    // this.debug = true;

    // setup the view design
    this.padding = 5;
    this.fillWidth = 1;
    this.fillHeight = 1;

    // use a custom layout in this app
    this.layoutMethod = new StackColLayout();

    // no widgets to setup, they're all created in updates

    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
