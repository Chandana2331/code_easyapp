import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AttendanceService {
    private apiUrl = 'http://localhost:3000/attendance'; 

    constructor(private http: HttpClient) {}

    addAttendance(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }

    getAttendance(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }
}
