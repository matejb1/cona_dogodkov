import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { EventCardComponent } from '../event-card-component/event-card-component';
import { LoadingComponent } from '../../core/loading-component/loading-component';
import { ApiEventsService } from '../api-events-service/api-events-service';
import { EventBasicInfoModel } from '../../interfaces/EventBasicInfoModel';

@Component({
  selector: 'app-home-component',
  imports: [EventCardComponent, LoadingComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {
  private apiEvents: ApiEventsService = inject(ApiEventsService);
  protected eventBasicInfoList: EventBasicInfoModel[] = [];

  protected isLoading: WritableSignal<Boolean> = signal(true);

  ngOnInit(): void {
    this.apiEvents.getBasicInfoEvents().subscribe((data) => {
      this.eventBasicInfoList = data;
      this.isLoading.set(false);
    });
  }
}
