import { AfterViewInit, Component, ElementRef, Host, HostListener, OnInit, ViewContainerRef, signal, viewChildren, ɵɵngDeclareDirective } from '@angular/core';
import { Stratagems } from '../../data/stratagems';
import { KeyboardKeys } from '../../utils/keys';

@Component({
  selector: 'app-stratagems',
  standalone: true,
  imports: [],
  templateUrl: './stratagems.component.html',
  styleUrl: './stratagems.component.scss',
})
export class StratagemsComponent implements AfterViewInit {
  // Transform the Stratagems object into an array of keys
  stratagemNames = Object.keys(Stratagems);
  stratagems = Stratagems;
  stratagemsElements = viewChildren<ElementRef>('stratagem');
  stratagemGroups = viewChildren<ElementRef>('stratagemGroup');

  currentPage = signal(1);
  totalPages = signal(1);

  private numberOfStratagemGroupsInViewport = 0;

  ngAfterViewInit() {
    this.stratagemsElements()[0].nativeElement.classList.add('active');
    this.numberOfStratagemGroupsInViewport = this.stratagemGroups().filter((item: ElementRef) => this.isElementInViewport(item.nativeElement)).length;
    this.totalPages.set(Math.ceil(this.stratagemGroups().length / this.numberOfStratagemGroupsInViewport));
    this.calculateCurrentPage();
  }

  @HostListener('document:keydown', ['$event'])
  public onKeydown(event: KeyboardEvent) {
    if ([...KeyboardKeys.down, ...KeyboardKeys.up].includes(event.code)) {
      this.navigateStratagem(event);
    } else if ([...KeyboardKeys.left, ...KeyboardKeys.right].includes(event.code)) {
      this.navigateGroup(event);
    }
  }

  // Navigate the stratagems horizontally, to the next/previous group
  private navigateGroup(event: KeyboardEvent) {
    // Get the currect active stratagem index relative to its group
    const currentGroupIndex = this.stratagemGroups().findIndex((item: ElementRef) => item.nativeElement.querySelector('.active'));
    // Get the current active stratagem index
    const currentActiveIndex: number = this.stratagemsElements().findIndex((item: ElementRef) => item.nativeElement.classList.contains('active'));
    // Get the current group items and size
    const currentGroupItems = this.stratagemGroups()[currentGroupIndex]?.nativeElement.querySelectorAll('.stratagem');
    const currentGroupSize = currentGroupItems.length;
    const currectActiveIndexInsideGroup = Array.from<HTMLElement>(currentGroupItems).findIndex((item: HTMLElement) => item.classList.contains('active'));
    // Get the offset for the next/previous group
    let nextGroupOffset = 0;
    if (KeyboardKeys.right.includes(event.code)) {
      // The offset is the length of the current group size
      const nextGroupSize = this.stratagemGroups()[currentGroupIndex + 1]?.nativeElement.querySelectorAll('.stratagem').length;
      if (currectActiveIndexInsideGroup >= nextGroupSize) {
        nextGroupOffset = nextGroupSize + (currentGroupSize - currectActiveIndexInsideGroup - 1);
      } else {
        nextGroupOffset = currentGroupSize;
      }
    } else {
      // The offset is the length of the previous group size
      const previousGroupSize = this.stratagemGroups()[currentGroupIndex - 1]?.nativeElement.querySelectorAll('.stratagem').length;
      if (currectActiveIndexInsideGroup >= previousGroupSize) {
        nextGroupOffset = previousGroupSize + (currentGroupSize - currectActiveIndexInsideGroup);
      } else {
        nextGroupOffset = previousGroupSize;
      }
    }
    // Add the length of the current group to the current active index to move to next group at same height
    const nextActiveIndex = KeyboardKeys.right.includes(event.code) ? currentActiveIndex + nextGroupOffset : currentActiveIndex - nextGroupOffset;
    this.removeActiveClass();
    this.setActiveClass(nextActiveIndex);
    this.moveToViewIfNeeded();
  }

  // Navigate the stratagems vertically inside the group
  private navigateStratagem(event: KeyboardEvent) {
    const currentActiveIndex: number = this.stratagemsElements().findIndex((item: ElementRef) => item.nativeElement.classList.contains('active'));
    const nextActiveIndex = KeyboardKeys.down.includes(event.code) ? currentActiveIndex + 1 : currentActiveIndex - 1;
    this.removeActiveClass();
    this.setActiveClass(nextActiveIndex);
    this.moveToViewIfNeeded();
  }

  // Remove the active class from all stratagems
  private removeActiveClass() {
    this.stratagemsElements().forEach((item: ElementRef) => {
      item.nativeElement.classList.remove('active');
    });
  }

  // Set the active class on the next stratagem
  private setActiveClass(nextActiveIndex: number) {
    if (nextActiveIndex < 0) {
      this.stratagemsElements().at(-1)?.nativeElement.classList.add('active');
    } else if (nextActiveIndex >= this.stratagemsElements().length) {
      this.stratagemsElements().at(0)?.nativeElement.classList.add('active');
    } else {
      this.stratagemsElements().at(nextActiveIndex)?.nativeElement.classList.add('active');
    }
  }

  // Move to the active stratagem group if it's not in the viewport
  private moveToViewIfNeeded() {
    const currentGroup = this.stratagemGroups().find((item: ElementRef) => item.nativeElement.querySelector('.active'));
    if (currentGroup && !this.isElementInViewport(currentGroup.nativeElement)) {
      currentGroup.nativeElement.scrollIntoView(true, { behavior: 'smooth', block: 'center', inline: 'center' });
      this.calculateCurrentPage();
    }
  }

  // Calculate the current page based on the active stratagem group
  private calculateCurrentPage() {
    const currentGroupIndex = this.stratagemGroups().findIndex((item: ElementRef) => item.nativeElement.querySelector('.active'));
    this.currentPage.set(Math.ceil((currentGroupIndex + 1) / this.numberOfStratagemGroupsInViewport));
  }

  // Check if an element is in the viewport
  private isElementInViewport(el: HTMLElement) {
    var rect = el.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;

    return rect.left >= 0 && rect.top >= 0 && rect.left + rect.width <= windowWidth && rect.top + rect.height <= windowHeight;
  }
}
