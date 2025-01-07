import { SKElement } from "simplekit/imperative-mode";

export interface Observer {
  update(): void;
}

export class Subject {
  private observers: Observer[] = [];

  public notifyObservers() {
    console.log(
      `📣 notify ${this.observers.length} observers at ${performance
        .now()
        .toFixed(0)}`
    );
    for (const o of this.observers) {
      if (o instanceof SKElement) {
        console.log(` ${o.id}`);
      }
      o.update();
    }
  }

  addObserver(observer: Observer) {
    observer.update();
    this.observers.push(observer);
  }

  removeObserver(observer: Observer) {
    this.observers.splice(this.observers.indexOf(observer), 1);
  }
}
