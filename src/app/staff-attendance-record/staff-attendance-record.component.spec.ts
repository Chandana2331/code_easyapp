import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAttendanceRecordComponent } from './staff-attendance-record.component';

describe('StaffAttendanceRecordComponent', () => {
  let component: StaffAttendanceRecordComponent;
  let fixture: ComponentFixture<StaffAttendanceRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffAttendanceRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffAttendanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
