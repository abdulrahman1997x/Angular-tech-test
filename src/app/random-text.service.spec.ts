import { TestBed } from '@angular/core/testing';

import { RandomTextService } from './random-text.service';

describe('RandomTextService', () => {
  let service: RandomTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
