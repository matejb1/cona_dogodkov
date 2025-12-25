import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home-component/home-component';
import { LoginComponent } from '../login/login-component/login-component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
