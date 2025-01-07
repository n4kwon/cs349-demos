import {
  SKButton,
  SKContainer,
  Layout,
  SKTextfield,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "../observer";
import { Model } from "../model";

export class FormView extends SKContainer implements Observer {
  //#region observer pattern

  update(): void {
    const id = this.model.selectId;
    if (id !== null) {
      this.button.text = "Update";
      this.textfield.text = this.model.getTodo(id)?.text || "";
    } else {
      this.button.text = "Add";
      this.textfield.text = "";
    }
  }

  //#endregion

  button = new SKButton({ text: "?", width: 80 });
  textfield = new SKTextfield({ text: "?", fillWidth: 1 });

  constructor(private model: Model) {
    super();

    this.id = "form";

    // setup the view
    this.fill = "grey";
    this.padding = 10;

    this.layoutMethod = new Layout.FillRowLayout({ gap: 10 });
    this.fillWidth = 1;

    // add widgets to the view
    this.addChild(this.textfield);
    this.addChild(this.button);

    // create controller
    this.button.addEventListener("action", () => {
      const text = this.textfield.text;
      if (model.selectId !== null) {
        model.updateTodo(model.selectId, { text });
      } else {
        model.createTodo(text);
      }
      this.textfield.text = "";
    });

    // this.textfield.addEventListener("textchanged", () => {
    //   if (model.selectId !== null) {
    //     const text = this.textfield.text;
    //     model.updateTodo(model.selectId, { text }, false);
    //   }
    // });

    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
