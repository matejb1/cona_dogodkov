import { TestBed } from '@angular/core/testing';

import { ApiEventTypeService } from './api-event-type-service';

describe('ApiEventTypeService', () => {
  let service: ApiEventTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiEventTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
