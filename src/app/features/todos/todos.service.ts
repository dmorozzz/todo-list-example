import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllTodos, selectTodosStateError, todosActions } from './store';
import {
  ChangeTodoStatusPayload,
  CreateTodoPayload,
} from '@shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private store = inject(Store);

  public todos$ = this.store.select(selectAllTodos);
  public error$ = this.store.select(selectTodosStateError);

  public loadTodos(): void {
    this.store.dispatch(todosActions.load());
  }

  public changeTodoStatus(payload: ChangeTodoStatusPayload): void {
    this.store.dispatch(todosActions.changeStatus(payload));
  }

  public createTodo(payload: CreateTodoPayload): void {
    this.store.dispatch(todosActions.create(payload));
  }

  public deleteTodo(todoId: number): void {
    this.store.dispatch(todosActions.delete({ todoId }));
  }
}
