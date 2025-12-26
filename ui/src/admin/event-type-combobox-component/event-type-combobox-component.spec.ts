import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTypeComboboxComponent } from './event-type-combobox-component';

describe('EventTypeComboboxComponent', () => {
  let component: EventTypeComboboxComponent;
  let fixture: ComponentFixture<EventTypeComboboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventTypeComboboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventTypeComboboxComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
