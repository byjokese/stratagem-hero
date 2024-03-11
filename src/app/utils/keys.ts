export interface IKeyboardKeys {
  left: string[];
  right: string[];
  up: string[];
  down: string[];
  action: string[];
}

export const KeyboardKeys: IKeyboardKeys = {
  left: ['ArrowLeft', 'KeyA'],
  right: ['ArrowRight', 'KeyD'],
  up: ['ArrowUp', 'KeyW'],
  down: ['ArrowDown', 'KeyS'],
  action: ['Enter', 'Space'],
};

export const StratagemKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'KeyA', 'KeyD', 'KeyW', 'KeyS'];
