// enquiry.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss'],
})
export class EnquiryComponent implements OnInit {
  enquiryForm: FormGroup;
  enquiries: { name: string; description: string; outcome: string; date: Date }[] = [];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.enquiryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      outcome: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEnquiries();
  }

  submitEnquiry(): void {
    if (this.enquiryForm.valid) {
      const newEnquiry = {
        name: this.enquiryForm.value.name,
        description: this.enquiryForm.value.description,
        outcome: this.enquiryForm.value.outcome,
        date: this.enquiryForm.value.date
      };

      this.enquiries.push(newEnquiry);
      this.saveEnquiries();
      this.enquiryForm.reset();

      this.cdr.detectChanges();
    }
  }

  private loadEnquiries(): void {
    const storedEnquiries = localStorage.getItem('enquiries');
    if (storedEnquiries) {
      this.enquiries = JSON.parse(storedEnquiries).map((enquiry: any) => ({
        ...enquiry,
        date: new Date(enquiry.date) 
      }));
    }
  }

  private saveEnquiries(): void {
    localStorage.setItem('enquiries', JSON.stringify(this.enquiries));
  }
}
