import { Component, HostListener } from '@angular/core';
import { StratagemHeroService as StratagemHeroService } from '../../services/stratagem-hero.service';
import { StratagemQueueComponent } from '../stratagem-queue/stratagem-queue.component';
import { StratagemTimeComponent } from '../stratagem-time/stratagem-time.component';
import { StratagemComponent } from '../stratagem/stratagem.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [StratagemComponent, StratagemQueueComponent, StratagemTimeComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  protected gameScore = this.stratagemTrainerService.gameScore;
  protected gameRound = this.stratagemTrainerService.gameRound;

  constructor(private stratagemTrainerService: StratagemHeroService) {}

  @HostListener('document:keydown', ['$event'])
  public onKeydown(event: KeyboardEvent) {
    this.stratagemTrainerService.onKey(event);
  }
}
