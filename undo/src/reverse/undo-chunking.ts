export interface Command {
  do(): void;
  undo(): void;
}

// a chunk is just an array of commands
type Chunk = Command[];

export class UndoManager {
  private undoStack: Chunk[] = [];
  private redoStack: Chunk[] = [];

  constructor(
    public chunkTime: number,
    public notifyObservers: () => void
  ) {}

  chunk: Chunk = [];

  // need a reference to timeout timer to restart it
  // (setTimeout refs are just numbers)
  timeout = 0;

  executeChunk() {
    if (!this.chunk) return;
    this.undoStack.push(this.chunk);
    this.redoStack = [];
    this.chunk = [];
    console.log("💥 executeChunk", this.toString());
    this.notifyObservers();
  }

  execute(command: Command) {
    // restart timer
    clearTimeout(this.timeout);
    this.timeout = setTimeout(
      () => this.executeChunk(),
      this.chunkTime
    );
    this.chunk.push(command);
    console.log("👉 execute", `chunk: ${this.chunk?.length}`);
  }

  undo() {
    const chunk = this.undoStack.pop();
    if (!chunk) return;
    this.redoStack.push(chunk);
    console.log(`undo chunk with ${chunk.length} commands`);
    [...chunk].reverse().forEach((c) => c.undo());
    console.log("undo", this.toString());
  }

  redo() {
    const chunk = this.redoStack.pop();
    if (!chunk) return;
    this.undoStack.push(chunk);
    console.log(`redo chunk with ${chunk.length} commands`);
    chunk.forEach((c) => c.do());
    console.log("redo", this.toString());
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
