import { Component, inject, signal, WritableSignal } from '@angular/core';
import { EventTypeComboboxComponent } from '../event-type-combobox-component/event-type-combobox-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventDetailsModel } from '../../interfaces/EventDetailsModel';
import { ApiEventService } from '../api-event-service/api-event-service';
import { LoadingComponent } from '../../core/loading-component/loading-component';
import { ApiLoginService } from '../../login/api-login-service/api-login-service';
import { Router } from '@angular/router';
import { StatusModel } from '../../interfaces/StatusModel';

@Component({
  selector: 'app-add-event-component',
  imports: [EventTypeComboboxComponent, ReactiveFormsModule, FormsModule, LoadingComponent],
  templateUrl: './add-event-component.html',
  styleUrl: './add-event-component.css',
})
export class AddEventComponent {
  private apiEventService: ApiEventService = inject(ApiEventService);
  private router: Router = inject(Router);
  protected eventModel: EventDetailsModel = {
    eventType: -1,
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
    this.eventModel.eventType = id;
  }

  protected addEvent(): void {
    this.isLoading.set(true);
    this.isSubmitted.set(false);
    this.apiEventService.addEvent(this.eventModel).subscribe((item) => {
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
