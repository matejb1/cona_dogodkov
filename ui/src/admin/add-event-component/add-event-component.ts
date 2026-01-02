import { Component, inject, signal, WritableSignal } from '@angular/core';
import { EventTypeComboboxComponent } from '../event-type-combobox-component/event-type-combobox-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventDetailsModel } from '../../interfaces/EventDetailsModel';
import { LoadingComponent } from '../../shared/loading-component/loading-component';
import { Router } from '@angular/router';
import { StatusModel } from '../../interfaces/StatusModel';
import { ApiEventsService } from '../../shared/api-events-service/api-events-service';

@Component({
  selector: 'app-add-event-component',
  imports: [EventTypeComboboxComponent, ReactiveFormsModule, FormsModule, LoadingComponent],
  templateUrl: './add-event-component.html',
  styleUrl: './add-event-component.css',
})
export class AddEventComponent {
  private apiEventsService: ApiEventsService = inject(ApiEventsService);
  private router: Router = inject(Router);
  protected eventModel: EventDetailsModel = {
    nameEventType: '',
    idEventType: -1,
    date: '',
    link: '',
    name: '',
    location: '',
    price: 0.0,
    summary: '',
    time: '',
  };

  protected isLoading: WritableSignal<boolean> = signal<boolean>(false);
  protected isError: WritableSignal<boolean> = signal<boolean>(false);
  protected isValid: WritableSignal<boolean> = signal<boolean>(false);
  protected isSubmitted: WritableSignal<boolean> = signal<boolean>(false);

  protected setIdEventType(id: number): void {
    this.eventModel.idEventType = id;
  }

  protected addEvent(): void {
    this.isLoading.set(true);
    this.isSubmitted.set(false);
    this.apiEventsService.addEvent(this.eventModel).subscribe((item) => {
      this.populateStates(item);
      this.isLoading.set(false);

      if (item.isError || !item.isValid) {
        return;
      }

      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000);
    });
  }

  private populateStates(item: StatusModel): void {
    this.isError.set(item.isError);
    this.isValid.set(item.isValid);
    this.isSubmitted.set(item.isSubmitted);
  }
}
