import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-todos-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './todos-search.component.html',
  styleUrl: './todos-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosSearchComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);

  private destroy$ = new Subject<void>();

  @Input() public default: string = '';
  @Output() public changed = new EventEmitter<string>();
  @Output() public created = new EventEmitter<string>();

  public todosSearchForm!: FormGroup;
  public get title(): FormControl {
    return this.todosSearchForm.get('title') as FormControl;
  }

  public ngOnInit(): void {
    this.todosSearchForm = this.fb.group({
      title: [this.default],
    });

    this.title.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.changed.emit(value));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public create() {
    const titleValue = this.title.value;

    if (!titleValue) {
      return;
    }

    this.title.setValue('');
    this.created.next(titleValue);
  }
}
