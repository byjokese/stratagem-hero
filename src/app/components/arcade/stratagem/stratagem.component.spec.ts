import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StratagemComponent } from './stratagem.component';

describe('StratagemComponent', () => {
  let component: StratagemComponent;
  let fixture: ComponentFixture<StratagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StratagemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StratagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
