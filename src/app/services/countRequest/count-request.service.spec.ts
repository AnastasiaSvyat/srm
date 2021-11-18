import { TestBed } from '@angular/core/testing';

import { CountRequestService } from './count-request.service';

describe('CountRequestService', () => {
  let service: CountRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
