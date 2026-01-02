import { Component, inject, signal, WritableSignal } from '@angular/core';
import { LoginModel } from '../../interfaces/LoginModel';
import { FormsModule } from '@angular/forms';
import { ApiLoginService } from '../api-login-service/api-login-service';
import { LoadingComponent } from '../../shared/loading-component/loading-component';
import { Router } from '@angular/router';
import { StatusModel } from '../../interfaces/StatusModel';

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

  private apiLoginService: ApiLoginService = inject(ApiLoginService);
  private router: Router = inject(Router);

  protected login(): void {
    this.isLoading.set(true);
    this.isSubmitted.set(false);

    this.apiLoginService.login(this.loginCredentials).subscribe((item) => {
      this.populateStates(item);
      if (this.isValid() && !this.isError() && this.isSubmitted()) {
        setTimeout(() => {
          ApiLoginService.isSubjectLoaded.next(true);
          this.router.navigate(['/']);
        }, 1000);
      }
    });
  }

  private populateStates(item: StatusModel): void {
    this.isValid.set(item.isValid);
    this.isError.set(item.isError);
    this.isSubmitted.set(item.isSubmitted);
    this.isLoading.set(false);
  }
}
