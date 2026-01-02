import { Component, signal } from '@angular/core';
import { NavbarComponent } from '../shared/navbar-component/navbar-component';
import { ContentComponent } from '../shared/content-component/content-component';
import { FooterComponent } from '../shared/footer-component/footer-component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, ContentComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Cona dogodkov');
}
