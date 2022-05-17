import { TestBed } from '@angular/core/testing';

import { LogTimeVacationService } from './log-time-vacation.service';

describe('LogTimeVacationService', () => {
  let service: LogTimeVacationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogTimeVacationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
