import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { EventCardComponent } from '../event-card-component/event-card-component';
import { LoadingComponent } from '../../core/loading-component/loading-component';
import { ApiEventsService } from '../api-events-service/api-events-service';
import { EventBasicInfoModel } from '../../interfaces/EventBasicInfoModel';
import { SearchModel } from '../../interfaces/SearchModel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-component',
  imports: [EventCardComponent, LoadingComponent, FormsModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {
  private apiEvents: ApiEventsService = inject(ApiEventsService);
  protected eventBasicInfoList: EventBasicInfoModel[] = [];

  protected isLoading: WritableSignal<Boolean> = signal(true);

  protected searchModel: SearchModel = { search: '' };

  ngOnInit(): void {
    this.apiEvents.getBasicInfoEvents().subscribe((data) => {
      this.eventBasicInfoList = data;
      this.isLoading.set(false);
    });
  }

  protected searchEvents() {
    this.isLoading.set(true);
    this.apiEvents.searchBasicInfoEvents(this.searchModel).subscribe((data) => {
      this.eventBasicInfoList = data;
      this.isLoading.set(false);
    });
  }
}
