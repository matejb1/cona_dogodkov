import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home-component/home-component';
import { LoginComponent } from '../login/login-component/login-component';
import { AddEventComponent } from '../admin/add-event-component/add-event-component';
import { authGuard } from '../core/auth-guard/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin/add-event',
    component: AddEventComponent,
    canActivate: [authGuard],
  },
];
