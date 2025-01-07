// try changing to "observer-debug"
import { Subject } from "./observer";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

// super simple "id generator"
let uniqueId = 1;

export class Model extends Subject {
  // model data (i.e. model state)
  private todos: Todo[] = [];

  // information methods
  get numTodos() {
    return this.todos.length;
  }

  get numDoneTodos() {
    return this.todos.filter((t) => t.done).length;
  }

  // model "business logic" (CRUD)

  // Create
  createTodo(task: string) {
    // for demoing purposes, if no task is provided, pick a random one
    task =
      task ||
      sampleTodos[Math.floor(Math.random() * sampleTodos.length)];
    this.todos = [
      ...this.todos,
      { id: uniqueId++, text: task, done: false },
    ];
    this.notifyObservers();
  }

  // Read
  getTodo(id: number): Todo | undefined {
    const todo = this.todos.find((t) => t.id === id);
    // return copy of the todo so users can't mutate Model data
    return todo ? { ...todo } : undefined;
    // no need to notify observers since Model data not changed
  }

  allTodos(): Todo[] {
    // return copy of each Todo in a new array so users can't mutate Model data
    return this.todos.map((t) => ({ ...t }));
  }

  // Update
  updateTodo(
    id: number,
    todo: { text?: string; done?: boolean },
    clearSelection = true
  ) {
    this.todos = this.todos.map((t) =>
      // if todo matches id, then spread it and replace
      // with defined properties in todo object argument
      t.id === id ? { ...t, ...todo } : t
    );
    if (clearSelection) this._selectId = null;
    this.notifyObservers();
  }

  // select a todo to edit
  private _selectId: number | null = null;
  get selectId() {
    return this._selectId;
  }
  selectTodo(id: number) {
    this._selectId = id;
    this.notifyObservers();
  }

  // Delete
  deleteTodo(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);
    // edge case if editing a todo that is deleted
    if (this._selectId === id) this._selectId = null;
    this.notifyObservers();
  }
}

// fake data
const sampleTodos = [
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

// import { Subject } from "./observer";

// type Todo = {
//   id: number;
//   task: string;
//   done: boolean;
// };

// // super simple "id generator"
// let uniqueId = 1;

// export class Model extends Subject {
//   // model data (i.e. model state)
//   private todos: Todo[] = [];

//   // information methods
//   get num() {
//     return this.todos.length;
//   }

//   get numDone() {
//     return this.todos.filter((t) => t.done).length;
//   }

//   // model "business logic" (CRUD)

//   // Create
//   create(task: string) {
//     this.todos = [
//       ...this.todos,
//       { id: uniqueId++, task, done: false },
//     ];
//     this.notifyObservers();
//   }

//   // Read
//   todo(id: number): Todo | undefined {
//     return this.todos.find((t) => t.id === id);
//     // no need to notify observers since data not changed
//   }

//   all(): Todo[] {
//     // return a copy (avoids bugs if views try to edit)
//     return [...this.todos];
//   }

//   // Update
//   update(id: number, todo: { text?: string; done?: boolean }) {
//     this.todos = this.todos.map((t) =>
//       // if todo matches id, then spread it and replace
//       // with defined properties in todo object argument
//       t.id === id ? { ...t, ...todo } : t
//     );
//     this._selectId = null;
//     this.notifyObservers();
//   }

//   // select a todo to edit
//   private _selectId: number | null = null;
//   get selectId() {
//     return this._selectId;
//   }
//   select(id: number) {
//     this._selectId = id;
//     this.notifyObservers();
//   }

//   // Delete
//   delete(id: number) {
//     this.todos = this.todos.filter((t) => t.id !== id);
//     // edge case if editing a todo that is deleted
//     if (this._selectId === id) this._selectId = null;
//     this.notifyObservers();
//   }
// }
