import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from './todos.reducer';

const selectTodosState =
  createFeatureSelector<Readonly<TodosState>>('todosState');

export const selectAllTodos = createSelector(
  selectTodosState,
  (state) => state.todos,
);

export const selectTodosStateError = createSelector(
  selectTodosState,
  (state) => state.error,
);
