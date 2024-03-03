import { TestBed } from '@angular/core/testing';

import { StratagemHeroService } from './stratagem-hero.service';

describe('StratagemTrainerService', () => {
  let service: StratagemHeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StratagemHeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
