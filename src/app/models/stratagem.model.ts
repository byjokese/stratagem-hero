import { Queue } from '../shared/queue';
import { Key, KeyData } from './key.model';

export type StratagemType = IStratagem | null;

export interface IStratagem {
  name: string;
  keys: KeyData[];
  keyQueue: Queue<KeyData>;
  image: string;

  reset(): void;
}

export class Stratagem implements IStratagem {
  name: string = '';
  keys: KeyData[] = [];
  image: string = '';
  keyQueue: Queue<KeyData>;

  constructor(name: string, keys: Key[], image: string) {
    this.name = name;
    this.keys = keys.map((key) => ({ guid: crypto.randomUUID(), key, completed: false }));
    this.keyQueue = new Queue<KeyData>(keys.length);
    this.keys.forEach((keydata) => this.keyQueue.enqueue(keydata));
    this.image = image;
  }

  reset(): void {
    this.keys.forEach((key) => (key.completed = false));
    this.keyQueue = new Queue<KeyData>(this.keys.length);
    this.keys.forEach((keydata) => this.keyQueue.enqueue(keydata));
  }
}

export const isStratagemEqual = (a: IStratagem | null, b: IStratagem | null) => {
  if (a === null && b === null) {
    return true;
  }
  if (a?.keys.length !== b?.keys.length || a?.keyQueue.size !== b?.keyQueue.size || a?.name !== b?.name || a?.image !== b?.image) {
    return false;
  }
  return true;
};
