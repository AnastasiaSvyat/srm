import { TestBed } from '@angular/core/testing';

import { CareServiceService } from './care.service';

describe('CareServiceService', () => {
  let service: CareServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
