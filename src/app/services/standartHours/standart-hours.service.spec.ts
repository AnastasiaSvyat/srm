import { TestBed } from '@angular/core/testing';

import { StandartHoursService } from './standart-hours.service';

describe('StandartHoursService', () => {
  let service: StandartHoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandartHoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
