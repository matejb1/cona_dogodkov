import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventBasicInfoModel } from '../../interfaces/EventBasicInfoModel';

@Injectable({
  providedIn: 'root',
})
export class ApiEvents {
  private http: HttpClient = inject(HttpClient);

  private API_URL: string = 'http://localhost:3000/api';

  public getBasicInfoEvents(): Observable<EventBasicInfoModel[]> {
    return this.http.get<EventBasicInfoModel[]>(this.API_URL + '/events');
  }
}
