import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../services/student.service'; 

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html', 
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  studentId: string | null = null;  
  attendance: any;
  marks: any;

  constructor(private route: ActivatedRoute, private studentService: StudentService) { }

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get('studentId');
    if (this.studentId) {  
      this.fetchAttendance();
      this.fetchMarks(); 
    } else {
      console.error('Student ID is null');
    }
  }

  fetchAttendance() {
    if (this.studentId) {  
      this.studentService.getAttendance(this.studentId).subscribe(
        data => {
          this.attendance = data;
        },
        error => {
          console.error('Error fetching attendance:', error);
        }
      );
    }
  }

  fetchMarks() {
    if (this.studentId) {  
      this.studentService.getMarks(this.studentId).subscribe(
        data => {
          this.marks = data;
        },
        error => {
          console.error('Error fetching marks:', error);
        }
      );
    }
  }
}
