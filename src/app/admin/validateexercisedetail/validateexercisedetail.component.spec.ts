import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateexercisedetailComponent } from './validateexercisedetail.component';

describe('ValidateexercisedetailComponent', () => {
  let component: ValidateexercisedetailComponent;
  let fixture: ComponentFixture<ValidateexercisedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateexercisedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateexercisedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
