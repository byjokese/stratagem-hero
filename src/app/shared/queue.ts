import { Collection } from "./Collection";

export interface IQueue<T> {
  enqueue(item: T): void;
  dequeue(): T | undefined;
  peek(): T | undefined;
  size(): number;
  toArray(): T[];
}

export class Queue<T> extends Collection<T> implements IQueue<T> {
  constructor(private capacity: number = Infinity) {
    super();
  }

  enqueue(item: T): void {
    if (this.isFull()) {
      throw Error('Queue has reached max capacity, you cannot add more items');
    }
    this.storage.push(item);
  }
  dequeue(): T | undefined {
    return this.storage.shift();
  }

  peek(): T | undefined {
    return this.storage[0];
  }

  isFull(): boolean {
    return this.capacity === this.size();
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }
}
