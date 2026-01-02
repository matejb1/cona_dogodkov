import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content-component',
  templateUrl: './content-component.html',
  styleUrl: './content-component.css',
  imports: [RouterOutlet],
})
export class ContentComponent {}
