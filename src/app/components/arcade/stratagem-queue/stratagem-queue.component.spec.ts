import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StratagemQueueComponent } from './stratagem-queue.component';

describe('StratagemQueueComponent', () => {
  let component: StratagemQueueComponent;
  let fixture: ComponentFixture<StratagemQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StratagemQueueComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StratagemQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
