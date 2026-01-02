import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { EventBasicInfoModel } from '../../interfaces/EventBasicInfoModel';
import { EnvService } from '../../core/env-service/env-service';
import { SearchModel } from '../../interfaces/SearchModel';
import { EventDetailsModel } from '../../interfaces/EventDetailsModel';
import { StatusModel } from '../../interfaces/StatusModel';
import { EventTypeModel } from '../../interfaces/EventTypeModel';

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

  public getEventDetails(id: number): Observable<EventDetailsModel> {
    return this.http.get<EventDetailsModel>(this.envService.getConfig()?.API_URL + `/events/${id}`);
  }

  public editEvent(id: number, model: EventDetailsModel): Observable<StatusModel> {
    let result: StatusModel = { isError: false, isSubmitted: true, isValid: false };
    if (!this.validateEventDetailsModel(model)) {
      return of(result);
    }
    result.isValid = true;

    return this.http.put(this.envService.getConfig()?.API_URL + `/events/${id}`, model).pipe(
      map((item) => result),
      catchError((err) => {
        result.isError = true;
        return of(result);
      }),
    );
  }

  public deleteEvent(id: number): Observable<StatusModel> {
    let result: StatusModel = { isError: false, isSubmitted: true, isValid: false };
    if (id < 1) {
      return of(result);
    }
    result.isValid = true;

    return this.http.delete(this.envService.getConfig()?.API_URL + `/events/${id}`).pipe(
      map((item) => result),
      catchError((err) => {
        result.isError = true;
        return of(result);
      }),
    );
  }

  public getEventTypeList(): Observable<EventTypeModel[]> {
    return this.http.get<EventTypeModel[]>(this.envService.getConfig()?.API_URL + '/event-types');
  }

  public addEvent(model: EventDetailsModel): Observable<StatusModel> {
    let result: StatusModel = { isError: false, isSubmitted: true, isValid: false };
    if (!this.validateEventDetailsModel(model)) {
      return of(result);
    }
    result.isValid = true;

    return this.http.post(this.envService.getConfig()?.API_URL + '/events', model).pipe(
      map((item) => result),
      catchError((err) => {
        result.isError = true;
        return of(result);
      }),
    );
  }

  private validateEventDetailsModel(model: EventDetailsModel): boolean {
    if (!model) {
      return false;
    }

    if (
      model.idEventType <= 0 ||
      !model.time ||
      !model.location ||
      !model.date ||
      !model.link ||
      model.price < 0 ||
      !model.summary ||
      !model.name
    ) {
      return false;
    }

    return true;
  }
}
