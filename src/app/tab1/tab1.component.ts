import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.scss']
})
export class Tab1Component {
  studentName: string = 'John Doe';
  studentClass: string = '10th Grade';
  studentPhone: string = '123-456-7890';
  subjectsCount: number = 5;
  feesDue: number = 200;
  showProfile: boolean = true; 
  invoiceId: number = 123; 
  studentId: number = 456; 
  isMenuOpen: boolean = false;

  constructor(private router: Router) {}

  openNotifications() {
    
    this.router.navigate(['/reminder-notification']);
  }

  openMenu() {
    this.isMenuOpen = !this.isMenuOpen; 
  }

  logout() {
    
    console.log('Logged out');
    this.router.navigate(['/login']); 
    this.isMenuOpen = false; 
  }

  navigateToTimeTable() {
    this.router.navigate(['/time-table']); 
  }

  
}
