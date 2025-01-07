import {
  SKContainer,
  SKLabel,
  Layout,
  SKButton,
} from "simplekit/imperative-mode";

// local imports
import { SKCheckbox } from "../widgets/checkbox";

export class TodoView extends SKContainer {
  constructor() {
    super();

    // view design
    this.padding = 5;
    this.margin = 5;
    this.fillWidth = 1;
    this.border = "grey";

    // setup the view
    this.layoutMethod = new Layout.FillRowLayout({ gap: 10 });

    this.addChild(new SKCheckbox({ margin: 3 }));

    // get random todo
    const todo = todos[Math.floor(Math.random() * todos.length)];

    this.addChild(
      new SKLabel({ text: todo, fillWidth: 1, align: "left" })
    );

    this.addChild(
      new SKButton({ id: "select", text: " ", width: 18 })
    );

    this.addChild(
      new SKButton({ id: "delete", text: "X", width: 18 })
    );
  }
}

// fake data
const todos = [
  "do laundry",
  "go to the gym",
  "pick up milk",
  "call my mother",
  "send email to colleague",
  "schedule dentist appointment",
  "finish reading chapter 5",
  "buy groceries",
  "take out the trash",
  "water the plants",
  "update budget spreadsheet",
  "clean the kitchen",
  "reply to text messages",
  "set up a meeting with the team",
  "vacuum the living room",
  "post a package",
  "pay utility bills",
  "walk the dog",
  "meal prep for the week",
  "watch a tutorial video",
];
