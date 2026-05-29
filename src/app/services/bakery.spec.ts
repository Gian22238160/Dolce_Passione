import { TestBed } from '@angular/core/testing';

import { Bakery } from './bakery';

describe('Bakery', () => {
  let service: Bakery;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bakery);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
