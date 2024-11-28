import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

interface StudentRecord {
  name: string;
  class: string;
  subjects: { subject: string; marks: number }[];
}

@Component({
  selector: 'app-marks-management',
  templateUrl: './marks-management.component.html',
  styleUrls: ['./marks-management.component.scss']
})
export class MarksManagementComponent implements OnInit {
  marksForm: FormGroup;
  storedMarks: StudentRecord[] = [];

  constructor(private fb: FormBuilder) {
    this.marksForm = this.fb.group({
      students: this.fb.array([]) 
    });
  }

  ngOnInit(): void {
    
    const savedMarks = localStorage.getItem('storedMarks');
    if (savedMarks) {
      this.storedMarks = JSON.parse(savedMarks);
    }

    
    this.addStudent();
  }

  
  get students(): FormArray {
    return this.marksForm.get('students') as FormArray;
  }

  
  addStudent() {
    const studentForm = this.fb.group({
      name: ['', Validators.required],
      class: ['', Validators.required],
      subjects: this.fb.array([]) 
    });
    this.students.push(studentForm);
    this.addSubject(this.students.length - 1); 
  }

  
  addSubject(studentIndex: number) {
    const subjects = this.getSubjects(studentIndex);
    const subjectForm = this.fb.group({
      subject: ['', Validators.required],
      marks: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
    subjects.push(subjectForm);
  }

  
  getSubjects(studentIndex: number): FormArray {
    return (this.students.at(studentIndex) as FormGroup).get('subjects') as FormArray;
  }

  
  removeStudent(index: number) {
    this.students.removeAt(index);
  }

  
  removeSubject(studentIndex: number, subjectIndex: number) {
    this.getSubjects(studentIndex).removeAt(subjectIndex);
  }

  
  saveToLocalStorage() {
    localStorage.setItem('storedMarks', JSON.stringify(this.storedMarks));
  }

  
  submitMarks() {
    if (this.marksForm.valid) {
      this.marksForm.value.students.forEach((studentData: any) => {
        const existingRecord = this.storedMarks.find(
          record => record.name === studentData.name && record.class === studentData.class
        );

        if (existingRecord) {
          
          existingRecord.subjects.push(...studentData.subjects);
        } else {
          this.storedMarks.push({
            name: studentData.name,
            class: studentData.class,
            subjects: studentData.subjects
          });
        }
      });

      
      this.saveToLocalStorage();

      console.log("Submitted Marks:", this.storedMarks);
      alert('Marks have been submitted successfully.');
      this.marksForm.reset();
      this.students.clear();
      this.addStudent();
    } else {
      alert('Please fill out all required fields.');
    }
  }

  
  editStudent(record: StudentRecord) {
    this.students.clear();
    this.addStudent();
    const studentGroup = this.students.at(0) as FormGroup;
    studentGroup.patchValue({
      name: record.name,
      class: record.class
    });
    record.subjects.forEach((subject) => this.addSubject(0));
    studentGroup.patchValue({ subjects: record.subjects });
  }

  
  deleteStudent(index: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.storedMarks.splice(index, 1); 
      this.saveToLocalStorage(); 
      alert('Record deleted successfully.');
    }
  }
}
