import { TestBed } from '@angular/core/testing';

import { AmountConfirmedRequestMonthService } from './amount-confirmed-request-month.service';

describe('AmountConfirmedRequestMonthService', () => {
  let service: AmountConfirmedRequestMonthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmountConfirmedRequestMonthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
