import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StratagemsComponent } from './stratagems.component';

describe('StratagemsComponent', () => {
  let component: StratagemsComponent;
  let fixture: ComponentFixture<StratagemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StratagemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StratagemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
