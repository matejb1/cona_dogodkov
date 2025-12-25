import { TestBed } from '@angular/core/testing';

import { ApiEventsService } from './api-events-service';

describe('ApiEventsService', () => {
  let service: ApiEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
