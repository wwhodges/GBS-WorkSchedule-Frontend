import { TestBed } from '@angular/core/testing';

import { AwsDataService } from './awsData.service';

describe('AwsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwsDataService = TestBed.get(AwsDataService);
    expect(service).toBeTruthy();
  });
});
