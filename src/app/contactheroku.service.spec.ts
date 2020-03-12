import { TestBed } from '@angular/core/testing';

import { ContactherokuService } from './contactheroku.service';

describe('ContactherokuService', () => {
  let service: ContactherokuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactherokuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
