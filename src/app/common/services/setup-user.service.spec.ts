import { TestBed } from '@angular/core/testing';

import { SetupUserService } from './setup-user.service';

describe('SetupUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetupUserService = TestBed.get(SetupUserService);
    expect(service).toBeTruthy();
  });
});
