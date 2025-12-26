import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home-component/home-component';
import { LoginComponent } from '../login/login-component/login-component';
import { AddEventComponent } from '../admin/add-event-component/add-event-component';
import { authGuard } from '../core/auth-guard/auth-guard';
import { EventDetailsComponent } from '../home/event-details-component/event-details-component';

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
    path: 'event/:id',
    component: EventDetailsComponent,
  },
  {
    path: 'admin/add-event',
    component: AddEventComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/edit-event/:id',
    component: AddEventComponent,
    canActivate: [authGuard],
  },
];
