import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventDetailsModel } from '../../interfaces/EventDetailsModel';
import { EnvService } from '../../core/env-service/env-service';
import { catchError, map, Observable, of } from 'rxjs';
import { StatusModel } from '../../interfaces/StatusModel';

@Injectable({
  providedIn: 'root',
})
export class ApiEventService {
  private http: HttpClient = inject(HttpClient);
  private envService: EnvService = inject(EnvService);

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
      model.eventType <= 0 ||
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
