import { Component, Signal } from '@angular/core';
import { GameStartComponent } from '../game-start/game-start.component';
import { GameComponent } from '../game/game.component';
import { GameOverComponent } from '../game-over/game-over.component';
import { GamePhase, StratagemHeroService } from '../../../services/stratagem-hero.service';

@Component({
  selector: 'app-game-container',
  standalone: true,
  imports: [GameStartComponent, GameComponent, GameOverComponent],
  templateUrl: './game-container.component.html',
  styleUrl: './game-container.component.scss',
})
export class GameContainerComponent {
  gamePhase: Signal<GamePhase> = this.stratagemTrainerService.gamePhase;

  constructor(private stratagemTrainerService: StratagemHeroService) {}
}
