import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PartA } from './components/part-a/part-a';
import { PartB } from './components/part-b/part-b';
import { PartC } from './components/part-c/part-c';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PartA, PartB, PartC],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
