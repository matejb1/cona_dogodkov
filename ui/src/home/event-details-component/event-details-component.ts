import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ApiEventsService } from '../api-events-service/api-events-service';
import { EventDetailsModel } from '../../interfaces/EventDetailsModel';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-details-component',
  imports: [DatePipe],
  templateUrl: './event-details-component.html',
  styleUrl: './event-details-component.css',
})
export class EventDetailsComponent implements OnInit {
  private readonly apiEventsService: ApiEventsService = inject(ApiEventsService);
  protected readonly DATE_FORMAT: string = 'dd.MM.yyyy';

  protected readonly id: number = parseInt(inject(ActivatedRoute).snapshot.params['id']);
  protected model: WritableSignal<EventDetailsModel> = signal<EventDetailsModel>({
    nameEventType: '',
    idEventType: -1,
    date: '',
    link: '',
    name: '',
    location: '',
    price: 0.0,
    summary: '',
    time: '',
  });

  ngOnInit(): void {
    this.apiEventsService.getEventDetails(this.id).subscribe((data) => this.model.set(data));
  }
}
