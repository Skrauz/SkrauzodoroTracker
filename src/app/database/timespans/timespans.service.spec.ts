import { TestBed } from '@angular/core/testing';

import { TimespansService } from './timespans.service';

describe('TimespansService', () => {
  let service: TimespansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimespansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
