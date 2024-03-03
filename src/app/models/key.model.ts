export interface KeyData {
  guid: string;
  key: Key;
  completed: boolean;
}
export type Key = "up" | "right" | "down" | "left";
