import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { EventTypeComboboxComponent } from '../event-type-combobox-component/event-type-combobox-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../../core/loading-component/loading-component';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDetailsModel } from '../../interfaces/EventDetailsModel';
import { StatusModel } from '../../interfaces/StatusModel';
import { ApiEventsService } from '../../home/api-events-service/api-events-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-event-component',
  imports: [EventTypeComboboxComponent, FormsModule, LoadingComponent, ReactiveFormsModule],
  templateUrl: './edit-event-component.html',
  styleUrl: './edit-event-component.css',
})
export class EditEventComponent implements OnInit {
  private apiEventsService: ApiEventsService = inject(ApiEventsService);
  private router: Router = inject(Router);

  protected readonly id: number = parseInt(inject(ActivatedRoute).snapshot.params['id']);

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

  protected isFirstTimeLoad: WritableSignal<boolean> = signal<boolean>(true);
  protected isLoading: WritableSignal<boolean> = signal<boolean>(false);
  protected isError: WritableSignal<boolean> = signal<boolean>(false);
  protected isValid: WritableSignal<boolean> = signal<boolean>(false);
  protected isSubmitted: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.apiEventsService.getEventDetails(this.id).subscribe((data) => {
      this.eventModel = data;
      this.isLoading.set(false);
      this.isFirstTimeLoad.set(false);
    });
  }

  protected setIdEventType(id: number): void {
    this.eventModel.idEventType = id;
  }

  protected editEvent(): void {
    this.handleStatesDoRediractionOnSuccess(this.apiEventsService.editEvent(this.id, this.eventModel));
  }

  protected deleteEvent() {
    this.handleStatesDoRediractionOnSuccess(this.apiEventsService.deleteEvent(this.id));
  }

  private handleStatesDoRediractionOnSuccess(apiCall: Observable<any>) {
    this.isLoading.set(true);
    this.isSubmitted.set(false);
    apiCall.subscribe((item) => {
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
