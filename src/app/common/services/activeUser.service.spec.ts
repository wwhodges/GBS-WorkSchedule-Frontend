import { TestBed } from '@angular/core/testing';

import { ActiveUserService } from './activeUser.service';

describe('ActiveUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActiveUserService = TestBed.get(ActiveUserService);
    expect(service).toBeTruthy();
  });
});
