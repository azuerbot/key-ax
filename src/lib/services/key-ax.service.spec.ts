import { TestBed } from '@angular/core/testing';

import { KeyAxService } from './key-ax.service';

describe('KeyAxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KeyAxService = TestBed.get(KeyAxService);
    expect(service).toBeTruthy();
  });
});
