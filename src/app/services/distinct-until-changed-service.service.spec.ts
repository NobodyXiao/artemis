import { TestBed, inject } from '@angular/core/testing';

import { DistinctUntilChangedServiceService } from './distinct-until-changed-service.service';

describe('DistinctUntilChangedServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistinctUntilChangedServiceService]
    });
  });

  it('should be created', inject([DistinctUntilChangedServiceService], (service: DistinctUntilChangedServiceService) => {
    expect(service).toBeTruthy();
  }));
});
