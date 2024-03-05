import { NgClass, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { StratagemHeroService } from '../../../services/stratagem-hero.service';

@Component({
  selector: 'app-stratagem-time',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './stratagem-time.component.html',
  styleUrl: './stratagem-time.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class StratagemTimeComponent {
  time = this.stratagemHeroService.timeLeft;
  maxTime = this.stratagemHeroService.currentMaxTime;

  warnTime = this.stratagemHeroService.warnTime;

  constructor(private stratagemHeroService: StratagemHeroService) {}

  progress = computed(() => {
    return {
      width: `${(this.time() / this.maxTime()) * 100}%`,
    };
  });
}
