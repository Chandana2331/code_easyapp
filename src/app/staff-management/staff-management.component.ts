import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';

export const MY_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

interface Staff {
  name: string;
  phone: string;
  address: string;
  designation: string;
  dateOfJoining: string;
}

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class StaffManagementComponent implements OnInit {
  staffForm!: FormGroup;
  submittedStaff: Staff[] = [];
  editingIndex: number | null = null;

  constructor(private fb: FormBuilder, private router: Router, private adapter: DateAdapter<any>) {}

  ngOnInit(): void {
    this.staffForm = this.fb.group({
      staffMembers: this.fb.array([this.createStaff()])
    });
    this.loadStoredData();
  }

  createStaff(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      designation: ['', Validators.required],
      dateOfJoining: ['', Validators.required]
    });
  }

  get staffMembers(): FormArray {
    return this.staffForm.get('staffMembers') as FormArray;
  }

  addStaff(): void {
    this.staffMembers.push(this.createStaff());
  }

  removeStaff(index: number): void {
    this.staffMembers.removeAt(index);
  }

  submitStaff(): void {
    if (this.staffForm.valid) {
      const staffData: Staff[] = this.staffForm.value.staffMembers.map((staff: any) => ({
        ...staff,
        dateOfJoining: moment(staff.dateOfJoining).format('YYYY-MM-DD')  
      }));

      if (this.editingIndex !== null) {
        this.submittedStaff[this.editingIndex] = staffData[0];
        this.editingIndex = null;
      } else {
        this.submittedStaff.push(...staffData);
      }

      this.saveToLocalStorage();
      this.staffForm.reset();
      this.staffMembers.clear();
      this.addStaff();
    }
  }

  editStaff(index: number): void {
    this.staffForm.reset();
    this.staffMembers.clear();
    this.addStaff();
    const staffData = { ...this.submittedStaff[index] };
   
    this.staffMembers.at(0).patchValue({
      ...staffData,
      dateOfJoining: moment(staffData.dateOfJoining, 'YYYY-MM-DD').toDate()
    });
    this.editingIndex = index;
  }

  deleteStaff(index: number): void {
    this.submittedStaff.splice(index, 1);
    this.saveToLocalStorage();
  }

  saveToLocalStorage(): void {
    localStorage.setItem('submittedStaff', JSON.stringify(this.submittedStaff));
  }

  loadStoredData(): void {
    const data = localStorage.getItem('submittedStaff');
    if (data) {
      this.submittedStaff = JSON.parse(data).map((staff: Staff) => ({
        ...staff,
        dateOfJoining: moment(staff.dateOfJoining, 'YYYY-MM-DD').format('YYYY-MM-DD') 
      }));
    }
  }
}
