import {
  SKContainer,
  SKLabel,
  Layout,
  SKButton,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "../observer";
import { Model } from "../model";
import { SKCheckbox } from "../widgets/checkbox";

export class TodoView extends SKContainer implements Observer {
  //#region observer pattern

  update() {
    // console.log(`TodoView.update for ${this.id}`);
    const todo = this.model.getTodo(this.todoId);
    if (!todo) return;
    this.checkbox.checked = todo.done;
    this.todoText.text = `${todo.text || "?"} (id#${todo.id})`;
  }

  //#endregion

  checkbox = new SKCheckbox({ margin: 3 });
  todoText = new SKLabel({ text: "?", fillWidth: 1, align: "left" });
  selectButton = new SKButton({ text: " ", width: 18 });
  deleteButton = new SKButton({ text: "X", width: 18 });

  constructor(private model: Model, protected todoId: number) {
    super();

    this.id = `todo #${todoId} (created ${performance
      .now()
      .toFixed(0)})`;

    // view design
    this.padding = 5;
    this.margin = 5;
    this.fillWidth = 1;
    this.border = "grey";

    // setup the view
    this.layoutMethod = new Layout.FillRowLayout({ gap: 10 });

    this.addChild(this.checkbox);
    this.addChild(this.todoText);
    this.addChild(this.selectButton);
    this.addChild(this.deleteButton);

    // controllers
    this.checkbox.addEventListener("action", () => {
      model.updateTodo(todoId, { done: this.checkbox.checked });
    });
    this.deleteButton.addEventListener("action", () => {
      model.deleteTodo(todoId);
    });
    this.selectButton.addEventListener("action", () => {
      model.selectTodo(todoId);
    });

    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
