import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe, NgClass } from '@angular/common';
import { StratagemHeroService } from '../../services/stratagem-hero.service';

@Component({
  selector: 'app-stratagem',
  standalone: true,
  imports: [JsonPipe, NgClass],
  templateUrl: './stratagem.component.html',
  styleUrl: './stratagem.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class StratagemComponent {
  stratagem = this.stratagemHeroService.currentStratagem;
  warnTime = this.stratagemHeroService.warnTime;
  wrongKey = this.stratagemHeroService.wrongKey;

  constructor(private stratagemHeroService: StratagemHeroService) {}
}
