import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarksService } from '../marks.service'; 

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})
export class MarksComponent implements OnInit {
  studentId: string | null = null; 
  marks: any[] = []; 

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private marksService: MarksService
  ) { }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('studentId');
    console.log('Student ID:', this.studentId);
    if (this.studentId) {
      this.fetchStudentMarks();
    } else {
      console.error('No student ID found');
    }
  }

  fetchStudentMarks(): void {
    if (this.studentId) {
      this.marksService.getStudentMarks(this.studentId).subscribe(
        (data) => {
          this.marks = data;
        },
        (error) => {
          console.error('Error fetching marks:', error);
        }
      );
    } else {
      console.error('No student ID found');
    }
  }

  goBack(): void {
    this.router.navigate(['/tab1']);
  }
}
