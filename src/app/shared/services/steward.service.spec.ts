import { TestBed } from '@angular/core/testing';

import { StewardService } from './steward.service';

describe('StewardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StewardService = TestBed.get(StewardService);
    expect(service).toBeTruthy();
  });
});
