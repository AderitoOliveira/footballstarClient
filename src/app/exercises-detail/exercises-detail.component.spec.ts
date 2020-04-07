import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesDetailComponent } from './exercises-detail.component';

describe('ExercisesDetailComponent', () => {
  let component: ExercisesDetailComponent;
  let fixture: ComponentFixture<ExercisesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
