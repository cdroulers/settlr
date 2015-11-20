export default class BaseStore {
  private listeners: Array<() => void> = null;

  public constructor() {
    this.listeners = [];
  }

  public addListener(listener: () => void): void {
    this.listeners.push(listener);
  }

  public removeListener(listener: () => void): void {
    var index: number = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  protected emitChange(): void {
    for (var i: number = 0; i < this.listeners.length; i++) {
      this.listeners[i]();
    }
  }
}
