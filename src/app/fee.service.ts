import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeeService {
  private apiUrl = 'http://localhost:3000/api/fee-history';

  constructor(private http: HttpClient) {}

  getFeeHistory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
