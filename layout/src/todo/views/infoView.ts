import {
  SKContainer,
  SKLabel,
  Layout,
} from "simplekit/imperative-mode";

export class InfoView extends SKContainer {
  constructor() {
    super();

    this.width = 160;
    this.fill = "lightgrey";
    this.fillHeight = 1;

    // setup the view
    this.layoutMethod = new Layout.CentredLayout();

    this.addChild(new SKLabel({ text: "5 Todos" }));
  }
}
