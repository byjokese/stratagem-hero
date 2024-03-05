import { Component, HostListener } from '@angular/core';
import { StratagemKeys } from '../../../utils/keys';
import { StratagemHeroService } from '../../../services/stratagem-hero.service';

@Component({
  selector: 'app-game-start',
  standalone: true,
  imports: [],
  templateUrl: './game-start.component.html',
  styleUrl: './game-start.component.scss',
})
export class GameStartComponent {
  protected gamePhase = this.stratagemTrainerService.gamePhase;

  constructor(private stratagemTrainerService: StratagemHeroService) {}

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (this.gamePhase() === 'start' && (StratagemKeys.includes(event.key) || event.code === 'Enter' || event.code === 'Space')) {
      this.stratagemTrainerService.startGame();
    }
  }
}
