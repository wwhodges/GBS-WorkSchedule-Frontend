import { TestBed } from '@angular/core/testing';

import { ApiDataService } from './apiData.service';

describe('ApiDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiDataService = TestBed.get(ApiDataService);
    expect(service).toBeTruthy();
  });
});
