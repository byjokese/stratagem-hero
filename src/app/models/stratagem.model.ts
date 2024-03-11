import { Queue } from '../shared/queue';
import { Key, KeyData } from './key.model';

export type StratagemType = IStratagem | null;

export interface IStratagem {
  guid: string;
  name: string;
  keys: KeyData[];
  keyQueue: Queue<KeyData>;
  image: string;
  category: string;

  reset(): void;
}

export class Stratagem implements IStratagem {
  guid: string = crypto.randomUUID();
  name: string = '';
  keys: KeyData[] = [];
  keyQueue: Queue<KeyData>;
  image: string = '';
  category: string = '';

  constructor(name: string, keys: Key[], image: string, category: string) {
    this.name = name;
    this.keys = keys.map((key) => ({ guid: crypto.randomUUID(), key, completed: false }));
    this.keyQueue = new Queue<KeyData>(keys.length);
    this.keys.forEach((keydata) => this.keyQueue.enqueue(keydata));
    this.image = image;
    this.category = category;
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
  if (a?.guid !== b?.guid) {
    return false;
  }
  return true;
};
