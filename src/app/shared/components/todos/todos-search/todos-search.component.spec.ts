import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosSearchComponent } from './todos-search.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { take } from 'rxjs';

describe('TodosSearchComponent', () => {
  let component: TodosSearchComponent;
  let fixture: ComponentFixture<TodosSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosSearchComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TodosSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should output search value', () => {
    const searchQueryToTest = 'Search test value';
    const queryControl = component.todosSearchForm.controls['title'];

    let changes = '';

    component.changed.pipe(take(1)).subscribe((query) => (changes = query));

    queryControl.setValue(searchQueryToTest);

    expect(changes).toBe(searchQueryToTest);
  });

  it('should emit created output when create button clicked', (done) => {
    const todoTitle = 'Some todo title';
    const componentEl: HTMLElement = fixture.nativeElement;
    const createBtn = componentEl.querySelector('.create-btn') as HTMLElement;
    component.title.setValue(todoTitle);

    component.created.subscribe((value) => {
      expect(value).toBe(todoTitle);
      done();
    });
    createBtn.click();
  });

  it('should emit created output when Enter key pressed', (done) => {
    const todoTitle = 'Some todo title';
    const componentEl: HTMLElement = fixture.nativeElement;
    const inputEl: HTMLElement = componentEl.querySelector(
      'input',
    ) as HTMLElement;

    component.title.setValue(todoTitle);

    component.created.subscribe((value) => {
      expect(value).toBe(todoTitle);
      done();
    });

    inputEl.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
  });
});
