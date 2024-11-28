import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000'; 

  private userData = {
    studentName: 'Manasa',
    studentClass: '10th Grade',
    studentPhone: '8792248549',
    subjects: 'Maths, Science',
    Totalfees: 4000,
    date: '01-01-2024'
  };

  constructor(private http: HttpClient) {}

 
  sendOtp(phone: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-otp`, { phone });
  }

  
  verifyOtp(phone: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, { phone, otp });
  }


  getUserData() {
    return this.userData;
  }
}
