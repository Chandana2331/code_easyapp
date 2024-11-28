import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../services/student.service'; 

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  displayedColumns: string[] = ['username', 'studentName', 'class', 'actions'];
  selectedStudent: any = null;
  editForm: FormGroup;

  constructor(
    private studentService: StudentService, 
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      username: [''],
      studentName: [''],
      class: [''],
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.students = this.studentService.getStudents(); 
  }

  editStudent(student: any): void {
    this.selectedStudent = student;
    this.editForm.patchValue(student); 
  }

  saveStudent(): void {
    this.studentService.updateStudent(this.selectedStudent.id, this.editForm.value); 
    this.selectedStudent = null; 
    this.loadStudents(); 
  }

  cancelEdit(): void {
    this.selectedStudent = null;
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id); 
    this.loadStudents(); 
  }
}
