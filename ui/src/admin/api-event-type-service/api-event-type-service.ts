import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../../core/env-service/env-service';
import { Observable } from 'rxjs';
import { EventTypeModel } from '../../interfaces/EventTypeModel';

@Injectable({
  providedIn: 'root',
})
export class ApiEventTypeService {
  private http: HttpClient = inject(HttpClient);
  private envService: EnvService = inject(EnvService);

  public getEventTypeList(): Observable<EventTypeModel[]> {
    return this.http.get<EventTypeModel[]>(this.envService.getConfig()?.API_URL + '/event-types');
  }
}
