import { IStratagem, Stratagem } from '../models/stratagem.model';

export const Stratagems: IStratagem[] = [
  // Sypply Backpacks
  new Stratagem('AX/LAS-5 "Guard Dog" Rover', ['down', 'up', 'left', 'up', 'right', 'right'], 'AX-LAS-5icon.png'),
  new Stratagem('AD-334 Guard Dog', ['down', 'up', 'left', 'up', 'right', 'down'], 'AX-AR-23icon.png'),
  new Stratagem('LIFT-850 Jump Pack', ['down', 'up', 'up', 'down', 'up'], 'LIFT-850icon.png'),
  new Stratagem('B-1 Supply Pack', ['down', 'up', 'down', 'down', 'right'], 'B-1icon.png'),
  new Stratagem('SH-32 Shield Generator Pack', ['down', 'up', 'left', 'right', 'left', 'right'], 'SH-32icon.png'),
  new Stratagem('SH-20 Ballistic Shield Backpack', ['down', 'left', 'down', 'down', 'up', 'left'], 'SH-20icon.png'),
  // Supply Secondary Weapons
  new Stratagem('AC-8 Autocannon', ['down', 'left', 'down', 'up', 'up', 'right'], 'AC-8icon.png'),
  new Stratagem('EAT-17 Expendable Anti-Tank', ['down', 'left', 'right', 'up', 'down'], 'EAT-17icon.png'),
  new Stratagem('FLAM-40 "Incinerator" Flamethrower', ['down', 'left', 'down', 'right', 'left'], 'FLAM-40icon.png'),
  new Stratagem('LAS-98 Laser Cannon', ['down', 'left', 'down', 'up', 'left'], 'LAS-98icon.png'),
  new Stratagem('M-105 Stalwart', ['down', 'left', 'down', 'up', 'up', 'left'], 'M-105icon.png'),
  new Stratagem('MG-43 Machine Gun', ['down', 'left', 'down', 'up', 'right'], 'MG-43icon.png'),
  new Stratagem('ARC-3 Arc Thrower', ['down', 'right', 'down', 'up', 'left', 'left'], 'ARC-3icon.png'),
  new Stratagem('GL-21 Grenade Launcher', ['down', 'left', 'down', 'up', 'up', 'down'], 'GL-21icon.png'),
  new Stratagem('APW-1 Anti-Materiel Rifle', ['down', 'left', 'right', 'up', 'down'], 'APW-1icon.png'),
  new Stratagem('RS-422 Railgun', ['down', 'right', 'down', 'up', 'left', 'right'], 'RS-422icon.png'),
  new Stratagem('GR-8 Recoilless Rifle', ['down', 'left', 'right', 'right', 'left'], 'GR-8icon.png'),
  new Stratagem('FAF-14 Spear', ['down', 'left', 'down', 'up', 'up', 'right'], 'FAF-14icon.png'),
];
