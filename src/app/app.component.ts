import { ChangeDetectionStrategy, Component, HostListener, Signal, computed, effect, signal } from '@angular/core';
import { StratagemHeroService } from './services/stratagem-hero.service';
import { MenuComponent } from './components/menu/menu.component';
import { Router, RouterOutlet } from '@angular/router';
import { NgxGoogleAnalyticsModule } from '@hakimio/ngx-google-analytics';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, NgxGoogleAnalyticsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(
    private stratagemTrainerService: StratagemHeroService,
    private router: Router
  ) {}

  @HostListener('document:keydown', ['$event'])
  public onKeydown(event: KeyboardEvent) {
    // on scape esc, navigate to main menu if not already there
    if (event.key === 'Escape') {
      this.stratagemTrainerService.gameMenuBackAudio.play();
      this.stratagemTrainerService.resetGame();
      this.router.navigate(['/']);
    }
  }
}
