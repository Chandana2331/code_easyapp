import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  invoiceData: any;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private router: Router 
  ) {}

  ngOnInit() {
    const invoiceId = this.route.snapshot.paramMap.get('invoiceId');
    if (invoiceId) {
      this.loadInvoiceData(invoiceId);
    } else {
      console.error('No invoice ID found in the route parameters.');
    }
  }

  loadInvoiceData(invoiceId: string) {
    this.invoiceService.getInvoiceDetails(invoiceId).subscribe(
      (data) => {
        console.log('Invoice data:', data); 
        this.invoiceData = data;
      },
      (error) => {
        console.error('Error fetching invoice data', error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/tab1']);
  }
}
