import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFeeDetailsComponent } from './student-fee-details.component';

describe('StudentFeeDetailsComponent', () => {
  let component: StudentFeeDetailsComponent;
  let fixture: ComponentFixture<StudentFeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentFeeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentFeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
