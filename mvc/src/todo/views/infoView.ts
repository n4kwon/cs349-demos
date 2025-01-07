import {
  SKContainer,
  SKLabel,
  Layout,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "../observer";
import { Model } from "../model";

export class InfoView extends SKContainer implements Observer {
  //#region observer pattern

  update() {
    const num = this.model.numTodos;
    if (num === 0) {
      this.message.text = "no todos!";
    } else if (this.model.selectId !== null) {
      this.message.text = `edit id#${this.model.selectId}`;
    } else {
      let text = `${num} todo${num > 1 ? "s" : ""}`;
      if (this.model.numDoneTodos > 0) {
        text += ` (${this.model.numDoneTodos} done)`;
      }

      this.message.text = text;
    }
  }

  //#endregion

  message = new SKLabel({ text: "?" });

  constructor(private model: Model) {
    super();

    this.id = "info";

    this.width = 160;
    this.fill = "lightgrey";
    this.fillHeight = 1;

    // setup the view
    this.layoutMethod = new Layout.CentredLayout();

    this.addChild(this.message);

    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
