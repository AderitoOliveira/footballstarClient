import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateexerciseComponent } from './validateexercise.component';

describe('ValidateexerciseComponent', () => {
  let component: ValidateexerciseComponent;
  let fixture: ComponentFixture<ValidateexerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateexerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateexerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
