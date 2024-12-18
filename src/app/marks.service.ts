import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarksService {
  private apiUrl = 'API_URL'; 

  constructor(private http: HttpClient) { }

  
  getStudentMarks(studentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/marks/${studentId}`); 
  }
}
