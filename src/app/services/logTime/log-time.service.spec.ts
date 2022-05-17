import { TestBed } from '@angular/core/testing';

import { LogTimeService } from './log-time.service';

describe('LogTimeService', () => {
  let service: LogTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
