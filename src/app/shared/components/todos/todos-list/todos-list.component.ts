import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

export interface TodosListItem {
  id: number;
  title: string;
  completed: boolean;
}

interface ChangeStatusPayload {
  id: number;
  completed: boolean;
}

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [MatListModule, MatButtonModule],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  @Input({ required: true }) public todos!: TodosListItem[];
  @Output() public statusChange = new EventEmitter<ChangeStatusPayload>();
  @Output() public deleted = new EventEmitter<number>();

  public changeStatus(payload: ChangeStatusPayload): void {
    const todoItem = this.todos.find((todo) => todo.id === payload.id);

    if (todoItem?.completed === payload.completed) {
      return;
    }

    this.statusChange.emit(payload);
  }
}
