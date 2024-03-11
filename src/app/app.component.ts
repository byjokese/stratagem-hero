import { ChangeDetectionStrategy, Component, HostListener, Signal, TemplateRef, computed, effect, signal, viewChild, viewChildren } from '@angular/core';
import { StratagemHeroService } from './services/stratagem-hero.service';
import { MenuComponent } from './components/menu/menu.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NgxGoogleAnalyticsModule } from '@hakimio/ngx-google-analytics';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, NgxGoogleAnalyticsModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  menuTemplate = viewChild.required('menuHelp', { read: TemplateRef });
  arcadeTemplate = viewChild.required('gameHelp', { read: TemplateRef });
  creditsTemplate = viewChild.required('creditsHelp', { read: TemplateRef });
  stratagemsTemplate = viewChild.required('stratagemsHelp', { read: TemplateRef });

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

  getHelpTemplate() {
    switch (this.router.url) {
      case '/credits':
        return this.creditsTemplate();
      case '/stratagems':
        return this.stratagemsTemplate();
      case '/arcade':
        return this.arcadeTemplate();
      case '/':
      default:
        return this.menuTemplate();
    }
  }
}
