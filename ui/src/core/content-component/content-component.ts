import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ApiEvents } from '../api-events-service/api-events';
import { EventBasicInfoModel } from '../../interfaces/EventBasicInfoModel';
import { LoadingComponent } from '../loading-component/loading-component';
import { EventCardComponent } from '../event-card-component/event-card-component';

@Component({
  selector: 'app-content-component',
  templateUrl: './content-component.html',
  styleUrl: './content-component.css',
  imports: [LoadingComponent, EventCardComponent],
})
export class ContentComponent implements OnInit {
  private apiEvents: ApiEvents = inject(ApiEvents);
  protected eventBasicInfoList: EventBasicInfoModel[] = [];

  protected isLoading: WritableSignal<Boolean> = signal(true);

  ngOnInit(): void {
    this.apiEvents.getBasicInfoEvents().subscribe((data) => {
      this.eventBasicInfoList = data;
      this.isLoading.set(false);
    });
  }
}
