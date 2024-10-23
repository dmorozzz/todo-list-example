import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface CreateTodoPayload {
  title: string;
}

export interface ChangeTodoStatusPayload {
  id: number;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private readonly url = 'https://jsonplaceholder.typicode.com/todos';

  public getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.url)
      .pipe(map((todos) => todos.slice(0, 9)));
  }

  public createTodo(payload: CreateTodoPayload): Observable<Todo> {
    return this.http.post<Todo>(this.url, { ...payload, completed: false });
  }

  public changeTodoStatus(payload: ChangeTodoStatusPayload): Observable<Todo> {
    return this.http.patch<Todo>(`${this.url}/${payload.id}`, {
      completed: payload.completed,
    });
  }

  public deleteTodo(todoId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${todoId}`);
  }
}
