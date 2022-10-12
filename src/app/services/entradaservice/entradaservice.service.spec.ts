import { TestBed } from '@angular/core/testing';

import { EntradaserviceService } from './entradaservice.service';

describe('EntradaserviceService', () => {
  let service: EntradaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntradaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
