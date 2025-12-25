import { Component, signal } from '@angular/core';
import { NavbarComponent } from '../core/navbar-component/navbar-component';
import { ContentComponent } from '../core/content-component/content-component';
import { FooterComponent } from '../core/footer-component/footer-component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, ContentComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Cona dogodkov');
}
