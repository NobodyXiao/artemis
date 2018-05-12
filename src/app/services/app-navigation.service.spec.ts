import { TestBed, inject } from '@angular/core/testing';

import { AppNavigationService } from './app-navigation.service';

describe('TurnDetailPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppNavigationService]
    });
  });

  it('should be created', inject([AppNavigationService], (service: AppNavigationService) => {
    expect(service).toBeTruthy();
  }));
});
