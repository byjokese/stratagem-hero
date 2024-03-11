import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StratagemHeroService } from '../../../services/stratagem-hero.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-stratagem-queue',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './stratagem-queue.component.html',
  styleUrl: './stratagem-queue.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class StratagemQueueComponent {
  queue = this.stratagemHeroService.stratagemQueue;
  currentStratagem = this.stratagemHeroService.currentStratagem;

  constructor(private stratagemHeroService: StratagemHeroService) {}
}
