import { Routes } from '@angular/router';
import { GameContainerComponent } from './components/arcade/game-container/game-container.component';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { CreditsComponent } from './components/credits/credits.component';
import { StratagemsComponent } from './components/stratagems/stratagems.component';

export const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
  },
  {
    path: 'arcade',
    component: GameContainerComponent,
  },
  {
    path: 'stratagems',
    component: StratagemsComponent,
  },
  {
    path: 'credits',
    component: CreditsComponent,
  },
];
