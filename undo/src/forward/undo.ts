// using generic type for state
export interface Command<State> {
  // do command transforms the state
  do(state: State): State;
}

// using generic type for state
export class UndoManager<State> {
  private undoStack: Command<State>[] = [];
  private redoStack: Command<State>[] = [];

  constructor() {}

  // the undo manager is responsible for computing the state
  computeState(base: State): State {
    // go through all commands and compute the new count state
    return this.undoStack.reduce((acc, command) => {
      return command.do(acc);
    }, base);
  }

  execute(command: Command<State>) {
    // just adds command to the "undo" stack
    this.undoStack.push(command);
    this.redoStack = [];
    console.log(this.toString());
  }

  undo() {
    // undo just moves the command to the redo stack
    const command = this.undoStack.pop();
    if (command) {
      this.redoStack.push(command);
    }
    console.log(this.toString());
  }

  redo() {
    // redo just moves the command back to the "undo" stack
    const command = this.redoStack.pop();
    if (command) {
      this.undoStack.push(command);
    }
    console.log(this.toString());
  }

  get canUndo() {
    return this.undoStack.length > 0;
  }

  get canRedo() {
    return this.redoStack.length > 0;
  }

  toString() {
    return `undoStack: ${this.undoStack.length}, redoStack: ${this.redoStack.length}`;
  }
}
