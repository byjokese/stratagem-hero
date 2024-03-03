import { ChangeDetectionStrategy, Component, Signal, computed, effect, input } from '@angular/core';
import { Queue } from '../../shared/queue';
import { Stratagem, isStratagemEqual } from '../../models/stratagem.model';
import { StratagemHeroService } from '../../services/stratagem-hero.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-stratagem-queue',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './stratagem-queue.component.html',
  styleUrl: './stratagem-queue.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class StratagemQueueComponent {
  queue = this.stratagemHeroService.stratagemQueue;
  currentStratagem = this.stratagemHeroService.currentStratagem;

  stratagems: Signal<Stratagem[]> = computed(() => this.queue().toArray().slice(0, 6), {
    equal: (a: Stratagem[], b: Stratagem[]) => a.length === b.length && a.every((stratagem, index) => isStratagemEqual(stratagem, b[index])),
  });

  constructor(private stratagemHeroService: StratagemHeroService) {}
}
