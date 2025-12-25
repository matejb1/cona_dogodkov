import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Config } from '../../interfaces/Config';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  private config: Config | undefined;
  private readonly http: HttpClient = inject(HttpClient);

  public loadConfig(): Observable<Config> {
    return this.http.get<Config>('/config.json').pipe(map((cfg) => (this.config = cfg)));
  }

  public getConfig(): Config | undefined {
    return this.config;
  }
}
