import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventBasicInfoModel } from '../../interfaces/EventBasicInfoModel';
import { EnvService } from '../../core/env-service/env-service';

@Injectable({
  providedIn: 'root',
})
export class ApiEventsService {
  private http: HttpClient = inject(HttpClient);
  private envService: EnvService = inject(EnvService);

  public getBasicInfoEvents(): Observable<EventBasicInfoModel[]> {
    return this.http.get<EventBasicInfoModel[]>(this.envService.getConfig()?.API_URL + '/events');
  }
}
