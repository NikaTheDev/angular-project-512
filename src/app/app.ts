import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/header/header';
import { Footer } from './core/footer/footer';
import { Toast } from './shared/components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('tech-shop');
}
