import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosService } from './todos.service';
import { TodosSearchComponent } from '@shared/components/todos/todos-search/todos-search.component';
import {
  TodosListItem,
  TodosListComponent,
} from '@shared/components/todos/todos-list/todos-list.component';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, combineLatest, debounceTime, map } from 'rxjs';
import { CreateTodoPayload } from '@shared/services/api.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodosSearchComponent, TodosListComponent, AsyncPipe],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  private todosService = inject(TodosService);

  constructor() {
    this.todosService.loadTodos();
  }

  public todos$ = this.todosService.todos$;
  public error$ = this.todosService.error$;
  public search$ = new BehaviorSubject<string>('');
  public todosSearch$ = combineLatest([
    this.todos$,
    this.search$.pipe(debounceTime(500)),
  ]).pipe(
    map(([todos, search]) => {
      if (!search) {
        return todos;
      }
      return todos.filter((todo) =>
        todo.title.toLowerCase().includes(search.toLowerCase()),
      );
    }),
  );

  public changeTodoStatus(payload: { id: number; completed: boolean }): void {
    this.todosService.changeTodoStatus(payload);
  }

  public createTodo(payload: CreateTodoPayload): void {
    this.todosService.createTodo(payload);
  }

  public deleteTodo(todoId: number): void {
    this.todosService.deleteTodo(todoId);
  }
}
