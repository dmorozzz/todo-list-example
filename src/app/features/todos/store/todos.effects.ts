import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@shared/services/api.service';
import { todosActions, todosApiActions } from './todos.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodosEffects {
  private actions$ = inject(Actions);
  private api = inject(ApiService);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todosActions.load),
      exhaustMap(() =>
        this.api.getTodos().pipe(
          map((todos) => todosApiActions.loadSuccess({ todos })),
          catchError(() =>
            of(todosApiActions.loadFaile({ error: 'Something went wrong' })),
          ),
        ),
      ),
    ),
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todosActions.create),
      exhaustMap((payload) => {
        return this.api
          .createTodo(payload)
          .pipe(map((todo) => todosApiActions.createSuccess({ todo })));
      }),
    ),
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todosActions.delete),
      exhaustMap(({ todoId }) =>
        this.api
          .deleteTodo(todoId)
          .pipe(map(() => todosApiActions.deleteSuccess({ todoId }))),
      ),
    ),
  );

  changeStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todosActions.changeStatus),
      exhaustMap((payload) =>
        this.api
          .changeTodoStatus(payload)
          .pipe(map((todo) => todosApiActions.changeStatusSuccess({ todo }))),
      ),
    ),
  );
}
