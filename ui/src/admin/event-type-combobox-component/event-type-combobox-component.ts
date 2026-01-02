import { Component, inject, input, output, OutputEmitterRef } from '@angular/core';
import { Observable } from 'rxjs';
import { EventTypeModel } from '../../interfaces/EventTypeModel';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ApiEventsService} from '../../shared/api-events-service/api-events-service';

@Component({
  selector: 'app-event-type-combobox-component',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './event-type-combobox-component.html',
  styleUrl: './event-type-combobox-component.css',
})
export class EventTypeComboboxComponent {
  protected eventTypeList: Observable<EventTypeModel[]> = inject(ApiEventsService).getEventTypeList();

  selectedId = input<number>(-1);
  protected outputEventTypeId: OutputEmitterRef<number> = output<number>();

  protected setEventTypeId(event: Event): void {
    let id = parseInt((event.target as HTMLSelectElement).value);
    this.outputEventTypeId.emit(id);
  }
}
