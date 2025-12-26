import { CanActivateFn } from '@angular/router';
import { ApiLoginService } from '../../login/api-login-service/api-login-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(ApiLoginService).getToken() != null;
};
