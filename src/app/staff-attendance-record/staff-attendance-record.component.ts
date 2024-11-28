import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface AttendanceRecord {
  staffName: string;
  designation: string;
  attendanceStatus: string;
  attendanceDate: Date;
}

interface GroupedAttendanceRecord {
  staffName: string;
  designation: string;
  presentDates: Date[];
  absentDates: Date[];
}

@Component({
  selector: 'app-staff-attendance-record',
  templateUrl: './staff-attendance-record.component.html',
  styleUrls: ['./staff-attendance-record.component.scss']
})
export class StaffAttendanceRecordComponent implements OnInit {
  staffAttendanceForm: FormGroup;
  todayDate: Date = new Date();
  dateColor: string = 'lightgreen';
  attendanceRecords: AttendanceRecord[] = [];
  groupedAttendanceRecords: GroupedAttendanceRecord[] = [];

  constructor(private fb: FormBuilder) {
    this.staffAttendanceForm = this.fb.group({
      staffName: [''],
      designation: [''],
      attendanceStatus: [''],
      attendanceDate: [this.todayDate]
    });
  }

  ngOnInit(): void {
   
    this.loadAttendanceData();

    
    this.staffAttendanceForm.get('attendanceStatus')?.valueChanges.subscribe(() => this.updateDateColor());
  }

  updateDateColor(): void {
    const status = this.staffAttendanceForm.get('attendanceStatus')?.value;
    this.dateColor = status === 'present' ? 'lightgreen' : status === 'absent' ? 'salmon' : 'white';
  }

  addAttendanceRecord(): void {
    if (this.staffAttendanceForm.valid) {
      const newRecord: AttendanceRecord = {
        staffName: this.staffAttendanceForm.get('staffName')?.value,
        designation: this.staffAttendanceForm.get('designation')?.value,
        attendanceStatus: this.staffAttendanceForm.get('attendanceStatus')?.value,
        attendanceDate: this.staffAttendanceForm.get('attendanceDate')?.value
      };

      this.attendanceRecords.push(newRecord);

     
      this.updateGroupedRecords();

     
      this.saveAttendanceData();

     
      this.staffAttendanceForm.reset({ attendanceDate: this.todayDate });
      this.updateDateColor();
    }
  }

  saveAttendanceData(): void {
   
    localStorage.setItem('attendanceRecords', JSON.stringify(this.attendanceRecords));
  }

  loadAttendanceData(): void {
   
    const data = localStorage.getItem('attendanceRecords');
    if (data) {
      this.attendanceRecords = JSON.parse(data);
     
      this.updateGroupedRecords();
    }
  }

  updateGroupedRecords(): void {
    const grouped = new Map<string, GroupedAttendanceRecord>();

    this.attendanceRecords.forEach(record => {
      const key = `${record.staffName}-${record.designation}`;
      if (!grouped.has(key)) {
        grouped.set(key, {
          staffName: record.staffName,
          designation: record.designation,
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
    this.staffAttendanceForm.setValue({
      staffName: record.staffName,
      designation: record.designation,
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
