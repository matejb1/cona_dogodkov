import { Component, inject, signal, WritableSignal } from '@angular/core';
import { LoginModel } from '../../interfaces/LoginModel';
import { FormsModule } from '@angular/forms';
import { ApiLogin } from '../api-login-service/api-login';
import { TokenModel } from '../../interfaces/TokenModel';
import { LoadingComponent } from '../../core/loading-component/loading-component';
import { delay } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule, LoadingComponent],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  protected isValid: WritableSignal<Boolean> = signal<Boolean>(false);
  protected isLoading: WritableSignal<Boolean> = signal<Boolean>(false);
  protected isSubmitted: WritableSignal<Boolean> = signal<Boolean>(false);
  protected isError: WritableSignal<Boolean> = signal<Boolean>(false);

  protected loginCredentials: LoginModel = { username: '', password: '' };

  private apiLoginService: ApiLogin = inject(ApiLogin);
  private router: Router = inject(Router);

  protected login(): void {
    this.validate();
    this.isError.set(false);

    if (this.isValid()) {
      this.isLoading.set(true);
      this.apiLoginService
        .loginGetJWT(this.loginCredentials) //
        .subscribe(
          (item) => {
            let token = item.token;
            this.isLoading.set(false);
            this.apiLoginService.setToken(token);

            setTimeout(() => this.router.navigate(['/']), 1000);
          },
          (error) => {
            this.isLoading.set(false);
            this.isError.set(true);
          },
        );
    }
    this.isSubmitted.set(true);
  }

  private validate(): void {
    if (!this.loginCredentials || !this.loginCredentials.username || !this.loginCredentials.password) {
      this.isValid.set(false);
      return;
    }

    if (
      this.loginCredentials.username.length > 20 ||
      this.loginCredentials.password.length > 20 ||
      this.loginCredentials.username.length == 0 ||
      this.loginCredentials.password.length == 0
    ) {
      this.isValid.set(false);
      return;
    }

    this.isValid.set(true);
  }
}
