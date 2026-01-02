import { Component, inject, OnInit, output, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiLoginService } from '../../login/api-login-service/api-login-service';
import { ClaimsModel } from '../../interfaces/ClaimsModel';

@Component({
  selector: 'app-navbar-component',
  imports: [RouterLink],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent implements OnInit {
  protected isUserLoggedIn: WritableSignal<boolean> = signal<boolean>(false);
  protected claims: ClaimsModel | undefined;

  private apiLoginService: ApiLoginService = inject(ApiLoginService);

  ngOnInit(): void {
    this.loadJWT();
  }

  private loadJWT() {
    ApiLoginService.isSubjectLoaded.subscribe((loginState) => {
      this.claims = this.apiLoginService.getClaims();
      let statusUserLogin: boolean = this.claims != undefined;
      this.isUserLoggedIn.set(statusUserLogin);
    });
  }

  protected logout(): void {
    this.apiLoginService.removeToken();
    ApiLoginService.isSubjectLoaded.next(false);
    this.isUserLoggedIn.set(false);
  }
}
