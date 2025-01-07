import { Subject } from "./observer";
import { Command, UndoManager } from "./undo";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

// super simple "id generator"
let uniqueId = 1;

export class Model extends Subject {
  //#region undo manager

  private undoManager = new UndoManager();

  undo() {
    this.undoManager.undo();
    this.notifyObservers();
  }

  redo() {
    this.undoManager.redo();
    this.notifyObservers();
  }

  get canUndo() {
    return this.undoManager.canUndo;
  }

  get canRedo() {
    return this.undoManager.canRedo;
  }

  //#endregion

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

    // generate unique id once, use it in do and to create the todo
    // (you don't want uniqueId to change between do and undo)
    const id = uniqueId++;
    // undo add command
    this.undoManager.execute({
      do: () => {
        this.todos = [...this.todos, { id, text: task, done: false }];
      },
      undo: () => {
        this.todos = this.todos.slice(0, -1);
      },
    } as Command);

    this.todos = [...this.todos, { id, text: task, done: false }];
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
    // for undo, capture the todo before the edit
    const originalTodo = this.todos.find((t) => t.id === id);
    if (!originalTodo) return;

    // undo update command
    this.undoManager.execute({
      do: () => {
        this.todos = this.todos.map((t) =>
          t.id === id ? { ...t, ...todo } : t
        );
      },
      undo: () => {
        this.todos = this.todos.map((t) =>
          t.id === id ? originalTodo : t
        );
      },
    } as Command);

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
    // no undo for selecting, it's a UI only action
    this._selectId = id;
    this.notifyObservers();
  }

  // Delete
  deleteTodo(id: number) {
    // for undo, capture the todo being deleted and its index
    const deletedTodo = this.todos.find((t) => t.id === id);
    if (!deletedTodo) return;
    const deletedTodoIndex = this.todos.findIndex((t) => t.id === id);

    this.undoManager.execute({
      do: () => {
        this.todos = this.todos.filter((t) => t.id !== id);
      },
      undo: () => {
        // need to insert deleted todo at its original index
        this.todos = [
          ...this.todos.slice(0, deletedTodoIndex),
          deletedTodo,
          ...this.todos.slice(deletedTodoIndex),
        ];
      },
    } as Command);

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
