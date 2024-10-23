import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosListItem, TodosListComponent } from './todos-list.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
  MatListOptionHarness,
  MatSelectionListHarness,
} from '@angular/material/list/testing';
import { MatListModule } from '@angular/material/list';
import { ChangeDetectorRef } from '@angular/core';
import { firstValueFrom } from 'rxjs';

describe('TodosListComponent', () => {
  let component: TodosListComponent;
  let fixture: ComponentFixture<TodosListComponent>;
  let loader: HarnessLoader;

  let todosToTest: TodosListItem[];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosListComponent, MatListModule],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TodosListComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();

    todosToTest = [
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
    ];
    component.todos = todosToTest;

    const cdr = fixture.componentRef.injector.get(ChangeDetectorRef);

    cdr.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create list of todos', async () => {
    const list = await loader.getHarness(MatSelectionListHarness);
    const options = await loader.getAllHarnesses(MatListOptionHarness);

    expect(list).toBeDefined();
    expect(options.length).toBe(todosToTest.length);
  });

  it('should mark todo as completed', (done) => {
    loader.getAllHarnesses(MatListOptionHarness).then((options) => {
      options[0]?.select();
    });

    firstValueFrom<{
      id: number;
      completed: boolean;
    }>(component.statusChange).then((value) => {
      expect(value).toEqual({
        id: todosToTest[0].id,
        completed: !todosToTest[0].completed,
      });
      done();
    });
  });

  it('should emit deleted output', (done) => {
    const componentEl: HTMLElement = fixture.nativeElement;
    const deleteBtn: HTMLElement = componentEl.querySelector(
      '.delete-btn',
    ) as HTMLElement;

    component.deleted.subscribe((value) => {
      expect(value).toBe(todosToTest[0].id);
      done();
    });

    deleteBtn.click();
  });
});
