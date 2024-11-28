import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'https://api.codeeasy.com/students'; 

  private students = [
    { id: 1, username: 'user1', studentName: 'John Doe', class: '10' },
    { id: 2, username: 'user2', studentName: 'Jane Doe', class: '9' },
  ];

  constructor(private http: HttpClient) {}

 
  getAttendance(studentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${studentId}/attendance`);
  }

 
  getMarks(studentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/marks/${studentId}`);
  }

 
  getStudents(): any[] {
    return this.students;
  }


  updateStudent(id: number, updatedStudent: any): void {
    const index = this.students.findIndex((s) => s.id === id);
    if (index > -1) {
      this.students[index] = { ...this.students[index], ...updatedStudent };
    }
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter((s) => s.id !== id);
  }
}
