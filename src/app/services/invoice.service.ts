import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class InvoiceService {
  private apiUrl = 'api-endpoint'; 

  constructor(private http: HttpClient) {}

  getInvoiceDetails(invoiceId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/invoices/${invoiceId}`);
  }
}
