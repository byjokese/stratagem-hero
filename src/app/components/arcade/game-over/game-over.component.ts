import { Component, HostListener } from '@angular/core';
import { StratagemHeroService } from '../../../services/stratagem-hero.service';
import { StratagemKeys } from '../../../utils/keys';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss',
})
export class GameOverComponent {
  protected score = this.stratagemTrainerService.gameScore;
  protected gamePhase = this.stratagemTrainerService.gamePhase;

  constructor(private stratagemTrainerService: StratagemHeroService) {}

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (this.gamePhase() === 'end' && StratagemKeys.includes(event.key)) {
      this.stratagemTrainerService.resetGame();
    }
  }
}
