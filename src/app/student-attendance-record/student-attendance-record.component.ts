import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface AttendanceRecord {
  studentName: string;
  class: string;
  attendanceStatus: string;
  attendanceDate: Date;
}

interface GroupedAttendanceRecord {
  studentName: string;
  class: string;
  presentDates: Date[];
  absentDates: Date[];
}

@Component({
  selector: 'app-student-attendance-record',
  templateUrl: './student-attendance-record.component.html',
  styleUrls: ['./student-attendance-record.component.scss']
})
export class StudentAttendanceRecordComponent implements OnInit {
  studentAttendanceForm: FormGroup;
  todayDate: Date = new Date();
  dateColor: string = 'lightgreen';
  attendanceRecords: AttendanceRecord[] = [];
  groupedAttendanceRecords: GroupedAttendanceRecord[] = [];

  constructor(private fb: FormBuilder) {
    this.studentAttendanceForm = this.fb.group({
      studentName: [''],
      class: [''],
      attendanceStatus: [''],
      attendanceDate: [this.todayDate]
    });
  }

  ngOnInit(): void {
    this.loadAttendanceData();
    this.studentAttendanceForm.get('attendanceStatus')?.valueChanges.subscribe(() => this.updateDateColor());
  }

  updateDateColor(): void {
    const status = this.studentAttendanceForm.get('attendanceStatus')?.value;
    this.dateColor = status === 'present' ? 'lightgreen' : status === 'absent' ? 'salmon' : 'white';
  }

  addAttendanceRecord(): void {
    if (this.studentAttendanceForm.valid) {
      const newRecord: AttendanceRecord = {
        studentName: this.studentAttendanceForm.get('studentName')?.value,
        class: this.studentAttendanceForm.get('class')?.value,
        attendanceStatus: this.studentAttendanceForm.get('attendanceStatus')?.value,
        attendanceDate: this.studentAttendanceForm.get('attendanceDate')?.value
      };

      this.attendanceRecords.push(newRecord);
      this.updateGroupedRecords();
      this.saveAttendanceData();

      this.studentAttendanceForm.reset({ attendanceDate: this.todayDate });
      this.updateDateColor();
    }
  }

  saveAttendanceData(): void {
    localStorage.setItem('studentAttendanceRecords', JSON.stringify(this.attendanceRecords));
  }

  loadAttendanceData(): void {
    const data = localStorage.getItem('studentAttendanceRecords');
    if (data) {
      this.attendanceRecords = JSON.parse(data);
      this.updateGroupedRecords();
    }
  }

  updateGroupedRecords(): void {
    const grouped = new Map<string, GroupedAttendanceRecord>();

    this.attendanceRecords.forEach(record => {
      const key = `${record.studentName}-${record.class}`;
      if (!grouped.has(key)) {
        grouped.set(key, {
          studentName: record.studentName,
          class: record.class,
          presentDates: [],
          absentDates: []
        });
      }

      const groupedRecord = grouped.get(key);
      if (record.attendanceStatus === 'present') {
        groupedRecord?.presentDates.push(record.attendanceDate);
      } else if (record.attendanceStatus === 'absent') {
        groupedRecord?.absentDates.push(record.attendanceDate);
      }
    });

    this.groupedAttendanceRecords = Array.from(grouped.values());
  }

  editAttendanceRecord(index: number): void {
    const record = this.attendanceRecords[index];
    this.studentAttendanceForm.setValue({
      studentName: record.studentName,
      class: record.class,
      attendanceStatus: record.attendanceStatus,
      attendanceDate: record.attendanceDate
    });
  }

  deleteAttendanceRecord(index: number): void {
    this.attendanceRecords.splice(index, 1);
    this.updateGroupedRecords();
    this.saveAttendanceData();
  }
}
