import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StratagemTimeComponent } from './stratagem-time.component';

describe('StratagemTimeComponent', () => {
  let component: StratagemTimeComponent;
  let fixture: ComponentFixture<StratagemTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StratagemTimeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StratagemTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
