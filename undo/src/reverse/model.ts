import { Subject } from "./observer";
// try importing "undo-chunking" instead
// import { Command, UndoManager } from "./undo-chunking";
import { Command, UndoManager } from "./undo";

export class Model extends Subject {
  //#region undo manager

  // use this constructor for undo-chunking
  // private undoManager = new UndoManager(500, () =>
  //   this.notifyObservers()
  // );

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

  readonly startCount = 49;

  private _count = this.startCount;
  set count(newValue: number) {
    // add command to undo stack
    const oldValue = this._count;
    this.undoManager.execute({
      do: () => {
        this._count = newValue;
      },
      undo: () => {
        this._count = oldValue;
      },
    } as Command);

    this._count = newValue;
    // need to notify observers any time the model changes
    this.notifyObservers();
  }
  get count() {
    return this._count;
  }

  increment() {
    // add command to undo stack
    this.undoManager.execute({
      do: () => {
        this._count++;
      },
      undo: () => {
        this._count--;
      },
    } as Command);

    this._count++;
    // need to notify observers any time the model changes
    this.notifyObservers();
  }

  decrement() {
    // add command to undo stack
    this.undoManager.execute({
      do: () => {
        this._count--;
      },
      undo: () => {
        this._count++;
      },
    } as Command);

    this._count--;
    // need to notify observers any time the model changes
    this.notifyObservers();
  }

  reset() {
    this.count = this.startCount;
  }
}
