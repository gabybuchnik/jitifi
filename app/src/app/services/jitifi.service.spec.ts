import { TestBed } from '@angular/core/testing';

import { JitifiService } from './jitifi.service';

describe('JitifiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JitifiService = TestBed.get(JitifiService);
    expect(service).toBeTruthy();
  });
});
