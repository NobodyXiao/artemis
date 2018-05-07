import { TestBed, inject } from '@angular/core/testing';

import { TurnDetailPageService } from './turn-detail-page.service';

describe('TurnDetailPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TurnDetailPageService]
    });
  });

  it('should be created', inject([TurnDetailPageService], (service: TurnDetailPageService) => {
    expect(service).toBeTruthy();
  }));
});
