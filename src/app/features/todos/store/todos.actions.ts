import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  ChangeTodoStatusPayload,
  CreateTodoPayload,
  Todo,
} from '@shared/services/api.service';
export const todosActions = createActionGroup({
  source: 'Todos',
  events: {
    Load: emptyProps(),
    Create: props<CreateTodoPayload>(),
    ChangeStatus: props<ChangeTodoStatusPayload>(),
    Delete: props<{ todoId: number }>(),
  },
});

export const todosApiActions = createActionGroup({
  source: 'Todos API',
  events: {
    'Create Success': props<{ todo: Todo }>(),
    'Change Status Success': props<{ todo: Todo }>(),
    'Delete Success': props<{ todoId: number }>(),
    'Load Success': props<{ todos: Todo[] }>(),
    'Load Faile': props<{ error: string }>(),
  },
});
