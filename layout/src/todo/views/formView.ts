import {
  SKButton,
  SKContainer,
  Layout,
  SKTextfield,
} from "simplekit/imperative-mode";

export class FormView extends SKContainer {
  constructor() {
    super();

    // setup the view
    this.id = "form";
    this.fill = "grey";
    this.padding = 10;

    // try removing fillWidth
    this.fillWidth = 1;

    this.layoutMethod = new Layout.FillRowLayout({ gap: 10 });

    // add widgets to the view

    // try removing fillWidth
    this.addChild(new SKTextfield({ text: "", fillWidth: 1 }));

    this.addChild(new SKButton({ text: "Add", width: 80 }));
  }
}
