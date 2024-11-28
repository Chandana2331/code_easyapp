import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
 
  isAttendanceVisible = false;
  isLeaveRecordVisible = false;

 
  selectedDate: Date | null = null;  
  attendanceStatus: 'present' | 'absent' | null = null;
  attendanceRecord: { [date: string]: 'present' | 'absent' } = {};

  constructor(private router: Router) {}

 
  viewMarks() {
    console.log('View Marks clicked');
    this.router.navigate(['/marks']);
  }

 
  viewAttendance() {
    console.log('View Attendance clicked');
    this.router.navigate(['/attendance']);
  }


  viewFees() {
    console.log('View Fee Details clicked');
    this.router.navigate(['/fees']);
  }

  
  viewStudentProfiles() {
    console.log('View Student Profiles clicked');
    this.router.navigate(['/students']);
  }

  viewStaffDetails() {
    console.log('View Staff Details clicked');
    this.router.navigate(['/staff-details']);
  }

  
  handleEnquiry() {
    console.log('Manage Enquiries clicked');
    this.router.navigate(['/enquiries']);
  }

  
  navigateToEnquiry() {
    this.router.navigate(['/enquiry']);
  }

 
  navigateToManageAttendance() {
    this.router.navigate(['/manage-attendance']);
  }


  toggleAttendance() {
    this.isAttendanceVisible = !this.isAttendanceVisible;
  }

  
  toggleLeaveRecord() {
    this.isLeaveRecordVisible = !this.isLeaveRecordVisible;
  }


  onDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.selectedDate = event.value;
      console.log('Selected Date:', this.selectedDate);

      const formattedDate = this.formatDate(this.selectedDate);
      const status = this.attendanceRecord[formattedDate];
      this.attendanceStatus = status || null; 
    }
  }

  saveAttendance() {
    if (this.selectedDate && this.attendanceStatus) {
      const formattedDate = this.formatDate(this.selectedDate);
      this.attendanceRecord[formattedDate] = this.attendanceStatus;
      console.log(`Attendance saved: ${formattedDate} - ${this.attendanceStatus}`);
    }
  }

 
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getDateColor(date: Date): string {
    const formattedDate = this.formatDate(date);
    const status = this.attendanceRecord[formattedDate];
    return status === 'present' ? 'green' : status === 'absent' ? 'red' : 'transparent';
  }

  closeModal() {
    this.router.navigate(['/']);
  }
}
