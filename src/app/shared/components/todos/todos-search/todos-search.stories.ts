import { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { TodosSearchComponent } from './todos-search.component';

const meta: Meta<TodosSearchComponent> = {
  title: 'Shared/Todos/TodosSearch',
  component: TodosSearchComponent,
  args: { default: '', changed: fn() },
};

export default meta;

type Story = StoryObj<TodosSearchComponent>;
export const Default: Story = {};
