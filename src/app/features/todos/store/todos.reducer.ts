import { createReducer, on } from '@ngrx/store';
import { Todo } from '@shared/services/api.service';
import { todosApiActions } from './todos.actions';

export interface TodosState {
  todos: Todo[];
  error: string | null;
}

export const initialTodosState: TodosState = {
  todos: [],
  error: null,
};

export const todosReducer = createReducer(
  initialTodosState,
  on(todosApiActions.loadSuccess, (_, { todos }) => {
    return { todos, error: null };
  }),
  on(todosApiActions.loadFaile, (_, { error }) => {
    return { todos: [], error };
  }),
  on(todosApiActions.createSuccess, (state, { todo }) => {
    return { ...state, todos: [...state.todos, todo] };
  }),
  on(todosApiActions.changeStatusSuccess, (state, { todo }) => {
    return {
      ...state,
      todos: state.todos.map((oldTodo) => {
        if (oldTodo.id !== todo.id) {
          return oldTodo;
        }

        return todo;
      }),
    };
  }),
  on(todosApiActions.deleteSuccess, (state, { todoId }) => {
    return {
      ...state,
      todos: state.todos.filter((todo) => todo.id !== todoId),
    };
  }),
);
