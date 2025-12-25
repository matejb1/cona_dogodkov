import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../../interfaces/LoginModel';

@Injectable({
  providedIn: 'root',
})
export class ApiLogin {
  private TOKEN: string = 'TOKEN';
  private API_URL: string = 'http://localhost:3000/api';

  private http: HttpClient = inject(HttpClient);

  public loginGetJWT(loginCredentials: LoginModel): Observable<any> {
    return this.http.post<any>(this.API_URL + '/login', loginCredentials);
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
