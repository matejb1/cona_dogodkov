import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { LoginModel } from '../../interfaces/LoginModel';
import { LoginStatusModel } from '../../interfaces/LoginStatusModel';
import { EnvService } from '../../core/env-service/env-service';

@Injectable({
  providedIn: 'root',
})
export class ApiLoginService {
  private TOKEN: string = 'TOKEN';
  private http: HttpClient = inject(HttpClient);
  private envService: EnvService = inject(EnvService);

  public login(loginCredentials: LoginModel): Observable<LoginStatusModel> {
    let result: LoginStatusModel = { isError: false, isSubmitted: true, isValid: false };

    if (!this.isLoginValid(loginCredentials)) {
      return of(result);
    }

    result.isValid = true;
    result.isSubmitted = true;

    let r = this.http
      .post<any>(this.envService.getConfig()?.API_URL + '/login', loginCredentials) //
      .pipe(
        map((item) => {
          let token = item.token;
          this.setToken(token);
          return result;
        }),
        catchError((err, caught) => {
          result.isError = true;
          return of(result);
        }),
      );

    return r;
  }

  private isLoginValid(loginCredentials: LoginModel): boolean {
    if (!loginCredentials || !loginCredentials.username || !loginCredentials.password) {
      return false;
    }

    if (
      loginCredentials.username.length > 20 ||
      loginCredentials.password.length > 20 ||
      loginCredentials.username.length == 0 ||
      loginCredentials.password.length == 0
    ) {
      return false;
    }

    return true;
  }

  public setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN);
  }

  public removeToken(): void {
    sessionStorage.removeItem(this.TOKEN);
  }
}
