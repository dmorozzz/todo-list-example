import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosSearchComponent } from './shared/components/todos/todos-search/todos-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodosSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
