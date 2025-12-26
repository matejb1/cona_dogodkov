import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiLoginService } from '../../login/api-login-service/api-login-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(ApiLoginService).getToken();

  if (!authToken) {
    return next(req);
  }

  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${authToken}`),
  });

  return next(newReq);
};
