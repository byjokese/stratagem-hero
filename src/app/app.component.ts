import { ChangeDetectionStrategy, Component, HostListener, Signal, computed, effect, signal } from '@angular/core';
import { GameStartComponent } from './components/game-start/game-start.component';
import { GameComponent } from './components/game/game.component';
import { GameOverComponent } from './components/game-over/game-over.component';
import { StratagemKeys } from './utils/keys';
import { GamePhase, StratagemHeroService } from './services/stratagem-hero.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameStartComponent, GameComponent, GameOverComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  gamePhase: Signal<GamePhase> = this.stratagemTrainerService.gamePhase;

  constructor(private stratagemTrainerService: StratagemHeroService) {}
}
