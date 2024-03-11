import { AfterViewInit, Component, ElementRef, HostListener, computed, contentChild, contentChildren, viewChild, viewChildren } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StratagemHeroService } from '../../services/stratagem-hero.service';
import { IKeyboardKeys, KeyboardKeys } from '../../utils/keys';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements AfterViewInit {
  menuItems = viewChildren<ElementRef>('menuItem');
  menuItemsNotDisabled = computed(() => this.menuItems().filter((item: ElementRef) => !item.nativeElement.classList.contains('disabled')));
  constructor(
    private router: Router,
    private strtagemHeroService: StratagemHeroService
  ) {}

  ngAfterViewInit() {
    this.menuItems()[0].nativeElement.classList.add('active');
  }

  @HostListener('document:keydown', ['$event'])
  public onKeydown(event: KeyboardEvent) {
    if (KeyboardKeys.up.includes(event.code) || KeyboardKeys.down.includes(event.code)) {
      this.navigateMenu(event);
    } else if (KeyboardKeys.action.includes(event.code)) {
      this.selectMenuItem();
    }
  }

  private selectMenuItem() {
    const activeMenuItem = this.menuItemsNotDisabled().find((item: ElementRef) => item.nativeElement.classList.contains('active'));
    if (activeMenuItem) {
      this.strtagemHeroService.gameStartAudio.play();
      const routerLink = activeMenuItem.nativeElement.getAttribute('routerLink');
      if (routerLink) {
        this.router.navigate([routerLink]);
      }
    }
  }

  private navigateMenu(event: KeyboardEvent) {
    this.strtagemHeroService.gameButtonAudio.play();
    const currentActiveIndex: number = this.menuItemsNotDisabled().findIndex((item: ElementRef) => item.nativeElement.classList.contains('active'));
    this.menuItemsNotDisabled().forEach((item: ElementRef) => {
      item.nativeElement.classList.remove('active');
    });
    const nextActiveIndex = KeyboardKeys.down.includes(event.code) ? currentActiveIndex + 1 : currentActiveIndex - 1;
    if (nextActiveIndex < 0) {
      this.menuItemsNotDisabled().at(-1)?.nativeElement.classList.add('active');
    } else if (nextActiveIndex >= this.menuItemsNotDisabled().length) {
      this.menuItemsNotDisabled().at(0)?.nativeElement.classList.add('active');
    } else {
      this.menuItemsNotDisabled().at(nextActiveIndex)?.nativeElement.classList.add('active');
    }
  }
}
