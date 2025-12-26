import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventBasicInfoModel } from '../../interfaces/EventBasicInfoModel';
import { EnvService } from '../../core/env-service/env-service';
import { SearchModel } from '../../interfaces/SearchModel';

@Injectable({
  providedIn: 'root',
})
export class ApiEventsService {
  private http: HttpClient = inject(HttpClient);
  private envService: EnvService = inject(EnvService);

  public getBasicInfoEvents(): Observable<EventBasicInfoModel[]> {
    return this.http.get<EventBasicInfoModel[]>(this.envService.getConfig()?.API_URL + '/events');
  }

  public searchBasicInfoEvents(search: SearchModel): Observable<EventBasicInfoModel[]> {
    return this.http.post<EventBasicInfoModel[]>(this.envService.getConfig()?.API_URL + '/events/search', search);
  }
}
