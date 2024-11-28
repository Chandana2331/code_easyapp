import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-fee-details',
  templateUrl: './student-fee-details.component.html',
  styleUrls: ['./student-fee-details.component.scss']
})
export class StudentFeeDetailsComponent {
  feeData = [
    { name: 'John Doe', class: '10th Grade', amountPaid: 2000, registrationFees: 500, datePaid: new Date() },
    { name: 'Jane Smith', class: '9th Grade', amountPaid: 1500, registrationFees: 300, datePaid: new Date() },
  ];
  displayedColumns: string[] = ['name', 'class', 'amountPaid', 'registrationFees', 'datePaid'];

  constructor(private location: Location) {}

  goBack() {
    this.location.back(); 
  }
}
