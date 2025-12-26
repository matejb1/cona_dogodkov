import { Component, inject, input, InputSignal } from '@angular/core';
import { EventBasicInfoModel } from '../../interfaces/EventBasicInfoModel';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiLoginService } from '../../login/api-login-service/api-login-service';

@Component({
  selector: 'app-event-card-component',
  imports: [DatePipe, RouterLink],
  templateUrl: './event-card-component.html',
  styleUrl: './event-card-component.css',
})
export class EventCardComponent {
  protected readonly DATE_FORMAT: string = 'dd.MM.yyyy, HH:mm';
  protected readonly isUserLoggedIn: boolean = inject(ApiLoginService).getToken() != null;

  public value: InputSignal<EventBasicInfoModel> = input.required<EventBasicInfoModel>();
}
