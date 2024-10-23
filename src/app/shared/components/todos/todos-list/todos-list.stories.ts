import { Meta, StoryObj } from '@storybook/angular';
import { TodosListComponent } from './todos-list.component';

const meta: Meta<TodosListComponent> = {
  title: 'Shared/Todos/TodoList',
  component: TodosListComponent,
  args: {
    todos: [
      {
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        completed: false,
      },
      {
        id: 3,
        title: 'fugiat veniam minus',
        completed: false,
      },
      {
        id: 4,
        title: 'et porro tempora',
        completed: true,
      },
    ],
  },
};

export default meta;

type Story = StoryObj<TodosListComponent>;

export const Default: Story = {};
